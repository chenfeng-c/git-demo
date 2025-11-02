<template>
  <div class="about-page">
    <PageHeader
      type="about"
      :title="translations.title"
      :subtitle="translations.subtitle"
      :description="translations.description"
      :badges="translations.badges"
      icon="🏢"
    />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <!-- 公司简介 -->
          <section class="about-section intro-section">
            <div class="section-header">
              <h2 class="section-title-main">{{ translations.introTitle }}</h2>
            </div>
            <el-card class="intro-card" shadow="hover" :body-style="{ padding: '40px' }">
              <p class="intro-text">{{ translations.introText }}</p>
            </el-card>
          </section>

          <!-- 企业文化 -->
          <section class="culture-section">
            <div class="section-header">
              <h3 class="section-title">{{ translations.cultureTitle }}</h3>
            </div>
            <el-card class="culture-card" shadow="hover" :body-style="{ padding: '35px' }">
              <p class="culture-text">{{ translations.cultureContent }}</p>
            </el-card>
          </section>

          <!-- 核心优势 -->
          <section class="advantages-section">
            <div class="section-header">
              <h3 class="section-title">{{ translations.advantagesTitle }}</h3>
            </div>
            <el-row :gutter="30" class="advantages-grid" justify="center">
              <el-col 
                v-for="(advantage, index) in advantagesList" 
                :key="index"
                :xs="24" 
                :sm="20"
                :md="18"
                :lg="16"
                :xl="14"
              >
                <el-card class="advantage-card" shadow="hover" :body-style="{ padding: '0' }">
                  <div class="advantage-image-wrapper">
                    <img :src="advantage.image" :alt="advantage.label" class="advantage-image" />
                  </div>
                  <div class="advantage-content">
                    <div class="advantage-label">{{ advantage.label }}</div>
                    <div class="advantage-text">{{ advantage.text }}</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </section>

          <!-- 发展历程 -->
          <section class="timeline-section">
            <div class="section-header">
              <h3 class="section-title">{{ translations.timelineTitle }}</h3>
              <p class="timeline-subtitle" v-if="translations.timelineSubtitle">{{ translations.timelineSubtitle }}</p>
            </div>
            <div class="custom-timeline">
              <div 
                v-for="(item, index) in timelineItems"
                :key="index"
                class="timeline-item"
                :class="{ 'timeline-item-left': index % 2 === 1, 'timeline-item-right': index % 2 === 0 }"
              >
                <div class="timeline-line"></div>
                <div class="timeline-node"></div>
                <div class="timeline-content">
                  <el-card class="timeline-card" shadow="hover" :body-style="{ padding: '25px' }">
                    <div class="timeline-year">{{ item.year }}</div>
                    <h4 class="timeline-title">{{ item.title }}</h4>
                    <p class="timeline-desc">{{ item.description }}</p>
                  </el-card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    
    <footer>
      <div class="container">
        <p>{{ footerTextComputed }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCompanyInfo } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'
import '../assets/css/about.css'

export default {
  name: 'About',
  components: {
    PageHeader
  },
  setup() {
    const localeRef = i18n.global.locale
    const companyInfo = useCompanyInfo()

    // 翻译
    const translations = computed(() => {
      const locale = localeRef.value
      return {
        title: safeTranslate('about.title', locale),
        subtitle: safeTranslate('about.subtitle', locale),
        description: safeTranslate('about.description', locale),
        badges: [
          safeTranslate('about.badges.0', locale) || '9年+ 行业经验',
          safeTranslate('about.badges.1', locale) || '500+ 成功项目',
          safeTranslate('about.badges.2', locale) || '100+ 专业团队'
        ],
        introTitle: safeTranslate('about.intro.title', locale),
        introText: safeTranslate('about.intro.text', locale),
        cultureTitle: safeTranslate('about.culture.title', locale),
        cultureContent: safeTranslate('about.culture.content', locale),
        advantagesTitle: safeTranslate('about.advantages.title', locale),
        timelineTitle: safeTranslate('about.timeline.title', locale),
        timelineSubtitle: safeTranslate('about.timeline.subtitle', locale)
      }
    })

    // 核心优势列表
    const advantagesList = computed(() => {
      const locale = localeRef.value
      const items = ['technology', 'service', 'experience', 'innovation']
      return items.map(key => ({
        label: safeTranslate(`about.advantages.items.${key}.label`, locale),
        text: safeTranslate(`about.advantages.items.${key}.text`, locale),
        image: getAdvantageImage(key)
      }))
    })

    // 获取优势图片（保持原有逻辑）
    const getAdvantageImage = (key) => {
      const images = {
        technology: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
        service: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format',
        experience: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format',
        innovation: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format'
      }
      return images[key] || images.technology
    }

    // 发展历程时间线
    const timelineItems = computed(() => {
      const locale = localeRef.value
      const years = ['2009', '2012', '2016', '2020', '2025']
      return years.map(year => ({
        year,
        title: safeTranslate(`about.timeline.items.${year}.title`, locale),
        description: safeTranslate(`about.timeline.items.${year}.description`, locale)
      }))
    })

    // Footer text with translation
    const footerTextComputed = computed(() => {
      return safeTranslate('home.footer', localeRef.value)
    })

    return {
      companyInfo,
      translations,
      advantagesList,
      timelineItems,
      footerTextComputed
    }
  }
}
</script>

<style scoped>
</style>

