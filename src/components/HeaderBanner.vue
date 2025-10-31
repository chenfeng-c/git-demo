<template>
  <div class="banner-decoration">
    <svg class="banner-svg" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bannerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.2);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- 波浪背景 -->
      <path d="M0,150 Q300,100 600,150 T1200,150 L1200,300 L0,300 Z" fill="url(#bannerGradient)" opacity="0.3"/>
      <path d="M0,180 Q300,130 600,180 T1200,180 L1200,300 L0,300 Z" fill="url(#bannerGradient)" opacity="0.2"/>
      
      <!-- 装饰圆圈 -->
      <circle cx="100" cy="80" r="40" fill="rgba(255,255,255,0.1)">
        <animate attributeName="cy" values="80;70;80" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1100" cy="100" r="30" fill="rgba(255,255,255,0.08)">
        <animate attributeName="cy" values="100;90;100" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="200" r="20" fill="rgba(255,255,255,0.06)">
        <animate attributeName="cy" values="200;190;200" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1000" cy="180" r="25" fill="rgba(255,255,255,0.07)">
        <animate attributeName="cy" values="180;170;180" dur="4.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HeaderBanner'
}
</script>

<style scoped>
.banner-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  overflow: hidden;
  pointer-events: none;
}

.banner-svg {
  width: 100%;
  height: 100%;
}
</style>

