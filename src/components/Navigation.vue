<template>
  <div class="chen" :class="{ 'transparent': isHomePage, 'scrolled': isScrolled }">
    <div class="nav-container">
      <div class="logo">创新科技</div>
      <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="菜单">
        {{ menuIcon }}
      </button>
      <nav :class="{ active: isMenuOpen }">
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
  </div>
</template>

<script>
import { ref, computed } from 'vue'
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
      if (!navContainer && isMenuOpen.value) {
        isMenuOpen.value = false
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
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

