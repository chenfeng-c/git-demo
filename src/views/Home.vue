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
            <span class="badge">
              <span class="badge-icon">💡</span>
              创新技术
            </span>
            <span class="badge">
              <span class="badge-icon">🎯</span>
              专业服务
            </span>
            <span class="badge">
              <span class="badge-icon">🏆</span>
              行业领先
            </span>
            <span class="badge">
              <span class="badge-icon">✨</span>
              品质保证
            </span>
            <span class="badge">
              <span class="badge-icon">❤️</span>
              客户信赖
            </span>
            <span class="badge">
              <span class="badge-icon">⚡</span>
              高效执行
            </span>
          </div>
          <div class="hero-actions">
            <button class="cta-button primary" @click="scrollToContent">了解更多</button>
            <button class="cta-button secondary" @click="scrollToFeatures">查看产品</button>
          </div>
        </div>
        <div class="hero-icon">
          <div class="icon-wrapper">🚀</div>
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
        <div class="features">
          <div class="feature-card" v-for="(feature, index) in homeContent.features" :key="index">
            <div class="feature-icon">
              <component :is="getIconComponent(index)" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <h2>公司数据一览</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">📈</div>
              <div class="stat-value">500+</div>
              <div class="stat-label">成功项目</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">👥</div>
              <div class="stat-value">100+</div>
              <div class="stat-label">专业团队</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🎯</div>
              <div class="stat-value">95%</div>
              <div class="stat-label">客户满意度</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🏆</div>
              <div class="stat-value">9年+</div>
              <div class="stat-label">行业经验</div>
            </div>
          </div>
          
          <div class="charts-showcase">
            <div class="chart-card-new">
              <h3>业务增长趋势</h3>
              <div class="chart-placeholder">
                <BaseChart :options="growthChartOptions" height="280px" />
              </div>
            </div>
            <div class="chart-card-new">
              <h3>客户行业分布</h3>
              <div class="chart-placeholder">
                <BaseChart :options="industryChartOptions" height="280px" />
              </div>
            </div>
          </div>
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
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '项目数量',
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      series: [
        {
          name: '完成项目',
          type: 'bar',
          data: [15, 28, 45, 68, 92],
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
        right: '5%',
        top: 'center',
        textStyle: {
          color: '#4a5568',
          fontSize: 12
        }
      },
      series: [
        {
          name: '行业分布',
          type: 'pie',
          radius: ['45%', '75%'],
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
              fontWeight: 'bold'
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
      industryChartOptions
    }
  }
}
</script>

<style scoped>
</style>

