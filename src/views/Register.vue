<template>
  <div class="register-container">
    <el-card class="register-card" shadow="hover">
      <template #header>
        <div class="register-header">
          <h1>{{ companyInfo.name }}</h1>
          <p>{{ translations.title }}</p>
        </div>
      </template>
      
      <el-form
        :model="formData"
        :label-width="formLabelWidth"
        class="register-form"
        @submit.prevent="handleRegister"
      >
        <el-form-item :label="translations.username" :error="getErrorMessage('username')" required>
          <el-input
            v-model="formData.username"
            :placeholder="translations.usernamePlaceholder"
            clearable
            maxlength="20"
            autocomplete="username"
          />
        </el-form-item>
        
        <el-form-item :label="translations.email" :error="getErrorMessage('email')" required>
          <el-input
            v-model="formData.email"
            type="email"
            :placeholder="translations.emailPlaceholder"
            clearable
            autocomplete="email"
          />
        </el-form-item>
        
        <el-form-item :label="translations.name" :error="getErrorMessage('name')" required>
          <el-input
            v-model="formData.name"
            :placeholder="translations.namePlaceholder"
            clearable
            maxlength="50"
          />
        </el-form-item>
        
        <el-form-item :label="translations.password" :error="getErrorMessage('password')" required>
          <el-input
            v-model="formData.password"
            type="password"
            :placeholder="translations.passwordPlaceholder"
            show-password
            clearable
            minlength="6"
            autocomplete="new-password"
          />
        </el-form-item>
        
        <el-form-item :label="translations.confirmPassword" :error="getErrorMessage('confirmPassword')" required>
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            :placeholder="translations.confirmPasswordPlaceholder"
            show-password
            clearable
            autocomplete="new-password"
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
        
        <el-form-item class="register-actions" label-width="0">
          <el-button
            type="primary"
            native-type="submit"
            :loading="isLoading"
            class="register-submit"
          >
            {{ isLoading ? translations.loading : translations.submit }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-footer">
        <p>{{ translations.hasAccount }} <el-link type="primary" @click="$router.push('/login')">{{ translations.loginNow }}</el-link></p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '../i18n'
import { useCompanyInfo } from '../utils/data'
import { safeTranslate } from '../utils/i18n-helper'
import { register } from '../api/index'
import { login, user as userState } from '../store/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    const localeRef = i18n.global.locale
    const companyInfo = useCompanyInfo()
    const companyName = computed(() => companyInfo.value?.name || '辰锋软件开发工作室')
    const formLabelWidth = computed(() => (localeRef.value === 'en-US' ? '140px' : '100px'))
    
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

    const setError = (field, key = '') => {
      errors[field] = key
    }

    const getErrorMessage = (field) => {
      // 在 computed 外部调用，需要读取当前 locale
      const currentLocale = localeRef.value
      return errors[field] ? safeTranslate(`auth.register.errors.${errors[field]}`, currentLocale) : ''
    }
    
    const validateUsername = () => {
      if (!formData.username) {
        setError('username', 'usernameRequired')
      } else if (formData.username.length < 3) {
        setError('username', 'usernameMin')
      } else if (formData.username.length > 20) {
        setError('username', 'usernameMax')
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        setError('username', 'usernamePattern')
      } else {
        setError('username')
      }
    }
    
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        setError('email', 'emailRequired')
      } else if (!emailRegex.test(formData.email)) {
        setError('email', 'emailInvalid')
      } else {
        setError('email')
      }
    }
    
    const validateName = () => {
      if (!formData.name) {
        setError('name', 'nameRequired')
      } else if (formData.name.length > 50) {
        setError('name', 'nameMax')
      } else {
        setError('name')
      }
    }
    
    const validatePassword = () => {
      if (!formData.password) {
        setError('password', 'passwordRequired')
      } else if (formData.password.length < 6) {
        setError('password', 'passwordMin')
      } else {
        setError('password')
      }
      if (formData.confirmPassword) {
        validateConfirmPassword()
      }
    }
    
    const validateConfirmPassword = () => {
      if (!formData.confirmPassword) {
        setError('confirmPassword', 'confirmPasswordRequired')
      } else if (formData.password !== formData.confirmPassword) {
        setError('confirmPassword', 'confirmPasswordMismatch')
      } else {
        setError('confirmPassword')
      }
    }
    
    const validateAll = () => {
      validateUsername()
      validateEmail()
      validateName()
      validatePassword()
      validateConfirmPassword()
      return !Object.values(errors).some(Boolean)
    }
    
    watch(() => formData.username, () => {
      if (errors.username) validateUsername()
    })
    watch(() => formData.email, () => {
      if (errors.email) validateEmail()
    })
    watch(() => formData.name, () => {
      if (errors.name) validateName()
    })
    watch(() => formData.password, () => {
      if (errors.password) validatePassword()
    })
    watch(() => formData.confirmPassword, () => {
      if (errors.confirmPassword) validateConfirmPassword()
    })
    watch(localeRef, () => {
      Object.keys(errors).forEach(field => {
        if (errors[field]) {
          // reassign to trigger translation update
          setError(field, errors[field])
        }
      })
    })
    
    // 预翻译所有模板中使用的文本
    const translations = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const locale = localeRef.value
      return {
        title: safeTranslate('auth.register.title', locale),
        username: safeTranslate('auth.register.username', locale),
        usernamePlaceholder: safeTranslate('auth.register.usernamePlaceholder', locale),
        email: safeTranslate('auth.register.email', locale),
        emailPlaceholder: safeTranslate('auth.register.emailPlaceholder', locale),
        name: safeTranslate('auth.register.name', locale),
        namePlaceholder: safeTranslate('auth.register.namePlaceholder', locale),
        password: safeTranslate('auth.register.password', locale),
        passwordPlaceholder: safeTranslate('auth.register.passwordPlaceholder', locale),
        confirmPassword: safeTranslate('auth.register.confirmPassword', locale),
        confirmPasswordPlaceholder: safeTranslate('auth.register.confirmPasswordPlaceholder', locale),
        submit: safeTranslate('auth.register.submit', locale),
        loading: safeTranslate('auth.register.loading', locale),
        hasAccount: safeTranslate('auth.register.hasAccount', locale),
        loginNow: safeTranslate('auth.register.loginNow', locale),
        fixForm: safeTranslate('auth.register.errors.fixForm', locale)
      }
    })
    
    const handleRegister = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      if (!validateAll()) {
        errorMessage.value = translations.value.fixForm
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
          
          setTimeout(async () => {
            const loginResult = await login(formData.username, formData.password)
            if (loginResult.success) {
              const currentUser = userState.value
              const roleRedirectMap = {
                admin: '/admin',
                user: '/'
              }
              const roleTarget = currentUser?.role ? (roleRedirectMap[currentUser.role] || '/') : '/'
              router.push(roleTarget)
            } else {
              router.push('/login')
            }
          }, 1000)
        } else {
          errorMessage.value = response.message
        }
      } catch (error) {
        console.error('Register error:', error)
        errorMessage.value = translations.value.fixForm
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      companyInfo,
      companyName,
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
      handleRegister,
      getErrorMessage,
      translations,
      formLabelWidth
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

.register-form {
    max-width: 440px;
    margin: 0 auto;
}

.register-form :deep(.el-form-item) {
    width: 100%;
}

.register-form :deep(.el-form-item__label) {
    white-space: nowrap;
}

.register-form :deep(.el-form-item__content) {
    width: 100%;
}

.register-form :deep(.el-input),
.register-form :deep(.el-input__wrapper),
.register-form :deep(.el-input__inner) {
    width: 100%;
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

.register-actions {
    margin-top: 20px;
}

.register-actions :deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
}

.register-submit {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
}
</style>

