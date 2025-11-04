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

          <section class="leadership-section">
            <div class="section-header">
              <h2 class="section-title">{{ translations.leadershipTitle }}</h2>
              <p class="section-subtitle">{{ translations.leadershipSubtitle }}</p>
            </div>
            <el-row :gutter="24">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(leader, index) in leadershipList" :key="index">
                <el-card class="leader-card" shadow="hover" :body-style="{ padding: '0', height: '100%' }">
                  <div class="leader-image-wrapper">
                    <img :src="leader.avatar" :alt="leader.name" class="leader-image" />
                    <div class="leader-overlay"></div>
                  </div>
                  <div class="leader-content">
                    <h3 class="leader-name">{{ leader.name }}</h3>
                    <div class="leader-role">{{ leader.role }}</div>
                    <p class="leader-quote">{{ leader.quote }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </section>

          <section class="moments-section">
            <div class="section-header">
              <h2 class="section-title">{{ translations.momentsTitle }}</h2>
              <p class="section-subtitle">{{ translations.momentsSubtitle }}</p>
            </div>
            <el-carousel indicator-position="outside" height="320px" class="moments-carousel" :interval="6500">
              <el-carousel-item v-for="(moment, index) in teamMoments" :key="index">
                <div class="moment-slide">
                  <div class="moment-media">
                    <img :src="moment.image" :alt="moment.title" />
                  </div>
                  <div class="moment-content">
                    <div class="moment-tag">{{ moment.tag }}</div>
                    <h3 class="moment-title">{{ moment.title }}</h3>
                    <p class="moment-description">{{ moment.description }}</p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </section>

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
        advantagesTitle: safeTranslate('team.advantagesTitle', locale),
        leadershipTitle: safeTranslate('team.leadership.title', locale),
        leadershipSubtitle: safeTranslate('team.leadership.subtitle', locale),
        momentsTitle: safeTranslate('team.moments.title', locale),
        momentsSubtitle: safeTranslate('team.moments.subtitle', locale)
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

    const leadershipList = computed(() => {
      const locale = localeRef.value
      const keys = ['ceo', 'cto', 'coo']
      const avatars = {
        ceo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop&auto=format',
        cto: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=600&fit=crop&auto=format',
        coo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&h=600&fit=crop&auto=format'
      }

      return keys.map(key => ({
        name: safeTranslate(`team.leadership.members.${key}.name`, locale),
        role: safeTranslate(`team.leadership.members.${key}.role`, locale),
        quote: safeTranslate(`team.leadership.members.${key}.quote`, locale),
        avatar: avatars[key]
      }))
    })

    const teamMoments = computed(() => {
      const locale = localeRef.value
      const keys = ['hackathon', 'retreat', 'volunteer', 'innovation']
      const images = {
        hackathon: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=700&fit=crop&auto=format',
        retreat: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=700&fit=crop&auto=format',
        volunteer: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&h=700&fit=crop&auto=format',
        innovation: 'https://images.unsplash.com/photo-1522071901873-411886a10004?w=1200&h=700&fit=crop&auto=format'
      }

      return keys.map(key => ({
        image: images[key],
        tag: safeTranslate(`team.moments.items.${key}.tag`, locale),
        title: safeTranslate(`team.moments.items.${key}.title`, locale),
        description: safeTranslate(`team.moments.items.${key}.description`, locale)
      }))
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
      leadershipList,
      teamMoments,
      advantagesList,
      footerTextComputed
    }
  }
}
</script>

<style scoped>
</style>

