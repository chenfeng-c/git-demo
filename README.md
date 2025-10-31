# 创新科技有限公司 - Vue 3 项目

## 项目简介

这是一个基于 Vue 3 + Vite + Vue Router 构建的企业官网项目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router 4** - Vue.js 官方路由管理器
- **Composition API** - Vue 3 组合式 API

## 项目结构

```
git-demo/
├── src/
│   ├── assets/          # 静态资源
│   │   └── css/        # 样式文件
│   ├── components/      # 组件
│   │   └── Navigation.vue
│   ├── router/          # 路由配置
│   │   └── index.js
│   ├── utils/           # 工具函数和数据
│   │   └── data.js
│   ├── views/           # 页面组件
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Jobs.vue
│   │   ├── Events.vue
│   │   └── Team.vue
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json         # 项目配置
```

## 安装依赖

```bash
npm install
```

## 开发

```bash
npm run dev
```

访问 http://localhost:3000

## 构建

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 页面说明

- `/` - 首页信息
- `/about` - 公司简介
- `/jobs` - 招聘信息
- `/events` - 策划活动
- `/team` - 师资力量

