<template>
  <div>
    <PageHeader
        type="events"
        :title="translations.title"
        :subtitle="translations.subtitle"
        :description="translations.description"
        :badges="translations.badges"
        icon="🎉"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <section class="intro-section">
            <div class="section-header">
              <h2 class="section-title-main">{{ translations.title }}</h2>
            </div>
            <p class="intro-text">{{ translations.intro }}</p>
          </section>

          <section class="events-section">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(event, index) in eventsList" :key="index" style="margin-bottom: 20px;">
                <el-card class="event-card" shadow="hover" :body-style="{ padding: '0' }">
                  <div class="event-image-wrapper">
                    <img :src="event.image" :alt="event.title" class="event-image" />
                    <div class="event-icon-overlay">
                      <span class="event-icon-large">{{ event.icon }}</span>
                    </div>
                  </div>
                  <div class="event-content">
                    <h3 class="event-title">{{ event.title }}</h3>
                    <div class="event-date">📅 {{ event.date }}</div>
                    <p class="event-description">{{ event.description }}</p>
                    
                    <el-tag
                      class="event-status-tag"
                      :type="event.status === 'upcoming' ? 'success' : event.status === 'ongoing' ? 'warning' : 'info'"
                      size="small"
                    >
                      {{ getStatusText(event.status) }}
                    </el-tag>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </section>

          <section class="values-section">
            <el-card style="margin-top: 45px;" shadow="never">
              <h3 style="margin: 0 0 18px 0; color: #1e40af;">{{ translations.valueTitle }}</h3>
              <ul style="line-height: 2; color: #4a5568; margin: 0; padding-left: 20px;">
                <li v-for="(value, index) in translations.values" :key="index">{{ value }}</li>
              </ul>
            </el-card>
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
import '../assets/css/events.css'

export default {
  name: 'Events',
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
        title: safeTranslate('events.title', locale),
        subtitle: safeTranslate('events.subtitle', locale),
        description: safeTranslate('events.description', locale),
        badges: [
          safeTranslate('events.badges.0', locale) || '技术分享',
          safeTranslate('events.badges.1', locale) || '团队建设',
          safeTranslate('events.badges.2', locale) || '文化交流'
        ],
        intro: safeTranslate('events.intro', locale),
        valueTitle: safeTranslate('events.valueTitle', locale),
        values: (() => {
          const values = []
          for (let i = 0; i < 6; i++) {
            const val = safeTranslate(`events.values.${i}`, locale)
            if (val && !val.startsWith('events.values')) {
              values.push(val)
            }
          }
          return values
        })()
      }
    })

    // 活动列表
    const eventsList = computed(() => {
      const locale = localeRef.value
      const eventKeys = ['summit', 'frontend', 'teamBuilding', 'training', 'competition', 'lunch']
      const icons = {
        summit: '🎤',
        frontend: '💡',
        teamBuilding: '🎯',
        training: '📚',
        competition: '🏆',
        lunch: '☕'
      }
      const images = {
        summit: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format',
        frontend: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format',
        teamBuilding: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format',
        training: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format',
        competition: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&auto=format',
        lunch: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&auto=format'
      }
      const statuses = ['upcoming', 'ongoing', 'completed', 'ongoing', 'upcoming', 'ongoing']
      
      return eventKeys.map((key, index) => ({
        icon: icons[key],
        title: safeTranslate(`events.events.${key}.title`, locale),
        date: safeTranslate(`events.events.${key}.date`, locale),
        description: safeTranslate(`events.events.${key}.description`, locale),
        status: statuses[index],
        image: images[key]
      }))
    })

    const getStatusText = (status) => {
      const locale = localeRef.value
      const statusKey = `events.status.${status}`
      return safeTranslate(statusKey, locale) || status
    }

    // Footer text with translation
    const footerTextComputed = computed(() => {
      return safeTranslate('home.footer', localeRef.value)
    })

    return {
      companyInfo,
      translations,
      eventsList,
      footerTextComputed,
      getStatusText
    }
  }
}
</script>

<style scoped>
</style>

