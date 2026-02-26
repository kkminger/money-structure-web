// 金钱结构 - 网页版主程序

// 状态类型
const StatusType = {
  NONE: 'none',
  GOOD: 'good',
  WARNING: 'warning',
  ALERT: 'alert'
};

// ═══════════════════════════════════════════════════════════════════
// 🎭 夸夸/嘲讽系统 - 根据结构评分显示不同风格的反馈
// ═══════════════════════════════════════════════════════════════════

const PraiseMessages = {
  // 🎉 超棒结构（90分以上）
  excellent: [
    "哇！你的金钱结构堪称艺术品！",
    "这就是传说中的财务自由苗子吧！",
    "太优秀了！你的钱都在该在的位置",
    "财政部长看了都点赞 👍",
    "你的钱包正在快乐地跳舞 💰",
    "这结构稳如泰山，安全感拉满！",
    "兄弟姐妹向你学习！",
    "你已经超越了90%的同龄人！",
    "继续保持，你就是理财大师！",
    "这不仅是结构，这是艺术 🎨"
  ],
  // ✨ 良好结构（70-90分）
  good: [
    "不错不错，继续保持！",
    "你的财务状况很健康 👍",
    "执行力不错嘛！",
    "这就是稳健型选手的魅力",
    "你的钱都在认真工作",
    "基础打得好，未来可期！",
    "比很多人强了，继续加油",
    "稳扎稳打，赞！",
    "你的自律正在给你回报",
    "状态不错，保持住！"
  ]
};

const MockeryMessages = {
  // 🔴 危险结构（<40分）
  danger: [
    "呃...这个结构有点一言难尽啊 🤨",
    "你的钱可能在集体离家出走",
    "储蓄层：存在过的痕迹 🏃‍💨",
    "应急层？不存在的东西 🤔",
    "你这是在上演《流浪钱包》吗？",
    "钱：拜拜，我去别的地方住了",
    "建议重开，这不是演习",
    "月光族看了都直呼内行 🌙",
    "你的钱包正在经历 Existential Crisis",
    "储蓄是什么？能吃吗？🍽️"
  ],
  // 🟡 预警结构（40-60分）
  warning: [
    "em...勉强度日？",
    "应急层正在疯狂试探边缘",
    "你的财务正在悬崖边上跳舞",
    "建议打开监控看看钱还剩多少",
    "这结构让人有点慌啊 😰",
    "是不是该认真考虑一下了？",
    "生活层正在被挤压变形",
    "别等到弹尽粮绝才后悔",
    "你的钱在喊救命，你听到了吗？",
    "是时候做出改变了，朋友"
  ]
};

// 毒鸡汤语录（每日随机）
const MotivationQuotes = {
  positive: [
    "攒钱不是目的，自由才是。",
    "今天省下的每一分钱，都是未来选择的权力。",
    "你的钱正在默默为你工作。",
    "理财就是理生活。",
    "小积累，大变化。",
    "每一笔储蓄都是给未来的自己写信。",
    "复利是世界第八大奇迹。",
    "你现在省下的钱，正在和时间做朋友。",
    "财务健康是最性感的气质。",
    "存钱是一场对耐心的考验。"
  ],
  reality: [
    "不是工资低，是存得太少。",
    "借口太多，钱包太瘪。",
    "省钱不是抠门，是给未来留余地。",
    "你现在的消费观，决定五年后的生活。",
    "账户余额不会说谎。",
    "钱不是大风刮来的，但跟风花钱会让它飞走。",
    "每个月的钱，都花在了值得的地方吗？",
    "财务自由从记账开始。",
    "别让今天的精致，变成明天的焦虑。",
    "年轻人，你的储蓄率及格了吗？"
  ]
};

// ═══════════════════════════════════════════════════════════════════
// 🎉 彩蛋配置
// ═══════════════════════════════════════════════════════════════════

const EasterEggs = {
  // 点击版本号触发的彩蛋
  versionClick: {
    "0.1.0": ["🚀 发射！", "💫 正在穿越虫洞...", "🌌 到达新宇宙！"],
    "0.2.0": ["🎨 艺术认证", "你的审美已经next level", "✨ 闪闪发光"],
    default: ["🎉 恭喜你发现了彩蛋！", "无聊的时候可以点点看", "其实也没什么特别的功能 😅"]
  },
  
  // 连续打卡天数彩蛋
  streakRewards: {
    3: "🔥 3天打卡！你正在形成好习惯",
    7: "🎯 一周达成！习惯正在生根",
    14: "💪 两周了！你的意志力惊到我了",
    30: "🏆 月度达人！这不是运气，是坚持",
    100: "👑 封神之路！100天，你太恐怖了"
  },
  
  // 储蓄里程碑
  savingsMilestones: [
    { amount: 10000, message: "🎉 万圆户诞生！", color: "#22C55E" },
    { amount: 50000, message: "💰 五万块！可以买很多快乐了", color: "#F59E0B" },
    { amount: 100000, message: "🏆 六位数选手！Respect！", color: "#8B5CF6" },
    { amount: 500000, message: "👑 五十万！你已经超越了99%的人", color: "#EC4899" }
  ]
};

// 计算当前等级（基于储蓄进度）
function getSavingsLevel(currentSavings) {
  for (let i = EasterEggs.savingsMilestones.length - 1; i >= 0; i--) {
    if (currentSavings >= EasterEggs.savingsMilestones[i].amount) {
      return EasterEggs.savingsMilestones[i];
    }
  }
  return null;
}

// 获取随机语录（早中晚不同）
function getTimeBasedQuote() {
  const hour = new Date().getHours();
  const isPositive = Math.random() > 0.4; // 60%概率正能量
  let quotes = isPositive ? MotivationQuotes.positive : MotivationQuotes.reality;
  
  // 深夜时段多加一条
  if (hour >= 23 || hour < 6) {
    quotes = [...quotes, "🌙 深夜理财人，看来你真的很认真对待这件事"];
  }
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// 获取结构评价和评分
function evaluateStructure() {
  const income = layerConfig.income || 0;
  const expenses = StorageService.getCurrentMonthExpenses();
  const totalFixed = expenses.reduce((sum, e) => sum + e.amount, 0);
  const livingAmount = income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio);
  
  if (income <= 0) return { score: 0, level: 'none', msg: '请先设置收入', icon: '❓' };
  
  // 计算分数
  let score = 100;
  
  // 储蓄层得分（0-30分）
  score -= Math.max(0, (0.2 - layerConfig.savingsRatio) * 100);
  
  // 应急层得分（0-25分）
  score -= Math.max(0, (0.15 - layerConfig.emergencyRatio) * 80);
  
  // 生活空间得分（0-30分）
  const livingRatio = (livingAmount / income) * 100;
  if (livingRatio < 30) score -= 30;
  else if (livingRatio < 40) score -= 15;
  else if (livingRatio < 50) score -= 5;
  
  // 固定支出占比得分（0-15分）
  const expenseRatio = totalFixed / income;
  if (expenseRatio > 0.7) score -= 15;
  else if (expenseRatio > 0.5) score -= 8;
  
  score = Math.max(0, Math.min(100, Math.round(score)));
  
  // 确定等级和消息
  let level, messages;
  if (score >= 90) {
    level = 'excellent';
    messages = PraiseMessages.excellent;
  } else if (score >= 70) {
    level = 'good';
    messages = PraiseMessages.good;
  } else if (score >= 40) {
    level = 'warning';
    messages = MockeryMessages.warning;
  } else {
    level = 'danger';
    messages = MockeryMessages.danger;
  }
  
  return {
    score,
    level,
    msg: messages[Math.floor(Math.random() * messages.length)],
    icon: level === 'excellent' ? '🏆' : level === 'good' ? '✨' : level === 'warning' ? '⚠️' : '💀'
  };
}

// ═══════════════════════════════════════════════════════════════════
// 🎨 增强的视觉反馈
// ═══════════════════════════════════════════════════════════════════

function showResultPopup() {
  const eval = evaluateStructure();
  const card = document.getElementById('statusCard');
  
  // 添加震动效果
  if (eval.level === 'danger') {
    card.style.animation = 'shake 0.5s ease';
    setTimeout(() => card.style.animation = '', 500);
  } else if (eval.level === 'excellent') {
    card.style.animation = 'bounce 0.6s ease';
    setTimeout(() => card.style.animation = '', 600);
  }
  
  // 弹出结果弹窗
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  
  // 根据等级选择样式
  const themeClass = eval.level === 'danger' ? 'danger' : 
                     eval.level === 'warning' ? 'warning' : 
                     eval.level === 'excellent' ? 'excellent' : 'good';
  
  content.innerHTML = `
    <div class="result-popup ${themeClass}">
      <div class="result-icon">${eval.icon}</div>
      <h2 class="result-title">${eval.level === 'danger' ? '结构分析' : 
                                  eval.level === 'warning' ? '结构预警' :
                                  eval.level === 'excellent' ? '太优秀了！' : '还不错'}</h2>
      
      <div class="result-score">
        <div class="score-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" class="score-bg"/>
            <circle cx="50" cy="50" r="45" class="score-fill ${themeClass}"
              style="stroke-dashoffset: ${283 * (1 - eval.score / 100)}"/>
          </svg>
          <span class="score-text">${eval.score}</span>
        </div>
        <span class="score-label">结构健康分</span>
      </div>
      
      <p class="result-message">${eval.msg}</p>
      
      <div class="result-details">
        <div class="detail-item">
          <span class="detail-label">储蓄层</span>
          <span class="detail-value ${layerConfig.savingsRatio < 0.1 ? 'danger' : ''}">
            ${(layerConfig.savingsRatio * 100).toFixed(0)}%
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">应急层</span>
          <span class="detail-value ${layerConfig.emergencyRatio < 0.1 ? 'warning' : ''}">
            ${(layerConfig.emergencyRatio * 100).toFixed(0)}%
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">生活空间</span>
          <span class="detail-value">
            ${((1 - layerConfig.savingsRatio - layerConfig.emergencyRatio) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div class="quote-of-day">
        <span class="quote-icon">💡</span>
        <p>${getTimeBasedQuote()}</p>
      </div>
      
      <button class="btn-primary btn-full" onclick="closeModal()">
        ${eval.level === 'excellent' ? '继续保持！💪' : 
          eval.level === 'good' ? '我会更好的！🎯' : 
          '让我调整一下 🔧'}
      </button>
    </div>
  `;
  
  modal.classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  
  // 触发庆祝效果
  if (eval.level === 'excellent') {
    confettiEffect();
  }
}

// 彩蛋效果
function confettiEffect() {
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// 彩蛋检测器
function checkEasterEggs(trigger) {
  switch(trigger) {
    case 'version':
      // 版本号点击彩蛋
      const level = getSavingsLevel(StorageService.getIncome());
      const messages = level ? EasterEggs.versionClick[level] : EasterEggs.versionClick.default;
      showToast(messages[Math.floor(Math.random() * messages.length)]);
      break;
  }
}

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
  renderMonthProgress();
}

// 渲染月份进度
function renderMonthProgress() {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  const progress = (currentDay / daysInMonth) * 100;
  
  // 检查是否已存在
  let progressEl = document.getElementById('monthProgress');
  if (progressEl) {
    progressEl.querySelector('.progress-fill').style.width = progress + '%';
    progressEl.querySelector('.progress-text').innerHTML = `
      ${currentDay}日 / ${daysInMonth}日 · 还剩<span class="highlight">${daysInMonth - currentDay}天</span>
    `;
    return;
  }

  const progressHtml = `
    <div id="monthProgress" class="month-progress">
      <div class="progress-text">
        ${currentDay}日 / ${daysInMonth}日 · 还剩<span class="highlight">${daysInMonth - currentDay}天</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>
  `;

  const main = document.querySelector('.main');
  const statusCard = document.getElementById('statusCard');
  if (main && statusCard) {
    main.insertBefore(progressEl = document.createElement('div'), statusCard);
  }
}

// 渲染状态卡片（简化版，显示在首页，点击显示详情）
function renderStatusCard() {
  const income = layerConfig.income;
  const expenses = StorageService.getCurrentMonthExpenses();
  const totalFixed = expenses.reduce((sum, e) => sum + e.amount, 0);
  const livingAmount = income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio);

  let type = StatusType.NONE;
  let title = '未设置';
  let desc = '点击设置分层';

  if (income > 0) {
    if (totalFixed > livingAmount) {
      type = StatusType.ALERT;
      title = '结构预警';
      desc = '点击查看详情';
    } else if (totalFixed > livingAmount * 0.8) {
      type = StatusType.WARNING;
      title = '注意结构';
      desc = '点击查看详情';
    } else {
      type = StatusType.GOOD;
      title = '结构健康';
      desc = '点击查看评分';
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
    [StatusType.NONE]: '❓',
    [StatusType.GOOD]: '✅',
    [StatusType.WARNING]: '⚠️',
    [StatusType.ALERT]: '🔴'
  };
  icon.querySelector('.icon').textContent = iconMap[type];

  titleEl.textContent = title;
  descEl.textContent = desc;

  // 添加点击事件显示详细结果
  card.onclick = () => {
    if (income > 0) {
      showResultPopup();
    } else {
      showModal('structure');
    }
  };
  card.style.cursor = 'pointer';
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
  const livingAmount = income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio);
  const flexibleBudget = livingAmount - total; // 灵活预算
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

  // 添加本月可支配预算显示
  addBudgetIndicator(flexibleBudget, livingAmount);
}

// 添加预算指示器
function addBudgetIndicator(flexibleBudget, livingAmount) {
  let budgetEl = document.getElementById('budgetIndicator');
  if (budgetEl) budgetEl.remove();

  const percent = Math.round((flexibleBudget / livingAmount) * 100);
  const isLow = percent < 20;
  const isDanger = percent < 0;

  const budgetHtml = `
    <div id="budgetIndicator" class="budget-indicator ${isDanger ? 'danger' : isLow ? 'warning' : ''}">
      <div class="budget-info">
        <span class="budget-label">💰 本月可支配</span>
        <span class="budget-amount ${isDanger ? 'danger' : ''}">${formatCurrency(flexibleBudget)}</span>
      </div>
      <div class="budget-bar">
        <div class="budget-fill ${isDanger ? 'danger' : isLow ? 'warning' : ''}" style="width: ${Math.max(0, Math.min(100, percent))}%"></div>
      </div>
      <div class="budget-hint">
        ${isDanger ? '😱 固定支出超额，已挪用生活层！' : 
          isLow ? '⚠️ 预算紧张，注意控制消费' : 
          '还可以放心花～'}
      </div>
    </div>
  `;

  const expensesSection = document.querySelector('.section:nth-child(3) .card');
  if (expensesSection) {
    expensesSection.insertAdjacentHTML('beforeend', budgetHtml);
  }
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

  // 快捷预设
  const presets = [
    { name: '保守型', savings: 0.3, emergency: 0.2, desc: '安全第一' },
    { name: '平衡型', savings: 0.2, emergency: 0.15, desc: '稳健投资' },
    { name: '进取型', savings: 0.15, emergency: 0.1, desc: '适度消费' },
    { name: '月光型', savings: 0.05, emergency: 0.05, desc: '活在当下' }
  ];

  return `
    <div class="quick-actions">
      ${presets.map(p => `
        <div class="quick-action" onclick="applyPreset(${p.savings}, ${p.emergency})">
          <span class="icon">${p.name === '保守型' ? '🛡️' : p.name === '平衡型' ? '⚖️' : p.name === '进取型' ? '🚀' : '🎉'}</span>
          <span class="label">${p.name}</span>
        </div>
      `).join('')}
    </div>

    <form onsubmit="saveStructure(event)">
      <div class="form-group">
        <label class="form-label">💵 税后月收入</label>
        <input type="number" class="form-input" id="inputIncome"
          value="${layerConfig.income}" placeholder="输入税后月收入" style="font-size: 20px;">
      </div>

      <div class="form-group">
        <label class="form-label">🐷 储蓄比例: <span id="savingsDisplay">${(layerConfig.savingsRatio * 100).toFixed(0)}%</span></label>
        <input type="range" class="form-range" id="inputSavings"
          min="0" max="0.5" step="0.01" value="${layerConfig.savingsRatio}"
          oninput="updateStructureCalc()">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--gray); margin-top: 4px;">
          <span>0%</span>
          <span>50%</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">🛡️ 应急比例: <span id="emergencyDisplay">${(layerConfig.emergencyRatio * 100).toFixed(0)}%</span></label>
        <input type="range" class="form-range" id="inputEmergency"
          min="0" max="0.5" step="0.01" value="${layerConfig.emergencyRatio}"
          oninput="updateStructureCalc()">
      </div>

      <div class="calc-result" style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 12px; padding: 16px; margin: 20px 0;">
        <div style="display: flex; justify-content: space-around; text-align: center;">
          <div>
            <div style="font-size: 12px; color: var(--secondary);">储蓄层</div>
            <div id="calcSavings" style="font-size: 18px; font-weight: 600; color: #2D2D2D;">¥${formatCurrency(layerConfig.income * layerConfig.savingsRatio)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--secondary);">应急层</div>
            <div id="calcEmergency" style="font-size: 18px; font-weight: 600; color: #666666;">¥${formatCurrency(layerConfig.income * layerConfig.emergencyRatio)}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: var(--secondary);">生活层</div>
            <div id="calcLiving" style="font-size: 18px; font-weight: 600; color: #22C55E;">¥${formatCurrency(layerConfig.income * (1 - layerConfig.savingsRatio - layerConfig.emergencyRatio))}</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
          <span style="font-size: 13px; color: var(--secondary);">生活层占比 </span>
          <span id="livingDisplay" style="font-size: 16px; font-weight: 600; color: ${livingRatio < 30 ? '#EF4444' : '#22C55E'};">${livingRatio.toFixed(0)}%</span>
        </div>
      </div>

      <div id="structureTip" style="padding: 12px; background: ${livingRatio < 30 ? '#FFE4E4' : livingRatio < 40 ? '#FFF3E0' : '#E8F5E9'}; border-radius: 8px; margin-bottom: 16px; font-size: 14px; color: ${livingRatio < 30 ? '#DC2626' : livingRatio < 40 ? '#B45309' : '#16A34A'};">
        ${getStructureTip(livingRatio)}
      </div>

      <button type="submit" class="btn-primary btn-full" style="padding: 14px; font-size: 16px; font-weight: 600;">
        💾 保存配置
      </button>
    </form>
  `;
}

// 应用预设
function applyPreset(savings, emergency) {
  document.getElementById('inputSavings').value = savings;
  document.getElementById('inputEmergency').value = emergency;
  updateStructureCalc();
  showToast(`已应用${savings === 0.3 ? '保守型' : savings === 0.2 ? '平衡型' : savings === 0.15 ? '进取型' : '月光型'}配置`);
}

// 获取结构建议
function getStructureTip(livingRatio) {
  if (livingRatio < 20) return '⚠️ 生活空间太紧张了，建议提高储蓄层或减少固定支出！';
  if (livingRatio < 30) return '💡 生活空间偏紧，建议预留更多缓冲。';
  if (livingRatio < 40) return '👍 生活空间适中，注意控制非必要支出。';
  if (livingRatio > 60) return '🎉 资金充裕，可以考虑增加储蓄比例！';
  return '✨ 结构健康，继续保持！';
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

// 渲染个人页面（增强版）
function renderProfilePage() {
  const income = layerConfig.income || 0;
  const totalSavings = income * layerConfig.savingsRatio;
  const evalResult = evaluateStructure();
  
  // 计算统计数据
  const expenses = StorageService.getCurrentMonthExpenses();
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthsTracked = StorageService.getMonthsTracked ? StorageService.getMonthsTracked() : 1;
  
  // 成就数据
  const achievements = getAchievements();
  
  // 当前等级
  const currentLevel = getSavingsLevel(totalSavings);
  
  return `
    <div class="profile-header">
      <div class="profile-avatar">👤</div>
      <div class="profile-name">金钱结构</div>
      <div class="profile-level">
        ${currentLevel ? `Lv.${EasterEggs.savingsMilestones.findIndex(m => m.amount === currentLevel.amount) + 1} ${currentLevel.message}` : '新手玩家 🎮'}
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value" style="color: var(--primary)">${formatCurrency(income)}</span>
        <span class="stat-label">月收入</span>
      </div>
      <div class="stat-card">
        <span class="stat-value" style="color: var(--success)">${formatCurrency(totalSavings)}</span>
        <span class="stat-label">月储蓄</span>
      </div>
      <div class="stat-card">
        <span class="stat-value" style="color: var(--warning)">${monthsTracked}</span>
        <span class="stat-label">追踪月数</span>
      </div>
    </div>

    ${currentLevel ? `
    <div class="milestone-section">
      <div class="milestone-title">
        <span>🏆 储蓄里程碑</span>
      </div>
      <div class="milestone-bar">
        <div class="milestone-progress" style="width: ${getMilestoneProgress()}%"></div>
      </div>
      <div class="milestone-next">
        ${getNextMilestone()}
      </div>
    </div>
    ` : ''}

    <div class="achievements">
      ${achievements.map(a => `
        <div class="achievement ${a.unlocked ? '' : 'locked'}" title="${a.desc}">
          <div class="achievement-icon">${a.icon}</div>
          <div class="achievement-name">${a.name}</div>
        </div>
      `).join('')}
    </div>

    <div class="settings-group" style="margin-top: 32px;">
      <div class="settings-title">数据管理</div>
      <div class="settings-item" onclick="exportData()">
        <span class="item-label">📤 导出数据</span>
        <span class="item-value">备份配置</span>
      </div>
      <div class="settings-item" onclick="importData()">
        <span class="item-label">📥 导入数据</span>
        <span class="item-value">恢复配置</span>
      </div>
      <div class="settings-item" onclick="clearData()">
        <span class="item-label" style="color: var(--danger);">🗑️ 清除数据</span>
        <span class="item-value">不可恢复</span>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 12px;">
      <h4 style="font-size: 14px; margin-bottom: 12px;">💡 今日建议</h4>
      <p style="font-size: 13px; color: #92400E; line-height: 1.8;">
        ${getDailyTip()}
      </p>
    </div>

    <div style="margin-top: 16px; text-align: center; padding: 16px;">
      <span style="font-size: 12px; color: var(--gray);" onclick="checkEasterEggs('version')">
        金钱结构 v2.0.0 • 点击有彩蛋 🎁
      </span>
    </div>
  `;
}

// 获取成就列表
function getAchievements() {
  const income = layerConfig.income || 0;
  const savingsRatio = layerConfig.savingsRatio;
  const emergencyRatio = layerConfig.emergencyRatio;
  
  return [
    { id: 'first', name: '首次设置', icon: '🎯', desc: '完成首次收入设置', unlocked: income > 0 },
    { id: 'saver', name: '储蓄者', icon: '💰', desc: '储蓄比例达到20%', unlocked: savingsRatio >= 0.2 },
    { id: 'emergency', name: '未雨绸缪', icon: '🛡️', desc: '应急比例达到15%', unlocked: emergencyRatio >= 0.15 },
    { id: 'balanced', name: '平衡大师', icon: '⚖️', desc: '三层比例均衡', unlocked: savingsRatio >= 0.15 && emergencyRatio >= 0.1 && (1 - savingsRatio - emergencyRatio) >= 0.4 },
    { id: 'tracker', name: '追踪者', icon: '📊', desc: '使用超过7天', unlocked: true }, // 需要实际天数计算
    { id: 'goal', name: '达成目标', icon: '🎉', desc: '达到储蓄里程碑', unlocked: false }, // 需要计算
    { id: 'perfectionist', name: '完美主义', icon: '✨', desc: '结构分95+', unlocked: false }, // 需要计算
    { id: 'veteran', name: '老用户', icon: '🏅', desc: '使用超过30天', unlocked: false } // 需要计算
  ];
}

// 获取里程碑进度
function getMilestoneProgress() {
  const income = layerConfig.income || 0;
  const totalSavings = income * layerConfig.savingsRatio;
  
  if (totalSavings <= 0) return 0;
  
  // 找到当前等级和下一等级
  let currentIndex = -1;
  for (let i = 0; i < EasterEggs.savingsMilestones.length; i++) {
    if (totalSavings >= EasterEggs.savingsMilestones[i].amount) {
      currentIndex = i;
    }
  }
  
  if (currentIndex === EasterEggs.savingsMilestones.length - 1) return 100;
  
  const currentMilestone = EasterEggs.savingsMilestones[currentIndex];
  const nextMilestone = EasterEggs.savingsMilestones[currentIndex + 1];
  
  const range = nextMilestone.amount - currentMilestone.amount;
  const progress = totalSavings - currentMilestone.amount;
  
  return Math.min(100, (progress / range) * 100);
}

// 获取下一里程碑提示
function getNextMilestone() {
  const income = layerConfig.income || 0;
  const totalSavings = income * layerConfig.savingsRatio;
  
  if (totalSavings <= 0) return '设置储蓄目标，开始攒钱之旅！';
  
  for (const milestone of EasterEggs.savingsMilestones) {
    if (totalSavings < milestone.amount) {
      const monthsNeeded = Math.ceil((milestone.amount - totalSavings) / totalSavings);
      return `再存 ${formatCurrency(milestone.amount - totalSavings)} 达成「${milestone.message}」(${monthsNeeded}个月)`;
    }
  }
  
  return '你已经超越了99%的人！🎉';
}

// 获取每日建议
function getDailyTip() {
  const tips = [
    "记账是理财的第一步，试着记录每天的开支吧！",
    "先支付给自己，再支付给别人——发工资后先存钱，再消费。",
    "想要存钱，就让存钱变得麻烦，取钱变得容易。",
    "复利的力量需要时间显现，耐心是最大的美德。",
    "控制消费欲望，不是降低生活质量，而是更明智地消费。",
    "应急金是你的安全垫，不要轻易动用！",
    "每省下一笔钱，就是给未来的自己多一份自由。",
    "不要让「等我有更多钱」成为拖延存钱的借口。",
    "把大目标拆成小目标，更容易坚持。",
    "每月检查一次财务状况，及时调整策略。"
  ];
  
  // 基于日期选择不同建议
  const dayOfMonth = new Date().getDate();
  return tips[dayOfMonth % tips.length];
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
