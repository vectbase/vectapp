<template>
  <div class="chart-wrapper">
    <div class="nodata" v-if="initFlag && initDatas === ''" style="width: 100%;height: 100%;background-color: #EEEEEE;text-align: center;padding-top: 20px">
      <div style="height: 30px;margin-top: 10px">
        <svg width="52" height="32" viewBox="0 0 68 34" fill="#8b8d91">
          <path d="M67.8 2.5L46.5 25.6C45.7 26.5 44.3 26.6 43.3 26L23.3 13.3 2.5 34 0.1 31.6 21.4 10.4C22.2 9.6 23.5 9.5 24.5 10.1L44.5 22.7 65.3 0.2 67.8 2.5Z"></path>
        </svg>
      </div>
      <div style="margin-top: 20px">
        Query produced no results
      </div>
    </div>
    <div class="chart-main" id="chart-main">
    </div>
    <div class="chart-control" v-if="this.initDatas !== ''">
      <div class="wsc-chart-type">Chart type
        <el-popover placement="bottom" width="190" trigger="click" ref="gtypePop">
          <span style="float: right;color: rgb(26, 108, 231);margin-right: 15px;" slot="reference">
            <span v-if="grapyType === 1" style="color: #409EFF;">
              <svg width="16" height="16"><path fill="none" stroke-width="2" stroke="#408CFF" d="M2,10 L6,6 L10,10 L14,6"></path></svg>
              Lines
            </span>
            <span v-else style="color: #409EFF;">
              <svg width="16" height="16" viewBox="0 0 20 20"><g fill="currentcolor"><rect x="2" y="14" width="4" height="4"></rect><rect x="8" y="8" width="4" height="10"></rect><rect x="14" y="2" width="4" height="16"></rect></g></svg>
              Bar
            </span>
          </span>
          <div style="font-size: 16px;">
            <div style="margin-bottom: 10px;"  @click="changeGrapy(1)" :class="{'gtype-selected': 1=== grapyType,'g-list-item': 2=== grapyType}">
              <svg width="16" height="16"><path fill="none" stroke-width="2" stroke="currentcolor" d="M2,10 L6,6 L10,10 L14,6"></path></svg>
              Line
              <span style="float: right">
                <svg v-if="1 === grapyType" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </div>
            <div  @click="changeGrapy(2)" :class="{'gtype-selected': 2=== grapyType,'g-list-item': 1=== grapyType}">
              <span>
                <svg  width="16" height="16" viewBox="0 0 20 20"><g fill="currentcolor"><rect x="2" y="14" width="4" height="4"></rect><rect x="8" y="8" width="4" height="10"></rect><rect x="14" y="2" width="4" height="16"></rect></g></svg>
              </span>
              Bar
              <span style="float: right">
                <svg v-if="2 === grapyType" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </div>
          </div>
        </el-popover>
        <span style="position: absolute;right: 0;top: -3px;color: rgb(26, 108, 231);">
        <svg width="8" height="5"><path fill="none" stroke="currentcolor" stroke-width="1" d="M1,1 L4,4 L7,1"></path></svg>
      </span>
      </div>
      <BarPanel  v-show="grapyType === 2" ref="barPanel" :init-datas="initDatas" v-on:changeOption="changeOption"></BarPanel>
      <LinePanelMore v-show="grapyType === 1" ref="linePanel" :idata="initDatas" v-on:changeOption="changeOption"></LinePanelMore>
<!--      <LinePanel v-show="grapyType === 1" ref="linePanel" :idata="initDatas"></LinePanel>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as echarts from 'echarts'
import WorkSheetChartXSel from './WorkSheetChartXSel'
import WorkSheetChartYSel from './WorkSheetChartYSel'
import LinePanel from "./chartpanel/LinePanel";
import BarPanel from "./chartpanel/BarPanel";
import LinePanelMore from "./chartpanel/LinePanelMore";
import $ from "jquery";
import {mapState} from "vuex";
var chartObj
export default {
  name: 'WorkSheetChart',
  components: {
    LinePanelMore,
    BarPanel,
    // LinePanel,
    WorkSheetChartXSel,
    WorkSheetChartYSel
  },
  // props: ['changeHeight'],
  updated () {
    console.info('组建更新了。。。。。。', this.abc)
    var deaHeight = 300
    if (this.initDatas !== '') {
      var len = this.initDatas.meta.length
      deaHeight = (len + 3) * 40
    }
    $('.x-wapper-y').parent().height((deaHeight + 40) + 'px')
    $('.x-wapper-x').parent().height(deaHeight + 'px')

    if (this.abc === '2') {
      $('.chart-main').hide()
      $('.nodata').show()
      console.info('son size:', $('.nodata').children().length)
      var size = $('.nodata').children().length
      if (size === 3) {
        $('.nodata').children()[0].remove()
      }
    }
  },
  computed: {
    ...mapState(['services'])
  },
  data () {
    return {
      wsHisId: -1,
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
      yAggType: -1, // 0:count,1:sum 2:Max 3:Min
      xShowVal: 'CC_SQ_FT',
      yShowVal: 'CC_SQ_FT',
      xAggShowVal: 'none',
      yAggShowVal: 'count',
      grapyType: 1, // 1 line 2 bar
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
  mounted () {
    // this.initChart()
    if ($('#chart-main').height() === 0 ) {
      $('#chart-main').height($('.sql-down').height() + 'px')
      $('.chart-control').height($('.sql-down').height() + 'px')
    }
  },
  watch: {
    changeFlag () {
    }
  },
  methods: {
    changeOption: function (param,type) {
      console.info('change graph options:', param, type)
      // console.info('cur typessss:', $('#res-btn').hasClass('ws-btn-active'), $('#chat-btn').hasClass('ws-btn-active'))
      if ($('#chat-btn').hasClass('ws-btn-active')) {
        this.services.workSheetService.updateWsHistory({'type': type, 'id': this.wsHisId, 'param': param})
      }
    },
    freshWsHisId: function (id) {
      this.wsHisId = id
    },
    initHeight: function (h) {
      $('#chart-main').height(h + 'px')
      this.refreshGrapy()
    },
    download: function () {
      this.$refs.linePanel.download()
    },
    changeGrapy: function (type) {
      this.grapyType = type
      var $this = this
      setTimeout(function () {
        if ($this.grapyType === 1) {
          $this.$refs.linePanel.dataChange($this.initDatas)
        } else {
          $this.$refs.barPanel.dataChange($this.initDatas)
        }
      },200)
      this.$refs.gtypePop.doToggle()
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
      this.refreshGrapyOnlyHeight()
    },
    refreshGrapyOnlyHeight: function () {
      if (this.grapyType === 1) {
        if (this.$refs.linePanel) {
          this.$refs.linePanel.initChart()
        }
      } else {
        if (this.$refs.barPanel) {
          this.$refs.barPanel.initChart()
        }
      }
    },
    refreshGrapy: function () {
      // var _this = this
      if (this.grapyType === 1) {
        if (this.$refs.linePanel) {
          this.$refs.linePanel.dataChange(this.initDatas)
        }
      } else {
        if (this.$refs.barPanel) {
          this.$refs.barPanel.dataChange(this.initDatas)
        }
      }
    },
    // res list change
    dataChange (rs) {
      if (rs.code !== 200 || !rs.data || !rs.data.meta || !rs.data.data || rs.data.data.length === 0) {
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
      var data = rs.data
      this.initDatas = ''
      if (!data) {
        return
      }
      this.initDatas = data
      this.refreshGrapy()
      // console.info('数据更新，图表更新:', data.data)
      // // 选取第一个x {name: '日期', prop: 'date'}
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
      // if (xIndex === -1) { // no data shwo
      //   return
      // }
      // this.xColIndex = xIndex
      // this.initDatas = data
      // let xArr = []
      // let datas = data.data
      // let sets = 'key_0'
      // for (let data1 of datas) {
      //   let k = 'key_' + data1[xColumn]
      //   if (sets.indexOf(k) === -1) {
      //     xArr.push(data1[xColumn])
      //     sets += k
      //   }
      // }
      // // sort
      // // xArr.sort(function(a, b){return a - b});
      // this.options.xAxis.data = xArr
      // this.options.xAxis.name = xColumn
      //
      // // 以x轴进行分组，然后对组内数据进行统计分析
      // this.options.yAxis.name = xColumn
      // this.options.series[0].data = this.calculate(xArr)
      // this.initChart()
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
        console.info('tmpArr', tmpArr, this.yColInfo)
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
      if ($('#chart-main').height() === 0 && $('#chart-main').parent().height() > 0) {
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
  position: relative;
  cursor: pointer;
}
.chart-wrapper{
  width: 100%;
  /*height: 300px;*/
}
.chart-main{
  float: left;
  width: 75%;
  height: 300px;
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
.g-list-item:hover{
  background-color: #EEEEEE;
  padding: 5px;
}
.g-list-item{
  cursor: pointer;
  padding: 5px;
}
.el-popover{
  padding: 0!important;
}
.gtype-selected{
  padding: 5px;
  cursor: pointer;
  color: white;
  background-color: #409EFF;
}
</style>

<style scoped>

</style>
