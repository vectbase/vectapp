<template>
  <div class="x-wapper-comm x-wapper-x" v-if="this.selCol && this.selCol.name !== ''">
    <div style="padding: 10px 8px;font-size: 16px">Column</div>
    <template v-for="(site) in colArr" :site="site"  style="margin-bottom: 10px;">
      <div @click="dbChange(site)" :key="site.name"  :class="{ 'x-wapper-selected': site.name === selCol.name, 'x-wapper-item': site.name !== selCol.name}">
        <div class="cx-left">
          <span v-if="site.type === 'String'" :class="{'icon-selected': site.name === selCol.name, 'aa-col-icon': site.name !== selCol.name}">Aa&nbsp;&nbsp;</span>
          <div v-else-if="site.type === 'Date' || site.type === 'DateTime'" style="font-size: 10px;margin-right: 10px;" :class="{'icon-selected': site.name === selCol.name, 'color-orange': site.name !== selCol.name}" class="item" >
            <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
          </div>
          <span v-else :class="{'icon-selected': site.name === selCol.name, 'num-col-icon': site.name !== selCol.name}">123</span>
        </div>
        <div class="cx-cont" :class="{'disable-color': !itemCanSelect('1', site.type)}">{{site.name}}</div>
        <div class="" style="padding-top: 2px;">
          <svg v-if="site.name === selCol.name" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>
    </template>
    <div style="padding: 0 0 10px 0;border-top: 1px solid #eee">
      <div style="margin: 10px 0;font-size: 16px;padding-left: 10px;">Use as</div>
      <template v-for="(site) in this.initGraphType" :site="site" >
        <div @click="axisChange(site)" :class="{ 'x-wapper-selected': site === selCol.type, 'x-wapper-item': site !== selCol.type, 'disable-color': !itemCanSelect('2', site)}"  :key="site">
          <div class="cx-left">
            <div v-if="site === 5" class="cx-left-svg"><!--x轴-->
              <svg class="svg-cxleft" width="16px" height="16px" viewBox="0 0 16 16"><g fill="none" stroke="currentcolor" stroke-width="2"><path d="M1,5 L1,11"></path><path d="M14,8 L2,8"></path><path d="M15,5 L15,11"></path></g></svg>
            </div>
            <div v-if="site === 1" class="cx-left-svg">
              <!--y轴-->
              <svg class="svg-cxleft" width="16px" height="16px" viewBox="0 0 16 16"><g fill="none" stroke-width="2" stroke="currentcolor"><path d="M5,1 L11,1"></path><path d="M8,2 L8,14"></path><path d="M5,15 L11,15"></path></g></svg>
            </div>
            <div v-if="site === 2" class="cx-left-svg">
              <!--series-->
              <svg class="svg-cxleft" width="16px" height="16px" viewBox="0 0 16 16"><g fill="none" stroke="currentcolor" stroke-width="2"><path d="M2,4 L14,4"></path><path d="M2,8 L14,8"></path><path d="M2,12 L14,12"></path></g></svg>
            </div>
            <div v-if="site === 4" class="cx-left-svg">
              <!--fan-->
              <svg class="svg-cxleft" width="16px" height="16px" viewBox="0 0 16 16"><g fill="none" stroke="currentcolor" stroke-width="2"><path d="M2,4 L14,4"></path><path d="M2,8 L10,8"></path><path d="M2,12 L6,12"></path></g></svg>
            </div>
            <div v-if="site === 3" class="cx-left-svg">
              <!--zh-->
              <svg class="svg-cxleft" width="16px" height="16px" viewBox="0 0 16 16"><g fill="none" stroke="currentcolor" stroke-width="2"><path d="M4,10 L4,14"></path><path d="M8,6 L8,14"></path><path d="M12,2 L12,14"></path></g></svg>
            </div>
            <div v-if="site === 6" class="cx-left-svg">
              <!--line-->
              <svg  width="16" height="16"><path fill="none" stroke-width="2" stroke="currentcolor" d="M2,10 L6,6 L10,10 L14,6"></path></svg>
            </div>
          </div>
          <div class="cx-cont">{{getUseName(site)}}</div>
          <div class="cx-right" style="padding-top: 2px;">
            <svg v-if="site === selCol.type" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
      </template>
    </div>
    <div style="padding: 0 10px 10px 10px;border-top: 1px solid #eee">
      <div style="margin: 10px 0;font-size: 16px">Aggregation</div>
      <div v-if="selCol.type === 1 || selCol.type === 5">
        <div class="agg agg-big-active">
          none
        </div>
      </div>
      <div v-else>
        <template v-for="(site) in aggArr.big" :site="site">
          <div v-if="site === selCol.gtype" class="agg agg-big-active" v-bind:key="site">
            {{site}}
          </div>
          <div v-bind:key="site" v-else class="agg agg-big" v-bind:class="{ 'disable-color': selCol.gtype === 'String' && site === 'none'}" @click="aggClick(site)">
            {{site}}
          </div>
        </template>
      </div>

      <div style="margin-top: 5px;" v-if="selCol.type !== 1 && selCol.type !== 5 && selCol.dtype !== 'String'">
        <template v-for="(site) in aggArr.small" :site="site" >
          <div v-bind:key="site" v-if="site === selCol.gtype" class="agg agg-small-active">
            {{site}}
          </div>
          <div v-bind:key="site" v-else class="agg agg-small" @click="aggClick(site)">
            {{site}}
          </div>
        </template>
      </div>
    </div>
    <div style="border-top: 1px solid #eee" @click="removeColumn">
      <div class="x-wapper-item" style="padding-left: 14px;line-height: 30px;">
        <div class="cx-left-svg"><!--x轴-->
          一
        </div>
        <div class="cx-cont">Remove column</div>
        <div class="cx-right" style="padding-top: 2px;">
        </div>
      </div>
    </div>
  </div>
  <div class="x-wapper-comm" v-else>
    <template v-for="(site) in colArr" :site="site"  style="margin-bottom: 10px;" v-if="((selCol.type === 1 || selCol.type === 5) && site.type !== 'String') || (selCol.type !== 1 && selCol.type !== 5)">
      <div class="x-wapper-item" :key="site.id"  @click="addColumn(site)">
        <div class="cx-left">
          <span v-if="site.type === 'String'" style="color: rgb(139, 141, 145)" class="db-col-icon">Aa&nbsp;&nbsp;</span>
          <div v-else-if="site.type === 'Date' || site.type === 'DateTime'" style="color: rgb(216, 169, 0);font-size: 10px;margin-right: 18px;"  class="item"  content="date" >
            <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
          </div>
          <span v-else style="color: rgb(3, 164, 118)" class="db-col-icon">123</span>
        </div>
        <div class="cx-cont">{{site.name}}</div>
        <div class="cx-right"></div>
      </div>
    </template>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'WorkSheetChartCommSel',
  props: ['datas', 'initCol', 'initXShowType', 'initGraphType'],
  beforeMount () {
    console.info('aaaaaaa:', this.datas)
    this.xShowType = this.initXShowType
    if (!this.initCol) {
      return
    }
    console.info('initcolrrrrr:', this.initCol)
    this.colArr = this.datas
    // this.selCol = this.initCol

    if (this.initCol.type === 'String') {
      this.aggSel = this.aggArr.big[1]
    } else {
      this.aggSel = this.aggArr.small[2]
    }
    // setTimeout(function () {
    //   let h = $('.x-wapper').height()
    //   $('.mmma').height(h + 'px')
    //   console.info('dhhhhh-init', h)
    // }, 50)
  },
  beforeUpdate () {
    console.info('common sel before update:', this.colArr)
    // var $this = this
    // setTimeout(function () {
    //   console.info('col arr:', this.colArr)
    //   let h = $this.colArr.length * 31 + 70
    //   let aa = false
    //   if ($this.selCol.name !== '') {
    //     h += 300
    //     aa = true
    //   }
    //   $('.mmma').height(h + 'px')
    //   console.info('dhhhhh', h, aa)
    // }, 50)
  },
  data () {
    return {
      selUseas: 3, // 1 y 2 series 3 bar正 4 bar倒 5 x
      aggSel: 'count',
      selCol: '',
      xShowType: -1,
      updateFlag: 0,
      userAsArr: [
        {name: 'Y-Axis', type: 1},
        {name: 'Series', type: 2},
        {name: 'Bar', type: 3},
        {name: 'Bar', type: 4},
        {name: 'X-Axis', type: 5},
        {name: 'Line', type: 6}
      ],
      aggArr: {
        'big': ['none', 'count'],
        'small': ['Min', 'Max', 'Sum'] // 字符/时间只有count
      },
      colArr: [
        {
          id: 'sdfdf',
          prop: 'sdfdf',
          name: 'CC_xx_nnnM111',
          type: 'String'
        },
        {
          id: 'dfdfdf',
          prop: 'dfdfdf',
          name: 'CC_xx_nnnM222',
          type: 'int'
        },
        {
          id: 'cvccb',
          prop: 'cvccb',
          name: 'CC_xx_nnnM3333',
          type: 'Date'
        }
      ]
    }
  },
  watch: {
    initCol: function (val) {
      this.selCol = val
    }
  },
  methods: {
    itemCanSelect: function (type, obj) { // 列是否可以选用
      if (this.initGraphType.filter(val => val === 6).length > 0) { // line
        // 1 col 2 use 3 agg
        if (type === '1') { // col
          if (this.selCol && this.selCol.type === 5 && obj === 'String') { // x
            return false
          }
        }
        if (type === '2') { // use
          if (this.selCol && this.selCol.dtype === 'String' && obj === 5) {
            return false
          }
        }
      } else {
        // bar
      }
      return true
    },
    removeColumn: function () {
      console.info('执行removeColumn')
      this.$emit('removeColumn')
    },
    initDatas: function (meta) {
      this.colArr = meta
    },
    getUseName: function (t) {
      let a = this.userAsArr.filter(val => val.type === t)
      return a[0].name
    },
    parentChangeX: function (type) {
      this.xShowType = type
      console.info(' gg type:', this.xShowType)
    },
    addColumn: function (target) {
      this.selCol.name = target.name
      this.dbChange(target)
    },
    changeInitSel: function (t) {
      this.selCol = t
    },
    axisChange: function (type) {
      let canSel = this.itemCanSelect('2', type)
      if (!canSel) {
        return
      }
      if (type === this.selCol.type) {
        return
      }
      this.selCol.type = type
      this.$emit('axisChange', type)
    },
    dbChange: function (item) {
      console.info('sss', item, this.selCol)
      // is can select
      let canSel = this.itemCanSelect('1', item.type)
      if (!canSel) {
        return
      }
      // this.selCol = item
      // if string
      // if (item.name === this.selCol.name) {
      //   return
      // }
      this.selCol.name = item.name
      this.selCol.dtype = item.type
      if (this.selCol.type === 1 || this.selCol.type === 5) { // base x,y
        this.selCol.gtype = 'none'
      } else {
        if (item.type === 'String') {
          this.selCol.gtype = this.aggArr.big[1]
        } else {
          this.selCol.gtype = this.aggArr.small[2]
        }
      }
      this.$emit('yColChange', this.selCol)
    },
    aggClick: function (val) {
      if (this.selCol.type === 'String' && val === 'none') {
        return
      }
      this.aggSel = val
      this.selCol.gtype = val
      this.$emit('yAggChange', val)
    }
  }
}
</script>
<style>
.svg-cxleft{
  position: absolute;
  left: 6px;
  top: 5px;
}
.cx-left-svg{
  height: 30px;
  width: 40px;
  position: relative;
}
.agg{
  margin-left: 3px;
}
.agg-big{
  width: 45%;
  padding: 5px 0;
  display: inline-block;
  background-color: rgb(250, 250, 250);
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}
.disable-color{
  color: #c5bfbf!important;
}
.agg-big-active{
  width: 45%;
  padding: 5px 0;
  display: inline-block;
  background-color: #409EFF;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}
.agg-small{
  width: 30%;
  padding: 5px 0;
  background-color: rgb(250, 250, 250);
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}
.agg-small-active{
  width: 30%;
  padding: 5px 0;
  background-color: #409EFF;
  color: white;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
}
.x-wapper-item{
  padding: 5px;
  width: 96%;
  display: flex;
  height: 30px;
  cursor: pointer;
}
.x-wapper-selected{
  padding: 5px;
  width: 96%;
  display: flex;
  height: 30px;
  cursor: pointer;
  color: white;
  background-color: #409EFF;
}
.icon-selected{
  color: white;
}
.x-wapper-comm{
  width: 240px;
  /*position: absolute;*/
  background-color: white;
  /*border: 1px solid #EEEEEE;*/
}
.cx-left,.cx-right{
  width: 40px;
  text-align: left;
  line-height: 30px;
  padding-left: 10px;
}
.cx-cont{
  flex: 1;
  text-align: left;
  line-height: 30px;
}
.x-wapper-item:hover{
  background-color: #EEEEEE;
}
.el-popover{
  padding: 0!important;
}
.aa-col-icon{
  color: rgb(139, 141, 145)
}
.num-col-icon{
  color: rgb(3, 164, 118)
}
.color-orange{
  color: rgb(216, 169, 0)
}
</style>
<style scoped>

</style>
