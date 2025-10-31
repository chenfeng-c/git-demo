<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 持续优化循环箭头图标 -->
    <circle cx="50" cy="50" r="35" fill="url(#gradient6)" opacity="0.15"/>
    <path d="M30 50 L50 30 L70 50 M50 30 L50 20" 
          stroke="url(#gradient6)" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M70 50 L50 70 L30 50 M50 70 L50 80" 
          stroke="url(#gradient6)" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="50" cy="50" r="5" fill="url(#gradient6)"/>
    <path d="M45 50 L50 55 L55 50 M50 45 L50 50" 
          stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>
</template>

<script>
export default {
  name: 'IconOptimization'
}
</script>

