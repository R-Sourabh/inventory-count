<template>
  <div class="chart-container" :class="{ 'chart-visible': isVisible }">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { computed, defineProps } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const props = defineProps({
  labels: {
    type: Array as () => string[],
    required: true
  },
  data: {
    type: Array as () => number[],
    required: true
  },
  backgroundColor: {
    type: Array as () => string[],
    required: true
  },
  borderColor: {
    type: Array as () => string[],
    required: true
  },
  title: {
    type: String,
    default: 'Doughnut Chart'
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  cutout: {
    type: String,
    default: '60%'
  },
  showLegend: {
    type: Boolean,
    default: true
  },
  showPercentage: {
    type: Boolean,
    default: true
  }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.backgroundColor,
      borderColor: props.borderColor,
      borderWidth: 2,
      hoverOffset: 4
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: props.cutout,
  plugins: {
    legend: {
      display: props.showLegend,
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    title: {
      display: true,
      text: props.title,
      padding: {
        top: 10,
        bottom: 20
      },
      font: {
        size: 16,
        weight: 'bold' as const
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          if (props.showPercentage) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
          return `${label}: ${value}`;
        }
      }
    }
  }
}))
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 0;
  width: 100%;
  padding: 0 16px;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.chart-visible {
  height: 300px;
  opacity: 1;
  transform: translateY(0);
}
</style> 