<template>
  <div class="chen" :class="{ 'transparent': isHomePage, 'scrolled': isScrolled }">
    <div class="nav-container">
      <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="菜单">
        {{ menuIcon }}
      </button>
      <div class="logo">
        <img src="/logo.svg" alt="辰锋软件分发工作室" class="logo-img" />
        <span class="logo-text">辰锋软件分发工作室</span>
      </div>
      <nav class="desktop-nav">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link 
            :to="item.path" 
            :class="{ active: $route.name === item.name }"
            @click="closeMenu">
            {{ item.label }}
          </router-link>
        </li>
      </nav>
      <div class="auth-section">
        <template v-if="user">
          <UserProfile />
        </template>
        <router-link v-else to="/login" class="login-link">登录</router-link>
      </div>
    </div>
    <nav class="mobile-nav" :class="{ active: isMenuOpen }">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link 
          :to="item.path" 
          :class="{ active: $route.name === item.name }"
          @click="closeMenu">
          {{ item.label }}
        </router-link>
      </li>
    </nav>
  </div>
</template>

<script>
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { user as userState, initAuth } from '../store/auth'
import UserProfile from './UserProfile.vue'

export default {
  name: 'Navigation',
  components: {
    UserProfile
  },
  setup() {
    const isMenuOpen = ref(false)
    const route = useRoute()
    const isScrolled = ref(false)
    
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
    
    const menuItems = [
      { name: 'Home', path: '/', label: '首页信息' },
      { name: 'About', path: '/about', label: '公司简介' },
      { name: 'Jobs', path: '/jobs', label: '招聘信息' },
      { name: 'Events', path: '/events', label: '策划活动' },
      { name: 'Team', path: '/team', label: '师资力量' }
    ]
    
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
    
    // 点击页面其他地方关闭菜单
    const handleClickOutside = (event) => {
      const navContainer = event.target.closest('.nav-container')
      const mobileNav = event.target.closest('.mobile-nav')
      const toggleBtn = event.target.closest('.mobile-menu-toggle')
      
      // 如果点击的不是导航容器、移动菜单和切换按钮，且菜单是打开的，则关闭菜单
      if (!navContainer && !mobileNav && !toggleBtn && isMenuOpen.value) {
        isMenuOpen.value = false
      }
    }
    
    // 监听路由变化时关闭菜单
    const stopWatcher = watch(() => route.path, () => {
      if (isMenuOpen.value) {
        isMenuOpen.value = false
      }
    })
    
    document.addEventListener('click', handleClickOutside)
    
    // 组件卸载时清理
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
      closeMenu
    }
  }
}
</script>

<style scoped>
/* 导航样式在 navigation.css 中 */
</style>

