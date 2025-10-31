<template>
  <div ref="chartRef" class="chart-container" :style="{ width: width, height: height }"></div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'BaseChart',
  props: {
    options: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  setup(props) {
    const chartRef = ref(null)
    let chartInstance = null
    
    const initChart = () => {
      if (!chartRef.value) return
      
      const container = chartRef.value
      const width = container.offsetWidth || container.clientWidth
      const height = container.offsetHeight || container.clientHeight || parseInt(props.height) || 400
      
      if (width === 0) {
        // 如果容器还没有宽度，等待一下再试
        setTimeout(initChart, 100)
        return
      }
      
      // 如果图表已经初始化，先销毁
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      
      // 初始化图表
      chartInstance = echarts.init(chartRef.value, null, {
        width: width,
        height: height
      })
      chartInstance.setOption(props.options)
      
      // 监听窗口大小变化
      window.addEventListener('resize', handleResize)
      
      // 延迟一次 resize 确保图表正确渲染
      setTimeout(() => {
        if (chartInstance && chartRef.value) {
          const currentWidth = chartRef.value.offsetWidth || chartRef.value.clientWidth
          const currentHeight = chartRef.value.offsetHeight || chartRef.value.clientHeight || height
          chartInstance.resize({
            width: currentWidth,
            height: currentHeight
          })
        }
      }, 200)
    }
    
    const handleResize = () => {
      if (chartInstance && chartRef.value) {
        chartInstance.resize()
      }
    }
    
    onMounted(() => {
      nextTick(() => {
        initChart()
      })
    })
    
    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
      window.removeEventListener('resize', handleResize)
    })
    
    // 监听配置变化
    watch(() => props.options, (newOptions) => {
      if (chartInstance) {
        chartInstance.setOption(newOptions, true)
      } else {
        // 如果图表还没初始化，尝试初始化
        initChart()
      }
    }, { deep: true })
    
    return {
      chartRef
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100% !important;
  height: 100% !important;
  min-height: 300px;
  display: block !important;
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
}
</style>

