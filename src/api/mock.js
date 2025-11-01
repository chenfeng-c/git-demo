// Mock API 服务

// 模拟网络延迟
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock 用户数据
const mockUsers = [
  { 
    id: 1,
    username: 'admin', 
    password: 'admin123', 
    name: '管理员',
    role: 'admin',
    email: 'admin@innovativetech.com',
    avatar: null
  },
  { 
    id: 2,
    username: 'user', 
    password: 'user123', 
    name: '普通用户',
    role: 'user',
    email: 'user@innovativetech.com',
    avatar: null
  }
]

// Mock API 响应格式
const createResponse = (success, data, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString()
})

/**
 * 模拟登录 API
 */
export async function mockLogin(username, password) {
  await delay(800) // 模拟网络延迟
  
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  )
  
  if (user) {
    // 不返回密码
    const { password: _, ...userData } = user
    return createResponse(true, {
      user: userData,
      token: `mock_token_${user.id}_${Date.now()}`
    }, '登录成功')
  } else {
    return createResponse(false, null, '用户名或密码错误')
  }
}

/**
 * 模拟获取用户信息 API
 */
export async function mockGetUserInfo(token) {
  await delay(300)
  
  // 从 token 中提取用户 ID（简化处理）
  const userId = token ? parseInt(token.split('_')[2]) : null
  const user = mockUsers.find(u => u.id === userId)
  
  if (user && token) {
    const { password: _, ...userData } = user
    return createResponse(true, { user: userData }, '获取用户信息成功')
  } else {
    return createResponse(false, null, 'Token 无效或已过期')
  }
}

/**
 * 模拟验证 Token API
 */
export async function mockVerifyToken(token) {
  await delay(200)
  
  if (token && token.startsWith('mock_token_')) {
    return createResponse(true, { valid: true }, 'Token 有效')
  } else {
    return createResponse(false, null, 'Token 无效')
  }
}

/**
 * 模拟登出 API
 */
export async function mockLogout(token) {
  await delay(300)
  return createResponse(true, null, '登出成功')
}

/**
 * 模拟注册 API
 */
export async function mockRegister(userData) {
  await delay(1000)
  
  const { username, email } = userData
  
  // 检查用户名是否已存在
  if (mockUsers.some(u => u.username === username)) {
    return createResponse(false, null, '用户名已存在')
  }
  
  // 检查邮箱是否已存在
  if (mockUsers.some(u => u.email === email)) {
    return createResponse(false, null, '邮箱已被注册')
  }
  
  // 创建新用户
  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    role: 'user',
    avatar: null
  }
  
  mockUsers.push(newUser)
  
  const { password: _, ...userWithoutPassword } = newUser
  return createResponse(true, {
    user: userWithoutPassword,
    token: `mock_token_${newUser.id}_${Date.now()}`
  }, '注册成功')
}

/**
 * 模拟更新用户信息 API
 */
export async function mockUpdateUserInfo(token, userData) {
  await delay(600)
  
  const userId = token ? parseInt(token.split('_')[2]) : null
  const userIndex = mockUsers.findIndex(u => u.id === userId)
  
  if (userIndex === -1 || !token) {
    return createResponse(false, null, '用户不存在或 Token 无效')
  }
  
  const { username, email } = userData
  
  // 检查用户名是否已被其他用户使用
  if (username && mockUsers.some(u => u.username === username && u.id !== userId)) {
    return createResponse(false, null, '用户名已被使用')
  }
  
  // 检查邮箱是否已被其他用户使用
  if (email && mockUsers.some(u => u.email === email && u.id !== userId)) {
    return createResponse(false, null, '邮箱已被使用')
  }
  
  // 更新用户信息
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData
  }
  
  const { password: _, ...userWithoutPassword } = mockUsers[userIndex]
  return createResponse(true, {
    user: userWithoutPassword
  }, '更新成功')
}

/**
 * 模拟修改密码 API
 */
export async function mockChangePassword(token, oldPassword, newPassword) {
  await delay(600)
  
  const userId = token ? parseInt(token.split('_')[2]) : null
  const user = mockUsers.find(u => u.id === userId)
  
  if (!user || !token) {
    return createResponse(false, null, '用户不存在或 Token 无效')
  }
  
  // 验证旧密码
  if (user.password !== oldPassword) {
    return createResponse(false, null, '原密码不正确')
  }
  
  // 更新密码
  user.password = newPassword
  
  return createResponse(true, null, '密码修改成功')
}

// 导出 mock 用户数据（仅用于开发调试）
export { mockUsers }

