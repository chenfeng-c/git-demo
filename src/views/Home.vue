<template>
  <div class="landing-page">
    <!-- 全屏 Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <HeaderBanner />
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ companyInfo.name }}</h1>
          <p class="hero-subtitle">{{ companyInfo.slogan }}</p>
          <p class="hero-description">{{ translations.description }}</p>
          <div class="hero-badges">
            <div class="badge-item" v-for="(badge, index) in heroBadges" :key="index">
              <span class="badge-icon">{{ badge.icon }}</span>
              <span class="badge-text">{{ badge.text }}</span>
            </div>
          </div>
          <div class="hero-actions">
            <el-button 
              type="primary" 
              size="large" 
              @click="scrollToContent"
              class="cta-primary-btn"
            >
              <span class="btn-text">{{ translations.learnMore }}</span>
              <span class="btn-icon">→</span>
            </el-button>
            <el-button 
              size="large" 
              @click="scrollToFeatures"
              class="cta-secondary-btn"
            >
              <span class="btn-text">{{ translations.viewProducts }}</span>
              <span class="btn-icon">→</span>
            </el-button>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToContent">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>{{ translations.scrollMore }}</span>
      </div>
    </section>

    <!-- 内容区域 -->
    <section class="content-section" id="content">
      <div class="container">
        <div class="content-inner">
          <h2>{{ translations.title }}</h2>
          <p v-for="(para, index) in translations.paragraphs" :key="index">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- 特性展示 -->
    <section class="features-section" id="features">
      <div class="container">
        <el-row :gutter="35">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(feature, index) in featuresList" :key="index" style="margin-bottom: 35px;">
            <el-card class="feature-card" shadow="hover" :body-style="{ padding: '50px 40px', textAlign: 'center' }">
              <div class="feature-icon">
                <span class="feature-icon-emoji">{{ feature.icon }}</span>
              </div>
              <h3 style="color: #1a365d; margin-bottom: 20px; font-size: 1.5em; font-weight: 700;">{{ feature.title }}</h3>
              <p style="font-size: 1.05em; margin: 0; color: #718096; line-height: 1.8;">{{ feature.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 成功案例轮播 -->
    <section class="stories-section" id="stories">
      <div class="container">
        <div class="stories-header">
          <h2 class="stories-title">{{ translations.storiesTitle }}</h2>
          <p class="stories-subtitle">{{ translations.storiesSubtitle }}</p>
        </div>

        <el-carousel
          indicator-position="outside"
          height="360px"
          trigger="click"
          class="stories-carousel"
          :interval="7000"
        >
          <el-carousel-item v-for="(story, index) in storySlides" :key="index">
            <div class="story-slide">
              <div class="story-media">
                <img :src="story.image" :alt="story.title" class="story-image" />
              </div>
              <div class="story-content">
                <div class="story-label">{{ story.title }}</div>
                <blockquote class="story-quote">“{{ story.quote }}”</blockquote>
                <div class="story-client">
                  <span class="story-client-name">{{ story.client }}</span>
                  <span class="story-client-role">{{ story.role }}</span>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- 合作伙伴展示 -->
    <section class="partners-section">
      <div class="container">
        <div class="partners-header">
          <h2 class="partners-title">{{ translations.partnersTitle }}</h2>
          <p class="partners-subtitle">{{ translations.partnersSubtitle }}</p>
        </div>
        <div class="partners-grid">
          <div class="partner-card" v-for="(partner, index) in partnerLogos" :key="index">
            <div class="partner-logo-wrapper">
              <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
            </div>
            <div class="partner-info">
              <h3 class="partner-name">{{ partner.name }}</h3>
              <p class="partner-description">{{ partner.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <h2>{{ translations.statsTitle }}</h2>
          <el-row :gutter="35" style="margin-bottom: 70px;">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" v-for="(stat, index) in statsData" :key="index">
              <el-card class="stat-item" shadow="hover" :body-style="{ textAlign: 'center', padding: '35px 25px' }">
                <div style="font-size: 3em; margin-bottom: 15px; display: block;">{{ stat.icon }}</div>
                <div style="font-size: 2.5em; font-weight: 800; color: #1a365d; margin-bottom: 10px;">{{ stat.value }}</div>
                <div style="font-size: 1.1em; color: #718096; font-weight: 500;">{{ stat.label }}</div>
              </el-card>
            </el-col>
          </el-row>
          
          <el-row :gutter="40">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 40px;">
              <el-card class="chart-card-new" shadow="hover" :body-style="{ padding: '40px 35px' }">
                <h3 style="color: #1a365d; font-size: 1.5em; margin-bottom: 30px; font-weight: 700; text-align: center;">{{ translations.growthChartTitle }}</h3>
                <div class="chart-placeholder">
                  <BaseChart :options="growthChartOptions" height="280px" />
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 40px;">
              <el-card class="chart-card-new" shadow="hover" :body-style="{ padding: '40px 35px' }">
                <h3 style="color: #1a365d; font-size: 1.5em; margin-bottom: 30px; font-weight: 700; text-align: center;">{{ translations.industryChartTitle }}</h3>
                <div class="chart-placeholder">
                  <BaseChart :options="industryChartOptions" height="280px" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
    
    <footer>
      <div class="container">
        <p>{{ footerTextComputed }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useCompanyInfo } from '../utils/data'
import IconInnovation from '../components/icons/IconInnovation.vue'
import IconTeam from '../components/icons/IconTeam.vue'
import IconService from '../components/icons/IconService.vue'
import IconCustomer from '../components/icons/IconCustomer.vue'
import IconQuality from '../components/icons/IconQuality.vue'
import IconOptimization from '../components/icons/IconOptimization.vue'
import HeaderBanner from '../components/HeaderBanner.vue'
import BaseChart from '../components/charts/BaseChart.vue'
import PageHeader from '../components/PageHeader.vue'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'
import '../assets/css/home.css'

export default {
  name: 'Home',
  components: {
    IconInnovation,
    IconTeam,
    IconService,
    IconCustomer,
    IconQuality,
    IconOptimization,
    HeaderBanner,
    BaseChart,
    PageHeader
  },
  setup() {
    const hoveredIndex = ref(-1)
    const localeRef = i18n.global.locale
    const companyInfo = useCompanyInfo()

    // 翻译
    const translations = computed(() => {
      const locale = localeRef.value
      return {
        description: safeTranslate('home.description', locale),
        learnMore: safeTranslate('home.learnMore', locale),
        viewProducts: safeTranslate('home.viewProducts', locale),
        scrollMore: safeTranslate('home.scrollMore', locale),
        title: safeTranslate('home.title', locale),
        paragraphs: [
          safeTranslate('home.paragraphs.0', locale),
          safeTranslate('home.paragraphs.1', locale)
        ],
        galleryTitle: safeTranslate('home.gallery.title', locale),
        galleryDescription: safeTranslate('home.gallery.description', locale),
        statsTitle: safeTranslate('home.stats.title', locale),
        growthChartTitle: safeTranslate('home.stats.charts.growth.title', locale),
        industryChartTitle: safeTranslate('home.stats.charts.industry.title', locale),
        growthChartSeries: safeTranslate('home.stats.charts.growth.series', locale),
        growthChartYAxis: safeTranslate('home.stats.charts.growth.yAxis', locale),
        storiesTitle: safeTranslate('home.stories.title', locale),
        storiesSubtitle: safeTranslate('home.stories.subtitle', locale),
        partnersTitle: safeTranslate('home.partners.title', locale),
        partnersSubtitle: safeTranslate('home.partners.subtitle', locale)
      }
    })

    // Hero badges
    const heroBadges = computed(() => {
      const locale = localeRef.value
      return [
        { icon: '💡', text: safeTranslate('home.badges.innovation', locale) },
        { icon: '🎯', text: safeTranslate('home.badges.professional', locale) },
        { icon: '🏆', text: safeTranslate('home.badges.leading', locale) },
        { icon: '✨', text: safeTranslate('home.badges.quality', locale) },
        { icon: '❤️', text: safeTranslate('home.badges.trust', locale) },
        { icon: '⚡', text: safeTranslate('home.badges.efficient', locale) }
      ]
    })

    // Stats data
    const statsData = computed(() => {
      const locale = localeRef.value
      return [
        { icon: '📈', value: '500+', label: safeTranslate('home.stats.items.projects', locale) },
        { icon: '👥', value: '100+', label: safeTranslate('home.stats.items.team', locale) },
        { icon: '🎯', value: '95%', label: safeTranslate('home.stats.items.satisfaction', locale) },
        { icon: '🏆', value: '9年+', label: safeTranslate('home.stats.items.experience', locale) }
      ]
    })

    // Features (computed from homeContent but with translations)
    const featuresList = computed(() => {
      const locale = localeRef.value
      return [
        {
          icon: '💡',
          title: safeTranslate('home.features.innovation.title', locale),
          description: safeTranslate('home.features.innovation.description', locale)
        },
        {
          icon: '👥',
          title: safeTranslate('home.features.team.title', locale),
          description: safeTranslate('home.features.team.description', locale)
        },
        {
          icon: '⚡',
          title: safeTranslate('home.features.service.title', locale),
          description: safeTranslate('home.features.service.description', locale)
        },
        {
          icon: '🎯',
          title: safeTranslate('home.features.customer.title', locale),
          description: safeTranslate('home.features.customer.description', locale)
        },
        {
          icon: '✨',
          title: safeTranslate('home.features.quality.title', locale),
          description: safeTranslate('home.features.quality.description', locale)
        },
        {
          icon: '🔄',
          title: safeTranslate('home.features.optimization.title', locale),
          description: safeTranslate('home.features.optimization.description', locale)
        }
      ]
    })

    // Company images with translations
    const companyImages = computed(() => {
      const locale = localeRef.value
      return [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.office.title', locale),
          description: safeTranslate('home.gallery.images.office.description', locale)
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.teamwork.title', locale),
          description: safeTranslate('home.gallery.images.teamwork.description', locale)
      },
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.technology.title', locale),
          description: safeTranslate('home.gallery.images.technology.description', locale)
      },
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.meeting.title', locale),
          description: safeTranslate('home.gallery.images.meeting.description', locale)
      },
      {
        url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.service.title', locale),
          description: safeTranslate('home.gallery.images.service.description', locale)
      },
      {
        url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&auto=format',
          title: safeTranslate('home.gallery.images.culture.title', locale),
          description: safeTranslate('home.gallery.images.culture.description', locale)
      }
      ]
    })

    const storySlides = computed(() => {
      const locale = localeRef.value
      const keys = ['digitalTwin', 'smartCity', 'aiRetail']
      const images = {
        digitalTwin: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1000&h=600&fit=crop&auto=format',
        smartCity: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1000&h=600&fit=crop&auto=format',
        aiRetail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&h=600&fit=crop&auto=format'
      }

      return keys.map(key => ({
        image: images[key],
        title: safeTranslate(`home.stories.items.${key}.title`, locale),
        quote: safeTranslate(`home.stories.items.${key}.quote`, locale),
        client: safeTranslate(`home.stories.items.${key}.client`, locale),
        role: safeTranslate(`home.stories.items.${key}.role`, locale)
      }))
    })

    const partnerLogos = computed(() => {
      const locale = localeRef.value
      const keys = ['nebula', 'aurora', 'zenith', 'polaris']
      const logos = {
        nebula: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=320&h=200&fit=crop&auto=format',
        aurora: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=320&h=200&fit=crop&auto=format',
        zenith: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=320&h=200&fit=crop&auto=format',
        polaris: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=200&fit=crop&auto=format'
      }

      return keys.map(key => ({
        name: safeTranslate(`home.partners.items.${key}.name`, locale),
        description: safeTranslate(`home.partners.items.${key}.description`, locale),
        logo: logos[key]
      }))
    })

    const handleImageHover = (index) => {
      hoveredIndex.value = index
    }

    const handleImageLeave = () => {
      hoveredIndex.value = -1
    }

    const getIconComponent = (index) => {
      const icons = ['IconInnovation', 'IconTeam', 'IconService', 'IconCustomer', 'IconQuality', 'IconOptimization']
      return icons[index] || 'IconInnovation'
    }

    const scrollToContent = () => {
      const element = document.getElementById('content')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const scrollToFeatures = () => {
      const element = document.getElementById('features')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 业务增长趋势图表配置（使用 computed 以响应语言切换）
    const growthChartOptions = computed(() => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params) {
          const param = params[0]
          return param.name + '<br/>' + param.seriesName + ': ' + param.value
        }
      },
      grid: {
        left: '15%',
        right: '10%',
        bottom: '15%',
        top: '15%',
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        },
        axisLabel: {
          color: '#718096',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        name: translations.value.growthChartYAxis,
        nameTextStyle: {
          color: '#718096',
          padding: [0, 0, 0, 10]
        },
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        },
        axisLabel: {
          color: '#718096',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: translations.value.growthChartSeries,
          type: 'bar',
          data: [15, 28, 45, 68, 92],
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            color: '#2d3748',
            fontSize: 12
          },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#4299e1' },
                { offset: 1, color: '#2c5282' }
              ]
            },
            borderRadius: [6, 6, 0, 0]
          }
        }
      ]
    }))
    
    // 客户行业分布图表配置（使用 computed 以响应语言切换）
    const industryChartOptions = computed(() => ({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: '10%',
        top: 'center',
        textStyle: {
          color: '#4a5568',
          fontSize: 12
        },
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 10
      },
      series: [
        {
          name: translations.value.industryChartTitle,
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              color: '#2d3748'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: false
          },
          data: (() => {
            const locale = localeRef.value
            return [
              { value: 35, name: safeTranslate('home.stats.charts.industry.items.internet', locale) || '互联网', itemStyle: { color: '#4299e1' } },
              { value: 25, name: safeTranslate('home.stats.charts.industry.items.finance', locale) || '金融', itemStyle: { color: '#2c5282' } },
              { value: 20, name: safeTranslate('home.stats.charts.industry.items.education', locale) || '教育', itemStyle: { color: '#63b3ed' } },
              { value: 12, name: safeTranslate('home.stats.charts.industry.items.medical', locale) || '医疗', itemStyle: { color: '#1a365d' } },
              { value: 8, name: safeTranslate('home.stats.charts.industry.items.others', locale) || '其他', itemStyle: { color: '#90cdf4' } }
            ]
          })()
        }
      ]
    }))

    // Footer text with translation
    const footerTextComputed = computed(() => {
      return safeTranslate('home.footer', localeRef.value)
    })

    return {
      companyInfo,
      translations,
      heroBadges,
      statsData,
      featuresList,
      companyImages,
      storySlides,
      partnerLogos,
      footerTextComputed,
      getIconComponent,
      scrollToContent,
      scrollToFeatures,
      growthChartOptions,
      industryChartOptions,
      hoveredIndex,
      handleImageHover,
      handleImageLeave
    }
  }
}
</script>

<style scoped>
</style>

