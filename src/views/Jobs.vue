<template>
  <div>
    <PageHeader
        type="jobs"
        title="加入我们"
        subtitle="寻找志同道合的伙伴"
        description="我们正在寻找有激情、有才华的你，一起创造技术的未来，实现职业梦想"
        :badges="['丰厚薪酬', '广阔发展', '团队氛围']"
        icon="💼"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <h2>{{ jobsData.title }}</h2>
          <p>{{ jobsData.intro }}</p>

          <div class="jobs-grid">
            <div class="job-card" v-for="(job, index) in jobsData.jobs" :key="index">
              <div class="job-header">
                <h3>{{ job.title }}</h3>
              </div>
              <div class="job-info">
                <div class="info-item">
                  <span class="info-label">📍</span>
                  <span class="info-text">{{ job.location }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">💰</span>
                  <span class="info-text">{{ job.salary }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">⏱️</span>
                  <span class="info-text">{{ job.experience }}</span>
                </div>
              </div>
              <div class="job-requirements">
                <h4>岗位要求</h4>
                <ul>
                  <li v-for="(req, idx) in job.requirements" :key="idx">{{ req }}</li>
                </ul>
              </div>
              <div class="job-footer">
                <button class="apply-btn" @click="applyJob(job.title)">立即应聘</button>
              </div>
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
import { companyInfo, footerText, jobsData } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import '../assets/css/jobs.css'

export default {
  name: 'Jobs',
  components: {
    PageHeader
  },
  setup() {
    const applyJob = (jobTitle) => {
      alert(`感谢您对 ${jobTitle} 职位的关注！\n请将简历发送至：hr@innovativetech.com`)
    }

    return {
      companyInfo,
      footerText,
      jobsData,
      applyJob
    }
  }
}
</script>

<style scoped>
</style>

