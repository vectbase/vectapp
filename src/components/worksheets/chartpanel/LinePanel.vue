<template>
  <div>
    <!--    <div class="wc-data">-->
    <!--      <div class="wc-data-title">Data</div>-->
    <!--      <template v-for="site in groupArr">-->
    <!--        <div :key="site.id" style="width: 100%;margin-top: 10px;">-->
    <!--          <div style="width: 100%">-->
    <!--            <el-popover-->
    <!--              placement="left"-->
    <!--              width="190"-->
    <!--              trigger="click">-->
    <!--              <WorkSheetChartCommSel ref="commSelector" @yColChange="yColChange" @yAggChange="yAggChange" :datas="initDatas.meta" :initCol="yColInfo" :xShowType="xShowType"></WorkSheetChartCommSel>-->
    <!--              <div slot="reference" style="float: left;display: inline-block;" v-if="site.name === ''" class="ware-add-btn">+ Add column</div>-->
    <!--              <div class="wc-data-x" slot="reference" v-else style="float: left;display: inline-block;padding: 5px 25px 5px 5px;position: relative;margin-right: 20px;cursor: pointer">-->
    <!--                <div style="font-size: 12px;">{{site.name}}</div>-->
    <!--                <div style="font-size: 10px">{{site.gtype}}</div>-->
    <!--                <div style="position: absolute;right: 8px;top: 5px">-->
    <!--                  <svg width="8" height="5"><path fill="none" stroke="currentcolor" stroke-width="1" d="M1,1 L4,4 L7,1"></path></svg>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </el-popover>-->
    <!--            <div v-if="site.type !== 4" style="float: left;display: inline-block;height: 1px;border-bottom: 1px solid #eee;width: 40%;margin-top: 10px;margin-right: 10px;">-->
    <!--            </div>-->
    <!--            <span style="float: right;" v-if="site.type === 1">-->
    <!--              <svg v-if="graphType === 2" width="16px" height="16px" viewBox="0 0 16 16">-->
    <!--                <g fill="none" stroke="currentcolor" stroke-width="2"><path d="M4,10 L4,14"></path><path d="M8,6 L8,14"></path><path d="M12,2 L12,14"></path></g>-->
    <!--              </svg>-->
    <!--              <svg v-if="graphType === 1" width="16" height="16"><path fill="none" stroke-width="2" stroke="#408CFF" d="M2,10 L6,6 L10,10 L14,6"></path></svg>-->
    <!--            </span>-->
    <!--            <span style="float: right;color: gray" v-else-if="site.type === 2">-->
    <!--             Series-->
    <!--            </span>-->
    <!--            <span style="float: right;color: gray" v-else-if="site.type === 3">-->
    <!--              <span v-if="graphType === 1">X-Axis</span>-->
    <!--              <span v-if="graphType === 2">Y-Axis</span>-->
    <!--            </span>-->
    <!--          </div>-->
    <!--          <div style="clear: both"></div>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </div>-->
    <!--    <div style="clear: both"></div>-->
    <!--&lt;!&ndash;    line graph&ndash;&gt;-->
    <!--    <div v-if="graphType === 1" style="width: 100%;margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;padding-left: 15px;">-->
    <!--      <div class="wc-data-title">Appearence</div>-->

    <!--      <div style="margin-bottom: 10px;">-->
    <!--        <el-checkbox v-model="areaCheck" @change="areaChange"/><span style="margin-left: 10px;font-size: 14px;color: gray">Fill area</span>-->
    <!--      </div>-->

    <!--      <div style="margin-bottom: 10px;">-->
    <!--        <el-checkbox v-model="pointsCheck" @change="pointsChange" /><span style="margin-left: 10px;font-size: 14px;color: gray">Show points</span>-->
    <!--      </div>-->

    <!--      <div>-->
    <!--        <el-checkbox v-model="xCheck" @change="xChange" /><span style="margin-left: 10px;font-size: 14px;color: gray">Label X-Axis</span>-->
    <!--        <el-input style="margin-left: 20px;margin-top: 10px;width: 80%;display: block"  size="small" v-if="xCheck" v-model="this.options.xAxis.name" @input="xNameChanges" ></el-input>-->
    <!--      </div>-->

    <!--      <div style="margin-top: 10px">-->
    <!--        <el-checkbox v-model="yCheck" @change="yChange"/><span style="margin-left: 10px;font-size: 14px;color: gray">Label Y-Axis</span>-->
    <!--        <el-input style="margin-left: 20px;margin-top: 10px;width: 80%;display: block"  size="small" v-if="yCheck" v-model="this.options.yAxis.name" v-bind="this.options.yAxis.name" @input="yNameChanges"></el-input>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--&lt;!&ndash;  bar graph&ndash;&gt;-->
    <!--  <div v-if="graphType === 2" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;padding-left: 15px;">-->
    <!--    <div class="wc-data-title">Appearence</div>-->

    <!--    <div style="margin-bottom: 10px;">-->
    <!--      <div style="float: left;display:inline-block; width: 50%;text-align: left">Orientation</div>-->
    <!--      <div style="float: left;display: inline-block;width: 49%;text-align: right">-->
    <!--        <span class="span-bar-icon" @click="changeXAxis(2)">-->
    <!--          <svg width="16" height="16" viewBox="0 0 20 20"><g fill="currentcolor"><rect x="2" y="2" width="16" height="4"></rect><rect x="2" y="8" width="10" height="4"></rect><rect x="2" y="14" width="4" height="4"></rect></g></svg>-->
    <!--        </span>-->
    <!--        <span class="span-bar-icon" @click="changeXAxis(1)" style="margin-left: 10px;">-->
    <!--          <svg width="16" height="16" viewBox="0 0 20 20"><g fill="currentcolor"><rect x="2" y="14" width="4" height="4"></rect><rect x="8" y="8" width="4" height="10"></rect><rect x="14" y="2" width="4" height="16"></rect></g></svg>-->
    <!--        </span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--   </div>-->
    <div class="wc-data">
      <div class="wc-data-title">Data</div>
      <div style="width: 100%;">
        <el-popover
          placement="left"
          width="190"
          trigger="click">
          <WorkSheetChartYSel @yColChange="yColChange" @yAggChange="yAggChange" :datas="initDatas.meta" :initCol="yColInfo"></WorkSheetChartYSel>
          <div class="wc-data-x" slot="reference" style="float: left;display: inline-block;padding: 5px 25px 5px 5px;position: relative;margin-right: 20px;cursor: pointer">
            <div style="font-size: 12px;">{{yShowVal}}</div>
            <div style="font-size: 10px">{{yAggShowVal}}</div>
            <div style="position: absolute;right: 8px;top: 5px">
              <svg width="8" height="5"><path fill="none" stroke="currentcolor" stroke-width="1" d="M1,1 L4,4 L7,1"></path></svg>
            </div>
          </div>
        </el-popover>
        <div style="float: left;display: inline-block;height: 1px;border-bottom: 1px solid #eee;width: 40%;margin-top: 10px;margin-right: 10px;">

        </div>
        <span style="float: right;">
            <svg width="16" height="16"><path fill="none" stroke-width="2" stroke="#408CFF" d="M2,10 L6,6 L10,10 L14,6"></path></svg>
          </span>
      </div>
      <div style="clear: both"></div>
      <div style="width: 100%;margin-top: 15px;">
        <el-popover
          placement="left"
          width="190"
          trigger="click">
          <WorkSheetChartXSel @xColChange="xColChange" @xAggChange="xAggChange" :datas="initDatas.meta" :initCol="xColInfo.prop"></WorkSheetChartXSel>
          <div class="wc-data-y" slot="reference" style="float: left;display: inline-block;padding: 5px 25px 5px 5px;position: relative;cursor: pointer;margin-right: 20px">
            <div style="font-size: 12px;">{{xShowVal}}</div>
            <div style="font-size: 10px">{{xAggShowVal}}</div>
            <div style="position: absolute;right: 8px;top: 5px">
              <svg width="8" height="5"><path fill="none" stroke="currentcolor" stroke-width="1" d="M1,1 L4,4 L7,1"></path></svg>
            </div>
          </div>
        </el-popover>
        <div style="float: left;display: inline-block;height: 1px;border-bottom: 1px solid #eee;width: 40%;margin-top: 10px;margin-right: 10px;">

        </div>
        <span style="float: right;color: gray">
            X-Axis
          </span>
      </div>
    </div>
    <div style="clear: both"></div>
    <div style="width: 100%;margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;padding-left: 15px;">
      <div class="wc-data-title">Appearence</div>

      <div style="margin-bottom: 10px;">
        <el-checkbox v-model="areaCheck" @change="areaChange"/><span style="margin-left: 10px;font-size: 14px;color: gray">Fill area</span>
      </div>

      <div style="margin-bottom: 10px;">
        <el-checkbox v-model="pointsCheck" @change="pointsChange" /><span style="margin-left: 10px;font-size: 14px;color: gray">Show points</span>
      </div>

      <div>
        <el-checkbox v-model="xCheck" @change="xChange" /><span style="margin-left: 10px;font-size: 14px;color: gray">Label X-Axis</span>
        <el-input style="margin-left: 20px;margin-top: 10px;width: 80%;display: block"  size="small" v-if="xCheck" v-model="this.options.xAxis.name" @input="xNameChanges" ></el-input>
      </div>

      <div style="margin-top: 10px">
        <el-checkbox v-model="yCheck" @change="yChange"/><span style="margin-left: 10px;font-size: 14px;color: gray">Label Y-Axis</span>
        <el-input style="margin-left: 20px;margin-top: 10px;width: 80%;display: block"  size="small" v-if="yCheck" v-model="this.options.yAxis.name" v-bind="this.options.yAxis.name" @input="yNameChanges"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import WorkSheetChartXSel from '../WorkSheetChartXSel'
import WorkSheetChartYSel from '../WorkSheetChartYSel'
import * as echarts from 'echarts'
import $ from 'jquery'
import WorkSheetChartCommSel from '../WorkSheetChartCommSel'

export default {
  name: 'LinePanel',
  components: {
    WorkSheetChartCommSel,
    WorkSheetChartXSel,
    WorkSheetChartYSel
  },
  props: ['idata'],
  data () {
    return {
      abc: '1',
      changeFlag: '1',
      areaCheck: true,
      pointsCheck: true,
      xCheck: true,
      yCheck: true,
      initFlag: false,
      initDatas: '',
      xColInfo: '',
      yColInfo: '',
      xColIndex: -1,
      xShowType: 1, // 1 x  2 y
      yAggType: -1, // 0:count,1:sum 2:Max 3:Min
      xShowVal: 'CC_SQ_FT',
      yShowVal: 'CC_SQ_FT',
      xAggShowVal: 'none',
      yAggShowVal: 'count',
      graphType: 2, // 1 line 2 bar ...
      groupArr: [// 1 bar  2 series 3 x/y轴 4 common add
        {
          id: 1,
          name: '',
          type: 1,
          color: '',
          gtype: 'none'
        },
        {
          id: 2,
          name: '',
          type: 3,
          color: '',
          gtype: 'none'
        }
      ],
      options: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '宇宙事实上',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0]
          },
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          name: '宇宙',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 40, 0]
          },
          type: 'value'
        },
        color: ['#409EFF'],
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  },
  beforeMount () {
    this.initDatas = this.idata
    this.dataChange(this.initDatas)
  },
  methods: {
    changeXAxis (type) {
      this.xShowType = type
      this.$refs.commSelector[0].parentChangeX(type)
    },
    yColChange: function (item) {
      if (this.initDatas !== '') {
        this.options.yAxis.name = item.name
        this.yColInfo = item
        // y轴 数字列 可sum等操作默认为sum，date/Aa则只有count
        this.options.series[0].data = this.calculate(this.options.xAxis.data)
        this.yShowVal = item.name
        this.initChart()
      }
    },
    yAggChange: function (agg) {
      this.yAggType = this.getYColTypeByName(agg)
      this.options.series[0].data = this.calculate(this.options.xAxis.data)
      this.yAggShowVal = agg
      this.initChart()
    },
    xColChange: function (item) { // 更换x抽 todo 相同列则不更新chart
      var col = item.name
      if (this.initDatas !== '') {
        let headers = this.initDatas.meta
        let xIndex = -1
        for (let i = 0; i < headers.length; i++) {
          if (headers[i].name === col) {
            xIndex = i
            break
          }
        }
        if (xIndex === -1) return
        // data
        this.xColIndex = xIndex
        this.xColInfo = item
        console.info('xColChange col index:', xIndex)
        let xArr = []
        let datas = this.initDatas.data

        let sets = 'key_0'
        for (let data1 of datas) {
          let k = 'key_' + data1[col]
          if (sets.indexOf(k) === -1) {
            xArr.push(data1[col])
            sets += k
          }
        }
        this.options.xAxis.data = xArr
        this.options.xAxis.name = col
        // y轴 数字列 可sum等操作默认为sum，date/Aa则只有count
        this.options.series[0].data = this.calculate(xArr)
        this.xShowVal = col
        this.initChart()
      }
    },
    xAggChange: function (agg) { // x轴展示改变
      if (agg === 'Integer') {
        let x = this.options.xAxis.data
        let newX = []
        for (let i = 0; i < x.length; i++) {
          newX.push(i + 1)
        }
        this.options.xAxis.data = newX
      } else {
        this.xColChange(this.options.xAxis.name)
      }
      this.xAggShowVal = agg
      this.initChart()
    },
    changeChartHeight (val) {
      $('.chart-main').height(val + 'px')
      $('.chart-control').height(val + 'px')
      this.initChart()
    },
    // res list change
    dataChange (rs) {
      if (!rs.data || !rs.meta || rs.data.length === 0) {
        console.info('data error')
        this.initFlag = true
        this.initDatas = ''
        $('#chart-main').hide()
        $('.nodata').show()
        var chartDom = document.getElementById('chart-main')
        let chartObj1 = echarts.init(chartDom)
        chartObj1.clear()
        console.info('data error11', this.initFlag, $('#chart-main'))
        this.$forceUpdate()
        this.abc = '2'
        return
      }
      this.abc = '1'
      var data = rs
      this.initDatas = ''
      console.info('hahahahaha', data)
      if (!data) {
        return
      }
      console.info('数据更新，图表更新:', data.data)
      // 选取第一个x {name: '日期', prop: 'date'}
      // let headers = data.meta
      // let xColumn = ''
      // let xIndex = -1
      // for (let i = 0; i < headers.length; i++) {
      //   if (headers[i].type !== 'String') {
      //     xColumn = headers[i].name
      //     this.xColInfo = headers[i]
      //     this.yColInfo = headers[i]
      //     this.xShowVal = xColumn
      //     this.yShowVal = xColumn
      //     xIndex = i
      //     break
      //   }
      // }
      let xColumn = data.meta[0].name
      let xIndex = 0
      this.xColInfo = this.yColInfo = data.meta[0]
      this.xShowVal = this.yShowVal = xColumn
      this.xColIndex = xIndex
      this.initDatas = data
      let xArr = []
      let datas = data.data
      let sets = 'key_0'
      for (let data1 of datas) {
        let k = 'key_' + data1[xColumn]
        if (sets.indexOf(k) === -1) {
          xArr.push(data1[xColumn])
          sets += k
        }
      }
      // sort
      // xArr.sort(function(a, b){return a - b});
      this.options.xAxis.data = xArr
      this.options.xAxis.name = xColumn

      // 以x轴进行分组，然后对组内数据进行统计分析
      this.options.yAxis.name = xColumn
      this.options.series[0].data = this.calculate(xArr)
      this.initChart()
    },
    calculate: function (xArray) {
      // 以当前的x轴统计
      if (this.xColInfo.type !== 'String' && this.xColInfo.type !== 'Date' && this.xColInfo.type !== 'DateTime') {
        xArray.sort(function (a, b) { return a * 1 - b * 1 })
      }
      let data = this.initDatas.data
      var yArr = []
      var type = this.yAggType
      console.info('vbv:', this.yAggType)
      if (this.yColInfo.type === 'String') {
        type = 0
      } else {
        type = this.yAggType === -1 ? 1 : this.yAggType
      }

      let headers = this.initDatas.meta
      // eslint-disable-next-line no-unused-vars
      let yIndex = -1
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].name === this.yColInfo.name) {
          yIndex = i
          break
        }
      }
      console.info('calculaterrrrr:', type, xArray)
      console.info('xColInfo:', this.xColInfo)
      for (let xArrayElement of xArray) {
        let tmpArr = data.filter(val => val[this.xColInfo.name] === xArrayElement)
        // console.info('tmpArr', tmpArr, this.yColInfo)
        // agg 数字默认是sum，字符和date只有count
        if (type === 0) { // count
          yArr.push(tmpArr.length)
        }
        if (type === 1) {
          let a = 0
          for (let tmpElement of tmpArr) {
            a += tmpElement[this.yColInfo.name] * 1
          }
          yArr.push(a)
        }
        // 0:count,1:sum 2:Max 3:Min
        if (type === 2) {
          let max = -1
          for (let tmpElement of tmpArr) {
            let t = tmpElement[this.yColInfo.name] * 1
            if (max === -1) {
              max = t
            }
            if (t > max) {
              max = t
            }
          }
          yArr.push(max === -1 ? 0 : max)
        }
        if (type === 3) {
          let min = -1
          for (let tmpElement of tmpArr) {
            let t = tmpElement[this.yColInfo.name] * 1
            if (min === -1) {
              min = t
            }
            if (min > t) {
              min = t
            }
          }
          yArr.push(min === -1 ? 0 : min)
        }
      }
      this.yAggType = type
      console.info('yarr', yArr, this.yAggType)
      this.yAggShowVal = this.getYColTypeShow()
      return yArr
    },
    getYColTypeShow: function () {
      console.info('getYColTypeShow1', this.yAggType)
      if (this.yAggType === 0) {
        return 'count'
      } else if (this.yAggType === 1) {
        return 'Sum'
      } else if (this.yAggType === 2) {
        return 'Min'
      } else if (this.yAggType === 3) {
        return 'Max'
      }
      return 'none1'
    },
    getYColTypeByName: function (val) {
      console.info('getYColTypeShow2', this.yAggType)
      if (val === 'none') { // 0:count,1:sum 2:Max 3:Min
        return -1
      } else if (val === 'Sum') {
        return 1
      } else if (val === 'Max') {
        return 2
      } else if (val === 'Min') {
        return 3
      } else if (val === 'count') {
        return 0
      }
      return -1
    },
    initChart: function () {
      $('#chart-main').show()
      var chartDom = document.getElementById('chart-main')
      console.info('cur height:', $('#chart-main').height(), $('#chart-main').parent().height())
      if ($('#chart-main').height() === 0) {
        let width = $('#chart-main').parent().width()
        $('#chart-main').height($('#chart-main').parent().height() + 'px')
        $('#chart-main').width(width * 0.75 + 'px')
      }
      let chartObj1 = echarts.init(chartDom)
      chartObj1.clear()
      chartObj1.resize({height: $('#chart-main').height()})
      chartObj1.setOption(this.options)
      this.initFlag = true
    },
    areaChange: function (val) {
      this.areaCheck = val
      if (val) {
        this.options.series[0].areaStyle = {}
      } else {
        delete this.options.series[0].areaStyle
      }
      this.initChart()
      console.info(this.options)
      /// chartObj && chartObj.setOption(this.options)
    },
    pointsChange: function (val) {
      this.pointsCheck = val
      if (val) {
        delete this.options.series[0].symbol
      } else {
        this.options.series[0].symbol = 'none'
      }
      this.initChart()
    },
    xChange: function (val) {
      this.xCheck = val
    },
    yChange: function (val) {
      this.yCheck = val
    },
    xNameChanges: function (val) {
      this.options.xAxis.name = val
      this.initChart()
    },
    yNameChanges: function (val) {
      this.options.yAxis.name = val
      // this.$forceUpdate();  //强制刷新
      this.initChart()
    }
  }
}
</script>

<style scoped>

</style>
<style>
.wc-data-x{
  border-radius: 4px;
  background-color: rgb(179, 241, 224);
}
.wc-data-y{
  border-radius: 4px;
  background-color: rgb(175, 216, 251);
}
.wc-data-title{
  margin-bottom: 15px;
}
.wc-data{
  padding-top: 15px;
  padding-left: 15px;
}
.wsc-chart-type{
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid #eee;
  padding-left: 15px;
}
.chart-wrapper{
  width: 100%;
  height: 300px;
}
.chart-main{
  display: inline-block;
  width: 75%;
  height: 100%;
  text-align: center;
}
.chart-control{
  display: inline-block;
  width: 24%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-left: 1px solid rgb(219, 222, 228);
}
.ware-add-btn{
  padding: 6px;
  border-radius: 3px;
  cursor: pointer;
}
.ware-add-btn:hover{
  background-color: #EEEEEE;
}
.span-bar-icon{
  cursor: pointer;
}
</style>
