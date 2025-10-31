<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 高效服务火箭图标 -->
    <path d="M50 15 L60 45 L70 45 L50 75 L50 50 L40 50 L50 15 Z" fill="url(#gradient3)"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gradient3)" stroke-width="2" opacity="0.3" stroke-dasharray="5,5">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite"/>
    </circle>
    <circle cx="30" cy="70" r="8" fill="url(#gradient3)" opacity="0.4">
      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="70" cy="70" r="8" fill="url(#gradient3)" opacity="0.4">
      <animate attributeName="r" values="10;8;10" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'IconService'
}
</script>

