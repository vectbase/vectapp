<template>
  <div class="tb-detail">
    <div v-if="type === 3" style="background-color: white; font-size: 14px;" class="cell-info">
      <div style="margin-top: 3px;">
        <span style="color: #b3afaf;margin-left: 2px;" v-if="cellInfo.type === 'String'">Aa</span>
        <span style="color: #b3afaf;margin-left: 2px;" v-else-if="cellInfo.type === 'Date' || cellInfo.type === 'DateTime'">
          <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
        </span>
        <span v-else style="color: #b3afaf;margin-left: 2px;">
        123
        </span>
        <span style="margin-left: 10px;font-weight: bold">{{cellInfo.col}}</span>
        <span class="showAll" @click="showTableInfo" style="float: right;cursor: pointer;font-size: 16px;color: #b3afaf;display: none">x</span>
      </div>
      <div style="padding-left: 2px;margin-top:5px">{{cellInfo.val}}</div>
    </div>
    <div v-else-if="type === 2">
      <RowDetail :row="row" :len="data.length" @showTableInfo="showTableInfo"></RowDetail>
    </div>
    <div v-else-if="type === 4">
      <BarGrapyColDetail v-if="arr[0].type !== 'String'" :data="arr[0]" style="margin-top: 5px;" @showTableInfo="showTableInfo" ></BarGrapyColDetail>
      <StrGrapyColDetail v-else :datas="arr[0]" style="margin-top:5px;" @showTableInfo="showTableInfo" ref="sGrapyDetail"></StrGrapyColDetail>
    </div>
    <div v-else v-for="site in arr" :key="site.name">
       <BarGrapyDetail v-if="site.type !== 'String'" :data="site" style="margin-top: 5px;" @toDetail="toDetail(site)"></BarGrapyDetail>
       <StrGrapyDetail v-else :datas="site" style="margin-top:5px;" @toDetail="toDetail(site)"></StrGrapyDetail>
    </div>
  </div>
</template>

<script>

import BarGrapyDetail from './BarGrapyDetail'
import StrGrapyDetail from './StrGrapyDetail'
import RowDetail from './RowDetail'
import BarGrapyColDetail from './BarGrapyColDetail'
import StrGrapyColDetail from './StrGrapyColDetail'
import $ from 'jquery'
export default {
  name: 'TableDetail',
  components: {RowDetail, StrGrapyDetail, BarGrapyDetail, BarGrapyColDetail, StrGrapyColDetail},
  props: ['data', 'colName', 'meta', 'irow'],
  beforeMount () {
    this.initDatas()
  },
  data () {
    return {
      arr: [],
      row: this.irow,
      type: 1, // 1:all 2:row  3: cell 4: col
      cellInfo: {}
    }
  },
  methods: {
    initDatas: function (val) {
      var cName = val
      if (!val) {
        cName = this.colName
      }
      if (cName !== '') {
        var curArr = this.meta.filter(val => val.name === cName)
        var tArr = []
        var nullCount = 0
        this.data.forEach(val => {
          let v = val[cName]
          if (v && v.trim() !== '') {
            tArr.push(v)
          } else {
            nullCount++
          }
        })
        let t = {
          'type': curArr[0].type,
          data: tArr,
          name: cName,
          etot: nullCount,
          tot: this.data.length
        }
        this.arr = []
        this.arr.push(t)
        console.info('alll datas1:', cName, this.arr)
      } else {
        // all
        this.arr = []
        this.meta.forEach(t => {
          var tArr = []
          this.data.forEach(val => {
            tArr.push(val[t.name])
          })
          let info = {
            'type': t.type,
            data: tArr,
            name: t.name
          }
          this.arr.push(info)
        })
      }
    },
    changeColName: function (val) {
      this.type = 4
      this.initDatas(val)
      var _this = this
      setTimeout(function () {
        _this.$refs.sGrapyDetail.freshStrs()
      }, 200)
    },
    changeDataByRow: function (row, index) {
      this.type = 2
      this.row = row
      this.row.cur = index
    },
    changeDataByCell: function (cellInfo) {
      this.type = 3
      this.cellInfo = cellInfo
      setTimeout(function () {
        $('.cell-info').on('mouseover', function () {
          $('.showAll').show()
        })
        $('.cell-info').on('mouseout', function () {
          $('.showAll').hide()
        })
      }, 200)
    },
    showTableInfo: function () {
      this.type = 1
      this.initDatas()
      this.$emit('resetSelects', '')
    },
    toDetail: function (data) {
      this.changeColName(data.name)
      // selects
      this.$emit('changeSelectsFromSon', data.name)
    }
  }
}
</script>

<style>

</style>
