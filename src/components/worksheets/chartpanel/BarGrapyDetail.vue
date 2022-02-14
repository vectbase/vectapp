<template>
  <div class="bar-detail" @click="toDetail">
    <div style="margin-bottom: 5px;font-size:11px;padding: 5px 10px;">
      <span style="font-weight:500;color:#2c2f34;">{{data.name}}</span>
      <span style="float:right;color: #b3afaf;" v-if="data.type === 'Date' || data.type === 'DateTime'">
        <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
      </span>
      <span v-else style="float:right;color: #b3afaf;">
        123
      </span>
    </div>
    <div :id="'chart'+data.name" style="width: 100%;height: 50px;">
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
    console.info('bar array:', this.data)
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
      console.info('oooo:', this.options)
    }
  },
  mounted () {
    console.info('开始加载bar')
    var chartDom = document.getElementById('chart' + this.data.name)
    let chartObj1 = echarts.init(chartDom)
    chartObj1.resize({height: $('#chart').height()})
    chartObj1.setOption(this.options)
  },
  methods: {
    toDetail: function () {
      this.$emit('toDetail', 'aaaaadddd')
    }
  }
}
</script>

<style>
.bar-detail{
  padding: 3px 0;
  border-radius: 8px;
  cursor: pointer;
}
.bar-detail:hover{
  background-color: rgb(227 224 224);
}

</style>
