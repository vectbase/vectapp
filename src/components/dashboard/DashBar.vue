<template>
  <div class="container">
    <div class="container_right cwidth width-all">
      <div style="padding: 2px 0 2px 10px;font-size: 16px;">{{ initDatas.remark }}</div>
      <div style="display: flex;flex-direction: row; align-items: center;width: 100%;height: 90%;" v-if="showDatas.length === 0">
        <div class="nodata" style="width: 100%;display: flex;flex-direction: column;align-items: center;">
          <div style="height: 30px;margin-top: 10px">
            <svg width="52" height="32" viewBox="0 0 68 34" fill="#8b8d91">
              <path d="M67.8 2.5L46.5 25.6C45.7 26.5 44.3 26.6 43.3 26L23.3 13.3 2.5 34 0.1 31.6 21.4 10.4C22.2 9.6 23.5 9.5 24.5 10.1L44.5 22.7 65.3 0.2 67.8 2.5Z"></path>
            </svg>
          </div>
          <div style="margin-top: 20px">
            Query produced no results
          </div>
        </div>
      </div>
      <div class="chart-main" :id="'chart-main-' + this.initDatas.id" style="height: 100%;width: 100%" v-else>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapState} from 'vuex'
import * as echarts from "echarts";
export default {
  name: 'DashBar',
  props: ['initDatas'],
  data () {
    return {
      showDatas: [],
      options: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        xAxis: {
          type: 'value',
          nameLocation: 'center',
          nameTextStyle: {
            padding: [0, 0, 50, 0]
          },
          name: '',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          nameLocation: 'center',
          name: '',
          nameTextStyle: {
            padding: [20, 0, 0, 0]
          },
          type: 'category'
        },
        // color: ['#409EFF'],
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ],
        color: ['#409eff', 'green', 'orange', 'yellow']
      },
      groupArr: [
        {
          id: 1,
          name: 'id',
          type: 4,
          color: '',
          gtype: 'none', // agg type
          dtype: 'Int32' // data string
        },
        {
          id: 2,
          name: 'id',
          type: 1,
          color: '',
          gtype: 'none',
          dtype: 'Int32'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'services'
    ])
  },
  async beforeMount () {
    if (this.initDatas && this.initDatas.param !== null) {
      let info = JSON.parse(this.initDatas.param)
      this.groupArr = info
    }
    let res = await this.services.workSheetService.exeSql({'sqlmessage': this.initDatas.sqlCon, 'hUserId': 175})
    let baseCols = this.groupArr.filter(val => val.type === 1 || val.type === 5)
    let base = baseCols[0]
    let xArr = []
    if (res && res.code === 200) {
      let datas = res.data.data
      this.showDatas = res.data.data
      let sets = ''
      for (let data1 of datas) {
        let k = 'key_' + data1[base.name]
        if (sets.indexOf(k) === -1) {
          xArr.push(data1[base.name])
          sets += k
        }
      }
      this.options.xAxis.data = xArr
      this.options.xAxis.name = base.name
      this.calculate1(xArr)
      var _this = this
      setTimeout(function () {
        var chartDom = document.getElementById('chart-main-' + _this.initDatas.id)
        let chartObj1 = echarts.init(chartDom)
        chartObj1.setOption(_this.options)
      },300)
    }
  },
  methods: {
    calculate1: function (xArray) {
      let baseCols = this.groupArr.filter(val => val.type === 1 || val.type === 5)
      let base = baseCols[0]
      if (base.dtype !== 'String' && base.dtype !== 'Date' && base.dtype !== 'DateTime') {
        xArray.sort(function (a, b) { return a * 1 - b * 1 })
      }
      let yclos = this.groupArr.filter(val => val.type !== 1 && val.type !== 5)
      var seriesArr = []
      yclos.forEach(val => {
        var yArrs = []
        if (this.showDatas.length > 0) {
          xArray.forEach(x => {
            let data = this.showDatas.filter(tt => {
              return tt[base.name] === x
            })
            if (data.length > 0) {
              if (val.gtype === 'Sum') {
                let a = 0
                for (let tmpElement of data) {
                  a += tmpElement[val.name] * 1
                }
                yArrs.push(a)
              } else if (val.gtype === 'none' || val.gtype === 'count') {
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
          type: 'bar',
          data: yArrs,
          name: val.name
        }
        seriesArr.push(tObj)
      })
      this.options.series = seriesArr
      this.options.xAxis.name = base.name

      delete this.options.xAxis.data
      this.options.yAxis.data = xArray
      this.options.xAxis.type = 'value'
      this.options.yAxis.type = 'category'
    }
  }
}
</script>

<style>
.width-all{
  width: 100%;
  overflow-y: auto;
  padding: 2px;
}
.width-left{
  width: calc(100% - 283px);
}
.cwidth{
  padding: 1px!important;
  display: inline-block;
  height: 100%;
  border-radius: 12px;
  float: left;
  background-color: #FAFAFA;
}
.detail-info{
  width: 272px;
  display: inline-block;
  /*height: 100%;*/
  background-color: #FAFAFA;
  overflow-y: scroll;
  /*border-left: 1px solid rgb(226, 227, 229);*/
}
.selects{
  position: absolute;
  top: 30px;
  left: -10px;
  height: 0;
  border: 2px solid #409EFF;
  width: 0;
}
.father{
  margin: 3px;
}
.father .col{
  float: left;
  width: 50px;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
.father .right{
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
.father .right .row{
  width: 100%;
  height: 60px;
  overflow: hidden;
  /*background-color: #E9ECF8;*/

}
.father .right .content{
  width: 100%;
  overflow: auto;
  position: relative;
}
.father .col ul{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
.father .col ul li{
  width: 50px;
  height: 30px;
  /*border: 1px solid #ccc;*/
  background-color: white;
}
ul, li{
  list-style: none;
  margin: 0;
  padding: 0;
}
.hd_icon{
  position: absolute;height:0px;top:0;
}
.hd_icon_wapper{
  position:absolute;right:5px;top:5px;height:30px;width:40px;color:#409EFF;padding-top:3px;padding-left:5px;
}
.el-popover{
  padding: 0!important;
  min-width: 100px!important;
}
.sort-span:hover{
  color: #409EFF;
  cursor: pointer;
}
.container{
  background-color: #FAFAFA;
  height: 100%;
}
.detail-info-hide{
  display: none;
}
</style>
