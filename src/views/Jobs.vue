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
          <section class="intro-section">
            <div class="section-header">
              <h2 class="section-title-main">{{ jobsData.title }}</h2>
            </div>
            <p class="intro-text">{{ jobsData.intro }}</p>
          </section>

          <section class="jobs-section">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(job, index) in jobsData.jobs" :key="index" style="margin-bottom: 20px;">
                <el-card class="job-card" shadow="hover" :body-style="{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }">
                  <div class="job-image-wrapper">
                    <img :src="job.image" :alt="job.title" class="job-image" />
                    <div class="job-image-overlay">
                      <h3 class="job-title-overlay">{{ job.title }}</h3>
                    </div>
                  </div>
                  
                  <div class="job-content">
                    <el-descriptions :column="1" border style="margin-bottom: 20px;">
                      <el-descriptions-item label="📍 工作地点">
                        {{ job.location }}
                      </el-descriptions-item>
                      <el-descriptions-item label="💰 薪资待遇">
                        {{ job.salary }}
                      </el-descriptions-item>
                      <el-descriptions-item label="⏱️ 工作经验">
                        {{ job.experience }}
                      </el-descriptions-item>
                    </el-descriptions>
                    
                    <el-divider content-position="left">岗位要求</el-divider>
                    
                    <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #64748b; line-height: 2; flex: 1;">
                      <li v-for="(req, idx) in job.requirements" :key="idx" style="margin-bottom: 8px;">{{ req }}</li>
                    </ul>
                    
                    <div style="text-align: right; margin-top: auto;">
                      <el-button type="primary" @click="applyJob(job.title)">立即应聘</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
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
import { ElMessageBox } from 'element-plus'
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
      ElMessageBox.alert(`感谢您对 ${jobTitle} 职位的关注！\n请将简历发送至：hr@innovativetech.com`, '应聘提示', {
        confirmButtonText: '确定',
        type: 'info'
      })
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

