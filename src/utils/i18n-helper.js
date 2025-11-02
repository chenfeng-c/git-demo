// 共享的 i18n 翻译工具函数
import i18n from '../i18n'

// 处理 AST 格式的辅助函数
export const getNestedValueSafe = (obj, path) => {
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
export const safeTranslate = (key, localeOverride = null) => {
  if (typeof key !== 'string' || !key.trim()) {
    return String(key ?? '')
  }
  if (!i18n?.global) {
    return key
  }
  try {
    const localeRef = i18n.global.locale
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

