<template>
  <div class="profile-page">
    <PageHeader
      type="profile"
      :title="translations.title"
      :subtitle="translations.subtitle"
      :description="translations.description"
      :badges="translations.badges"
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
                  <h2 class="profile-name-large">{{ user?.name || translations.notSet }}</h2>
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
                <h3 class="section-title">{{ translations.personalInfo }}</h3>
              </div>
              <el-descriptions :column="1" border class="user-descriptions">
                <el-descriptions-item :label="translations.username">
                  {{ user?.username || translations.notSet }}
                </el-descriptions-item>
                <el-descriptions-item :label="translations.name">
                  {{ user?.name || translations.notSet }}
                </el-descriptions-item>
                <el-descriptions-item :label="translations.email">
                  {{ user?.email || translations.notSet }}
                </el-descriptions-item>
                <el-descriptions-item :label="translations.registerTime">
                  {{ formatDate(user?.createdAt) || translations.unknown }}
                </el-descriptions-item>
                <el-descriptions-item :label="translations.lastLogin">
                  {{ formatDate(user?.lastLogin) || translations.unknown }}
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
                    {{ translations.editProfile }}
                  </el-button>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <div class="action-button-wrapper">
                  <el-button type="warning" size="large" @click="handleChangePassword" class="action-button">
                    {{ translations.changePassword }}
                  </el-button>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <div class="action-button-wrapper">
                  <el-button type="danger" size="large" @click="handleLogout" class="action-button">
                    {{ translations.logoutBtn }}
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
      :title="translations.editProfileTitle"
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
        <el-form-item :label="translations.username" prop="username">
          <el-input v-model="editForm.username" :placeholder="translations.usernamePlaceholder" />
        </el-form-item>
        <el-form-item :label="translations.name" prop="name">
          <el-input v-model="editForm.name" :placeholder="translations.namePlaceholder" />
        </el-form-item>
        <el-form-item :label="translations.email" prop="email">
          <el-input v-model="editForm.email" type="email" :placeholder="translations.emailPlaceholder" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleEditDialogClose">{{ translations.cancel }}</el-button>
          <el-button type="primary" @click="handleEditSubmit" :loading="editLoading">
            {{ translations.confirm }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      :title="translations.changePasswordTitle"
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
        <el-form-item :label="translations.oldPassword" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            :placeholder="translations.oldPasswordPlaceholder"
            show-password
          />
        </el-form-item>
        <el-form-item :label="translations.newPassword" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            :placeholder="translations.newPasswordPlaceholder"
            show-password
          />
        </el-form-item>
        <el-form-item :label="translations.confirmNewPassword" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            :placeholder="translations.confirmNewPasswordPlaceholder"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePasswordDialogClose">{{ translations.cancel }}</el-button>
          <el-button type="primary" @click="handlePasswordSubmit" :loading="passwordLoading">
            {{ translations.confirm }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <footer>
      <div class="container">
        <p>{{ footerTextComputed }}</p>
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
import PageHeader from '../components/PageHeader.vue'
import { safeTranslate } from '../utils/i18n-helper'
import i18n from '../i18n'
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
    const localeRef = i18n.global.locale

    // 翻译
    const translations = computed(() => {
      const locale = localeRef.value
      return {
        title: safeTranslate('profile.title', locale),
        subtitle: safeTranslate('profile.subtitle', locale),
        description: safeTranslate('profile.description', locale),
        badges: [
          safeTranslate('profile.badges.0', locale),
          safeTranslate('profile.badges.1', locale),
          safeTranslate('profile.badges.2', locale)
        ],
        personalInfo: safeTranslate('profile.personalInfo', locale),
        username: safeTranslate('profile.username', locale),
        name: safeTranslate('profile.name', locale),
        email: safeTranslate('profile.email', locale),
        registerTime: safeTranslate('profile.registerTime', locale),
        lastLogin: safeTranslate('profile.lastLogin', locale),
        editProfile: safeTranslate('profile.editProfile', locale),
        changePassword: safeTranslate('profile.changePassword', locale),
        logoutBtn: safeTranslate('profile.logoutBtn', locale),
        editProfileTitle: safeTranslate('profile.editProfileTitle', locale),
        cancel: safeTranslate('profile.cancel', locale),
        confirm: safeTranslate('profile.confirm', locale),
        changePasswordTitle: safeTranslate('profile.changePasswordTitle', locale),
        oldPassword: safeTranslate('profile.oldPassword', locale),
        oldPasswordPlaceholder: safeTranslate('profile.oldPasswordPlaceholder', locale),
        newPassword: safeTranslate('profile.newPassword', locale),
        newPasswordPlaceholder: safeTranslate('profile.newPasswordPlaceholder', locale),
        confirmNewPassword: safeTranslate('profile.confirmNewPassword', locale),
        confirmNewPasswordPlaceholder: safeTranslate('profile.confirmNewPasswordPlaceholder', locale),
        usernamePlaceholder: safeTranslate('auth.register.usernamePlaceholder', locale),
        namePlaceholder: safeTranslate('auth.register.namePlaceholder', locale),
        emailPlaceholder: safeTranslate('auth.register.emailPlaceholder', locale),
        notSet: safeTranslate('profile.notSet', locale),
        unknown: safeTranslate('profile.unknown', locale)
      }
    })

    // Footer 文本
    const footerTextComputed = computed(() => {
      const locale = localeRef.value
      return safeTranslate('footer.text', locale) || '© 2024 Chenfeng Software Development Studio. All rights reserved.'
    })

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

    // 编辑资料表单验证规则（动态，基于翻译）
    const editFormRules = computed(() => {
      const t = translations.value
      return {
        username: [
          { required: true, message: safeTranslate('auth.register.errors.usernameRequired', localeRef.value), trigger: 'blur' },
          { min: 3, max: 20, message: safeTranslate('auth.register.errors.usernameMax', localeRef.value), trigger: 'blur' }
        ],
        name: [
          { required: true, message: safeTranslate('auth.register.errors.nameRequired', localeRef.value), trigger: 'blur' },
          { max: 50, message: safeTranslate('auth.register.errors.nameMax', localeRef.value), trigger: 'blur' }
        ],
        email: [
          { required: true, message: safeTranslate('auth.register.errors.emailRequired', localeRef.value), trigger: 'blur' },
          { type: 'email', message: safeTranslate('auth.register.errors.emailInvalid', localeRef.value), trigger: 'blur' }
        ]
      }
    })

    // 修改密码表单验证规则（动态，基于翻译）
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== passwordForm.newPassword) {
        callback(new Error(safeTranslate('auth.register.errors.confirmPasswordMismatch', localeRef.value)))
      } else {
        callback()
      }
    }

    const passwordFormRules = computed(() => {
      const t = translations.value
      return {
        oldPassword: [
          { required: true, message: t.oldPasswordPlaceholder, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: safeTranslate('auth.register.errors.passwordRequired', localeRef.value), trigger: 'blur' },
          { min: 6, message: safeTranslate('auth.register.errors.passwordMin', localeRef.value), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: t.confirmNewPasswordPlaceholder, trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    })

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
        ElMessage.warning(safeTranslate('auth.login.title', localeRef.value))
        router.push('/login')
      }
    })

    // 打开编辑资料对话框
    const handleEditProfile = () => {
      if (!user.value) {
        ElMessage.warning(safeTranslate('auth.login.title', localeRef.value))
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
          
          ElMessage.success(safeTranslate('profile.editProfile', localeRef.value) + ' ' + translations.value.confirm)
          handleEditDialogClose()
        } else {
          ElMessage.error(response.message || safeTranslate('auth.register.errors.fixForm', localeRef.value))
        }
      } catch (error) {
        if (error !== false) {
          console.error('Update profile error:', error)
          ElMessage.error(safeTranslate('auth.register.errors.fixForm', localeRef.value))
        }
      } finally {
        editLoading.value = false
      }
    }

    // 打开修改密码对话框
    const handleChangePassword = () => {
      if (!user.value) {
        ElMessage.warning(safeTranslate('auth.login.title', localeRef.value))
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
          ElMessage.success(translations.value.changePassword + ' ' + translations.value.confirm)
          handlePasswordDialogClose()
          
          // 延迟退出登录，让用户看到成功提示
          setTimeout(async () => {
            await logout()
            router.push('/login')
          }, 1500)
        } else {
          ElMessage.error(response.message || safeTranslate('auth.register.errors.fixForm', localeRef.value))
        }
      } catch (error) {
        if (error !== false) {
          console.error('Change password error:', error)
          ElMessage.error(safeTranslate('auth.register.errors.fixForm', localeRef.value))
        }
      } finally {
        passwordLoading.value = false
      }
    }

    // 退出登录
    const handleLogout = async () => {
      try {
        await ElMessageBox.confirm(
          safeTranslate('profile.logoutBtn', localeRef.value) + '?',
          safeTranslate('profile.title', localeRef.value),
          {
            confirmButtonText: translations.value.confirm,
            cancelButtonText: translations.value.cancel,
            type: 'warning'
          }
        )
        
        await logout()
        ElMessage.success(translations.value.logoutBtn)
        router.push('/')
      } catch (error) {
        // 用户取消
      }
    }

    return {
      user,
      userInitial,
      translations,
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
      formLabelPosition,
      footerTextComputed
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
