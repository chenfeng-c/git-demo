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
          <h2>{{ eventsData.title }}</h2>
          <p>{{ eventsData.intro }}</p>

          <div class="events-grid">
            <div class="event-card" v-for="(event, index) in eventsData.events" :key="index">
              <div class="event-header">
                <div class="event-icon">{{ event.icon }}</div>
              </div>
              <div class="event-content">
                <h3>{{ event.title }}</h3>
                <div class="event-date">{{ event.date }}</div>
                <p>{{ event.description }}</p>
                <span class="event-status" :class="'status-' + event.status">
                  {{ getStatusText(event.status) }}
                </span>
              </div>
            </div>
          </div>

          <div class="activity-value">
            <h3>{{ eventsData.valueTitle }}</h3>
            <ul>
              <li v-for="(value, index) in eventsData.values" :key="index">{{ value }}</li>
            </ul>
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

