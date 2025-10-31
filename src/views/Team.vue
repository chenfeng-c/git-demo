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

          <div class="stats-section">
            <div class="stat-card" v-for="(stat, index) in teamData.stats" :key="index">
              <h3>{{ stat.value }}</h3>
              <p>{{ stat.label }}</p>
            </div>
          </div>

          <h2 style="margin-top: 50px;">{{ teamData.membersTitle }}</h2>
          <div class="team-grid">
            <div class="member-card" v-for="(member, index) in teamData.members" :key="index">
              <div class="member-avatar">{{ member.name }}</div>
              <div class="member-info">
                <h3>{{ member.name }}</h3>
                <div class="member-title">{{ member.position }}</div>
                <p>{{ member.description }}</p>
                <div class="member-skills">
                  <span class="skill-tag" v-for="(skill, idx) in member.skills" :key="idx">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h2 style="margin-top: 50px;">{{ teamData.advantagesTitle }}</h2>
          <div class="advantages-grid">
            <div class="advantage-card" v-for="(advantage, index) in teamData.advantages" :key="index">
              <div class="advantage-icon">✓</div>
              <div class="advantage-text">{{ advantage }}</div>
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

