<template>
  <div class="container" v-loading="loading" element-loading-text="Loading...">
    <div class="container_right cwidth" :class="{'width-all': this.hideGrapy,'width-left': !this.hideGrapy}">
      <div style="padding: 2px 0 2px 10px;font-size: 16px;">{{ initDatas.remark }}</div>
      <div style="display: flex;flex-direction: row; align-items: center;width: 100%;height: 90%;" v-if="nodata === '0'">
        <div class="nodata" style="width: 100%;display: flex;flex-direction: column;align-items: center;">
          <div style="margin-top: 20px">
            Query produced no results
          </div>
        </div>
      </div>
      <div class="father" style="position: relative;" v-else>
        <div class="col">
          <canvas :id="'col_'+initDatas.id"></canvas>
        </div>
        <div class="right">
          <div class="row" style="height: 30px;">
            <canvas :id="'row_'+initDatas.id"></canvas>
          </div>
          <div class="content" :class="'cont_' + initDatas.id">
            <canvas :id="'canvasId_'+initDatas.id"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapState} from 'vuex'
export default {
  name: 'DashTable',
  props: ['initDatas'],
  data () {
    return {
      loading: true,
      arr: [],
      nodata: '',
      datas: [],
      headers: [],
      firstGridWidth: 50,
      gridWidth: 90,
      gridHeight: 30,
      mpx: 14,
      scrollLeft: 0,
      scrollTop: 0,
      moreOperIndex: 1,
      hideFlag: -1,
      sortIndex: -1,
      curSortCol: '',
      // 当前要展示的列内容
      curShowCol: '',
      hideGrapy: true,
      filterVal: ''
    }
  },
  computed: {
    ...mapState([
      'services'
    ])
  },
  async beforeMount () {
    let res = await this.services.workSheetService.exeSql({'sqlmessage': this.initDatas.sqlCon, 'hUserId': 175})
    if (res && res.code === 200) {
      let headers = res.data.meta
      this.nodata = '1'
      headers.map(tmp => {
        tmp.prop = tmp.name
      })
      this.headers = headers
      this.datas = res.data.data
      var _headers = []
      var lenMax = 50
      for (var i = 0; i < this.headers.length; i++) {
        var head = this.headers[i].name
        var len = head.length < 8 ? 8 : head.length
        this.datas.forEach(val => {
          let t = val[head].length
          if (len < t && t <= lenMax) {
            len = t
          }
        })
        _headers.push({
          'lable': head,
          'len': len,
          'type': this.headers[i].type
        })
      }
      this.headers = _headers

      this.colCanvas() // 绘画左边的canvas

      this.rowCanvas() // 绘画上面的canvas

      this.ContentWhite()
      var _this = this
      $('.cont_' + this.initDatas.id).on('scroll', function (e) {
        var top = $(this).scrollTop()
        var left = $(this).scrollLeft()

        $('#col_' + _this.initDatas.id).css({
          transform: 'translateY(-' + top + 'px)'
        })

        $('#row_' + _this.initDatas.id).css({
          transform: 'translateX(-' + left + 'px)'
        })
        $('.hd_icon').css({
          transform: 'translateX(-' + left + 'px)'
        })
        $('.selects').css({
          transform: 'translate(-' + left + 'px,-' + top + 'px)'
        })
      })
    } else {
      this.nodata = '0'
    }
    this.loading = false
  },
  methods: {
    toggleGrapy: function () {
      this.hideGrapy = !this.hideGrapy
      if (this.hideGrapy) {
        this.resetSelects()
      }
    },
    hideGrapyFn: function () {
      this.hideGrapy = true
      this.resetSelects()
    },
    sortData: function (sort, col) {
      // sort
      this.datas.sort((a, b) => {
        var val1 = a[col.lable]
        var val2 = b[col.lable]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return sort === 'asc' ? -1 : 1
        } else if (val1 > val2) {
          return sort === 'asc' ? 1 : -1
        } else {
          return 0
        }
      })
      this.ContentWhite()
      this.curSortCol = col.lable + '_' + sort
    },
    stopHide: function () {
      this.hideFlag = 0
    },
    changeDatas: function (data) {
      console.info('change data:', data)
    },
    getTabWidth: function () {
      var width = 0
      this.headers.forEach(val => {
        width += val.len * this.mpx
      })
      console.info('获取到的width：', width)
      return width
    },
    colCanvas: function () {
      //  1.找到canvas
      var cas = document.getElementById('col_' + this.initDatas.id)

      var _firstGridWidth = this.firstGridWidth

      var _gridHeight = this.gridHeight

      // 2.动态设置canvas画布的宽高
      cas.width = _firstGridWidth + '' // 第一个表格的宽度 + 数组的长度
      cas.height = _gridHeight * (this.datas.length + 1) + ''

      // 3.拿到canvas绘图上下文
      var ctx = cas.getContext('2d')
      ctx.font = '14px Aprial'
      ctx.strokeStyle = 'rgb(226, 227, 229)' // 轮廓的颜色

      // 4.绘制纵着的坐标
      for (var i = 0, len = this.datas.length; i < len; i++) {
        if (i === 0) {
          ctx.rect(0, 0, _firstGridWidth, _gridHeight)
        }
        if (i + 1 < 10) {
          ctx.rect(0, 30 + _gridHeight * i, _firstGridWidth, _gridHeight)
          ctx.fillText(i + 1, 15, 30 + _gridHeight * (i + 1) - 8)
        } else if (i + 1 < 100) {
          ctx.rect(0, 30 + _gridHeight * i, _firstGridWidth, _gridHeight)
          ctx.fillText(i + 1, 8, 30 + _gridHeight * (i + 1) - 8)
        } else {
          ctx.rect(0, 30 + _gridHeight * i, _firstGridWidth, _gridHeight)
          ctx.fillText(i + 1, 2, 30 + _gridHeight * (i + 1) - 8)
        }
      }
      ctx.stroke()
    },
    rowCanvas: function () {
      //  1.找到canvas
      var cas = document.getElementById('row_' + this.initDatas.id)
      var _gridHeight = this.gridHeight

      // 3.拿到canvas绘图上下文
      var ctx = cas.getContext('2d')
      var radio = this.getRadio(ctx)
      // 2.动态设置canvas画布的宽高
      cas.width = this.getTabWidth() * radio // 第一个表格的宽度 + 数组的长度
      cas.height = _gridHeight * 1 * radio
      cas.style.width = this.getTabWidth() + 'px'
      cas.style.height = _gridHeight + 'px'
      ctx.scale(radio, radio)
      console.info('radio:', radio)

      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.font = 'bold 14px Aprial'
      ctx.strokeStyle = 'rgb(226, 227, 229)'
      var prex = 0
      var _mpx = this.mpx
      this.headers.forEach(function (item, index) {
        ctx.rect(prex, 0, _mpx * item.len, _gridHeight)
        ctx.fillText(item.lable, prex + 10, _gridHeight - 8)
        prex += _mpx * item.len
      })
      ctx.stroke()

      // 绘制sort
      var hdIconLeft = this.firstGridWidth
      var _this = this
      setTimeout(function () {
        _this.headers.forEach(function (item, index) {
          let curWidth = _mpx * item.len
          $('#hid_' + index).css({'left': hdIconLeft + 'px', 'width': curWidth + 'px'})
          hdIconLeft += curWidth
        })
      }, 200)
    },
    getRadio: function (ctx) {
      var dpr = window.devicePixelRatio || 1
      var bsr = ctx['webkitBackingStorePixelRatio'] ||
          ctx['mozBackingStorePixelRatio'] ||
          ctx['msBackingStorePixelRatio'] ||
          ctx['oBackingStorePixelRatio'] ||
          ctx['backingStorePixelRatio'] || 1

      return dpr / bsr
    },
    ContentWhite: function () {
      //  1.找到canvas
      var cas = document.getElementById('canvasId_' + this.initDatas.id)
      var _gridHeight = this.gridHeight

      var tabLen = this.getTabWidth() // 列
      var lineLen = this.datas.length // 行

      // 2.动态设置canvas画布的宽高
      cas.width = tabLen // 第一个表格的宽度 + 数组的长度
      cas.height = (_gridHeight * lineLen).toString()

      // 3.拿到canvas绘图上下文
      var ctx = cas.getContext('2d')

      ctx.lineWidth = 0.5
      ctx.font = '14px Courier New'
      // ctx.font = '14px Aprial'
      ctx.strokeStyle = 'rgb(226, 227, 229)' // 轮廓的颜色

      var pre = 0
      for (var m = 0; m < this.headers.length; m++) {
        var h = this.headers[m]
        for (var i = 0; i < this.datas.length; i++) {
          var data = this.datas[i]
          let val = data[h.lable]
          if (this.filterVal !== '' && val !== '' && val.indexOf(this.filterVal) > -1) {
            ctx.fillStyle = '#fff0c1'
            ctx.fillRect(pre, _gridHeight * i, h.len * this.mpx, _gridHeight)
          } else {
            ctx.rect(pre, _gridHeight * i, h.len * this.mpx, _gridHeight)
          }
          // ctx.strokeStyle = 'black'

          // ctx.fillStyle = '#fff' // 背景;

          // ctx.fillRect(pre, _gridHeight * i, h.len * this.mpx, _gridHeight)
          ctx.fillStyle = 'rgb(44, 47, 52)'

          if (val) {
            ctx.fillText(val, pre + 14, _gridHeight * i + 22)
          } else {
            ctx.fillText('', pre + 14, _gridHeight * i - 8)
          }
        }
        pre += h.len * this.mpx
      }
      ctx.stroke()
    },
    resetSelects: function () {
      $('.selects').css({'left': -10, 'top': -1, 'width': 0, 'height': 0})
    },
    changeSelectsFromSon: function (colName) {
      let x = 0
      // let colIndex
      let target = null
      for (var i = 0; i < this.headers.length; i++) {
        let val = this.headers[i]
        x = x + val.len * this.mpx
        if (colName === val.lable) {
          // colIndex = i
          x = x - val.len * this.mpx
          target = val
          break
        }
      }
      x = x + this.firstGridWidth
      $('.selects').css({'left': x + 'px', 'top': 0, 'width': target.len * this.mpx - 2 + 'px', 'height': (this.datas.length + 1) * this.gridHeight})
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
