<template>
  <div class="access-denied">
    <div class="container">
      <div class="content">
        <div class="icon">🚫</div>
        <h1>{{ translations.title }}</h1>
        <p>{{ translations.message }}</p>
        <div class="actions">
          <router-link to="/" class="primary">{{ translations.goHome }}</router-link>
          <router-link to="/login" class="secondary">{{ translations.relogin }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import i18n from '../i18n'
import { safeTranslate } from '../utils/i18n-helper'

export default {
  name: 'AccessDenied',
  setup() {
    const localeRef = i18n.global.locale

    const translations = computed(() => {
      const locale = localeRef.value
      return {
        title: safeTranslate('accessDenied.title', locale),
        message: safeTranslate('accessDenied.message', locale),
        goHome: safeTranslate('accessDenied.goHome', locale),
        relogin: safeTranslate('accessDenied.relogin', locale)
      }
    })

    return {
      translations
    }
  }
}
</script>

<style scoped>
.access-denied {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  text-align: center;
  padding: 60px 0;
}

.content {
  max-width: 520px;
  margin: 0 auto;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 90%);
  border-radius: 20px;
  padding: 48px 32px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.icon {
  font-size: 3.5rem;
  margin-bottom: 24px;
}

h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 12px;
}

p {
  color: #475569;
  line-height: 1.8;
  margin-bottom: 32px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.actions a {
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.actions a:hover {
  transform: translateY(-2px);
}

.primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
}

.secondary {
  background: rgba(99, 102, 241, 0.12);
  color: #1e3a8a;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.18);
}

@media (max-width: 480px) {
  .content {
    padding: 36px 24px;
  }

  .actions {
    flex-direction: column;
  }

  .actions a {
    width: 100%;
  }
}
</style>

