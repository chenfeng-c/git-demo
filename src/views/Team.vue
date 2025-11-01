<template>
  <div>
    <PageHeader
        type="team"
        title="我们的团队"
        subtitle="汇聚精英，共创未来"
        description="我们拥有一支经验丰富、技术精湛的专业团队，致力于为客户提供最优质的服务"
        :badges="['50+ 团队成员', '10+ 年平均经验', '多领域专家']"
        icon="👥"
      />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <h2>{{ teamData.title }}</h2>
          <p>{{ teamData.intro }}</p>

          <el-row :gutter="20" class="stats-row">
            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" v-for="(stat, index) in teamData.stats" :key="index">
              <el-card class="stat-card" shadow="hover" :body-style="{ textAlign: 'center', padding: '30px', background: '#93c5fd', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </el-card>
            </el-col>
          </el-row>

          <h2 style="margin-top: 50px;">{{ teamData.membersTitle }}</h2>
          <el-row :gutter="20" class="members-row">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(member, index) in teamData.members" :key="index">
              <el-card class="member-card" shadow="hover" :body-style="{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }">
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

          <h2 style="margin-top: 50px;">{{ teamData.advantagesTitle }}</h2>
          <el-row :gutter="20" class="advantages-row">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="(advantage, index) in teamData.advantages" :key="index">
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
        <p>{{ footerText }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { companyInfo, footerText, teamData } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import '../assets/css/team.css'

export default {
  name: 'Team',
  components: {
    PageHeader
  },
  setup() {
    return {
      companyInfo,
      footerText,
      teamData
    }
  }
}
</script>

<style scoped>
</style>

