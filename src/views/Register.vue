<template>
  <div class="register-container">
    <el-card class="register-card" shadow="hover">
      <template #header>
        <div class="register-header">
          <h1>{{ companyInfo.name }}</h1>
          <p>用户注册</p>
        </div>
      </template>
      
      <el-form :model="formData" label-width="100px" @submit.prevent="handleRegister">
        <el-form-item label="用户名" required :error="errors.username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名（3-20个字符）"
            clearable
            maxlength="20"
            autocomplete="username"
            @blur="validateUsername"
          />
        </el-form-item>
        
        <el-form-item label="邮箱" required :error="errors.email">
          <el-input
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱地址"
            clearable
            autocomplete="email"
            @blur="validateEmail"
          />
        </el-form-item>
        
        <el-form-item label="姓名" required :error="errors.name">
          <el-input
            v-model="formData.name"
            placeholder="请输入您的姓名"
            clearable
            maxlength="50"
            @blur="validateName"
          />
        </el-form-item>
        
        <el-form-item label="密码" required :error="errors.password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码（至少6个字符）"
            show-password
            clearable
            minlength="6"
            autocomplete="new-password"
            @blur="validatePassword"
          />
        </el-form-item>
        
        <el-form-item label="确认密码" required :error="errors.confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            clearable
            autocomplete="new-password"
            @blur="validateConfirmPassword"
          />
        </el-form-item>
        
        <el-alert
          v-if="errorMessage"
          :title="errorMessage"
          type="error"
          :closable="false"
          style="margin-bottom: 20px;"
        />
        
        <el-alert
          v-if="successMessage"
          :title="successMessage"
          type="success"
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
            {{ isLoading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-footer">
        <p>已有账号？ <el-link type="primary" @click="$router.push('/login')">立即登录</el-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { companyInfo } from '../utils/data'
import { register } from '../api/index'
import { login } from '../store/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    
    const formData = reactive({
      username: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    })
    
    const errors = reactive({
      username: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    })
    
    // 验证用户名
    const validateUsername = () => {
      if (!formData.username) {
        errors.username = '请输入用户名'
      } else if (formData.username.length < 3) {
        errors.username = '用户名至少需要3个字符'
      } else if (formData.username.length > 20) {
        errors.username = '用户名不能超过20个字符'
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        errors.username = '用户名只能包含字母、数字和下划线'
      } else {
        errors.username = ''
      }
    }
    
    // 验证邮箱
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        errors.email = '请输入邮箱'
      } else if (!emailRegex.test(formData.email)) {
        errors.email = '请输入有效的邮箱地址'
      } else {
        errors.email = ''
      }
    }
    
    // 验证姓名
    const validateName = () => {
      if (!formData.name) {
        errors.name = '请输入姓名'
      } else if (formData.name.length > 50) {
        errors.name = '姓名不能超过50个字符'
      } else {
        errors.name = ''
      }
    }
    
    // 验证密码
    const validatePassword = () => {
      if (!formData.password) {
        errors.password = '请输入密码'
      } else if (formData.password.length < 6) {
        errors.password = '密码至少需要6个字符'
      } else {
        errors.password = ''
      }
      // 如果已填写确认密码，重新验证确认密码
      if (formData.confirmPassword) {
        validateConfirmPassword()
      }
    }
    
    // 验证确认密码
    const validateConfirmPassword = () => {
      if (!formData.confirmPassword) {
        errors.confirmPassword = '请再次输入密码'
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '两次输入的密码不一致'
      } else {
        errors.confirmPassword = ''
      }
    }
    
    // 验证所有字段
    const validateAll = () => {
      validateUsername()
      validateEmail()
      validateName()
      validatePassword()
      validateConfirmPassword()
      
      return !Object.values(errors).some(error => error !== '')
    }
    
    const handleRegister = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      // 验证所有字段
      if (!validateAll()) {
        errorMessage.value = '请修正表单中的错误'
        return
      }
      
      isLoading.value = true
      
      try {
        const response = await register({
          username: formData.username,
          email: formData.email,
          name: formData.name,
          password: formData.password
        })
        
        if (response.success) {
          successMessage.value = response.message
          
          // 注册成功后自动登录
          setTimeout(async () => {
            const loginResult = await login(formData.username, formData.password)
            if (loginResult.success) {
              router.push('/')
            } else {
              router.push('/login')
            }
          }, 1500)
        } else {
          errorMessage.value = response.message
        }
      } catch (error) {
        console.error('Register error:', error)
        errorMessage.value = '注册失败，请稍后重试'
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      companyInfo,
      formData,
      errors,
      isLoading,
      errorMessage,
      successMessage,
      validateUsername,
      validateEmail,
      validateName,
      validatePassword,
      validateConfirmPassword,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
    padding: 20px;
}

.register-card {
    width: 100%;
    max-width: 480px;
}

.register-header {
    text-align: center;
}

.register-header h1 {
    color: #1a365d;
    font-size: 2em;
    margin-bottom: 10px;
    font-weight: 600;
}

.register-header p {
    color: #718096;
    font-size: 1.1em;
    margin: 0;
}

.register-footer {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}

.register-footer p {
    color: #718096;
    font-size: 0.95em;
    margin: 0;
}

.field-error {
    color: #f56c6c;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}
</style>

