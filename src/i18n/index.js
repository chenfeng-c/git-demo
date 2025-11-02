import { createI18n } from 'vue-i18n'

import zh from '../locales/zh.json'
import en from '../locales/en.json'

export const SUPPORTED_LOCALES = {
  'zh-CN': {
    labelKey: 'language.zh'
  },
  'en-US': {
    labelKey: 'language.en'
  }
}

const fallbackLocale = 'zh-CN'
const storedLocale = localStorage.getItem('app-locale')

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale && SUPPORTED_LOCALES[storedLocale] ? storedLocale : fallbackLocale,
  fallbackLocale,
  messages: {
    'zh-CN': zh,
    'en-US': en
  },
  // 禁用警告，避免控制台噪音
  missingWarn: false,
  fallbackWarn: false,
  // 当消息缺失时返回 key 而不是抛出错误
  missing: (locale, key) => {
    return key
  }
})

export default i18n

