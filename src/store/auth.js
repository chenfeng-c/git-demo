import { ref, computed } from 'vue'
import { login as apiLogin, getUserInfo, verifyToken, logout as apiLogout } from '../api/index'

// 用户状态管理
const user = ref(null)
const token = ref(null)
const isAuthenticated = computed(() => user.value !== null && token.value !== null)

/**
 * 登录
 */
export async function login(username, password) {
  try {
    const response = await apiLogin(username, password)
    
    if (response.success) {
      user.value = response.data.user
      token.value = response.data.token
      
      // 保存到 localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', token.value)
      
      return { success: true, message: response.message }
    } else {
      return { success: false, message: response.message }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: '登录失败，请稍后重试' }
  }
}

/**
 * 登出
 */
export async function logout() {
  try {
    if (token.value) {
      await apiLogout(token.value)
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

/**
 * 初始化认证状态
 */
export async function initAuth() {
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')
  
  if (savedUser && savedToken) {
    try {
      // 验证 token 是否有效
      const verifyResponse = await verifyToken(savedToken)
      
      if (verifyResponse.success && verifyResponse.data.valid) {
        // Token 有效，恢复用户状态
        user.value = JSON.parse(savedUser)
        token.value = savedToken
        
        // 可选：重新获取用户信息以同步最新数据
        try {
          const userInfoResponse = await getUserInfo(savedToken)
          if (userInfoResponse.success) {
            user.value = userInfoResponse.data.user
            localStorage.setItem('user', JSON.stringify(user.value))
          }
        } catch (error) {
          console.warn('Failed to refresh user info:', error)
        }
      } else {
        // Token 无效，清除本地存储
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Failed to init auth:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  if (!token.value) {
    return null
  }
  
  try {
    const response = await getUserInfo(token.value)
    if (response.success) {
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
      return user.value
    }
  } catch (error) {
    console.error('Failed to get current user:', error)
  }
  
  return null
}

// 导出响应式引用
export { user, token, isAuthenticated }
