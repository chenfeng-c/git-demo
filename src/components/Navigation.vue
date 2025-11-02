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
import { safeTranslate } from '../utils/i18n-helper'

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
        label: safeTranslate(item.labelKey, currentLocale)
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
        label: safeTranslate(meta.labelKey, currentLocale)
      }))
    })

    // currentLocale 现在是一个可读写的 computed
    const currentLocale = currentLocaleRef

    const languageLabel = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return safeTranslate('language.label', currentLocale)
    })

    const loginLabel = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const currentLocale = localeRef.value
      return safeTranslate('auth.login.submit', currentLocale)
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


