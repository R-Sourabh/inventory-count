<template>
  <div class="chart-container" :class="{ 'chart-visible': isVisible }">
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js'
import { computed, defineProps } from 'vue'
import ionicChartPlugin from './ionicChartPlugin'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ChartJS.register(ionicChartPlugin);

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
    default: 'Bar Chart'
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  showLegend: {
    type: Boolean,
    default: false
  },
  yAxisStepSize: {
    type: Number,
    default: 1
  }
})

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Items',
      data: props.data,
      backgroundColor: props.backgroundColor,
      borderColor: props.borderColor,
      borderWidth: 1
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
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
          return `${label}: ${value}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: props.yAxisStepSize
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