<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 创新灯泡图标 -->
    <circle cx="50" cy="35" r="18" fill="url(#gradient1)" opacity="0.2"/>
    <path d="M50 15 L50 10 M35 20 L32 17 M65 20 L68 17 M30 35 L25 35 M70 35 L75 35" 
          stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 18 C42 18 36 24 36 32 C36 36 38 40 41 42 L41 48 C41 50 43 52 45 52 L55 52 C57 52 59 50 59 48 L59 42 C62 40 64 36 64 32 C64 24 58 18 50 18 Z" 
          fill="url(#gradient1)"/>
    <rect x="44" y="52" width="12" height="4" rx="2" fill="url(#gradient1)" opacity="0.8"/>
    <rect x="46" y="56" width="8" height="3" rx="1.5" fill="url(#gradient1)" opacity="0.6"/>
    <circle cx="47" cy="30" r="3" fill="white" opacity="0.6"/>
  </svg>
</template>

<script>
export default {
  name: 'IconInnovation'
}
</script>

