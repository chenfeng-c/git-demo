<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>{{ companyInfo.name }}</h1>
        <p>用户注册</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="username">用户名 <span class="required">*</span></label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            placeholder="请输入用户名（3-20个字符）"
            required
            minlength="3"
            maxlength="20"
            autocomplete="username"
            :class="{ error: errors.username }"
            @blur="validateUsername"
          />
          <span v-if="errors.username" class="field-error">{{ errors.username }}</span>
        </div>
        
        <div class="form-group">
          <label for="email">邮箱 <span class="required">*</span></label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
            autocomplete="email"
            :class="{ error: errors.email }"
            @blur="validateEmail"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="name">姓名 <span class="required">*</span></label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="请输入您的姓名"
            required
            maxlength="50"
            :class="{ error: errors.name }"
            @blur="validateName"
          />
          <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">密码 <span class="required">*</span></label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码（至少6个字符）"
            required
            minlength="6"
            autocomplete="new-password"
            :class="{ error: errors.password }"
            @blur="validatePassword"
          />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码 <span class="required">*</span></label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
            autocomplete="new-password"
            :class="{ error: errors.confirmPassword }"
            @blur="validateConfirmPassword"
          />
          <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <button type="submit" class="register-btn" :disabled="isLoading">
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
      </form>
      
      <div class="register-footer">
        <p>已有账号？ <router-link to="/login" class="login-link">立即登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { companyInfo } from '../utils/data'
import { register } from '../api/index'
import { login } from '../store/auth'
import '../assets/css/register.css'

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
</style>

