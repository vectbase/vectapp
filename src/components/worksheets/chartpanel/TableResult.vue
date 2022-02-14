<template>
  <div class="container">
    <div class="container_right cwidth" :class="{'width-all': this.hideGrapy,'width-left': !this.hideGrapy}">
      <div class="father" style="position: relative;">
        <div class="col">
<!--          <ul>-->
<!--            <li></li>-->
<!--          </ul>-->
          <canvas id="col"></canvas>
        </div>
        <div class="right">
          <div class="row" style="height: 30px;">
            <canvas id="row"></canvas>
            <div v-for="(site,index) in headers" class="hd_icon" :key="site.lable" :id="'hid_'+index">
              <div class="hd_icon_wapper" :cur-index="index">
                <span>
                  <svg v-if="curSortCol === site.lable + '_asc'" width="14" height="14" viewBox="0 0 16 16"><desc>Ascending Sort</desc><g fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7L8 1L14 7"></path><path d="M8 1V15"></path></g></svg>
                  <svg v-if="curSortCol === site.lable + '_desc'" width="14" height="14" viewBox="0 0 16 16"><desc>Descending Sort</desc><g fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9L8 15L14 9"></path><path d="M8 1V15"></path></g></svg>
                </span>
                <el-popover
                  placement="top"
                  trigger="click"
                  width="96"
                  v-if="moreOperIndex === index">
                  <div style="padding: 0 8px 0 10px;width: 80px;">
                    <span class="sort-span" @click="sortData('asc',site)">
                      <svg width="32" height="32" viewBox="0 0 32 32"><desc>Ascending Sort</desc><g fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15L16 9L22 15"></path><path d="M16 9V23"></path></g></svg>
                    </span>
                    <span style="margin-left: 10px;" class="sort-span" @click="sortData('desc',site)">
                      <svg width="32" height="32" viewBox="0 0 32 32"><desc>Descending Sort</desc><g fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17L16 23L22 17"></path><path d="M16 9V23"></path></g></svg>
                    </span>
                  </div>
                  <span slot="reference" @click="stopHide"  style="padding:3px;cursor: pointer;"><svg width="12px" height="12px" viewBox="0 0 12 12"><desc>Show Actions</desc><g fill="currentcolor"><circle cx="2" cy="6" r="1"></circle><circle cx="6" cy="6" r="1"></circle><circle cx="10" cy="6" r="1"></circle></g></svg></span>
                </el-popover>
              </div>
            </div>
          </div>
          <div class="content">
            <canvas id="canvasId"></canvas>
          </div>
          <div class="selects">

          </div>
        </div>
      </div>
    </div>
    <div :class="{'detail-info': !this.hideGrapy,'detail-info-hide': this.hideGrapy}">
      <TableDetail :data="initDatas" :meta="initHeaders" :colName="curShowCol" ref="tableDetail" @resetSelects="resetSelects" @changeSelectsFromSon="changeSelectsFromSon"></TableDetail>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import TableDetail from './TableDetail'
export default {
  name: 'TableResult',
  components: {TableDetail},
  props: ['initDatas', 'initHeaders'],
  data () {
    return {
      arr: [],
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
  beforeMount () {
    this.datas = this.initDatas
    this.headers = this.initHeaders
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
  },
  mounted () {
    this.freshTable()
    $('.container').height($('.box_far').height() - 30 + 'px')
    $('.content').height($('.right').height() - 30 + 'px')
    this.mouseEnterCanvas()
    // .content 的scroll滚动事件
    $('.content').on('scroll', function (e) {
      var top = $(this).scrollTop()
      var left = $(this).scrollLeft()

      $('#col').css({
        transform: 'translateY(-' + top + 'px)'
      })

      $('#row').css({
        transform: 'translateX(-' + left + 'px)'
      })
      $('.hd_icon').css({
        transform: 'translateX(-' + left + 'px)'
      })
      $('.selects').css({
        transform: 'translate(-' + left + 'px,-' + top + 'px)'
      })
    })
  },
  methods: {
    filterRes: function (fVal) {
      this.filterVal = fVal
      this.freshTable()
    },
    freshTable: function (data, header, first) {
      if (data) {
        this.datas = data
        this.initDatas = data
      }
      if (header) {
        this.headers = header
        this.initHeaders = header
      }
      console.info('header:', this.headers)
      var _headers = []
      var lenMax = 50
      for (var i = 0; i < this.headers.length; i++) {
        var head = this.headers[i].lable
        if (first) {
          head = this.headers[i].name
        }
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
      // 主体的宽度和高度
      this.colCanvas() // 绘画左边的canvas

      this.rowCanvas() // 绘画上面的canvas

      this.ContentWhite() // 绘画中间内容的canvas
      // clear selects
      this.resetSelects()
    },
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
      var cas = document.getElementById('col')

      var _firstGridWidth = this.firstGridWidth

      var _gridHeight = this.gridHeight

      // 2.动态设置canvas画布的宽高
      cas.width = _firstGridWidth + '' // 第一个表格的宽度 + 数组的长度
      cas.height = _gridHeight * (this.datas.length + 1) + ''

      // 3.拿到canvas绘图上下文
      var ctx = cas.getContext('2d')

      // var radio = this.getRadio(ctx)
      // cas.width = _firstGridWidth * radio // 第一个表格的宽度 + 数组的长度
      // cas.height = _gridHeight * (this.datas.length + 1) * radio
      // cas.style.width = _firstGridWidth * radio + 'px'
      // cas.style.height = _gridHeight * (this.datas.length + 1) + 'px'
      // ctx.scale(radio, radio)

      // ctx.font = '14px Courier New'
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
      var cas = document.getElementById('row')
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
      var cas = document.getElementById('canvasId')
      var _gridHeight = this.gridHeight

      var tabLen = this.getTabWidth() // 列
      var lineLen = this.datas.length // 行

      // 2.动态设置canvas画布的宽高
      cas.width = tabLen // 第一个表格的宽度 + 数组的长度
      cas.height = (_gridHeight * lineLen).toString()

      // 3.拿到canvas绘图上下文
      var ctx = cas.getContext('2d')
      // var radio = this.getRadio(ctx)
      // // 2.动态设置canvas画布的宽高
      // cas.width = tabLen * radio // 第一个表格的宽度 + 数组的长度
      // cas.height = _gridHeight * lineLen * radio
      // cas.style.width = tabLen * radio + 'px'
      // cas.style.height = _gridHeight * lineLen * radio + 'px'
      // ctx.scale(radio, radio)

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
    mouseEnterCanvas: function () {
      var cas = document.getElementById('canvasId')

      var ctx = cas.getContext('2d')

      ctx.font = '18px Courier New'
      var _this = this
      $('#canvasId').on('mousedown', function (e) {
        _this.hideGrapy = false
        console.info('click main')
        var y = parseInt(e.offsetY / _this.gridHeight)

        let t = 0
        // let x
        let target = null
        for (var i = 0; i < _this.headers.length; i++) {
          let val = _this.headers[i]
          t = t + val.len * _this.mpx
          if (t > e.offsetX) {
            // x = i
            t = t - val.len * _this.mpx
            target = val
            break
          }
        }
        t = t + _this.firstGridWidth
        $('.selects').css({'left': t + 'px', 'top': (y + 1) * _this.gridHeight + 'px', 'width': target.len * _this.mpx - 3 + 'px', height: _this.gridHeight - 2 + 'px'})
        console.info('e.x:', target, _this.datas[y])
        _this.$refs.tableDetail.changeDataByCell({'type': target.type, 'val': _this.datas[y][target.lable], 'col': target.lable})
      })

      $('#col').on('mousedown', function (e) {
        _this.hideGrapy = false
        var y = parseInt(e.offsetY / _this.gridHeight)
        var width = $('#row').width() + _this.firstGridWidth
        console.info('colllll:', $('#row').width())
        $('.selects').css({'left': '0', 'top': y * _this.gridHeight + 'px', 'width': width - 4 + 'px', height: _this.gridHeight - 2 + 'px'})
        _this.$refs.tableDetail.changeDataByRow(_this.datas[y - 1], y)
      })
      // 显示操作icon
      $('.hd_icon_wapper').on('mouseenter', function (e) {
        _this.moreOperIndex = $(this).attr('cur-index') * 1
      })
      // row mouseover
      $('#row').on('mousemove', function (e) {
        let x = 0
        for (var i = 0; i < _this.headers.length; i++) {
          let val = _this.headers[i]
          x = x + val.len * _this.mpx
          if (x > e.offsetX) {
            _this.moreOperIndex = i
            break
          }
        }
      })
      $('#row').on('mouseout', function () {
        console.info('abbb')
        if (_this.hideFlag === -1) {
          _this.moreOperIndex = -1
        }
      })
      $('.hd_icon_wapper').on('mouseleave', function () {
        console.info('flag:', _this.hideFlag)
        if (_this.hideFlag === -1) {
          _this.moreOperIndex = -1
        }
      })
      $('#canvasId').on('mouseout', function () {
        console.info('accc')
        _this.moreOperIndex = -1
      })
      // content mouseover
      $('#canvasId').on('mousemove', function (e) {
        let x = 0
        for (var i = 0; i < _this.headers.length; i++) {
          let val = _this.headers[i]
          x = x + val.len * _this.mpx
          if (x > e.offsetX) {
            _this.moreOperIndex = i
            break
          }
        }
      })
      $('#row').on('mousedown', function (e) {
        _this.hideGrapy = false
        console.info('click row')
        let x = 0
        // let colIndex
        let target = null
        for (var i = 0; i < _this.headers.length; i++) {
          let val = _this.headers[i]
          x = x + val.len * _this.mpx
          if (x > e.offsetX) {
            // colIndex = i
            x = x - val.len * _this.mpx
            target = val
            break
          }
        }
        x = x + _this.firstGridWidth
        $('.selects').css({'left': x + 'px', 'top': 0, 'width': target.len * _this.mpx - 2 + 'px', 'height': (_this.datas.length + 1) * _this.gridHeight})
        _this.$refs.tableDetail.changeColName(target.lable)
      })
    },
    resetSelects: function () {
      console.info('qqqqq')
      $('.selects').css({'left': -10, 'top': -1, 'width': 0, 'height': 0})
    },
    changeSelectsFromSon: function (colName) {
      console.info('changeSelectsFromSon')
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
}
.width-left{
  width: calc(100% - 283px);
}
.cwidth{
  padding: 1px!important;
  display: inline-block;
  height: 100%;
  overflow: hidden;
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
}
.detail-info-hide{
  display: none;
}
</style>
