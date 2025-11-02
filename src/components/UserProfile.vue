<template>
  <div class="user-profile">
    <div class="profile-trigger" @click="toggleDropdown">
      <span class="user-avatar">{{ userInitial }}</span>
      <span class="user-name">{{ user?.name || '' }}</span>
      <span class="dropdown-icon" :class="{ active: isDropdownOpen }">▼</span>
    </div>
    
    <div v-if="isDropdownOpen" class="profile-dropdown" @click.stop>
      <div class="profile-header">
        <div class="profile-avatar">{{ userInitial }}</div>
        <div class="profile-info">
          <div class="profile-name">{{ user?.name || '' }}</div>
          <div class="profile-username">{{ user?.username || '' }}</div>
          <div v-if="user?.email" class="profile-email">{{ user?.email }}</div>
        </div>
      </div>
      
      <div class="profile-divider"></div>
      
      <div class="profile-menu">
        <a href="#" class="menu-item" @click.prevent="handleProfileClick">
          <span class="menu-icon">👤</span>
          <span>{{ translations.profileInfo }}</span>
        </a>
        <a href="#" class="menu-item" @click.prevent="handleLogout">
          <span class="menu-icon">🚪</span>
          <span>{{ translations.logout }}</span>
        </a>
      </div>
    </div>
    
    <!-- 点击外部关闭下拉菜单 -->
    <div v-if="isDropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '../i18n'
import { user as userState, logout } from '../store/auth'

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter()
    const isDropdownOpen = ref(false)
    const localeRef = i18n.global.locale
    
    const user = computed(() => userState.value)
    
    const userInitial = computed(() => {
      if (!user.value || !user.value.name) return 'U'
      return user.value.name.charAt(0).toUpperCase()
    })
    
    // 处理 AST 格式的辅助函数
    const getNestedValueSafe = (obj, path) => {
      if (!obj || typeof obj !== 'object') return null
      const keys = path.split('.')
      let value = obj
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return null
        }
      }
      if (typeof value === 'string') return value
      if (value && typeof value === 'object') {
        if (value.loc && value.loc.source) return value.loc.source
        if (value.body && value.body.items && value.body.items.length > 0) {
          const firstItem = value.body.items[0]
          if (typeof firstItem === 'string') return firstItem
          if (firstItem && typeof firstItem === 'object' && firstItem.loc && firstItem.loc.source) {
            return firstItem.loc.source
          }
        }
      }
      return null
    }

    // 安全翻译函数 - 直接访问 messages，避免 composer 检查
    const safeTranslate = (key, localeOverride = null) => {
      if (typeof key !== 'string' || !key.trim()) {
        return String(key ?? '')
      }
      if (!i18n?.global) {
        return key
      }
      try {
        const locale = localeOverride !== null ? localeOverride : localeRef.value
        
        let localeMessages = null
        try {
          localeMessages = i18n.global.getLocaleMessage(locale)
        } catch (e) {
          const messages = i18n.global.messages
          if (messages) {
            const msgs = messages.value || messages
            if (msgs && typeof msgs === 'object' && locale in msgs) {
              localeMessages = msgs[locale]
            }
          }
        }
        
        if (localeMessages && typeof localeMessages === 'object') {
          const result = getNestedValueSafe(localeMessages, key)
          if (result) return result
        }
        
        const fallbackLocale = 'zh-CN'
        try {
          const fallbackMessages = i18n.global.getLocaleMessage(fallbackLocale)
          if (fallbackMessages && typeof fallbackMessages === 'object') {
            const result = getNestedValueSafe(fallbackMessages, key)
            if (result) return result
          }
        } catch (e) {}
        
        return key
      } catch (err) {
        return key
      }
    }
    
    // 预翻译的文本
    const translations = computed(() => {
      // 显式访问 localeRef.value 以确保响应式追踪
      const locale = localeRef.value
      return {
        profileInfo: safeTranslate('profile.info', locale),
        logout: safeTranslate('profile.logout', locale)
      }
    })
    
    const toggleDropdown = (event) => {
      event.stopPropagation()
      isDropdownOpen.value = !isDropdownOpen.value
    }
    
    const closeDropdown = () => {
      isDropdownOpen.value = false
    }
    
    const handleProfileClick = () => {
      if (user.value) {
        closeDropdown()
        router.push('/profile')
      }
    }

    const handleLogout = async () => {
      await logout()
      closeDropdown()
      router.push('/')
    }
    
    const handleClickOutside = (event) => {
      const profile = event.target.closest('.user-profile')
      if (!profile && isDropdownOpen.value) {
        closeDropdown()
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      user,
      userInitial,
      isDropdownOpen,
      toggleDropdown,
      closeDropdown,
      handleProfileClick,
      handleLogout,
      translations
    }
  }
}
</script>

<style scoped>
.user-profile {
  position: relative;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.profile-trigger:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
}

.user-name {
  color: #e2e8f0;
  font-size: 15px;
  white-space: nowrap;
}

.dropdown-icon {
  font-size: 10px;
  color: #e2e8f0;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.dropdown-icon.active {
  transform: rotate(180deg);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-header {
  padding: 16px;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-username {
  font-size: 13px;
  opacity: 0.9;
  margin-bottom: 2px;
}

.profile-email {
  font-size: 12px;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-divider {
  height: 1px;
  background: #e2e8f0;
}

.profile-menu {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #2d3748;
  text-decoration: none;
  transition: background 0.2s ease;
  cursor: pointer;
}

.menu-item:hover {
  background: #f7fafc;
}

.menu-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

@media (max-width: 992px) {
  .profile-trigger {
    padding: 6px 12px;
    gap: 6px;
    min-width: 0;
    max-width: 100%;
  }
  
  .user-avatar {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .user-name {
    display: none;
  }
  
  .dropdown-icon {
    font-size: 8px;
  }
  
  .profile-dropdown {
    right: 0;
    left: auto;
    min-width: 220px;
    max-width: calc(100vw - 20px);
  }
}

@media (max-width: 480px) {
  .profile-trigger {
    padding: 5px 10px;
    gap: 4px;
  }
  
  .user-avatar {
    width: 26px;
    height: 26px;
    font-size: 11px;
  }
  
  .profile-dropdown {
    right: 0;
    left: auto;
    min-width: 200px;
    max-width: calc(100vw - 30px);
  }
  
  .profile-header {
    padding: 14px;
  }
  
  .profile-avatar {
    width: 42px;
    height: 42px;
    font-size: 18px;
  }
  
  .profile-name {
    font-size: 15px;
  }
  
  .profile-username {
    font-size: 12px;
  }
  
  .profile-email {
    font-size: 11px;
  }
}
</style>

