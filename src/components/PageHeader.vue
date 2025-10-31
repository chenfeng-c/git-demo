<template>
  <div class="page-header" :class="[`header-${type}`, { 'has-overlay': hasOverlay }]">
    <div class="header-background" v-if="backgroundPattern">
      <div class="pattern-overlay"></div>
    </div>
    <div class="header-content">
      <div class="header-text">
        <h1 v-if="title" class="header-title">{{ title }}</h1>
        <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
        <p v-if="description" class="header-description">{{ description }}</p>
        <div v-if="badges && badges.length" class="header-badges">
          <span v-for="(badge, index) in badges" :key="index" class="badge">{{ badge }}</span>
        </div>
      </div>
      <div v-if="icon || $slots.icon" class="header-icon">
        <slot name="icon">
          <div v-if="icon" class="icon-wrapper">{{ icon }}</div>
        </slot>
      </div>
    </div>
    <div v-if="$slots.extra" class="header-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    type: {
      type: String,
      default: 'default' // default, gradient, dark, light, image
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    badges: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    backgroundPattern: {
      type: Boolean,
      default: true
    },
    hasOverlay: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
  padding: 80px 20px 60px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #4299e1 100%);
  color: #ffffff;
  text-align: center;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  z-index: 1;
}

.pattern-overlay {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: 3em;
  font-weight: 700;
  margin: 0 0 15px;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

.header-subtitle {
  font-size: 1.5em;
  font-weight: 400;
  margin: 0 0 15px;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.header-description {
  font-size: 1.1em;
  line-height: 1.8;
  margin: 20px auto 0;
  max-width: 700px;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.header-badges {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 25px;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  font-size: 0.9em;
  font-weight: 500;
  transition: all 0.3s ease;
}

.badge:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.header-icon {
  flex-shrink: 0;
  animation: fadeInRight 0.8s ease-out 0.3s both;
}

.icon-wrapper {
  font-size: 5em;
  opacity: 0.9;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.header-extra {
  position: relative;
  z-index: 2;
  margin-top: 30px;
}

/* 不同类型样式 */
.header-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header-dark {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

.header-light {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  color: #2d3748;
}

.header-about {
  background: linear-gradient(135deg, #2c5282 0%, #1a365d 50%, #4299e1 100%);
  position: relative;
}

.header-about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  background-size: 40px 40px;
  opacity: 0.3;
}

.header-team {
  background: linear-gradient(135deg, #4299e1 0%, #2c5282 50%, #1a365d 100%);
}

.header-jobs {
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #63b3ed 100%);
}

.header-events {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 50%, #4299e1 100%);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 50px 15px 40px;
  }
  
  .header-title {
    font-size: 2em;
  }
  
  .header-subtitle {
    font-size: 1.2em;
  }
  
  .header-description {
    font-size: 1em;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .icon-wrapper {
    font-size: 3em;
  }
}
</style>

