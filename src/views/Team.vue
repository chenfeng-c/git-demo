<template>
  <div>
    <PageHeader
        type="team"
        :title="translations.title"
        :subtitle="translations.subtitle"
        :description="translations.description"
        :badges="translations.badges"
        icon="👥"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <h2>{{ translations.introTitle }}</h2>
          <p>{{ translations.introText }}</p>

          <el-row :gutter="20" class="stats-row">
            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" v-for="(stat, index) in statsData" :key="index">
              <el-card class="stat-card" shadow="hover" :body-style="{ textAlign: 'center', padding: '30px', background: '#93c5fd', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </el-card>
            </el-col>
          </el-row>

          <h2 style="margin-top: 50px;">{{ translations.membersTitle }}</h2>
          <el-row :gutter="20" class="members-row">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(member, index) in membersList" :key="index">
              <el-card class="member-card" shadow="hover" :body-style="{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }">
                <div class="member-avatar-wrapper">
                  <img :src="member.avatar" :alt="member.name" class="member-avatar-img" />
                  <div class="member-avatar-overlay"></div>
                </div>
                <div class="member-info">
                  <h3>{{ member.name }}</h3>
                  <div class="member-position">{{ member.position }}</div>
                  <p class="member-description">{{ member.description }}</p>
                  <div class="member-skills-wrapper">
                    <el-tag v-for="(skill, idx) in member.skills" :key="idx" size="small">{{ skill }}</el-tag>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <h2 style="margin-top: 50px;">{{ translations.advantagesTitle }}</h2>
          <el-row :gutter="20" class="advantages-row">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="(advantage, index) in advantagesList" :key="index">
              <el-card class="advantage-card" shadow="hover" :body-style="{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '15px', height: '100%', minHeight: '100px' }">
                <div class="advantage-icon">✓</div>
                <div class="advantage-text">{{ advantage }}</div>
              </el-card>
            </el-col>
          </el-row>
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
import { useCompanyInfo } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'
import '../assets/css/team.css'

export default {
  name: 'Team',
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
        title: safeTranslate('team.title', locale),
        subtitle: safeTranslate('team.subtitle', locale),
        description: safeTranslate('team.description', locale),
        badges: [
          safeTranslate('team.badges.0', locale) || '50+ 团队成员',
          safeTranslate('team.badges.1', locale) || '10+ 年平均经验',
          safeTranslate('team.badges.2', locale) || '多领域专家'
        ],
        introTitle: safeTranslate('team.intro.title', locale),
        introText: safeTranslate('team.intro.text', locale),
        membersTitle: safeTranslate('team.membersTitle', locale),
        advantagesTitle: safeTranslate('team.advantagesTitle', locale)
      }
    })

    // 统计数据
    const statsData = computed(() => {
      const locale = localeRef.value
      return [
        { value: '50+', label: safeTranslate('team.stats.teamSize', locale) },
        { value: '10+', label: safeTranslate('team.stats.avgExperience', locale) },
        { value: '100+', label: safeTranslate('team.stats.successProjects', locale) },
        { value: '95%', label: safeTranslate('team.stats.satisfaction', locale) }
      ]
    })

    // 团队成员列表
    const membersList = computed(() => {
      const locale = localeRef.value
      const memberKeys = ['zhangwei', 'lina', 'wangqiang', 'liufang', 'chenjie', 'zhaomin']
      const avatars = {
        zhangwei: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
        lina: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format',
        wangqiang: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
        liufang: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format',
        chenjie: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format',
        zhaomin: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format'
      }
      
      return memberKeys.map(key => {
        const skills = []
        for (let i = 0; i < 3; i++) {
          const skill = safeTranslate(`team.members.${key}.skills.${i}`, locale)
          if (skill && !skill.startsWith('team.members')) {
            skills.push(skill)
          }
        }
        return {
          name: safeTranslate(`team.members.${key}.name`, locale),
          position: safeTranslate(`team.members.${key}.position`, locale),
          description: safeTranslate(`team.members.${key}.description`, locale),
          skills,
          avatar: avatars[key]
        }
      })
    })

    // 团队优势列表
    const advantagesList = computed(() => {
      const locale = localeRef.value
      const advantages = []
      for (let i = 0; i < 6; i++) {
        const adv = safeTranslate(`team.advantages.${i}`, locale)
        if (adv && !adv.startsWith('team.advantages')) {
          advantages.push(adv)
        }
      }
      return advantages
    })

    // Footer text with translation
    const footerTextComputed = computed(() => {
      return safeTranslate('home.footer', localeRef.value)
    })

    return {
      companyInfo,
      translations,
      statsData,
      membersList,
      advantagesList,
      footerTextComputed
    }
  }
}
</script>

<style scoped>
</style>

