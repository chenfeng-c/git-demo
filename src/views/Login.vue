<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="login-header">
          <h1>{{ companyInfo.name }}</h1>
          <p>用户登录</p>
        </div>
      </template>
      
      <el-form :model="formData" label-width="80px" @submit.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            clearable
            autocomplete="username"
          />
        </el-form-item>
        
        <el-form-item label="密码">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
            autocomplete="current-password"
          />
        </el-form-item>
        
        <el-alert
          v-if="errorMessage"
          :title="errorMessage"
          type="error"
          :closable="false"
          style="margin-bottom: 20px;"
        />
        
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="isLoading"
            style="width: 100%;"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button style="width: 100%;" @click="$router.push('/register')">
            注册
          </el-button>
        </el-form-item>
      </el-form>
      
      <el-alert
        title="测试账号"
        type="info"
        :closable="false"
        style="margin-top: 20px;"
      >
        <div>管理员：<strong>admin</strong> / <strong>admin123</strong></div>
        <div>普通用户：<strong>user</strong> / <strong>user123</strong></div>
      </el-alert>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { companyInfo } from '../utils/data'
import { login as authLogin } from '../store/auth'

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
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
    padding: 20px;
}

.login-card {
    width: 100%;
    max-width: 420px;
}

.login-header {
    text-align: center;
}

.login-header h1 {
    color: #1e40af;
    font-size: 2em;
    margin-bottom: 10px;
    font-weight: 600;
}

.login-header p {
    color: #718096;
    font-size: 1.1em;
    margin: 0;
}
</style>

