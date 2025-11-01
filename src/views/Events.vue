<template>
  <div>
    <PageHeader
        type="events"
        title="活动策划"
        subtitle="精彩活动，共同参与"
        description="我们定期组织各种技术交流、团队建设活动，促进学习成长和团队协作"
        :badges="['技术分享', '团队建设', '文化交流']"
        icon="🎉"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <section class="intro-section">
            <div class="section-header">
              <h2 class="section-title-main">{{ eventsData.title }}</h2>
            </div>
            <p class="intro-text">{{ eventsData.intro }}</p>
          </section>

          <section class="events-section">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(event, index) in eventsData.events" :key="index" style="margin-bottom: 20px;">
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
              <h3 style="margin: 0 0 18px 0; color: #1e40af;">{{ eventsData.valueTitle }}</h3>
              <ul style="line-height: 2; color: #4a5568; margin: 0; padding-left: 20px;">
                <li v-for="(value, index) in eventsData.values" :key="index">{{ value }}</li>
              </ul>
            </el-card>
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
import { companyInfo, footerText, eventsData } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import '../assets/css/events.css'

export default {
  name: 'Events',
  components: {
    PageHeader
  },
  setup() {
    const getStatusText = (status) => {
      const statusMap = {
        'upcoming': '即将开始',
        'ongoing': '进行中',
        'completed': '已完成'
      }
      return statusMap[status] || '未知'
    }

    return {
      companyInfo,
      footerText,
      eventsData,
      getStatusText
    }
  }
}
</script>

<style scoped>
</style>

