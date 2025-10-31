<template>
  <div class="company-stats">
    <h3>公司发展数据</h3>
    <div class="charts-grid">
      <div class="chart-card">
        <h4>业务增长趋势</h4>
        <div class="chart-wrapper">
          <BaseChart :options="growthChartOptions" height="400px" />
        </div>
      </div>
      <div class="chart-card">
        <h4>客户行业分布</h4>
        <div class="chart-wrapper">
          <BaseChart :options="industryChartOptions" height="400px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseChart from './BaseChart.vue'

export default {
  name: 'CompanyStats',
  components: {
    BaseChart
  },
  setup() {
    // 业务增长趋势图表配置
    const growthChartOptions = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '项目数量',
        axisLine: {
          lineStyle: {
            color: '#718096'
          }
        }
      },
      series: [
        {
          name: '完成项目',
          type: 'bar',
          data: [15, 28, 45, 68, 92],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#2c5282' },
                { offset: 1, color: '#1a365d' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    })
    
    // 客户行业分布图表配置
    const industryChartOptions = ref({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: '10%',
        top: 'center',
        textStyle: {
          color: '#4a5568'
        }
      },
      series: [
        {
          name: '行业分布',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: '互联网', itemStyle: { color: '#1a365d' } },
            { value: 25, name: '金融', itemStyle: { color: '#2c5282' } },
            { value: 20, name: '教育', itemStyle: { color: '#4299e1' } },
            { value: 12, name: '医疗', itemStyle: { color: '#63b3ed' } },
            { value: 8, name: '其他', itemStyle: { color: '#90cdf4' } }
          ]
        }
      ]
    })
    
    return {
      growthChartOptions,
      industryChartOptions
    }
  }
}
</script>

<style scoped>
.company-stats {
  margin: 50px 0;
}

.company-stats h3 {
  color: #1a365d;
  font-size: 1.8em;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.chart-card {
  background: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 450px;
  box-sizing: border-box;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.chart-card :deep(.chart-container) {
  width: 100% !important;
  height: 400px !important;
  min-height: 400px !important;
  max-height: 400px !important;
  display: block !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
}

.chart-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.chart-card h4 {
  color: #2c5282;
  font-size: 1.1em;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>

