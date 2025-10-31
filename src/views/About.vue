<template>
  <div>
    <PageHeader
        type="about"
        title="关于我们"
        subtitle="探索我们的故事与使命"
        description="自2015年成立以来，我们始终坚持创新驱动、客户至上的理念，为客户创造卓越价值"
        :badges="['9年+ 行业经验', '500+ 成功项目', '100+ 专业团队']"
        icon="🏢"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <h2>{{ aboutContent.title }}</h2>
          
          <div class="info-section">
            <p>{{ aboutContent.intro }}</p>
          </div>

          <h3>{{ aboutContent.culture.title }}</h3>
          <p>{{ aboutContent.culture.content }}</p>

          <h3>{{ aboutContent.advantages.title }}</h3>
          <div class="info-section">
            <p v-for="(advantage, index) in aboutContent.advantages.items" :key="index">
              <strong>{{ advantage.label }}</strong>{{ advantage.text }}
            </p>
          </div>

          <h3>{{ aboutContent.timeline.title }}</h3>
          <div class="timeline">
            <div class="timeline-item" v-for="(item, index) in aboutContent.timeline.items" :key="index">
              <h4>{{ item.year }} - {{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
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

