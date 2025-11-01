<template>
  <div class="about-page">
    <PageHeader
      type="about"
      title="关于我们"
      subtitle="探索我们的故事与使命"
      description="自2020年成立以来，我们始终坚持创新驱动、客户至上的理念，为客户创造卓越价值"
      :badges="['9年+ 行业经验', '500+ 成功项目', '100+ 专业团队']"
      icon="🏢"
    />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <!-- 公司简介 -->
          <section class="about-section intro-section">
            <div class="section-header">
              <h2 class="section-title-main">{{ aboutContent.title }}</h2>
            </div>
            <el-card class="intro-card" shadow="hover" :body-style="{ padding: '40px' }">
              <p class="intro-text">{{ aboutContent.intro }}</p>
            </el-card>
          </section>

          <!-- 企业文化 -->
          <section class="culture-section">
            <div class="section-header">
              <h3 class="section-title">{{ aboutContent.culture.title }}</h3>
            </div>
            <el-card class="culture-card" shadow="hover" :body-style="{ padding: '35px' }">
              <p class="culture-text">{{ aboutContent.culture.content }}</p>
            </el-card>
          </section>

          <!-- 核心优势 -->
          <section class="advantages-section">
            <div class="section-header">
              <h3 class="section-title">{{ aboutContent.advantages.title }}</h3>
            </div>
            <el-row :gutter="30" class="advantages-grid" justify="center">
              <el-col 
                v-for="(advantage, index) in aboutContent.advantages.items" 
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
              <h3 class="section-title">{{ aboutContent.timeline.title }}</h3>
              <p class="timeline-subtitle" v-if="aboutContent.timeline.subtitle">{{ aboutContent.timeline.subtitle }}</p>
            </div>
            <div class="custom-timeline">
              <div 
                v-for="(item, index) in aboutContent.timeline.items"
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
        <p>{{ footerText }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { companyInfo, footerText, aboutContent } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import '../assets/css/about.css'

export default {
  name: 'About',
  components: {
    PageHeader
  },
  setup() {
    return {
      companyInfo,
      footerText,
      aboutContent
    }
  }
}
</script>

<style scoped>
</style>

