// 全局暴露所有需要的方法
window.switchPage = function(page) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page !== 'home') {
    showModal(page);
  }
};

window.closeModal = function() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
};

window.navigateTo = function(page) {
  showModal(page);
};

window.saveStructure = function(e) {
  if (e) e.preventDefault();

  const income = parseFloat(document.getElementById('inputIncome')?.value) || 0;
  const savingsRatio = parseFloat(document.getElementById('inputSavings')?.value) || 0;
  const emergencyRatio = parseFloat(document.getElementById('inputEmergency')?.value) || 0;
  const totalRatio = savingsRatio + emergencyRatio;

  if (income < 0) {
    showToast('收入不能为负数！', 'warning');
    return;
  }
  if (totalRatio > 1) {
    showToast(`比例合计 ${(totalRatio * 100).toFixed(0)}% 超过100%`, 'warning');
    return;
  }

  StorageService.setIncome(income);
  StorageService.setSavingsRatio(savingsRatio);
  StorageService.setEmergencyRatio(emergencyRatio);

  layerConfig = { income, savingsRatio, emergencyRatio };

  closeModal();
  render();

  if (income > 0) {
    showResultPopup();
  } else {
    showToast('保存成功');
  }
};

window.applyPreset = function(savings, emergency) {
  const inputSavings = document.getElementById('inputSavings');
  const inputEmergency = document.getElementById('inputEmergency');
  if (inputSavings && inputEmergency) {
    inputSavings.value = savings;
    inputEmergency.value = emergency;
    window.updateStructureCalc();
    const types = { 0.3: '保守型', 0.2: '平衡型', 0.15: '进取型', 0.05: '月光型' };
    showToast(`已应用${types[savings] || '自定义'}配置`);
  }
};

window.updateStructureCalc = function() {
  const income = parseFloat(document.getElementById('inputIncome')?.value) || 0;
  const savingsRatio = parseFloat(document.getElementById('inputSavings')?.value) || 0;
  const emergencyRatio = parseFloat(document.getElementById('inputEmergency')?.value) || 0;
  const livingRatio = 1 - savingsRatio - emergencyRatio;

  const savingsDisplay = document.getElementById('savingsDisplay');
  const emergencyDisplay = document.getElementById('emergencyDisplay');
  const livingDisplay = document.getElementById('livingDisplay');
  const calcSavings = document.getElementById('calcSavings');
  const calcEmergency = document.getElementById('calcEmergency');
  const calcLiving = document.getElementById('calcLiving');

  if (savingsDisplay) savingsDisplay.textContent = (savingsRatio * 100).toFixed(0) + '%';
  if (emergencyDisplay) emergencyDisplay.textContent = (emergencyRatio * 100).toFixed(0) + '%';
  if (livingDisplay) livingDisplay.textContent = (livingRatio * 100).toFixed(0) + '%';
  if (calcSavings) calcSavings.textContent = '¥' + formatCurrency(income * savingsRatio);
  if (calcEmergency) calcEmergency.textContent = '¥' + formatCurrency(income * emergencyRatio);
  if (calcLiving) calcLiving.textContent = '¥' + formatCurrency(income * livingRatio);

  // 检查比例警告
  if (totalRatio > 0.8 && totalRatio <= 1) {
    let warningEl = document.getElementById('ratioWarning');
    if (!warningEl) {
      warningEl = document.createElement('div');
      warningEl.id = 'ratioWarning';
      warningEl.className = 'ratio-warning';
    }
    warningEl.textContent = '⚠️ 储蓄+应急比例超过80%，生活层空间紧张';
    document.querySelector('.calc-result')?.appendChild(warningEl);
  }
};

window.addExpense = function(e) {
  e.preventDefault();
  const name = document.getElementById('expenseName')?.value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount')?.value);
  const category = document.getElementById('expenseCategory')?.value;

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

  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';

  const modalContent = document.getElementById('modalContent');
  if (modalContent) {
    const body = modalContent.querySelector('.modal-body');
    if (body) {
      body.innerHTML = renderExpensesPage();
    }
  }

  render();
  showToast('添加成功');
};

window.deleteExpense = function(id) {
  StorageService.deleteExpense(id);

  const modalContent = document.getElementById('modalContent');
  if (modalContent) {
    const body = modalContent.querySelector('.modal-body');
    const expenses = StorageService.getCurrentMonthExpenses();
    const listEl = body?.querySelector('.expenses-list');
    if (listEl) {
      listEl.innerHTML = expenses.length === 0
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
          }).join('');
    }
  }

  render();
  showToast('已删除');
};

window.exportData = function() {
  const data = StorageService.exportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `money-structure-${getCurrentMonth()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出');
};

window.importData = function() {
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
};

window.clearData = function() {
  if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
    localStorage.clear();
    loadData();
    render();
    closeModal();
    showToast('数据已清除');
  }
};

window.showResultPopup = showResultPopup;
