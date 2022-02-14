<!--<template>-->
  <!--<div v-bind:id="tableId">-->
    <!--<el-row>-->
      <!--<el-col :span="12">-->
        <!--<h3>116.2 Credits Used</h3>-->
      <!--</el-col>-->
      <!--<el-row>-->
        <!--<el-col :span="15" style="text-align: left">-->
          <!--<h3>Usage</h3>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<el-input size="mini" v-model="value" placeholder="select"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<el-input size="mini" v-model="value" placeholder="select"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<el-input size="mini" v-model="value" placeholder="select"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="2">-->
          <!--<el-input size="mini" v-model="value" placeholder="select"></el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="1">-->
          <!--<el-col :span="1">-->
            <!--<el-button size="mini" icon="el-icon-refresh" style="margin-left: 4px" @click="querySearchAsync"></el-button>-->
          <!--</el-col>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</el-row>-->
    <!--<span style="text-align: left">-->
      <!--<el-badge type="primary" is-dot class="item"></el-badge>Warehouse-->
    <!--</span>-->
    <!--<div id="chart_example">-->
    <!--</div>-->
    <!--<span>Credits Used per Resource from 9/29/2021 to 10/26/2021</span>-->

    <!--<el-table-->
      <!--:data="tableData"-->
      <!--height="250"-->
      <!--border-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="NAME"-->
        <!--min-width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="type"-->
        <!--label="TYPE"-->
        <!--mon-width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="TYPE"-->
        <!--min-width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<canvas-->
            <!--:id="'canvas-' + scope.row.id"-->
            <!--height="30"-->
            <!--ref="canvas"-->
          <!--&gt;</canvas>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

  <!--</div>-->
<!--</template>-->

<!--&lt;!&ndash;<script src="assets/vendor/datatables/datatables.min.js"></script>&ndash;&gt;-->
<!--&lt;!&ndash;<script src="assets/js/initiate-datatables.js"></script>&ndash;&gt;-->

<!--<script>-->
<!--const delay = (function () {-->
  <!--let timer = 0-->
  <!--return function (callback, ms) {-->
    <!--clearTimeout(timer)-->
    <!--timer = setTimeout(callback, ms)-->
  <!--}-->
<!--})()-->
<!--export default {-->
  <!--name: 'UsageStorageBody',-->
  <!--props: ['tableId'],-->
  <!--watch: {-->
    <!--queryString: function () {-->
      <!--delay(() => {-->
        <!--this.querySearchAsync()-->
      <!--}, 300)-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--querySearchAsync: function () {-->
      <!--console.log('aaaa')-->
    <!--}-->
  <!--},-->
  <!--mounted () {-->
    <!--const echarts = require('echarts')-->
    <!--let myChart = echarts.init(document.getElementById('chart_example'))-->
    <!--let option = {-->
      <!--color: ['#0ff'],-->
      <!--tooltip: {-->
        <!--trigger: 'axis',-->
        <!--axisPointer: {-->
          <!--type: 'shadow'-->
        <!--}-->
      <!--},-->
      <!--xAxis: [-->
        <!--{-->
          <!--type: 'category',-->
          <!--data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],-->
          <!--axisTick: {-->
            <!--alignWithLabel: true-->
          <!--}-->
        <!--}-->
      <!--],-->
      <!--yAxis: [-->
        <!--{-->
          <!--type: 'value'-->
        <!--}-->
      <!--],-->
      <!--series: [-->
        <!--{-->
          <!--name: '每月花费',-->
          <!--type: 'bar',-->
          <!--barWidth: '60%',-->
          <!--data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356]-->
        <!--}-->
      <!--]-->
    <!--}-->
    <!--myChart.setOption(option)-->
    <!--window.addEventListener('resize', function () {-->
      <!--myChart.resize()-->
    <!--})-->
    <!--var data = this.tableData-->
    <!--setTimeout(function () {-->
      <!--for (var i = 0; i < data.length; i++) {-->
        <!--const canvas = document.getElementById('canvas-' + data[i].id)-->
        <!--canvas.getContext('2d').strokeStyle = '#0ff'-->
        <!--canvas.getContext('2d').moveTo(canvas.offsetLeft, canvas.offsetHeight - 15)-->
        <!--if (i === 1) {-->
          <!--// canvas.getContext('2d').lineTo(canvas.offsetLeft + canvas.offsetWidth / 2, canvas.offsetHeight + 10)-->
        <!--}-->
        <!--canvas.getContext('2d').lineTo(canvas.offsetLeft + canvas.offsetWidth, canvas.offsetHeight - 15)-->
        <!--canvas.getContext('2d').stroke()-->
      <!--}-->
    <!--}, 500)-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--msg: 'UsageStorageBody',-->
      <!--value: '',-->
      <!--ctx: {},-->
      <!--tableData: [{-->
        <!--id: 1,-->
        <!--name: 'D1',-->
        <!--type: 'warehouse',-->
        <!--creditsUsed: 'aaaa'-->
      <!--}, {-->
        <!--id: 2,-->
        <!--name: 'D1',-->
        <!--type: 'warehouse',-->
        <!--creditsUsed: 'aaaa'-->
      <!--}, {-->
        <!--id: 3,-->
        <!--name: 'D1',-->
        <!--type: 'warehouse',-->
        <!--creditsUsed: 'aaaa'-->
      <!--}]-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
  <!--#chart_example{-->
    <!--width: 100%;-->
    <!--height: 200px;-->
  <!--}-->
  <!--.item {-->
    <!--margin-top: 5px;-->
  <!--}-->
<!--</style>-->

<!--<i18n>-->
  <!--{-->
  <!--"en": {-->
  <!--"hello": "hello world!"-->
  <!--},-->
  <!--"zh": {-->
  <!--"hello22": "hello22、世fff界!"-->
  <!--}-->
  <!--}-->
<!--</i18n>-->
