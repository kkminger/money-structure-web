// LocalStorage 存储服务
const StorageService = {
  KEY_INCOME: 'money_income',
  KEY_SAVINGS_RATIO: 'money_savings_ratio',
  KEY_EMERGENCY_RATIO: 'money_emergency_ratio',
  KEY_EXPENSES: 'money_expenses',
  KEY_EMERGENCY_FUND: 'money_emergency_fund',

  // 获取收入
  getIncome() {
    return parseFloat(localStorage.getItem(this.KEY_INCOME)) || 0;
  },

  // 设置收入
  setIncome(value) {
    localStorage.setItem(this.KEY_INCOME, value.toString());
  },

  // 获取储蓄比例
  getSavingsRatio() {
    return parseFloat(localStorage.getItem(this.KEY_SAVINGS_RATIO)) || 0.2;
  },

  // 设置储蓄比例
  setSavingsRatio(value) {
    localStorage.setItem(this.KEY_SAVINGS_RATIO, value.toString());
  },

  // 获取应急比例
  getEmergencyRatio() {
    return parseFloat(localStorage.getItem(this.KEY_EMERGENCY_RATIO)) || 0.15;
  },

  // 设置应急比例
  setEmergencyRatio(value) {
    localStorage.setItem(this.KEY_EMERGENCY_RATIO, value.toString());
  },

  // 获取所有支出
  getExpenses() {
    const data = localStorage.getItem(this.KEY_EXPENSES);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // 保存支出
  saveExpenses(expenses) {
    localStorage.setItem(this.KEY_EXPENSES, JSON.stringify(expenses));
  },

  // 获取当前月份的支出
  getCurrentMonthExpenses() {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return this.getExpenses().filter(e => e.month === monthKey);
  },

  // 添加支出
  addExpense(expense) {
    const expenses = this.getExpenses();
    expenses.push(expense);
    this.saveExpenses(expenses);
  },

  // 更新支出
  updateExpense(id, updates) {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates };
      this.saveExpenses(expenses);
    }
  },

  // 删除支出
  deleteExpense(id) {
    const expenses = this.getExpenses().filter(e => e.id !== id);
    this.saveExpenses(expenses);
  },

  // 获取应急金配置
  getEmergencyFund() {
    const data = localStorage.getItem(this.KEY_EMERGENCY_FUND);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  // 设置应急金配置
  setEmergencyFund(fund) {
    localStorage.setItem(this.KEY_EMERGENCY_FUND, JSON.stringify(fund));
  },

  // 导出数据
  exportData() {
    return {
      income: this.getIncome(),
      savingsRatio: this.getSavingsRatio(),
      emergencyRatio: this.getEmergencyRatio(),
      expenses: this.getExpenses(),
      emergencyFund: this.getEmergencyFund(),
      exportDate: new Date().toISOString()
    };
  },

  // 导入数据
  importData(data) {
    if (data.income !== undefined) this.setIncome(data.income);
    if (data.savingsRatio !== undefined) this.setSavingsRatio(data.savingsRatio);
    if (data.emergencyRatio !== undefined) this.setEmergencyRatio(data.emergencyRatio);
    if (Array.isArray(data.expenses)) this.saveExpenses(data.expenses);
    if (data.emergencyFund) this.setEmergencyFund(data.emergencyFund);
  }
};

// 支出分类
const ExpenseCategory = {
  categories: [
    { id: 'housing', name: '住房', icon: '🏠', color: '#FFE4E4' },
    { id: 'utility', name: '能源', icon: '⚡', color: '#FFF3E0' },
    { id: 'communication', name: '通讯', icon: '📱', color: '#E3F2FD' },
    { id: 'health', name: '健康', icon: '💪', color: '#E8F5E9' },
    { id: 'subscription', name: '订阅', icon: '📦', color: '#F3E5F5' },
    { id: 'insurance', name: '保险', icon: '🛡', color: '#E0F7FA' },
    { id: 'transport', name: '交通', icon: '🚗', color: '#FFF8E1' },
    { id: 'other', name: '其他', icon: '📋', color: '#F5F5F5' }
  ],

  get(id) {
    return this.categories.find(c => c.id === id) || this.categories[this.categories.length - 1];
  }
};

// 工具函数
function formatCurrency(amount) {
  return '¥' + amount.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
