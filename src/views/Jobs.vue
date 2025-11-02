<template>
  <div>
    <PageHeader
        type="jobs"
        :title="translations.title"
        :subtitle="translations.subtitle"
        :description="translations.description"
        :badges="translations.badges"
        icon="💼"
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

          <section class="jobs-section">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(job, index) in jobsList" :key="index" style="margin-bottom: 20px;">
                <el-card class="job-card" shadow="hover" :body-style="{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }">
                  <div class="job-image-wrapper">
                    <img :src="job.image" :alt="job.title" class="job-image" />
                    <div class="job-image-overlay">
                      <h3 class="job-title-overlay">{{ job.title }}</h3>
                    </div>
                  </div>
                  
                  <div class="job-content">
                    <el-descriptions :column="1" border style="margin-bottom: 20px;">
                      <el-descriptions-item :label="translations.location">
                        {{ job.location }}
                      </el-descriptions-item>
                      <el-descriptions-item :label="translations.salary">
                        {{ job.salary }}
                      </el-descriptions-item>
                      <el-descriptions-item :label="translations.experience">
                        {{ job.experience }}
                      </el-descriptions-item>
                    </el-descriptions>
                    
                    <el-divider content-position="left">{{ translations.requirements }}</el-divider>
                    
                    <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #64748b; line-height: 2; flex: 1;">
                      <li v-for="(req, idx) in job.requirements" :key="idx" style="margin-bottom: 8px;">{{ req }}</li>
                    </ul>
                    
                    <div style="text-align: right; margin-top: auto;">
                      <el-button type="primary" @click="applyJob(job.title)">{{ translations.applyNow }}</el-button>
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
        <p>{{ footerTextComputed }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useCompanyInfo } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'
import '../assets/css/jobs.css'

export default {
  name: 'Jobs',
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
        title: safeTranslate('jobs.title', locale),
        subtitle: safeTranslate('jobs.subtitle', locale),
        description: safeTranslate('jobs.description', locale),
        badges: [
          safeTranslate('jobs.badges.0', locale) || '丰厚薪酬',
          safeTranslate('jobs.badges.1', locale) || '广阔发展',
          safeTranslate('jobs.badges.2', locale) || '团队氛围'
        ],
        intro: safeTranslate('jobs.intro', locale),
        location: safeTranslate('jobs.positions.frontend.location', locale),
        salary: safeTranslate('jobs.positions.frontend.salary', locale),
        experience: safeTranslate('jobs.positions.frontend.experience', locale),
        requirements: safeTranslate('jobs.positions.frontend.requirements', locale),
        applyNow: safeTranslate('jobs.applyNow', locale) || '立即应聘',
        applyTitle: safeTranslate('jobs.applyTitle', locale) || '应聘提示',
        applyMessagePrefix: safeTranslate('jobs.applyMessagePrefix', locale) || '感谢您对',
        applyMessageSuffix: safeTranslate('jobs.applyMessageSuffix', locale) || '职位的关注！',
        applyMessageEmail: safeTranslate('jobs.applyMessageEmail', locale) || '请将简历发送至：qq3484763071@gmail.com',
        confirm: safeTranslate('profile.confirm', locale) || '确定'
      }
    })

    // 职位列表
    const jobsList = computed(() => {
      const locale = localeRef.value
      const positions = ['frontend', 'backend', 'product', 'designer']
      const images = {
        frontend: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format',
        backend: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format',
        product: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
        designer: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&auto=format'
      }
      
      return positions.map(pos => ({
        title: safeTranslate(`jobs.positions.${pos}.title`, locale),
        location: safeTranslate(`jobs.positions.${pos}.locationValue`, locale),
        salary: safeTranslate(`jobs.positions.${pos}.salaryValue`, locale),
        experience: safeTranslate(`jobs.positions.${pos}.experienceValue`, locale),
        requirements: (() => {
          const reqs = []
          for (let i = 0; i < 4; i++) {
            const req = safeTranslate(`jobs.positions.${pos}.requirementsList.${i}`, locale)
            if (req && !req.startsWith('jobs.positions')) {
              reqs.push(req)
            }
          }
          return reqs
        })(),
        image: images[pos]
      }))
    })

    const applyJob = (jobTitle) => {
      const emailText = translations.value.applyMessageEmail.replace('[AT]', '@')
      const message = `${translations.value.applyMessagePrefix} ${jobTitle} ${translations.value.applyMessageSuffix}\n${emailText}`
      ElMessageBox.alert(message, translations.value.applyTitle, {
        confirmButtonText: translations.value.confirm,
        type: 'info'
      })
    }

    // Footer text with translation
    const footerTextComputed = computed(() => {
      return safeTranslate('home.footer', localeRef.value)
    })

    return {
      companyInfo,
      translations,
      jobsList,
      footerTextComputed,
      applyJob
    }
  }
}
</script>

<style scoped>
</style>

