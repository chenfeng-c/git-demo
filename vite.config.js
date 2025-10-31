import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    // 热重载配置
    hmr: {
      overlay: true, // 显示错误覆盖层
    },
    // 文件监听配置
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    },
    // 代理配置（如果需要）
    proxy: {}
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 源码映射，便于调试
    sourcemap: true,
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})

