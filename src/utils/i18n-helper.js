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
    if (typeof value.s === 'string') return value.s
    if (value.b && typeof value.b === 'object') {
      if (typeof value.b.s === 'string') return value.b.s
      if (Array.isArray(value.b.i)) {
        for (const item of value.b.i) {
          if (item && typeof item === 'object' && typeof item.s === 'string') {
            return item.s
          }
        }
      }
    }
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
    const composer = i18n.global
    const localeRef = composer.locale
    const locale = localeOverride !== null ? localeOverride : localeRef.value

    if (composer?.t) {
      try {
        const translated = localeOverride !== null
          ? composer.t(key, locale)
          : composer.t(key)

        if (translated !== null && translated !== undefined && translated !== key) {
          return translated
        }
      } catch (_) {
        // ignore and fallback to manual lookup
      }
    }

    let localeMessages = null
    try {
      localeMessages = composer.getLocaleMessage(locale)
    } catch (e) {
      const messages = composer.messages
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
      const fallbackMessages = composer.getLocaleMessage(fallbackLocale)
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

export default i18n

