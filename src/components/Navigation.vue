<template>
  <div class="chen" :class="{ 'transparent': isHomePage, 'scrolled': isScrolled }">
    <div class="nav-container">
      <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="菜单">
        {{ menuIcon }}
      </button>
      <div class="logo" @click="goToHome">
        <img :src="`${baseUrl}logo.svg`" :alt="companyName" class="logo-img" />
        <span class="logo-text">{{ companyName }}</span>
      </div>
      <nav class="desktop-nav">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link 
            :to="item.path" 
            :class="{ active: $route.name === item.name }"
            @click="handleMenuItemClick(item)">
            {{ item.label }}
          </router-link>
        </li>
      </nav>
      <div class="auth-section">
        <div class="lang-switch">
          <select v-model="currentLocale" @change="handleLocaleChange($event)">
            <option v-for="option in localeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <template v-if="user">
          <UserProfile />
        </template>
        <router-link v-else to="/login" class="login-link">{{ loginLabel }}</router-link>
      </div>
    </div>
    <nav class="mobile-nav" :class="{ active: isMenuOpen }">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link 
          :to="item.path" 
          :class="{ active: $route.name === item.name }"
          @click="handleMenuItemClick(item)">
          {{ item.label }}
        </router-link>
      </li>
      <div class="mobile-lang-switch">
        <label :for="`locale-select`">{{ languageLabel }}</label>
        <select id="locale-select" v-model="currentLocale" @change="handleLocaleChange($event)">
          <option v-for="option in localeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import i18n, { SUPPORTED_LOCALES } from '../i18n'
import { user as userState, initAuth } from '../store/auth'
import UserProfile from './UserProfile.vue'
import { useCompanyInfo } from '../utils/data'

export default {
  name: 'Navigation',
  components: {
    UserProfile
  },
  setup() {
    const isMenuOpen = ref(false)
    const route = useRoute()
    const router = useRouter()
    const isScrolled = ref(false)
    const localeRef = i18n.global.locale
    const companyInfo = useCompanyInfo()
    
    // 公司名称（响应式）
    const companyName = computed(() => {
      return companyInfo.value?.name || '辰锋软件开发工作室'
    })
    
    // 创建一个响应式的当前 locale ref，用于 v-model 绑定
    const currentLocaleRef = computed({
      get: () => {
        const val = localeRef.value
        return val
      },
      set: (value) => {
        if (SUPPORTED_LOCALES[value] && value !== localeRef.value) {
          i18n.global.locale.value = value
          localeRef.value = value
          localStorage.setItem('app-locale', value)
        }
      }
    })
    
    // 初始化认证状态
    initAuth()
    
    // 使用 computed 确保响应式
    const user = computed(() => userState.value)
    
    // 检测是否在首页
    const isHomePage = computed(() => route.name === 'Home')
    
    // 监听滚动，实现导航栏透明效果
    const handleScroll = () => {
      if (isHomePage.value) {
        isScrolled.value = window.scrollY > 50
      }
    }
    window.addEventListener('scroll', handleScroll)
    
    const baseMenu = [
      { name: 'Home', path: '/', labelKey: 'nav.home' },
      { name: 'About', path: '/about', labelKey: 'nav.about' },
      { name: 'Jobs', path: '/jobs', labelKey: 'nav.jobs' },
      { name: 'Events', path: '/events', labelKey: 'nav.events' },
      { name: 'Team', path: '/team', labelKey: 'nav.team' }
    ]

    const menuItems = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      const items = [...baseMenu]

      if (user.value?.role === 'admin') {
        items.push({ name: 'AdminDashboard', path: '/admin', labelKey: 'nav.admin' })
      }

      // 传递 currentLocale 确保在 computed 中追踪
      return items.map(item => ({
        ...item,
        label: translate(item.labelKey, currentLocale)
      }))
    })
    
    const menuIcon = computed(() => {
      return isMenuOpen.value ? '✕' : '☰'
    })
    
    const toggleMenu = (event) => {
      event.stopPropagation()
      isMenuOpen.value = !isMenuOpen.value
    }
    
    const closeMenu = () => {
      isMenuOpen.value = false
    }
    
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const handleMenuItemClick = (item) => {
      if (route.name === item.name) {
        scrollToTop()
      }
      closeMenu()
    }
    
    const handleClickOutside = (event) => {
      const navContainer = event.target.closest('.nav-container')
      const mobileNav = event.target.closest('.mobile-nav')
      const toggleBtn = event.target.closest('.mobile-menu-toggle')
      
      if (!navContainer && !mobileNav && !toggleBtn && isMenuOpen.value) {
        isMenuOpen.value = false
      }
    }
    
    const stopWatcher = watch(
      () => route.fullPath,
      () => {
      if (isMenuOpen.value) {
        isMenuOpen.value = false
        }
        requestAnimationFrame(() => scrollToTop())
      }
    )
    
    document.addEventListener('click', handleClickOutside)
    
    const changeLocale = (value) => {
      if (SUPPORTED_LOCALES[value]) {
        // 更新当前 locale ref，这会触发 computed setter
        currentLocaleRef.value = value
      }
    }

    const localeOptions = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return Object.entries(SUPPORTED_LOCALES).map(([value, meta]) => ({
        value,
        labelKey: meta.labelKey,
        label: translate(meta.labelKey, currentLocale)
      }))
    })

    // currentLocale 现在是一个可读写的 computed
    const currentLocale = currentLocaleRef

    const languageLabel = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return translate('language.label', currentLocale)
    })

    const loginLabel = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return translate('auth.login.submit', currentLocale)
    })

    const handleLocaleChange = () => {
      // v-model 已经自动更新了 currentLocale，这里只需要关闭菜单
      closeMenu()
    }

    const goToHome = () => {
      router.push('/')
      closeMenu()
    }
    
    const baseUrl = import.meta.env.BASE_URL

    // 创建一个简单的翻译查找函数，并处理 AST 格式
    const getNestedValue = (obj, path) => {
      if (!obj || typeof obj !== 'object') {
        return null
      }
      const keys = path.split('.')
      let value = obj
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return null
        }
      }
      
      // 如果值是字符串，直接返回
      if (typeof value === 'string') {
        return value
      }
      
      // 如果值是 AST 对象（vue-i18n 编译后的格式），提取字符串
      if (value && typeof value === 'object') {
        // 方法1：从 loc.source 获取（最常见）
        if (value.loc && value.loc.source) {
          return value.loc.source
        }
        // 方法2：从 body.items[0] 获取
        if (value.body && value.body.items && value.body.items.length > 0) {
          const firstItem = value.body.items[0]
          if (typeof firstItem === 'string') {
            return firstItem
          }
          // 如果 items[0] 也是对象，尝试递归
          if (firstItem && typeof firstItem === 'object' && firstItem.loc && firstItem.loc.source) {
            return firstItem.loc.source
          }
        }
      }
      
      return null
    }

    const translate = (key, localeOverride = null) => {
      // 输入验证
      if (typeof key !== 'string' || !key.trim()) {
        return String(key ?? '')
      }
      
      try {
        // 如果传入了 localeOverride，使用它；否则使用当前 localeRef.value（确保响应式追踪）
        const locale = localeOverride !== null ? localeOverride : localeRef.value
        
        // 使用 i18n 的 getLocaleMessage API，它会返回已处理的翻译对象
        let localeMessages = null
        
        // 方法1：尝试使用 getLocaleMessage（应该返回已处理的 JSON）
        try {
          localeMessages = i18n.global.getLocaleMessage(locale)
        } catch (e) {
          console.warn('[translate] getLocaleMessage failed:', e)
        }
        
        // 方法2：如果 getLocaleMessage 失败，直接从 messages 中获取
        if (!localeMessages || typeof localeMessages !== 'object') {
          const messages = i18n.global.messages
          if (messages) {
            // messages 可能是 Ref
            const msgs = messages.value || messages
            if (msgs && typeof msgs === 'object' && locale in msgs) {
              localeMessages = msgs[locale]
            }
          }
        }
        
        // 如果找到了消息对象，尝试解析（getNestedValue 已经处理了 AST 格式）
        if (localeMessages && typeof localeMessages === 'object') {
          const result = getNestedValue(localeMessages, key)
          if (result) {
            return result
          }
        }
        
        // 尝试 fallback locale
        const fallbackLocale = 'zh-CN'
        try {
          const fallbackMessages = i18n.global.getLocaleMessage(fallbackLocale)
          if (fallbackMessages && typeof fallbackMessages === 'object') {
            const result = getNestedValue(fallbackMessages, key)
            if (result) {
              return result
            }
          }
        } catch (e) {
          // fallback 也失败
        }
        
        // 都找不到，返回 key
        console.warn('[translate] Translation not found for key:', key, 'locale:', locale)
        return key
      } catch (err) {
        // 任何错误都返回 key
        console.error('[translate] Error translating key:', key, err)
        return key
      }
    }
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      stopWatcher()
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      isMenuOpen,
      menuItems,
      menuIcon,
      user,
      isHomePage,
      isScrolled,
      toggleMenu,
      closeMenu,
      handleMenuItemClick,
      translate,
      localeOptions,
      currentLocale,
      languageLabel,
      loginLabel,
      handleLocaleChange,
      goToHome,
      baseUrl,
      companyName
    }
  }
}
</script>

<style scoped>
/* 导航样式在 navigation.css 中 */
</style>


