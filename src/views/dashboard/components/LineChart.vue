<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '小明的成绩表',
          x: 'center'
        },
        xAxis: {
          axisTick: {
            show: false
          },
          type: 'category'
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
          // padding: [5, 10]
        },
        yAxis: {
          // 坐标轴刻度相关配置
          // axisTick: {
          //   show: false
          // }
        },
        dataset: {
          source: [
            ['语文', 90],
            ['数学', 150],
            ['英语', 70],
            ['物理', 30.5],
            ['化学', 69],
            ['生物', 76],
            ['历史', 55],
            ['地理', 47],
            ['政治', 100]
          ]
        },
        // legend: {
        //   data: ['折线图', '柱状图']
        // },
        series: [{
          type: 'line',
          encode: { x: 0, y: 1 },
          // name: '折线图',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          }
        }]
      })
    }
  }
}
</script>
