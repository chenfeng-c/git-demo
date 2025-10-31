<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 团队人员图标 -->
    <circle cx="35" cy="30" r="12" fill="url(#gradient2)"/>
    <path d="M20 65 C20 55 26 50 35 50 C44 50 50 55 50 65 L50 70 L20 70 Z" fill="url(#gradient2)"/>
    
    <circle cx="65" cy="30" r="12" fill="url(#gradient2)" opacity="0.85"/>
    <path d="M50 65 C50 55 56 50 65 50 C74 50 80 55 80 65 L80 70 L50 70 Z" fill="url(#gradient2)" opacity="0.85"/>
    
    <circle cx="50" cy="22" r="11" fill="url(#gradient2)" opacity="0.7"/>
    <path d="M38 55 C38 47 43 43 50 43 C57 43 62 47 62 55 L62 60 L38 60 Z" fill="url(#gradient2)" opacity="0.7"/>
  </svg>
</template>

<script>
export default {
  name: 'IconTeam'
}
</script>

