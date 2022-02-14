<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <div class="alignment-horizontal-between">
            <div class="details-name">Warehouse Activity</div>
            <div>
              <el-button plain class="chart-button" style="margin-right: 30px"><i class="el-icon-connection icon-style"></i>Learn more</el-button>
              <el-button v-for="(obj, index) in unitTimeArr" :key="index"
                         type="text"
                         size="medium"
                         class="chart-button-time"
                         @click="handleUnitTimeClick(obj)">
                <span v-if="!obj.checked" style="color: #bababa">{{ obj.name }}</span>
                <span v-if="obj.checked" style="color: #65676c">{{ obj.name }}</span>
              </el-button>
              <el-button plain
                         size="medium"
                         class="chart-button"
                         @click="refresh"
                         style="margin-left: 30px">
                <i class="el-icon-refresh-right"></i>
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="main" style="width: 100%; height: 230px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {mapState} from 'vuex'

export default {
  name: 'VWarehouseActivity',
  props: ['warehouseId'],
  data () {
    return {
      unitTimeArr: [
        {name: 'Hour', checked: false},
        {name: 'Day', checked: false},
        {name: 'Week', checked: false},
        {name: '2 Weeks', checked: true}
      ],
      myChart: {},
      option: {
        color: [
          'rgb(64, 140, 255)',
          'rgb(255, 208, 41)'
        ],
        dataset: {
          source: [
            ['product', 'Running load', 'Queued load']
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: 0
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 1
          }
        },
        yAxis: {
          type: 'value',
          // axisLine: {
          //   show: true
          // },
          // axisTick: {
          //   show: true
          // },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            stack: 'Activity'
          },
          {
            type: 'bar',
            stack: 'Activity'
          }
        ]
      },
      requestData: {
        id: '',
        timecode: 3
      }
    }
  },
  async mounted () {
    await this.draw()
  },
  methods: {
    async draw () {
      let responseData = await this.services.warehouseService.loadActivity(this.requestData)
      this.option.dataset.source = this.option.dataset.source.concat(responseData.data)
      let chartDom = document.getElementById('main')
      this.myChart = echarts.init(chartDom)
      this.myChart.setOption(this.option)
    },
    async handleUnitTimeClick (obj) {
      if (this.unitTimeArr.indexOf(obj) === 3) {
        this.unitTimeArr.forEach(unitTime => {
          unitTime.checked = false
        })
        obj.checked = true
        this.option.dataset.source.splice(1, this.option.dataset.source.length - 1)
        this.requestData.timecode = 3
        let responseData = await this.services.warehouseService.loadActivity(this.requestData)
        this.option.dataset.source = this.option.dataset.source.concat(responseData.data)
        this.option.xAxis.axisLabel.interval = 1
        console.log('===========dataset 3===========', this.option.dataset.source)
        this.myChart.setOption(this.option)
      } else if (this.unitTimeArr.indexOf(obj) === 2) {
        this.unitTimeArr.forEach(unitTime => {
          unitTime.checked = false
        })
        obj.checked = true
        this.option.dataset.source.splice(1, this.option.dataset.source.length - 1)
        this.requestData.timecode = 2
        let responseData = await this.services.warehouseService.loadActivity(this.requestData)
        this.option.dataset.source = this.option.dataset.source.concat(responseData.data)
        this.option.xAxis.axisLabel.interval = 0
        console.log('===========dataset 2===========', this.option.dataset.source)
        this.myChart.setOption(this.option)
      } else if (this.unitTimeArr.indexOf(obj) === 1) {
        this.unitTimeArr.forEach(unitTime => {
          unitTime.checked = false
        })
        obj.checked = true
        this.option.dataset.source.splice(1, this.option.dataset.source.length - 1)
        this.requestData.timecode = 1
        let responseData = await this.services.warehouseService.loadActivity(this.requestData)
        this.option.dataset.source = this.option.dataset.source.concat(responseData.data)
        this.option.xAxis.axisLabel.interval = 5
        console.log('===========dataset 1===========', this.option.dataset.source)
        this.myChart.setOption(this.option)
      } else if (this.unitTimeArr.indexOf(obj) === 0) {
        this.unitTimeArr.forEach(unitTime => {
          unitTime.checked = false
        })
        obj.checked = true
        this.option.dataset.source.splice(1, this.option.dataset.source.length - 1)
        this.requestData.timecode = 0
        let responseData = await this.services.warehouseService.loadActivity(this.requestData)
        this.option.dataset.source = this.option.dataset.source.concat(responseData.data)
        this.option.xAxis.axisLabel.interval = 9
        console.log('===========dataset 0===========', this.option.dataset.source)
        this.myChart.setOption(this.option)
      }
    },
    refresh () {
      let obj = this.unitTimeArr.filter(unit => {
        return unit.checked === true
      }).pop()
      this.handleUnitTimeClick(obj)
    }
  },
  computed: {
    ...mapState([ 'services' ])
  },
  watch: {
    warehouseId (val) {
      this.requestData.id = val
    }
  }
}
</script>

<style scoped>
.details-name {
  font-weight: 700;
  font-size: 20px;
  color: #2c2f34;
  margin-bottom: 25px;
}

.icon-style {
  margin-right: 8px;
}

.chart-button {
  border: none;
}

.chart-button-time {
  border: none;
  padding: 10px;
  margin-left: 0;
}

.alignment-horizontal-between  {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
