# 金钱结构 - 网页版

帮普通上班族把钱分好位置，而不是靠意志力存钱。

## 运行方式

直接用浏览器打开 `index.html` 即可：

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# 或直接双击文件
```

或者用本地服务器：

```bash
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## 功能

- ✅ 首页状态卡片（结构稳定性）
- ✅ 收入分层设置（储蓄层/应急层/生活层）
- ✅ 固定支出管理
- ✅ 应急金进度追踪
- ✅ 数据本地存储
- ✅ 数据导出/导入
- ✅ 响应式设计（适配手机/桌面）

## 技术栈

- 纯原生 HTML/CSS/JavaScript
- LocalStorage 本地存储
- 无需后端，离线可用

## 项目结构

```
money_structure_web/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式
└── js/
    ├── storage.js      # 存储服务
    └── app.js          # 主程序
```
