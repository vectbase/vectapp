<template>
  <div>
    <div class="wc-data">
      <div class="wc-data-title">Data</div>
      <div v-for="(site, index) in groupArr" :key="site.id" style="width: 100%;margin-top: 10px;" @click="changeCurOpreate(index)">
        <div style="width: 100%">
          <el-popover
            placement="left"
            trigger="click">
            <WorkSheetChartCommSel ref="commSelector" :initGraphType="graphType" @yColChange="yColChangeFn" @yAggChange="yAggChange" @axisChange="axisChange" @removeColumn="removeColumnFn" :datas="initDatas.meta" :initCol="yColInfo" :xShowType="xShowType" :key="index"></WorkSheetChartCommSel>
            <div slot="reference" style="float: left;display: inline-block;width: 55%;" v-if="site.name === ''">
              <div class="ware-add-btn">+ Add column</div>
            </div>
            <div slot="reference" style="width: 55%;float: left;display: inline-block;" v-else>
              <div  :class="{ 'wc-data-y': site.type === 1 || site.type === 5, 'wc-data-x': site.type !== 1 && site.type !== 5}"   style="padding: 5px 25px 5px 5px;cursor: pointer;display: inline-block;position: relative;">
                <div style="font-size: 12px;">{{site.name}}</div>
                <div style="font-size: 10px">{{site.gtype}}</div>
                <div style="position: absolute;right: 8px;top: 5px">
                  <svg width="8" height="5"><path fill="none" stroke="currentcolor" stroke-width="1" d="M1,1 L4,4 L7,1"></path></svg>
                </div>
              </div>
            </div>
          </el-popover>
          <div style="float: left;display: inline-block;height: 1px;border-bottom: 1px solid #eee;width: 20%;margin-top: 10px;margin-right: 10px;">
          </div>
          <span  class="bar-icon-selected" :style="{'float': 'right', 'color': options.color[index]}">
              <svg v-if="site.type === 6" width="16" height="16"><path fill="none" stroke-width="2" stroke="currentcolor" d="M2,10 L6,6 L10,10 L14,6"></path></svg>
              <span style="float: right;color: gray" v-else-if="site.type === 2">
               Series
              </span>
              <span v-else-if="site.type === 5" style="color: rgb(101, 103, 108)">X-Axis</span>
              <span v-else-if="site.type === 1" style="color: rgb(101, 103, 108)">Y-Axis</span>
            </span>
        </div>
        <div style="clear: both"></div>
      </div>
      <div v-if="showAddBtn()" @click="changeCurOpreate(-1)">
        <el-popover
          placement="left"
          width="190"
          trigger="click"
        >
          <WorkSheetChartCommSel ref="commSelector1" @yColChange="yColChangeFn" :initGraphType="graphType" @yAggChange="yAggChange" :datas="initDatas.meta" :initCol="yColInfo" :xShowType="xShowType" :key="-1"  @removeColumn="removeColumnFn"></WorkSheetChartCommSel>
          <div slot="reference" style="float: left;display: inline-block;width: 55%;"> <!--@click="addGroupCol" -->
            <div style="float: left;display: inline-block;margin-top: 10px;" class="ware-add-btn" >+ Add column</div>
          </div>
        </el-popover>
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
  name: 'LinePanelMore',
  components: {
    WorkSheetChartCommSel,
    WorkSheetChartXSel,
    WorkSheetChartYSel
  },
  props: ['idata'],
  data () {
    return {
      abc: '1',
      chartObj: '',
      curOperate: 0,
      changeFlag: '1',
      areaCheck: true,
      pointsCheck: true,
      xCheck: true,
      yCheck: true,
      initFlag: false,
      initDatas: '',
      xColInfo: '',
      yColInfo: {},
      xColIndex: -1,
      xShowType: 1, // 1 x  2 y
      yAggType: -1, // 0:count,1:sum 2:Max 3:Min
      xShowVal: 'CC_SQ_FT',
      yShowVal: 'CC_SQ_FT',
      xAggShowVal: 'none',
      yAggShowVal: 'count',
      graphType: [5, 6], // 1 line 2 bar ...
      groupArr: [
        {
          id: 1,
          name: '',
          type: 6, // line
          gtype: 'none', // agg type
          dtype: '' // data string
        },
        {
          id: 2,
          name: '',
          type: 5, // x
          gtype: 'none'
        }
      ],
      groupArrCopy: [ // do not edit!!!
        {
          id: 1,
          name: '',
          type: 6, // line
          gtype: 'none', // agg type
          dtype: '' // data string
        },
        {
          id: 2,
          name: '',
          type: 5, // x
          gtype: 'none'
        }
      ],
      options: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        xAxis: {
          name: '',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [20, 0, 0, 0]
          },
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          name: '',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 40, 0]
          },
          type: 'value'
        },
        color: ['#409eff', 'green', 'orange', 'yellow'],
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
    console.info('bar init idata:', this.idata)
    this.initDatas = this.idata
    this.dataChange(this.initDatas)
  },
  // watch: {
  //   initDatas (dd) {
  //     this.dataChange(this.initDatas)
  //   }
  // },
  methods: {
    changeXAxis (type) {
      this.xShowType = type
      this.$refs.commSelector[0].parentChangeX(type)
    },
    errorShow: function () {
      let msg
      let arr = this.groupArr.filter(val => val.name === '')
      if (arr.length > 0) {
        msg = arr[0].type === 5 ? 'X-Axis' : 'Line'
      }
      $('#chart-main').html(
        '<div style="height: 100%;background-color: rgb(242, 242, 242);align-items: center;display: flex;flex-direction: column;justify-content: center">' +
          '<div style="margin-bottom: 20px;display: flex;height: 20px;">' +
            '<svg viewBox="0 0 68 34" style="width: 52px;" fill="#8b8d91" class="bq a7k          " role="presentation"><path d="M67.8 2.5L46.5 25.6C45.7 26.5 44.3 26.6 43.3 26L23.3 13.3 2.5 34 0.1 31.6 21.4 10.4C22.2 9.6 23.5 9.5 24.5 10.1L44.5 22.7 65.3 0.2 67.8 2.5Z"></path></svg>' +
          '</div>' +
          '<div style="text-align: center;font-weight: 600;font-size: 14px;">' + msg + ' column is required</div>' +
        '</div>'
      )
    },
    download () {
      // d
      let picInfo = this.chartObj.getDataURL({
        type: 'png',
        pixelRatio: 1.5,
        backgroundColor: '#fff'
      })

      const elink = document.createElement('a')
      elink.download = $('.wsnp-show').attr('wstitle')
      elink.style.display = 'none'
      elink.href = picInfo
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
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
      // this.yAggType = this.getYColTypeByName(agg)
      // this.options.series[0].data = this.calculate(this.options.xAxis.data)
      // this.yAggShowVal = agg
      // this.initChart()

      this.groupArr[this.curOperate].gtype = agg
      this.changeBarGrapy()
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
      console.info('数据更新，图表更新111:', data.data)
      let headers = data.meta
      var iCol = headers[0]
      this.initDatas = data
      this.groupArr.forEach(val => {
        if (val.type !== 1 && val.type !== 5) {
          if (iCol.type === 'String') {
            val.gtype = 'count'
          } else {
            console.info('wait for you')
            val.gtype = 'Sum'
          }
        }
        val.dtype = iCol.type
        val.name = iCol.name
      })
      this.changeBarGrapy()
    },
    calculate: function (xArray) {
      // 以当前的x轴统计
      if (this.xColInfo.type !== 'String' && this.xColInfo.type !== 'Date' && this.xColInfo.type !== 'DateTime') {
        xArray.sort(function (a, b) { return a * 1 - b * 1 })
      }
      let data = this.initDatas.data
      var yArr = []
      var type = this.yAggType
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
      for (let xArrayElement of xArray) {
        let tmpArr = data.filter(val => val[this.xColInfo.name] === xArrayElement)
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
      $('#chart-main').html('')
      console.info('aaaaaaaaaa', $('#chart-main').height())
      $('#chart-main').removeAttr('_echarts_instance_')
      if ($('#chart-main').height() === 0 && $('#chart-main').parent().height() > 0) {
        let width = $('#chart-main').parent().width()
        $('#chart-main').height($('#chart-main').parent().height() + 'px')
        console.info('abcde1:', $('#chart-main').parent().height())
        $('#chart-main').width(width * 0.75 + 'px')
      }
      let chartObj1 = echarts.init(chartDom)
      this.chartObj = chartObj1
      chartObj1.resize({height: $('#chart-main').height()})
      chartObj1.setOption(this.options)
      this.initFlag = true
      this.$emit('changeOption', JSON.stringify(this.groupArr), 2)
    },
    areaChange: function (val) {
      console.info('areaChange:', val)
      this.areaCheck = val
      if (val) {
        this.options.series.forEach(t => {
          t.areaStyle = {}
        })
        // this.options.series[0].areaStyle = {}
      } else {
        this.options.series.forEach(t => {
          delete t.areaStyle
        })
      }
      this.initChart()
      console.info(this.options)
      /// chartObj && chartObj.setOption(this.options)
    },
    pointsChange: function (val) {
      this.pointsCheck = val
      if (val) {
        this.options.series.forEach(t => {
          delete t.symbol
        })
      } else {
        this.options.series.forEach(t => {
          t.symbol = 'none'
        })
        // this.options.series[0].symbol = 'none'
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
    },
    yColChangeFn: function (item) {
      console.info('line panel yColChange:', item.name)
      var esArr = this.groupArr.filter(val => val.name === item.name)
      if (this.curOperate === -1) {
        // add new
        // 如果xy都存在的话，则需要在commsel再判断，多于3个直接确定（如果有series，则替换掉，没有则新增一个）
        // if (this.groupArr.length > 2) {
        // }
        if (esArr.length > 0) { // 如果存在则不添加，因snow没有限制，故先注释掉，后续根据需要可放开
        }
        let newItem = {
          id: item.name,
          name: item.name,
          type: this.groupArr[0].type,
          gtype: item.gtype
        }
        this.groupArr.unshift(newItem)
        // reset color
        this.addBarColor()
        this.curOperate = 0
        this.areaCheck = true
      } else {
        // edit
        let cur = this.groupArr[this.curOperate]
        console.info('cur:', cur)
        if (cur.type !== 1 || cur.type !== 5) {
          cur.gtype = item.gtype
        }
        cur.name = item.name
        this.updateFlag += 1
      }
      if (this.initDatas !== '') {
        console.info('nnn...')
        let arr = this.groupArr.filter(val => val.name !== '')
        if (arr.length > 1) {
          this.changeBarGrapy()
        }
      }
    },
    changeCurOpreate: function (index) {
      this.curOperate = index
      if (index === -1) {
        let newItem = {
          id: -1,
          name: '',
          type: this.groupArr[0].type
        }
        this.$refs.commSelector1.changeInitSel(newItem)
        // this.yColInfo = undefined
      } else {
        this.yColInfo = JSON.parse(JSON.stringify(this.groupArr[index]))
        // this.$refs.commSelector[0].changeInitSel(this.yColInfo)
        console.info('yyyyy:', this.$refs.commSelector)
      }
    },
    axisChange: function (type) {
      // can draw
      let cur = this.groupArr[this.curOperate]
      let x = {
        id: 2,
        name: '',
        type: 5, // x
        gtype: 'none'
      }
      let y = {
        id: 1,
        name: '',
        type: 6,
        gtype: 'none',
        dtype: ''
      }
      if (type === 5) {
        let ng = []
        x.name = cur.name
        ng.push(y)
        ng.push(x)
        this.groupArr = ng
        this.errorShow()
        return
      }
      if (type === 6) {
        let ng = []
        y.name = cur.name
        ng.push(y)
        ng.push(x)
        this.groupArr = ng
        this.errorShow()
        return
      }
      // find
      let oldArr = this.groupArr.filter(val => val.type === type)
      // exchange
      let old = oldArr[0]
      if (type === 1 || type === 5) {
        if (old.dtype === 'String') {
          old.gtype = 'count'
        } else {
          old.gtype = 'Sum'
        }
        cur.gtype = 'none'
      } else {
        // bar lines
        if (cur.dtype === 'String') {
          cur.gtype = 'count'
        } else {
          cur.gtype = 'Sum'
        }
        old.gtype = 'none'
      }
      old.type = cur.type
      cur.type = type
      // sort
      let newGroup = []
      let baseAx = this.groupArr.filter(val => val.type === 1 || val.type === 5)
      newGroup.push(baseAx[0])
      this.groupArr.forEach(tmp => {
        if (tmp.type !== 1 && tmp.type !== 5) {
          newGroup.push(tmp)
        }
      })
      this.groupArr = newGroup
      this.changeBarGrapy()
    },
    removeColumnFn: function () {
      $('.el-popover').hide()
      let cur = this.groupArr[this.curOperate]
      if (cur.type === 1 || cur.type === 5) {
        // let pre = this.groupArr[this.curOperate - 1]
        // console.info('pre:', pre)
        // cur.name = pre.name
        // if (this.groupArr.length > 2) {
        //   this.groupArr.get(this.curOperate - 1).remove()
        // } else {
        //   pre.name = ''
        // }
        cur.name = ''
        this.errorShow()
      } else {
        // 非 x、y
        let cur = this.groupArr[this.curOperate]
        if (this.groupArr.length > 2) {
          this.groupArr.splice(this.curOperate, 1)
          this.changeBarGrapy()
        } else {
          cur.name = ''
          this.errorShow()
        }
        this.yColInfo = {'name': ''}
      }
    },
    changeBarGrapy: function () {
      let baseCols = this.groupArr.filter(val => val.type === 1 || val.type === 5)
      let base = baseCols[0]
      let xArr = []
      let datas = this.initDatas.data

      let sets = ''
      for (let data1 of datas) {
        let k = 'key_' + data1[base.name]
        if (sets.indexOf(k) === -1) {
          xArr.push(data1[base.name])
          sets += k
        }
      }
      console.info('xarrr:', xArr)
      this.options.xAxis.data = xArr
      this.options.xAxis.name = base.name
      console.info('all0:', this.options)
      // y轴 数字列 可sum等操作默认为sum，date/Aa则只有count
      this.calculate1(xArr)
      this.initChart()
      console.info('group arr11:', this.groupArr)
    },
    calculate1: function (xArray) {
      let baseCols = this.groupArr.filter(val => val.type === 1 || val.type === 5)
      let base = baseCols[0]
      if (base.dtype !== 'String' && base.dtype !== 'Date' && base.dtype !== 'DateTime') {
        xArray.sort(function (a, b) { return a * 1 - b * 1 })
      }
      let yclos = this.groupArr.filter(val => val.type !== 1 && val.type !== 5)
      console.info('yclos:', yclos)
      var seriesArr = []
      yclos.forEach(val => {
        var yArrs = []
        // if (val.gtype !== 'none' && this.initDatas.data && this.initDatas.data.length > 0) {
        if (this.initDatas.data && this.initDatas.data.length > 0) {
          xArray.forEach(x => {
            let data = this.initDatas.data.filter(tt => {
              return tt[base.name] === x
            })
            console.info('xxxxdata:', data, val.gtype === 'count')
            if (data.length > 0) {
              if (val.gtype === 'Sum') {
                let a = 0
                for (let tmpElement of data) {
                  a += tmpElement[val.name] * 1
                }
                yArrs.push(a)
                // eslint-disable-next-line eqeqeq
              } else if (val.gtype === 'none' || val.gtype === 'count') {
                console.info('coccc:', data.length, data)
                yArrs.push(data.length)
              } else if (val.gtype === 'Max') {
                let max = -1
                for (let tmpElement of data) {
                  let t = tmpElement[val.name] * 1
                  if (max === -1) {
                    max = t
                  }
                  if (t > max) {
                    max = t
                  }
                }
                yArrs.push(max === -1 ? 0 : max)
              } else {
                let min = -1
                for (let tmpElement of data) {
                  let t = tmpElement[val.name] * 1
                  if (min === -1) {
                    min = t
                  }
                  if (min > t) {
                    min = t
                  }
                }
                yArrs.push(min === -1 ? 0 : min)
              }
            }
          })
        }
        let tObj = {
          type: 'line',
          areaStyle: {},
          data: yArrs,
          name: val.name
        }
        console.info('tobj:', tObj)
        seriesArr.push(tObj)
      })
      this.options.series = seriesArr
      this.options.xAxis.name = base.name
    },
    showAddBtn: function () {
      let t = this.groupArr.filter(value => value.name === '')
      if (t.length > 0) {
        return false
      }
      return true
    },
    addBarColor: function () {
      if (this.groupArr.length > 4) {
        // add color
        let mod = this.groupArr.length % 4
        this.options.color.push(this.options.color[mod - 1])
      }
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
  /*height: 300px;*/
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
