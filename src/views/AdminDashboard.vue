<template>
  <div class="admin-dashboard">
    <PageHeader
      :title="translations.title"
      :subtitle="translations.subtitle"
      :description="translations.description"
      :badges="translations.badges"
      icon="🛠️"
    />

    <section class="dashboard-section">
      <div class="container">
        <el-row :gutter="24" class="metrics-row">
          <el-col
            v-for="metric in metrics"
            :key="metric.title"
            :xs="24"
            :sm="12"
            :lg="6"
          >
            <el-card shadow="hover" class="metric-card">
              <div class="metric-icon">{{ metric.icon }}</div>
              <div class="metric-title">{{ metric.title }}</div>
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-trend" :class="metric.trend >= 0 ? 'trend-up' : 'trend-down'">
                {{ metric.trend >= 0 ? '+' : '' }}{{ metric.trend }}% {{ translations.weeklyGrowth }}
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="24" class="content-row">
          <el-col :xs="24" :lg="16">
            <el-card shadow="hover" class="card-block">
              <div class="card-header">
                <h3>{{ translations.pendingTasksTitle }}</h3>
              </div>
              <el-table :data="pendingTasks" border stripe size="large">
                <el-table-column prop="name" :label="translations.taskColumn" min-width="200" />
                <el-table-column prop="owner" :label="translations.ownerColumn" width="140" />
                <el-table-column prop="deadline" :label="translations.deadlineColumn" width="150" />
                <el-table-column prop="status" :label="translations.statusColumn" width="120">
                  <template #default="scope">
                    <el-tag :type="statusType(scope.row.status)">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :xs="24" :lg="8">
            <el-card shadow="hover" class="card-block">
              <div class="card-header">
                <h3>{{ translations.quickActionsTitle }}</h3>
              </div>
              <ul class="quick-actions">
                <li v-for="action in quickActions" :key="action.label">
                  <div class="action-icon">{{ action.icon }}</div>
                  <div class="action-info">
                    <div class="action-label">{{ action.label }}</div>
                    <div class="action-desc">{{ action.description }}</div>
                  </div>
                  <el-button type="primary" link @click="handleAction(action)">{{ translations.enter }}</el-button>
                </li>
              </ul>
            </el-card>
            <el-card shadow="hover" class="card-block notifications">
              <div class="card-header">
                <h3>{{ translations.notificationsTitle }}</h3>
              </div>
              <el-timeline>
                <el-timeline-item
                  v-for="notice in notifications"
                  :key="notice.time"
                  :timestamp="notice.time"
                  :type="notice.type"
                >
                  <p class="notice-title">{{ notice.title }}</p>
                  <p class="notice-content">{{ notice.content }}</p>
                </el-timeline-item>
              </el-timeline>
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
import { user as userState } from '../store/auth'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'

export default {
  name: 'AdminDashboard',
  components: {
    PageHeader
  },
  setup() {
    const localeRef = i18n.global.locale
    const userName = computed(() => userState.value?.name || safeTranslate('admin.adminRole', localeRef.value))

    // 翻译
    const translations = computed(() => {
      const locale = localeRef.value
      return {
        title: safeTranslate('admin.title', locale),
        subtitle: safeTranslate('admin.subtitle', locale),
        description: safeTranslate('admin.description', locale),
        badges: [
          safeTranslate('admin.badges.0', locale) || '访问控制',
          safeTranslate('admin.badges.1', locale) || '审核流程',
          safeTranslate('admin.badges.2', locale) || '系统健康'
        ],
        weeklyGrowth: safeTranslate('admin.metrics.weeklyGrowth', locale) || '本周',
        pendingTasksTitle: safeTranslate('admin.pendingTasks.title', locale),
        taskColumn: safeTranslate('admin.pendingTasks.columns.task', locale),
        ownerColumn: safeTranslate('admin.pendingTasks.columns.owner', locale),
        deadlineColumn: safeTranslate('admin.pendingTasks.columns.deadline', locale),
        statusColumn: safeTranslate('admin.pendingTasks.columns.status', locale),
        quickActionsTitle: safeTranslate('admin.quickActions.title', locale),
        enter: safeTranslate('admin.enter', locale) || '进入',
        notificationsTitle: safeTranslate('admin.notificationsTitle', locale) || '系统通知'
      }
    })

    const metrics = computed(() => {
      const locale = localeRef.value
      return [
        { title: safeTranslate('admin.metrics.activeProjects', locale) || '活跃项目', value: 18, trend: 12, icon: '📊' },
        { title: safeTranslate('admin.metrics.pendingTasks', locale) || '待审核申请', value: 5, trend: -8, icon: '🗂️' },
        { title: safeTranslate('admin.metrics.newPartners', locale) || '新合作伙伴', value: 3, trend: 25, icon: '🤝' },
        { title: safeTranslate('admin.metrics.systemHealth', locale) || '系统健康度', value: '98%', trend: 2, icon: '⚙️' }
      ]
    })

    const pendingTasks = computed(() => {
      const locale = localeRef.value
      return [
        { name: safeTranslate('admin.tasks.task1', locale) || '审核外部人员访问权限', owner: userName.value, deadline: '2025-11-05', status: safeTranslate('admin.taskStatus.pending', locale) || '待处理' },
        { name: safeTranslate('admin.tasks.task2', locale) || '更新合作伙伴协议模板', owner: safeTranslate('admin.departments.legal', locale) || '法务部', deadline: '2025-11-03', status: safeTranslate('admin.taskStatus.ongoing', locale) || '进行中' },
        { name: safeTranslate('admin.tasks.task3', locale) || '发布新版本部署计划', owner: safeTranslate('admin.departments.techOps', locale) || '技术运营', deadline: '2025-11-07', status: safeTranslate('admin.taskStatus.ongoing', locale) || '进行中' },
        { name: safeTranslate('admin.tasks.task4', locale) || '整理季度运营报告', owner: safeTranslate('admin.departments.dataAnalysis', locale) || '数据分析', deadline: '2025-11-10', status: safeTranslate('admin.taskStatus.pending', locale) || '待处理' }
      ]
    })

    const quickActions = computed(() => {
      const locale = localeRef.value
      return [
        { label: safeTranslate('admin.quickActions.approve', locale) || '审批中心', description: safeTranslate('admin.quickActions.approveDesc', locale) || '处理权限申请与资料更新', icon: '✅', target: '/admin/approvals' },
        { label: safeTranslate('admin.quickActions.viewReports', locale) || '合作伙伴管理', description: safeTranslate('admin.quickActions.viewReportsDesc', locale) || '维护企业外部人员信息', icon: '🤝', target: '/admin/partners' },
        { label: safeTranslate('admin.quickActions.manageUsers', locale) || '安全日志', description: safeTranslate('admin.quickActions.manageUsersDesc', locale) || '查看系统访问与安全审计', icon: '🔐', target: '/admin/security' }
      ]
    })

    const notifications = computed(() => {
      const locale = localeRef.value
      return [
        { title: safeTranslate('admin.notifications.1.title', locale) || '安全提醒', content: safeTranslate('admin.notifications.1.content', locale) || '检测到 2 条异常登录行为，已自动锁定相关账号。', time: safeTranslate('admin.notifications.1.time', locale) || '2 小时前', type: 'danger' },
        { title: safeTranslate('admin.notifications.2.title', locale) || '系统更新', content: safeTranslate('admin.notifications.2.content', locale) || '版本 v2.3 已部署，新增数据脱敏与二次验证功能。', time: safeTranslate('admin.notifications.2.time', locale) || '昨天', type: 'primary' },
        { title: safeTranslate('admin.notifications.3.title', locale) || '运维提示', content: safeTranslate('admin.notifications.3.content', locale) || '夜间计划于 23:00 - 23:30 进行数据库维护，请提前完成备份。', time: safeTranslate('admin.notifications.3.time', locale) || '11 月 1 日', type: 'info' }
      ]
    })

    const statusType = (status) => {
      const locale = localeRef.value
      const completed = safeTranslate('admin.taskStatus.completed', locale) || '已完成'
      const ongoing = safeTranslate('admin.taskStatus.ongoing', locale) || '进行中'
      
      if (status === completed) return 'success'
      if (status === ongoing) return 'warning'
      return 'info'
    }

    const handleAction = (action) => {
      console.info('Navigate to:', action.target)
    }

    return {
      translations,
      metrics,
      pendingTasks,
      quickActions,
      notifications,
      statusType,
      handleAction
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
  min-height: 100vh;
}

.dashboard-section {
  padding: 40px 0 80px;
}

.metrics-row {
  margin-bottom: 32px;
}

.metric-card {
  text-align: center;
  border-radius: 18px;
  padding: 28px 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 70%);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.metric-icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
}

.metric-title {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e3a8a;
}

.metric-trend {
  margin-top: 8px;
  font-size: 0.95rem;
}

.trend-up {
  color: #16a34a;
}

.trend-down {
  color: #dc2626;
}

.card-block {
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  margin-bottom: 24px;
  padding: 0 4px 12px;
  background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 90%);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 16px 0 0 16px;
}

.quick-actions {
  list-style: none;
  padding: 0 16px 8px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.quick-actions li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.quick-actions li:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(30, 64, 175, 0.18);
}

.action-icon {
  font-size: 1.8rem;
}

.action-info {
  flex: 1;
}

.action-label {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.action-desc {
  font-size: 0.92rem;
  color: #475569;
}

.notifications {
  margin-top: 16px;
}

.notice-title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 4px;
}

.notice-content {
  margin: 0;
  color: #475569;
  font-size: 0.92rem;
}

@media (max-width: 768px) {
  .dashboard-section {
    padding: 24px 0 60px;
  }

  .metric-card {
    margin-bottom: 16px;
  }

  .card-block {
    padding-bottom: 16px;
  }
}
</style>

