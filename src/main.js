import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { initAuth } from './store/auth'
import './assets/css/main.css'
import './assets/css/navigation.css'

// 初始化应用
async function initApp() {
  // 初始化认证状态（异步）
  await initAuth()
  
  const app = createApp(App)
  
  app.use(router)
  
  app.mount('#app')
}

// 启动应用
initApp()

