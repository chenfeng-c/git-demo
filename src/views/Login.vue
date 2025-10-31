<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>{{ companyInfo.name }}</h1>
        <p>用户登录</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            placeholder="请输入用户名"
            required
            autocomplete="username"
          />
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            required
            autocomplete="current-password"
          />
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="action-buttons">
          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
          <router-link to="/register" class="register-btn">注册</router-link>
        </div>
      </form>
      
      <div class="login-tips">
        <p class="tips-title">测试账号：</p>
        <ul>
          <li>管理员：<strong>admin</strong> / <strong>admin123</strong></li>
          <li>普通用户：<strong>user</strong> / <strong>user123</strong></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { companyInfo } from '../utils/data'
import { login as authLogin } from '../store/auth'
import '../assets/css/login.css'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')
    
    const formData = reactive({
      username: '',
      password: ''
    })
    
    const handleLogin = async () => {
      errorMessage.value = ''
      isLoading.value = true
      
      try {
        const result = await authLogin(formData.username, formData.password)
        
        if (result.success) {
          // 登录成功，重定向到首页或之前访问的页面
          const redirect = router.currentRoute.value.query.redirect || '/'
          router.push(redirect)
        } else {
          errorMessage.value = result.message
        }
      } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = '登录失败，请稍后重试'
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      companyInfo,
      formData,
      isLoading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
</style>

