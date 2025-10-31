# Mock API 文档

## 概述

本项目使用 Mock API 来模拟后端接口，方便前端开发和测试。

## 文件结构

- `mock.js` - Mock API 实现
- `index.js` - API 统一入口，可根据环境切换 mock/真实 API

## 使用方法

### 配置

通过环境变量控制是否使用 mock：

```env
VITE_USE_MOCK=true  # 使用 mock（默认）
VITE_USE_MOCK=false # 使用真实 API
VITE_API_BASE_URL=http://localhost:3000/api  # 真实 API 基础 URL
```

### API 方法

#### 1. 登录

```javascript
import { login } from '@/api'

const response = await login('admin', 'admin123')
// response: { success: true, data: { user, token }, message: '登录成功' }
```

#### 2. 获取用户信息

```javascript
import { getUserInfo } from '@/api'

const response = await getUserInfo(token)
// response: { success: true, data: { user }, message: '获取用户信息成功' }
```

#### 3. 验证 Token

```javascript
import { verifyToken } from '@/api'

const response = await verifyToken(token)
// response: { success: true, data: { valid: true }, message: 'Token 有效' }
```

#### 4. 登出

```javascript
import { logout } from '@/api'

const response = await logout(token)
// response: { success: true, data: null, message: '登出成功' }
```

#### 5. 注册

```javascript
import { register } from '@/api'

const response = await register({
  username: 'newuser',
  password: 'password123',
  email: 'newuser@example.com',
  name: '新用户'
})
// response: { success: true, data: { user, token }, message: '注册成功' }
```

## Mock 用户数据

### 测试账号

- **管理员**
  - 用户名：`admin`
  - 密码：`admin123`
  - 角色：`admin`

- **普通用户**
  - 用户名：`user`
  - 密码：`user123`
  - 角色：`user`

## 响应格式

所有 API 响应统一格式：

```typescript
interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string
  timestamp: string
}
```

## 网络延迟模拟

Mock API 模拟了真实的网络延迟：

- 登录：800ms
- 获取用户信息：300ms
- 验证 Token：200ms
- 登出：300ms
- 注册：1000ms

## 切换到真实 API

当需要切换到真实 API 时：

1. 创建 `src/api/real.js` 实现真实 API 调用
2. 在 `src/api/index.js` 中根据环境变量切换：

```javascript
export const login = USE_MOCK ? mockAPI.mockLogin : realAPI.login
```

