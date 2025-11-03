<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="login-header">
          <h1>{{ companyName }}</h1>
          <p>{{ translations.title }}</p>
        </div>
      </template>

      <div class="role-switch">
        <el-radio-group v-model="selectedEntry" size="large">
          <el-radio-button
            v-for="entry in loginEntries"
            :key="entry.id"
            :value="entry.id"
          >
            <span class="role-icon">{{ entry.icon }}</span>
            <span class="role-text">{{ entry.label }}</span>
          </el-radio-button>
        </el-radio-group>
        <p class="role-description">{{ activeEntry ? activeEntry.description : '' }}</p>
      </div>

      <el-form
        :model="formData"
        :label-width="formLabelWidth"
        :label-position="formLabelPosition"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item :label="translations.usernameLabel">
          <el-input
            v-model="formData.username"
            :placeholder="translations.usernamePlaceholder"
            clearable
            autocomplete="username"
          />
        </el-form-item>
        
        <el-form-item :label="translations.passwordLabel">
          <el-input
            v-model="formData.password"
            type="password"
            :placeholder="translations.passwordPlaceholder"
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
        
        <el-form-item class="action-row" label-width="0">
          <div class="action-buttons">
            <el-button
              type="primary"
              native-type="submit"
              :loading="isLoading"
              size="small"
              class="action-button"
            >
              {{ isLoading ? translations.loading : translations.submit }}
            </el-button>
            <el-button
              native-type="button"
              size="small"
              class="action-button"
              @click="$router.push('/register')"
            >
              {{ translations.register }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      
      <el-alert
        :title="translations.testAccounts"
        type="info"
        :closable="false"
        style="margin-top: 20px;"
      >
        <div>{{ translations.adminAccount }}：<strong>admin</strong> / <strong>admin123</strong></div>
        <div>{{ translations.userAccount }}：<strong>user</strong> / <strong>user123</strong></div>
      </el-alert>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '../i18n'
import { safeTranslate } from '../utils/i18n-helper'
import { useCompanyInfo } from '../utils/data'
import { login as authLogin, user as userState } from '../store/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')
    const localeRef = i18n.global.locale
    const companyInfo = useCompanyInfo()
    const companyName = computed(() => companyInfo.value?.name || '辰锋软件开发工作室')

    const isMobile = ref(false)

    const updateIsMobile = () => {
      if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth <= 640
      }
    }

    onMounted(() => {
      updateIsMobile()
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateIsMobile)
      }
    })

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateIsMobile)
      }
    })

    const formLabelPosition = computed(() => (isMobile.value ? 'top' : 'left'))
    const formLabelWidth = computed(() => (isMobile.value ? 'auto' : '80px'))
    
    const formData = reactive({
      username: '',
      password: ''
    })
    
    const baseLoginEntries = [
      {
        id: 'admin',
        labelKey: 'auth.login.adminEntry',
        descKey: 'auth.login.adminDesc',
        icon: '🛠️',
        preset: { username: 'admin' },
        role: 'admin'
      },
      {
        id: 'user',
        labelKey: 'auth.login.userEntry',
        descKey: 'auth.login.userDesc',
        icon: '👤',
        preset: { username: 'user' },
        role: 'user'
      }
    ]
    
    // 预翻译的登录入口列表
    const loginEntries = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return baseLoginEntries.map(entry => ({
        ...entry,
        label: safeTranslate(entry.labelKey, currentLocale),
        description: safeTranslate(entry.descKey, currentLocale)
      }))
    })
    
    const selectedEntry = ref('user')
    
    const activeEntry = computed(() =>
      loginEntries.value.find(entry => entry.id === selectedEntry.value) || loginEntries.value[0]
    )
 
    const translations = computed(() => {
      const locale = localeRef.value
      return {
        title: safeTranslate('auth.login.title', locale),
        usernameLabel: safeTranslate('auth.login.username', locale),
        usernamePlaceholder: safeTranslate('auth.login.usernamePlaceholder', locale),
        passwordLabel: safeTranslate('auth.login.password', locale),
        passwordPlaceholder: safeTranslate('auth.login.passwordPlaceholder', locale),
        submit: safeTranslate('auth.login.submit', locale),
        loading: safeTranslate('auth.login.loading', locale),
        register: safeTranslate('auth.login.register', locale),
        testAccounts: safeTranslate('auth.login.testAccounts', locale),
        adminAccount: safeTranslate('auth.login.adminAccount', locale),
        userAccount: safeTranslate('auth.login.userAccount', locale),
        error: safeTranslate('auth.login.error', locale),
        adminDesc: safeTranslate('auth.login.adminDesc', locale),
        userDesc: safeTranslate('auth.login.userDesc', locale)
      }
    })

    watch(
      () => selectedEntry.value,
      (value) => {
        const entry = baseLoginEntries.find(item => item.id === value)
        if (entry?.preset) {
          formData.username = entry.preset.username || ''
          formData.password = ''
        }
      },
      { immediate: true }
    )
    
    const handleLogin = async () => {
      errorMessage.value = ''
      isLoading.value = true
      
      try {
        const result = await authLogin(formData.username, formData.password)
        
        if (result.success) {
          const redirectFromQuery = router.currentRoute.value.query.redirect
          const currentUser = userState.value
          const roleRedirectMap = {
            admin: '/admin',
            user: '/'
          }
          const roleTarget = currentUser?.role ? (roleRedirectMap[currentUser.role] || '/') : '/'

          if (currentUser?.role) {
            const matchedEntry = baseLoginEntries.find(entry => entry.role === currentUser.role)
            if (matchedEntry) {
              selectedEntry.value = matchedEntry.id
            }
          }

          router.push(redirectFromQuery || roleTarget)
        } else {
          errorMessage.value = result.message
        }
      } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = translations.value.error
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      companyInfo,
      companyName,
      formData,
      isLoading,
      errorMessage,
      handleLogin,
      loginEntries,
      selectedEntry,
      activeEntry,
      translations,
      formLabelPosition,
      formLabelWidth
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


.role-switch {
    margin-bottom: 24px;
    text-align: center;
}


.role-switch :deep(.el-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    font-size: 14px;
}

.role-switch :deep(.el-radio-button) {
    border-radius: 999px !important;
    overflow: hidden;
    flex: 1 1 auto;
    min-width: 140px;
}

.role-switch :deep(.el-radio-button__inner) {
    border-radius: 999px !important;
}

.role-switch :deep(.el-radio-button:first-child .el-radio-button__inner) {
    border-top-left-radius: 999px !important;
    border-bottom-left-radius: 999px !important;
}

.role-switch :deep(.el-radio-button:last-child .el-radio-button__inner) {
    border-top-right-radius: 999px !important;
    border-bottom-right-radius: 999px !important;
}


.role-switch :deep(.el-radio-button__inner) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 18px;
    font-size: 0.95rem;
    color: #374151;
    white-space: nowrap;
    border-radius: 999px !important;
}

.role-switch :deep(.el-radio-button__inner .role-icon) {
    display: inline-flex;
    align-items: center;
}

.role-switch :deep(.el-radio-button.is-active .el-radio-button__inner) {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
}

.role-switch :deep(.el-radio-button.is-active .role-icon) {
    color: #ffffff;
}

.role-icon {
    font-size: 1.1em;
}

.role-text {
    font-weight: 600;
}

.role-description {
    margin-top: 12px;
    color: #64748b;
    font-size: 0.95em;
}

.login-form {
    max-width: 420px;
    margin: 0 auto;
}

.login-form :deep(.el-form-item) {
    width: 100%;
}

.login-form :deep(.el-form-item__label) {
    font-weight: 600;
    color: #4b5563;
}

.login-form :deep(.el-form-item__content) {
    width: 100%;
}

.login-form :deep(.el-input),
.login-form :deep(.el-input__wrapper),
.login-form :deep(.el-input__inner) {
    width: 100%;
}

.action-row {
    margin-top: 20px;
}

.action-row :deep(.el-form-item__content) {
    width: 100%;
    display: flex;
    justify-content: center;
}

.action-buttons {
    width: 100%;
    max-width: 360px;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
}

.action-button {
    min-width: 120px;
}

@media (max-width: 640px) {
    .login-container {
        padding: 16px;
    }

    .login-card {
        width: 100%;
        max-width: 360px;
    }

    .login-card :deep(.el-card__body) {
        padding: 20px 16px;
    }

    .login-header h1 {
        font-size: 1.5em;
    }

    .role-switch :deep(.el-radio-button) {
        min-width: 120px;
    }

    .action-buttons {
        flex-direction: column;
        gap: 12px;
    }

    .action-button {
        width: 100%;
    }
}
</style>

