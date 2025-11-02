<template>
  <div class="external-portal">
    <PageHeader
      title="合作伙伴中心"
      subtitle="企业外部人员专属入口"
      description="访问共享资源、提交需求并获取实时协同信息，助力项目顺利推进。"
      :badges="['项目协同', '资料下载', '专属支持']"
      icon="🤝"
    />

    <section class="portal-section">
      <div class="container">
        <el-row :gutter="24" class="top-row">
          <el-col :xs="24" :lg="16">
            <el-card shadow="hover" class="card-block">
              <div class="card-header">
                <h3>本周重点事项</h3>
              </div>
              <el-timeline>
                <el-timeline-item
                  v-for="item in highlights"
                  :key="item.time"
                  :timestamp="item.time"
                  :type="item.type"
                >
                  <p class="highlight-title">{{ item.title }}</p>
                  <p class="highlight-desc">{{ item.description }}</p>
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </el-col>
          <el-col :xs="24" :lg="8">
            <el-card shadow="hover" class="card-block support-card">
              <div class="card-header">
                <h3>专属支持</h3>
              </div>
              <div class="contact-card">
                <div class="contact-icon">👩‍💼</div>
                <div class="contact-info">
                  <div class="contact-name">客户成功经理 · 李萌</div>
                  <div class="contact-item">📞 135-0000-0000</div>
                  <div class="contact-item">✉️ partner-support@innovativetech.com</div>
                </div>
              </div>
              <el-divider />
              <div class="availability">
                <p>在线时间</p>
                <el-tag type="success">工作日 09:00 - 19:00</el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="24" class="resource-row">
          <el-col :xs="24" :lg="12">
            <el-card shadow="hover" class="card-block">
              <div class="card-header">
                <h3>项目资源</h3>
              </div>
              <el-collapse accordion>
                <el-collapse-item
                  v-for="resource in resources"
                  :key="resource.category"
                  :title="resource.category"
                >
                  <ul class="resource-list">
                    <li v-for="file in resource.files" :key="file.name">
                      <div class="resource-icon">{{ file.icon }}</div>
                      <div class="resource-info">
                        <div class="resource-name">{{ file.name }}</div>
                        <div class="resource-meta">更新：{{ file.updated }} · {{ file.size }}</div>
                      </div>
                      <el-button type="primary" link>下载</el-button>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>
          <el-col :xs="24" :lg="12">
            <el-card shadow="hover" class="card-block">
              <div class="card-header">
                <h3>合作清单</h3>
              </div>
              <el-table :data="projects" border stripe>
                <el-table-column prop="name" label="项目" min-width="180" />
                <el-table-column prop="stage" label="阶段" width="120" />
                <el-table-column prop="contact" label="负责人" width="130" />
                <el-table-column prop="nextStep" label="下一步计划" min-width="160" />
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'

export default {
  name: 'ExternalPortal',
  components: {
    PageHeader
  },
  setup() {
    const highlights = computed(() => [
      {
        title: '提交季度合作成果报告',
        description: '请于 11 月 6 日前完成模板填写并上传至项目资源库。',
        time: '周一',
        type: 'primary'
      },
      {
        title: '产品培训直播预约',
        description: '新功能线上培训将于 11 月 8 日举办，欢迎提前报名。',
        time: '周三',
        type: 'success'
      },
      {
        title: '安全合规更新',
        description: '请确认新签订的《合作伙伴保密协议（2025）》已下载并签署。',
        time: '周五',
        type: 'warning'
      }
    ])

    const resources = computed(() => [
      {
        category: '项目资料',
        files: [
          { name: '2025 Q1 需求说明书.pdf', updated: '2025-10-30', size: '2.6 MB', icon: '📄' },
          { name: '最新 UI 规范设计包.zip', updated: '2025-10-28', size: '18.4 MB', icon: '🎨' }
        ]
      },
      {
        category: '上线指南',
        files: [
          { name: '集成接口文档 v2.1.docx', updated: '2025-10-26', size: '1.2 MB', icon: '🧩' },
          { name: '部署流程清单.xlsx', updated: '2025-10-25', size: '640 KB', icon: '✅' }
        ]
      }
    ])

    const projects = computed(() => [
      { name: '智慧园区协同平台', stage: '需求确认', contact: '陈工', nextStep: '11/06 方案评审' },
      { name: '移动端客户门户', stage: '开发中', contact: '王敏', nextStep: '11/08 功能验收' },
      { name: '数据可视化大屏', stage: '部署上线', contact: '刘洋', nextStep: '11/10 培训安排' }
    ])

    return {
      highlights,
      resources,
      projects
    }
  }
}
</script>

<style scoped>
.external-portal {
  background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%);
  min-height: 100vh;
}

.portal-section {
  padding: 40px 0 80px;
}

.card-block {
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  margin-bottom: 24px;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 90%);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.card-header {
  padding: 16px 20px 0;
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.highlight-title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 4px;
}

.highlight-desc {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.support-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px;
  background: rgba(30, 64, 175, 0.06);
  border-radius: 14px;
  margin: 16px 16px 0;
}

.contact-icon {
  font-size: 2.2rem;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
}

.contact-item {
  font-size: 0.92rem;
  color: #475569;
}

.availability {
  text-align: center;
  padding: 0 0 16px;
  color: #475569;
}

.availability p {
  margin-bottom: 8px;
  font-weight: 600;
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.resource-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 4px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
}

.resource-icon {
  font-size: 1.6rem;
}

.resource-info {
  flex: 1;
}

.resource-name {
  font-weight: 600;
  color: #1f2937;
}

.resource-meta {
  color: #64748b;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .portal-section {
    padding: 24px 0 60px;
  }

  .card-block {
    margin-bottom: 16px;
  }

  .contact-card {
    margin: 16px;
  }
}
</style>

