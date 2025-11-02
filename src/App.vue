<template>
  <el-config-provider :locale="elementLocale">
    <div id="app">
      <Navigation />
      <router-view />
    </div>
  </el-config-provider>
</template>

<script>
import { computed } from 'vue'
import i18n from './i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import enUs from 'element-plus/dist/locale/en.mjs'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  setup() {
    const localeRef = i18n.global.locale

    const elementLocale = computed(() => {
      return localeRef.value === 'en-US' ? enUs : zhCn
    })

    return {
      elementLocale
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}

/* 为固定导航栏预留空间 - 除了首页 */
#app > div:not(:first-child):not(.landing-page) {
  padding-top: 68px; /* 导航栏高度 */
}

/* 首页不需要 padding，Hero Section 全屏显示 */
.landing-page {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* 登录和注册页面需要额外的顶部间距 */
.login-container,
.register-container {
  padding-top: 68px !important;
  min-height: calc(100vh - 68px) !important;
}

/* 移动端调整 */
@media (max-width: 992px) {
  #app > div:not(:first-child):not(.landing-page) {
    padding-top: 64px;
  }
  
  .login-container,
  .register-container {
    padding-top: 64px !important;
    min-height: calc(100vh - 64px) !important;
  }
}

@media (max-width: 768px) {
  #app > div:not(:first-child):not(.landing-page) {
    padding-top: 60px;
  }
  
  .login-container,
  .register-container {
    padding-top: 80px !important;
    min-height: calc(100vh - 60px) !important;
  }
}

@media (max-width: 480px) {
  #app > div:not(:first-child):not(.landing-page) {
    padding-top: 56px;
  }
  
  .login-container,
  .register-container {
    padding-top: 76px !important;
    min-height: calc(100vh - 56px) !important;
  }
}
</style>

