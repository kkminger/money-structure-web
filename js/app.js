// 金钱结构 - 网页版主程序

// 状态类型
const StatusType = {
  NONE: 'none',
  GOOD: 'good',
  WARNING: 'warning',
  ALERT: 'alert'
};

// 全局数据
let layerConfig = {
  income: 0,
  savingsRatio: 0.2,
  emergencyRatio: 0.15
};

let emergencyFund = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  render();
  initNavigation();
});

// 加载数据
function loadData() {
  layerConfig = {
    income: StorageService.getIncome(),
    savingsRatio: StorageService.getSavingsRatio(),
    emergencyRatio: StorageService.getEmergencyRatio()
  };

  const ef = StorageService.getEmergencyFund();
  if (ef) {
    emergencyFund = ef;
  }
}

// 渲染首页
function render() {
  renderStatusCard();
  renderOverview();
  renderExpenses();
  renderEmergencyFund();
}

// 渲染状态卡片
function renderStatusCard() {
  const income = layerConfig.income;
  const expenses = StorageService.getCurrentMonthExpenses();
  const totalFixed = expenses.reduce((sum, e) => sum + e.amount, 0);
  const livingAmount = income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio);

  let type = StatusType.NONE;
  let title = '未设置';
  let desc = '请先完成收入分层设置';

  if (income > 0) {
    if (totalFixed > livingAmount) {
      type = StatusType.ALERT;
      title = '结构被挤压';
      desc = '固定支出超过生活层，请调整';
    } else if (totalFixed > livingAmount * 0.8) {
      type = StatusType.WARNING;
      title = '接近警戒';
      desc = '固定支出快挤压生活层了';
    } else {
      type = StatusType.GOOD;
      title = '结构稳定';
      desc = '固定支出未挤压生活层，可以执行本月计划';
    }
  }

  const card = document.getElementById('statusCard');
  const icon = document.getElementById('statusIcon');
  const titleEl = document.getElementById('statusTitle');
  const descEl = document.getElementById('statusDesc');

  // 移除旧样式
  icon.className = 'status-icon ' + type;

  // 设置图标
  const iconMap = {
    [StatusType.NONE]: '?',
    [StatusType.GOOD]: '✓',
    [StatusType.WARNING]: '⚠',
    [StatusType.ALERT]: '!'
  };
  icon.querySelector('.icon').textContent = iconMap[type];

  titleEl.textContent = title;
  descEl.textContent = desc;
}

// 渲染结构概览
function renderOverview() {
  const income = layerConfig.income;
  const savingsRatio = layerConfig.savingsRatio;
  const emergencyRatio = layerConfig.emergencyRatio;
  const livingRatio = 1 - savingsRatio - emergencyRatio;

  document.getElementById('incomeAmount').textContent = formatCurrency(income);
  document.getElementById('savingsPercent').textContent = (savingsRatio * 100).toFixed(0) + '%';
  document.getElementById('emergencyPercent').textContent = (emergencyRatio * 100).toFixed(0) + '%';
  document.getElementById('livingPercent').textContent = (livingRatio * 100).toFixed(0) + '%';

  document.getElementById('savingsAmount').textContent = formatCurrency(income * savingsRatio);
  document.getElementById('emergencyAmount').textContent = formatCurrency(income * emergencyRatio);
  document.getElementById('livingAmount').textContent = formatCurrency(income * livingRatio);
}

// 渲染固定支出
function renderExpenses() {
  const expenses = StorageService.getCurrentMonthExpenses();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const income = layerConfig.income || 1;
  const percent = (total / income * 100).toFixed(0);

  document.getElementById('expensesTotal').textContent = formatCurrency(total);
  const percentEl = document.getElementById('expensesPercent');
  percentEl.textContent = percent + '%';

  // 颜色
  percentEl.className = 'expenses-percent ' + (percent > 80 ? 'high' : percent > 60 ? 'medium' : 'low');

  const listEl = document.getElementById('expensesList');

  if (expenses.length === 0) {
    listEl.innerHTML = '<p class="empty-tip">暂无固定支出</p>';
    return;
  }

  listEl.innerHTML = expenses.map(e => {
    const cat = ExpenseCategory.get(e.category);
    return `
      <div class="expense-item">
        <div class="expense-icon" style="background: ${cat.color}">${cat.icon}</div>
        <div class="expense-info">
          <div class="expense-name">${e.name}</div>
          <div class="expense-category">${cat.name}</div>
        </div>
        <div class="expense-amount">${formatCurrency(e.amount)}</div>
      </div>
    `;
  }).join('');
}

// 渲染应急金
function renderEmergencyFund() {
  const section = document.getElementById('emergencySection');

  if (!emergencyFund || emergencyFund.targetAmount <= 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const progress = emergencyFund.targetAmount > 0
    ? Math.min(emergencyFund.currentBalance / emergencyFund.targetAmount, 1)
    : 0;
  const progressPercent = (progress * 100).toFixed(0);

  // 进度环 (515 是圆周长)
  const circumference = 515;
  const offset = circumference * (1 - progress);
  document.getElementById('progressCircle').style.strokeDashoffset = offset;
  document.getElementById('progressText').textContent = progressPercent + '%';

  document.getElementById('emergencyBalance').textContent = formatCurrency(emergencyFund.currentBalance);
  document.getElementById('emergencyPercent').textContent = progressPercent + '%';
  document.getElementById('emergencyTarget').textContent = formatCurrency(emergencyFund.targetAmount);
  document.getElementById('monthlyExpense').textContent = formatCurrency(emergencyFund.monthlyExpense);
  document.getElementById('targetMonths').textContent = emergencyFund.targetMonths + '个月';
}

// 导航
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      switchPage(page);
    });
  });
}

// 切换页面
function switchPage(page) {
  // 更新导航状态
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // 暂时保留首页显示
  // TODO: 实现多页面切换
  if (page !== 'home') {
    showModal(page);
  }
}

// 页面映射
const pageConfigs = {
  structure: {
    title: '结构分层',
    render: renderStructurePage
  },
  expenses: {
    title: '固定支出',
    render: renderExpensesPage
  },
  profile: {
    title: '我的',
    render: renderProfilePage
  }
};

// 显示弹窗
function showModal(page) {
  const config = pageConfigs[page];
  if (!config) return;

  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-header">
      <h2>${config.title}</h2>
      <button class="close-btn" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      ${config.render()}
    </div>
  `;

  modal.classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}

// 关闭弹窗
function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
}

// 渲染结构页面
function renderStructurePage() {
  const livingRatio = (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio) * 100;

  return `
    <form onsubmit="saveStructure(event)">
      <div class="form-group">
        <label class="form-label">税后月收入</label>
        <input type="number" class="form-input" id="inputIncome"
          value="${layerConfig.income}" placeholder="输入税后月收入">
      </div>

      <div class="form-group">
        <label class="form-label">储蓄比例: <span id="savingsDisplay">${(layerConfig.savingsRatio * 100).toFixed(0)}%</span></label>
        <input type="range" class="form-range" id="inputSavings"
          min="0" max="0.5" step="0.01" value="${layerConfig.savingsRatio}"
          oninput="updateStructureCalc()">
      </div>

      <div class="form-group">
        <label class="form-label">应急比例: <span id="emergencyDisplay">${(layerConfig.emergencyRatio * 100).toFixed(0)}%</span></label>
        <input type="range" class="form-range" id="inputEmergency"
          min="0" max="0.5" step="0.01" value="${layerConfig.emergencyRatio}"
          oninput="updateStructureCalc()">
      </div>

      <div class="calc-result">
        <div class="calc-row">
          <span>储蓄层</span>
          <span id="calcSavings">¥${formatCurrency(layerConfig.income * layerConfig.savingsRatio)}</span>
        </div>
        <div class="calc-row">
          <span>应急层</span>
          <span id="calcEmergency">¥${formatCurrency(layerConfig.income * layerConfig.emergencyRatio)}</span>
        </div>
        <div class="calc-row highlight">
          <span>生活层</span>
          <span id="calcLiving">¥${formatCurrency(layerConfig.income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio))}</span>
        </div>
        <div class="calc-row living-percent">
          <span>生活层比例</span>
          <span id="livingDisplay">${livingRatio.toFixed(0)}%</span>
        </div>
      </div>

      <button type="submit" class="btn-primary btn-full">保存</button>
    </form>
  `;
}

// 更新计算
function updateStructureCalc() {
  const income = parseFloat(document.getElementById('inputIncome').value) || 0;
  const savingsRatio = parseFloat(document.getElementById('inputSavings').value);
  const emergencyRatio = parseFloat(document.getElementById('inputEmergency').value);
  const livingRatio = 1 - savingsRatio - emergencyRatio;

  document.getElementById('savingsDisplay').textContent = (savingsRatio * 100).toFixed(0) + '%';
  document.getElementById('emergencyDisplay').textContent = (emergencyRatio * 100).toFixed(0) + '%';
  document.getElementById('livingDisplay').textContent = (livingRatio * 100).toFixed(0) + '%';

  document.getElementById('calcSavings').textContent = '¥' + formatCurrency(income * savingsRatio);
  document.getElementById('calcEmergency').textContent = '¥' + formatCurrency(income * emergencyRatio);
  document.getElementById('calcLiving').textContent = '¥' + formatCurrency(income * livingRatio);
}

// 保存结构
function saveStructure(e) {
  e.preventDefault();

  const income = parseFloat(document.getElementById('inputIncome').value) || 0;
  const savingsRatio = parseFloat(document.getElementById('inputSavings').value);
  const emergencyRatio = parseFloat(document.getElementById('inputEmergency').value);

  StorageService.setIncome(income);
  StorageService.setSavingsRatio(savingsRatio);
  StorageService.setEmergencyRatio(emergencyRatio);

  layerConfig = { income, savingsRatio, emergencyRatio };

  closeModal();
  render();
  showToast('保存成功');
}

// 渲染支出页面
function renderExpensesPage() {
  const expenses = StorageService.getCurrentMonthExpenses();

  return `
    <form onsubmit="addExpense(event)">
      <div class="form-group">
        <label class="form-label">支出名称</label>
        <input type="text" class="form-input" id="expenseName" placeholder="如：房租" required>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">金额</label>
          <input type="number" class="form-input" id="expenseAmount" placeholder="金额" required>
        </div>
        <div class="form-group">
          <label class="form-label">分类</label>
          <select class="form-input" id="expenseCategory">
            ${ExpenseCategory.categories.map(c =>
              `<option value="${c.id}">${c.icon} ${c.name}</option>`
            ).join('')}
          </select>
        </div>
      </div>

      <button type="submit" class="btn-primary btn-full">添加</button>
    </form>

    <div class="expenses-list" style="margin-top: 20px; border-top: 1px solid var(--border); padding-top: 16px;">
      <h4 style="font-size: 14px; color: var(--secondary); margin-bottom: 12px;">本月支出</h4>
      ${expenses.length === 0
        ? '<p class="empty-tip">暂无支出</p>'
        : expenses.map(e => {
            const cat = ExpenseCategory.get(e.category);
            return `
              <div class="expense-item">
                <div class="expense-icon" style="background: ${cat.color}">${cat.icon}</div>
                <div class="expense-info">
                  <div class="expense-name">${e.name}</div>
                  <div class="expense-category">${cat.name}</div>
                </div>
                <span style="color: var(--secondary); font-size: 13px;">${formatCurrency(e.amount)}</span>
                <button onclick="deleteExpense('${e.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; margin-left: 8px;">×</button>
              </div>
            `;
          }).join('')
      }
    </div>
  `;
}

// 添加支出
function addExpense(e) {
  e.preventDefault();

  const name = document.getElementById('expenseName').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;

  if (!name || !amount) return;

  const expense = {
    id: generateId(),
    name,
    amount,
    category,
    isFixed: true,
    month: getCurrentMonth()
  };

  StorageService.addExpense(expense);

  // 重置表单
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';

  // 刷新
  const modalContent = document.getElementById('modalContent');
  const body = modalContent.querySelector('.modal-body');
  body.innerHTML = renderExpensesPage() + `
    <div class="expenses-list" style="margin-top: 20px; border-top: 1px solid var(--border); padding-top: 16px;">
      <h4 style="font-size: 14px; color: var(--secondary); margin-bottom: 12px;">本月支出</h4>
      ${StorageService.getCurrentMonthExpenses().map(e => {
        const cat = ExpenseCategory.get(e.category);
        return `
          <div class="expense-item">
            <div class="expense-icon" style="background: ${cat.color}">${cat.icon}</div>
            <div class="expense-info">
              <div class="expense-name">${e.name}</div>
              <div class="expense-category">${cat.name}</div>
            </div>
            <span style="color: var(--secondary); font-size: 13px;">${formatCurrency(e.amount)}</span>
            <button onclick="deleteExpense('${e.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; margin-left: 8px;">×</button>
          </div>
        `;
      }).join('')}
    </div>
  `;

  render();
  showToast('添加成功');
}

// 删除支出
function deleteExpense(id) {
  StorageService.deleteExpense(id);

  const modalContent = document.getElementById('modalContent');
  const body = modalContent.querySelector('.modal-body');
  const expenses = StorageService.getCurrentMonthExpenses();

  body.querySelector('.expenses-list').innerHTML = `
    <h4 style="font-size: 14px; color: var(--secondary); margin-bottom: 12px;">本月支出</h4>
    ${expenses.length === 0
      ? '<p class="empty-tip">暂无支出</p>'
      : expenses.map(e => {
          const cat = ExpenseCategory.get(e.category);
          return `
            <div class="expense-item">
              <div class="expense-icon" style="background: ${cat.color}">${cat.icon}</div>
              <div class="expense-info">
                <div class="expense-name">${e.name}</div>
                <div class="expense-category">${cat.name}</div>
              </div>
              <span style="color: var(--secondary); font-size: 13px;">${formatCurrency(e.amount)}</span>
              <button onclick="deleteExpense('${e.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; margin-left: 8px;">×</button>
            </div>
          `;
        }).join('')
    }
  `;

  render();
  showToast('已删除');
}

// 渲染个人页面
function renderProfilePage() {
  return `
    <div class="profile-list">
      <div class="profile-item" onclick="exportData()">
        <span>导出数据</span>
        <span class="arrow">→</span>
      </div>
      <div class="profile-item" onclick="importData()">
        <span>导入数据</span>
        <span class="arrow">→</span>
      </div>
      <div class="profile-item" onclick="clearData()">
        <span style="color: var(--danger);">清除数据</span>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: var(--gray-light); border-radius: 12px;">
      <h4 style="font-size: 14px; margin-bottom: 8px;">使用指南</h4>
      <p style="font-size: 13px; color: var(--secondary); line-height: 1.8;">
        1. 在「结构」页面设置月收入和分层比例<br>
        2. 在「支出」页面添加每月固定支出<br>
        3. 首页会自动计算结构是否稳定
      </p>
    </div>
  `;
}

// 导出数据
function exportData() {
  const data = StorageService.exportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `money-structure-${getCurrentMonth()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出');
}

// 导入数据（需要文件输入）
function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        StorageService.importData(data);
        loadData();
        render();
        closeModal();
        showToast('导入成功');
      } catch (err) {
        showToast('导入失败');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// 清除数据
function clearData() {
  if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
    localStorage.clear();
    loadData();
    render();
    closeModal();
    showToast('数据已清除');
  }
}

// Toast 提示
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// 全局暴露
window.navigateTo = function(page) {
  showModal(page);
};
