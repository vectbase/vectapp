<template>
  <div class="bar-detail-col">
    <div style="font-size: 16px;padding-left: 5px;">
      column
      <span class="showAll" @click="toShowAll" style="float: right;cursor: pointer;font-size: 16px;color: #b3afaf;">x</span>
    </div>
    <div style="font-size:14px;margin: 10px;padding: 5px 0;">
      <span style="float:right;color: #b3afaf;" v-if="data.type === 'Date' || data.type === 'DateTime'">
        <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
      </span>
      <span v-else style="color: #b3afaf;">
        123
      </span>
      <span style="font-weight:500;color:#2c2f34;">{{data.name}}</span>
    </div>
    <div style="font-size: 12px;margin-bottom: 20px;">
      <div style="margin:5px 10px;font-size: 12px;color: rgb(122, 120, 120);">
        <span style="width: 50%;float: left;text-align: left">{{(this.data.tot - this.data.etot)/this.data.tot * 100}}%&nbsp;filled</span>
        <span style="width: 50%;float: right;text-align: right;" v-if="this.data.etot > 0">{{this.data.etot/this.data.tot * 100}}%&nbsp;blank</span>
      </div>
      <div style="clear: both"></div>
      <div style="margin:5px 10px;height: 2px;background-color: rgb(204, 205, 208);position: relative;">
        <div class="s-process" style="background-color: #409EFF;position: absolute;top: 0;left: 0;height: 2px;"></div>
      </div>
    </div>
    <div :id="'chart'+data.name" style="width: 100%;height: 220px;margin-top: 5px;">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import $ from 'jquery'
export default {
  name: 'BarGrapyDetail',
  props: ['data'],
  data () {
    return {
      options: {
        xAxis: {
          type: 'category',
          data: []
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'value'
        },
        color: ['#409EFF'],
        series: [
          {
            data: this.data.data,
            type: 'bar',
            areaStyle: {}
          }
        ]
      }
    }
  },
  beforeMount () {
    if (this.data.data && this.data.data.length > 0) {
      var arr = []
      this.data.data.forEach(val => {
        // group count
        let objs = arr.filter(tmp => tmp.name === val)
        if (objs.length > 0) {
          let obj = objs[0]
          obj.count = obj.count * 1 + 1
        } else {
          let n = {
            name: val,
            count: 1
          }
          arr.push(n)
        }
      })
      var xArr = []
      var yArr = []
      arr.forEach(val => {
        xArr.push(val.name)
        yArr.push(val.count)
      })
      this.options.series[0].data = yArr
      this.options.xAxis.data = xArr
    }
  },
  mounted () {
    $('.showAll').hide()
    var chartDom = document.getElementById('chart' + this.data.name)
    let chartObj1 = echarts.init(chartDom)
    chartObj1.resize({height: $('#chart').height()})
    chartObj1.setOption(this.options)

    let sprocess = (this.data.tot - this.data.etot) / this.data.tot * 100 + '%'
    $('.s-process').css({'width': sprocess})

    // mouse in out
    $('.bar-detail-col').on('mouseover', function () {
      $('.showAll').show()
    })
    $('.bar-detail-col').on('mouseout', function () {
      $('.showAll').hide()
    })
  },
  methods: {
    // m
    toShowAll: function () {
      this.$emit('showTableInfo', '')
    }
  }
}
</script>

<style>
.bar-detail-col{
  width: 100%;margin-top: 5px;border-radius: 8px;padding-bottom: 5px;padding-top: 5px;
}
</style>
