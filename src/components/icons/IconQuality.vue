<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 品质保证徽章图标 -->
    <circle cx="50" cy="50" r="40" fill="url(#gradient5)" opacity="0.15"/>
    <path d="M50 20 L60 35 L80 38 L68 50 L70 70 L50 62 L30 70 L32 50 L20 38 L40 35 Z" 
          fill="url(#gradient1)"/>
    <circle cx="50" cy="45" r="8" fill="white" opacity="0.9"/>
    <path d="M50 40 L52 44 L56 44 L52 47 L53 51 L50 48 L47 51 L48 47 L44 44 L48 44 Z" 
          fill="url(#gradient1)"/>
  </svg>
</template>

<script>
export default {
  name: 'IconQuality'
}
</script>

