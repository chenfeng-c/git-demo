<template>
  <div class="profile-page">
    <PageHeader
      type="profile"
      title="个人中心"
      subtitle="管理您的个人信息"
      description="查看和编辑您的个人资料、账户设置"
      :badges="['个人资料', '账户安全', '设置管理']"
      icon="👤"
    />
    
    <div class="container">
      <div class="content">
        <div class="content-inner">
          <!-- 用户信息卡片 -->
          <section class="profile-section">
            <el-card class="profile-card" shadow="hover">
              <div class="profile-header-info">
                <div class="profile-avatar-large">
                  <span class="avatar-text">{{ userInitial }}</span>
                </div>
                <div class="profile-basic-info">
                  <h2 class="profile-name-large">{{ user?.name || '未设置' }}</h2>
                  <p class="profile-username-large">@{{ user?.username || 'unknown' }}</p>
                  <p v-if="user?.email" class="profile-email-large">{{ user?.email }}</p>
                </div>
              </div>
            </el-card>
          </section>

          <!-- 详细信息 -->
          <section class="details-section">
            <el-card class="details-card" shadow="hover" :body-style="{ padding: '40px' }">
              <div class="section-header-title">
                <h3 class="section-title">个人信息</h3>
              </div>
              <el-descriptions :column="1" border class="user-descriptions">
                <el-descriptions-item label="用户名">
                  {{ user?.username || '未设置' }}
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                  {{ user?.name || '未设置' }}
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  {{ user?.email || '未设置' }}
                </el-descriptions-item>
                <el-descriptions-item label="注册时间">
                  {{ formatDate(user?.createdAt) || '未知' }}
                </el-descriptions-item>
                <el-descriptions-item label="最后登录">
                  {{ formatDate(user?.lastLogin) || '未知' }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </section>

          <!-- 操作按钮 -->
          <section class="actions-section">
            <el-row :gutter="20" class="action-buttons-row">
              <el-col :xs="24" :sm="24" :md="8">
                <div class="action-button-wrapper">
                  <el-button type="primary" size="large" @click="handleEditProfile" class="action-button">
                    编辑资料
                  </el-button>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <div class="action-button-wrapper">
                  <el-button type="warning" size="large" @click="handleChangePassword" class="action-button">
                    修改密码
                  </el-button>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <div class="action-button-wrapper">
                  <el-button type="danger" size="large" @click="handleLogout" class="action-button">
                    退出登录
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </section>
        </div>
      </div>
    </div>

    <!-- 编辑资料对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑资料"
      :width="dialogWidth"
      :before-close="handleEditDialogClose"
      class="profile-dialog"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editFormRules"
        :label-width="formLabelWidth"
        :label-position="formLabelPosition"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleEditDialogClose">取消</el-button>
          <el-button type="primary" @click="handleEditSubmit" :loading="editLoading">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      :width="dialogWidth"
      :before-close="handlePasswordDialogClose"
      class="profile-dialog"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordFormRules"
        :label-width="formLabelWidth"
        :label-position="formLabelPosition"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePasswordDialogClose">取消</el-button>
          <el-button type="primary" @click="handlePasswordSubmit" :loading="passwordLoading">
            确认修改
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <footer>
      <div class="container">
        <p>{{ footerText }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, onMounted, ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { user as userState, token, logout, updateUser } from '../store/auth'
import { updateUserInfo, changePassword } from '../api/index'
import { footerText } from '../utils/data'
import PageHeader from '../components/PageHeader.vue'
import '../assets/css/profile.css'

export default {
  name: 'Profile',
  components: {
    PageHeader
  },
  setup() {
    const router = useRouter()
    const user = computed(() => userState.value)
    const userToken = computed(() => token.value)

    // 响应式宽度
    const windowWidth = ref(window.innerWidth)
    
    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth)
      updateWindowWidth()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth)
    })

    // 弹窗宽度
    const dialogWidth = computed(() => {
      if (windowWidth.value <= 480) {
        return '90%'
      } else if (windowWidth.value <= 768) {
        return '85%'
      }
      return '500px'
    })

    // 表单label宽度
    const formLabelWidth = computed(() => {
      if (windowWidth.value <= 480) {
        return '80px'
      }
      return '100px'
    })

    // 表单label位置
    const formLabelPosition = computed(() => {
      if (windowWidth.value <= 480) {
        return 'top'
      }
      return 'left'
    })

    // 对话框状态
    const editDialogVisible = ref(false)
    const passwordDialogVisible = ref(false)
    const editLoading = ref(false)
    const passwordLoading = ref(false)

    // 表单引用
    const editFormRef = ref(null)
    const passwordFormRef = ref(null)

    // 编辑资料表单
    const editForm = reactive({
      username: '',
      name: '',
      email: ''
    })

    // 修改密码表单
    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    // 编辑资料表单验证规则
    const editFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ]
    }

    // 修改密码表单验证规则
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    const passwordFormRules = {
      oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' }
      ],
      newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
      ]
    }

    // 计算用户名字首字母（用于头像）
    const userInitial = computed(() => {
      if (!user.value || !user.value.name) return 'U'
      return user.value.name.charAt(0).toUpperCase()
    })

    // 格式化日期
    const formatDate = (dateString) => {
      if (!dateString) return null
      try {
        const date = new Date(dateString)
        return date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return dateString
      }
    }

    // 检查登录状态
    onMounted(() => {
      if (!user.value) {
        ElMessage.warning('请先登录')
        router.push('/login')
      }
    })

    // 打开编辑资料对话框
    const handleEditProfile = () => {
      if (!user.value) {
        ElMessage.warning('请先登录')
        return
      }
      
      // 填充表单数据
      editForm.username = user.value.username || ''
      editForm.name = user.value.name || ''
      editForm.email = user.value.email || ''
      editDialogVisible.value = true
    }

    // 关闭编辑资料对话框
    const handleEditDialogClose = () => {
      editDialogVisible.value = false
      editFormRef.value?.resetFields()
    }

    // 提交编辑资料
    const handleEditSubmit = async () => {
      if (!editFormRef.value) return

      try {
        await editFormRef.value.validate()
        editLoading.value = true

        const response = await updateUserInfo(userToken.value, {
          username: editForm.username,
          name: editForm.name,
          email: editForm.email
        })

        if (response.success) {
          // 更新用户信息到 store
          updateUser(response.data.user)
          
          ElMessage.success('资料更新成功')
          handleEditDialogClose()
        } else {
          ElMessage.error(response.message || '更新失败')
        }
      } catch (error) {
        if (error !== false) {
          console.error('Update profile error:', error)
          ElMessage.error('更新失败，请稍后重试')
        }
      } finally {
        editLoading.value = false
      }
    }

    // 打开修改密码对话框
    const handleChangePassword = () => {
      if (!user.value) {
        ElMessage.warning('请先登录')
        return
      }
      
      // 重置表单
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
      passwordDialogVisible.value = true
    }

    // 关闭修改密码对话框
    const handlePasswordDialogClose = () => {
      passwordDialogVisible.value = false
      passwordFormRef.value?.resetFields()
    }

    // 提交修改密码
    const handlePasswordSubmit = async () => {
      if (!passwordFormRef.value) return

      try {
        await passwordFormRef.value.validate()
        passwordLoading.value = true

        const response = await changePassword(
          userToken.value,
          passwordForm.oldPassword,
          passwordForm.newPassword
        )

        if (response.success) {
          ElMessage.success('密码修改成功，请重新登录')
          handlePasswordDialogClose()
          
          // 延迟退出登录，让用户看到成功提示
          setTimeout(async () => {
            await logout()
            router.push('/login')
          }, 1500)
        } else {
          ElMessage.error(response.message || '密码修改失败')
        }
      } catch (error) {
        if (error !== false) {
          console.error('Change password error:', error)
          ElMessage.error('修改失败，请稍后重试')
        }
      } finally {
        passwordLoading.value = false
      }
    }

    // 退出登录
    const handleLogout = async () => {
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        await logout()
        ElMessage.success('已退出登录')
        router.push('/')
      } catch (error) {
        // 用户取消
      }
    }

    return {
      user,
      userInitial,
      footerText,
      formatDate,
      handleEditProfile,
      handleChangePassword,
      handleLogout,
      editDialogVisible,
      passwordDialogVisible,
      editForm,
      passwordForm,
      editFormRules,
      passwordFormRules,
      editFormRef,
      passwordFormRef,
      editLoading,
      passwordLoading,
      handleEditDialogClose,
      handleEditSubmit,
      handlePasswordDialogClose,
      handlePasswordSubmit,
      dialogWidth,
      formLabelWidth,
      formLabelPosition
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
