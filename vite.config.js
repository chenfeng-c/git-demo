import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  base: '/', // 用户主页仓库使用根路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0', // 允许外部访问，包括局域网
    port: 3000,
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
    open: true,
    // 允许 CORS
    cors: true,
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
    proxy: {
      // 示例：代理 API 请求
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 源码映射，便于调试
    sourcemap: true,
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将 vue 相关依赖分离
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue-vendor'
          }
          // 将 vue-router 分离
          if (id.includes('node_modules/vue-router')) {
            return 'vue-router'
          }
          // 将 echarts 分离（这是一个大库）
          if (id.includes('node_modules/echarts')) {
            return 'echarts'
          }
          // 其他 node_modules 依赖
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // 优化 chunk 文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // 提高 chunk 大小警告限制（因为 echarts 本身就很大）
    chunkSizeWarningLimit: 1000,
    // 启用压缩（使用 esbuild，速度更快）
    minify: 'esbuild',
    // 压缩选项
    cssCodeSplit: true,
    // 优化资源内联阈值
    assetsInlineLimit: 4096
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})

