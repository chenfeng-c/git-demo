// API 服务统一入口

import * as mockAPI from './mock'

// 可以根据环境变量切换 mock 和真实 API
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// API 配置
export const apiConfig = {
  useMock: USE_MOCK,
  baseURL: USE_MOCK ? '' : import.meta.env.VITE_API_BASE_URL || '/api'
}

// 导出 API 方法
export const login = mockAPI.mockLogin
export const getUserInfo = mockAPI.mockGetUserInfo
export const verifyToken = mockAPI.mockVerifyToken
export const logout = mockAPI.mockLogout
export const register = mockAPI.mockRegister

// 如果以后需要切换到真实 API，可以在这里替换
// export const login = USE_MOCK ? mockAPI.mockLogin : realAPI.login

