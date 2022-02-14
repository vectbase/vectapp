<template>
<!--  <el-row>-->
<!--    <el-col :span=19>-->
<!--      <v-chart class="chart" :option="option"/>-->
<!--    </el-col>-->
<!--    <el-col :span="5">-->
<!--     <worksheet-charts-ctl-panel></worksheet-charts-ctl-panel>-->
<!--    </el-col>-->
<!--  </el-row>-->
<div></div>
</template>

<script>
// import WorksheetChartsCtlPanel from './WorksheetChartsCtlPanel'
// import {use} from 'echarts/core'
// import {
//   TitleComponent,
//   ToolboxComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent
// } from 'echarts/components'
// import {LineChart} from 'echarts/charts'
// import {UniversalTransition} from 'echarts/features'
// import {CanvasRenderer} from 'echarts/renderers'
//
// import VChart, {THEME_KEY} from 'vue-echarts'
//
// use([
//   TitleComponent,
//   ToolboxComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
//   LineChart,
//   CanvasRenderer,
//   UniversalTransition
// ])

export default {
  name: 'WorksheetCharts',
  // components: {
  //   VChart, WorksheetChartsCtlPanel
  // },
  // provide: {
  //   [THEME_KEY]: ''
  // },
  data () {
    return {

      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
