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
          <p class="hero-description">致力于为客户提供创新的技术解决方案，推动数字化转型</p>
          <div class="hero-badges">
            <div class="badge-item" v-for="(badge, index) in [
              { icon: '💡', text: '创新技术' },
              { icon: '🎯', text: '专业服务' },
              { icon: '🏆', text: '行业领先' },
              { icon: '✨', text: '品质保证' },
              { icon: '❤️', text: '客户信赖' },
              { icon: '⚡', text: '高效执行' }
            ]" :key="index">
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
              <span class="btn-text">了解更多</span>
              <span class="btn-icon">→</span>
            </el-button>
            <el-button 
              size="large" 
              @click="scrollToFeatures"
              class="cta-secondary-btn"
            >
              <span class="btn-text">查看产品</span>
              <span class="btn-icon">→</span>
            </el-button>
          </div>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToContent">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>滚动查看更多</span>
      </div>
    </section>

    <!-- 内容区域 -->
    <section class="content-section" id="content">
      <div class="container">
        <div class="content-inner">
          <h2>{{ homeContent.title }}</h2>
          <p v-for="(para, index) in homeContent.paragraphs" :key="index">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- 特性展示 -->
    <section class="features-section" id="features">
      <div class="container">
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(feature, index) in homeContent.features" :key="index" style="margin-bottom: 35px;">
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

    <!-- 公司图片展示 -->
    <section class="gallery-section">
      <div class="container">
        <div class="gallery-content">
          <h2>公司风采</h2>
          <p class="gallery-description">专业的团队、现代化的办公环境、创新的工作氛围</p>
          <el-row :gutter="20" class="gallery-grid">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(image, index) in companyImages" :key="index">
              <div class="gallery-item" @mouseenter="handleImageHover(index)" @mouseleave="handleImageLeave(index)">
                <div class="image-wrapper">
                  <img :src="image.url" :alt="image.title" class="gallery-image" :class="{ 'image-hover': hoveredIndex === index }" />
                  <div class="image-overlay" :class="{ 'overlay-active': hoveredIndex === index }">
                    <h3 class="image-title">{{ image.title }}</h3>
                    <p class="image-desc">{{ image.description }}</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <h2>公司数据一览</h2>
          <el-row :gutter="35" style="margin-bottom: 70px;">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" v-for="(stat, index) in [
              { icon: '📈', value: '500+', label: '成功项目' },
              { icon: '👥', value: '100+', label: '专业团队' },
              { icon: '🎯', value: '95%', label: '客户满意度' },
              { icon: '🏆', value: '9年+', label: '行业经验' }
            ]" :key="index">
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
                <h3 style="color: #1a365d; font-size: 1.5em; margin-bottom: 30px; font-weight: 700; text-align: center;">业务增长趋势</h3>
                <div class="chart-placeholder">
                  <BaseChart :options="growthChartOptions" height="280px" />
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 40px;">
              <el-card class="chart-card-new" shadow="hover" :body-style="{ padding: '40px 35px' }">
                <h3 style="color: #1a365d; font-size: 1.5em; margin-bottom: 30px; font-weight: 700; text-align: center;">客户行业分布</h3>
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
        <p>{{ footerText }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { companyInfo, footerText, homeContent } from '../utils/data'
import IconInnovation from '../components/icons/IconInnovation.vue'
import IconTeam from '../components/icons/IconTeam.vue'
import IconService from '../components/icons/IconService.vue'
import IconCustomer from '../components/icons/IconCustomer.vue'
import IconQuality from '../components/icons/IconQuality.vue'
import IconOptimization from '../components/icons/IconOptimization.vue'
import HeaderBanner from '../components/HeaderBanner.vue'
import BaseChart from '../components/charts/BaseChart.vue'
import PageHeader from '../components/PageHeader.vue'
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

    const companyImages = ref([
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format',
        title: '现代化办公环境',
        description: '宽敞明亮的办公空间，营造高效工作氛围'
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
        title: '团队协作',
        description: '专业团队紧密合作，共同创造卓越成果'
      },
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
        title: '技术创新',
        description: '前沿技术设备，推动行业创新发展'
      },
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format',
        title: '会议室讨论',
        description: '集思广益，智慧碰撞，制定最佳方案'
      },
      {
        url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&auto=format',
        title: '客户服务',
        description: '专注客户需求，提供优质服务体验'
      },
      {
        url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&auto=format',
        title: '企业文化建设',
        description: '丰富多彩的团队活动，凝聚团队力量'
      }
    ])

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

    // 业务增长趋势图表配置
    const growthChartOptions = ref({
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
        name: '项目数量',
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
          name: '完成项目',
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
    })
    
    // 客户行业分布图表配置
    const industryChartOptions = ref({
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
          name: '行业分布',
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
          data: [
            { value: 35, name: '互联网', itemStyle: { color: '#4299e1' } },
            { value: 25, name: '金融', itemStyle: { color: '#2c5282' } },
            { value: 20, name: '教育', itemStyle: { color: '#63b3ed' } },
            { value: 12, name: '医疗', itemStyle: { color: '#1a365d' } },
            { value: 8, name: '其他', itemStyle: { color: '#90cdf4' } }
          ]
        }
      ]
    })

    return {
      companyInfo,
      footerText,
      homeContent,
      getIconComponent,
      scrollToContent,
      scrollToFeatures,
      growthChartOptions,
      industryChartOptions,
      companyImages,
      hoveredIndex,
      handleImageHover,
      handleImageLeave
    }
  }
}
</script>

<style scoped>
</style>

