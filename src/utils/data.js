// 共享数据 - 完全支持国际化

import { computed } from 'vue'
import { safeTranslate } from './i18n-helper'
import i18n from '../i18n'

// 公司信息（国际化，响应式）
export const getCompanyInfo = (locale = null) => {
  const currentLocale = locale || i18n.global.locale.value
  return {
    name: safeTranslate('company.name', currentLocale) || '辰锋软件开发工作室',
    slogan: safeTranslate('home.slogan', currentLocale) || '科技引领未来，创新驱动发展'
  }
}

// 使用 computed 创建响应式的公司信息（推荐在 Vue 组件中使用）
export const useCompanyInfo = () => {
  const localeRef = i18n.global.locale
  return computed(() => getCompanyInfo(localeRef.value))
}

// 注意：以下数据已迁移到翻译文件（zh.json/en.json），这里保留仅为向后兼容
// 新代码应直接从翻译文件获取数据，而不是使用这些导出
// 
// 已弃用的导出（保留以防有代码仍在使用）：
// - homeContent (使用 home.* 翻译键)
// - aboutContent (使用 about.* 翻译键)
// - jobsData (使用 jobs.* 翻译键)
// - eventsData (使用 events.* 翻译键)
// - teamData (使用 team.* 翻译键)
// 
// 请使用以下方式获取数据：
// import { safeTranslate } from './i18n-helper'
// import i18n from '../i18n'
// const locale = i18n.global.locale.value
// const title = safeTranslate('home.title', locale)

