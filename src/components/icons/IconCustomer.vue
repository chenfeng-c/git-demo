<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2c5282;stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- 客户至上爱心图标 -->
    <path d="M50 80 L20 50 C15 45 15 35 20 30 C25 25 35 25 40 30 L50 40 L60 30 C65 25 75 25 80 30 C85 35 85 45 80 50 Z" 
          fill="url(#gradient4)">
      <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
    </path>
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient4)" stroke-width="1.5" opacity="0.2"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gradient4)" stroke-width="1.5" opacity="0.2"/>
  </svg>
</template>

<script>
export default {
  name: 'IconCustomer'
}
</script>

