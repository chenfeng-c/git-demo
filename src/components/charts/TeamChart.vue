<template>
  <div class="team-chart-section">
    <h3>团队技能分布</h3>
    <div class="chart-wrapper">
      <BaseChart :options="skillChartOptions" height="350px" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseChart from './BaseChart.vue'

export default {
  name: 'TeamChart',
  components: {
    BaseChart
  },
  setup() {
    const skillChartOptions = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['前端', '后端', '设计', '产品', 'DevOps'],
        textStyle: {
          color: '#4a5568'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: '人数',
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['初级', '中级', '高级', '专家'],
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      series: [
        {
          name: '前端',
          type: 'bar',
          stack: 'total',
          data: [3, 5, 6, 2],
          itemStyle: { color: '#1a365d' }
        },
        {
          name: '后端',
          type: 'bar',
          stack: 'total',
          data: [2, 6, 7, 3],
          itemStyle: { color: '#2c5282' }
        },
        {
          name: '设计',
          type: 'bar',
          stack: 'total',
          data: [2, 3, 2, 1],
          itemStyle: { color: '#4299e1' }
        },
        {
          name: '产品',
          type: 'bar',
          stack: 'total',
          data: [1, 3, 3, 1],
          itemStyle: { color: '#63b3ed' }
        },
        {
          name: 'DevOps',
          type: 'bar',
          stack: 'total',
          data: [1, 2, 2, 1],
          itemStyle: { color: '#90cdf4' }
        }
      ]
    })
    
    return {
      skillChartOptions
    }
  }
}
</script>

<style scoped>
.team-chart-section {
  margin-top: 50px;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.team-chart-section h3 {
  color: #1a365d;
  font-size: 1.6em;
  margin-bottom: 25px;
  font-weight: 600;
  text-align: center;
}

.chart-wrapper {
  width: 100%;
}
</style>

