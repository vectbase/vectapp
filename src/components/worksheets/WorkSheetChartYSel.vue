<template>
  <div class="x-wapper x-wapper-x">
    <div style="padding: 10px 8px;font-size: 16px">Column</div>
    <template v-for="(site) in colArr" :site="site"  style="margin-bottom: 10px;">
      <div v-if="site.prop === selCol.prop" class="x-wapper-selected" :key="site.id"  :tid="site.id" @click="dbChange(site)">
        <div class="cx-left">
          <span v-if="site.type === 'String'" class="icon-selected">Aa&nbsp;&nbsp;</span>
          <div v-else-if="site.type === 'Date' || site.type === 'DateTime'" style="font-size: 10px;margin-right: 10px;" class="icon-selected">
            <svg width="13" height="13"><circle fill="none" stroke="currentcolor" cx="6.5" cy="6.5" r="6"></circle><rect fill="currentcolor" width="1" height="4" x="6" y="3"></rect><rect fill="currentcolor" width="3" height="1" x="6" y="6"></rect></svg>
          </div>
          <span v-else class="icon-selected">123</span>
        </div>
        <div class="cx-cont">{{site.name}}</div>
        <div class="cx-right" style="padding-top: 2px;">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>
      <div v-else class="x-wapper-item" :key="site.id"  @click="dbChange(site)">
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
    <div style="padding: 0 10px 10px 10px;border-top: 1px solid #eee">
      <div style="margin: 10px 0;font-size: 16px">Aggregation</div>
      <div>
        <template v-for="(site) in aggArr.big" :site="site" >
          <div v-if="site === aggSel" class="agg agg-big-active" v-bind:key="site">
            {{site}}
          </div>
          <div v-bind:key="site" v-else class="agg agg-big" v-bind:class="{ 'disable-color': initCol.type === 'String' && site === 'none'}" @click="aggClick(site)">
            {{site}}
          </div>
        </template>
      </div>

      <div style="margin-top: 5px;" v-if="initCol.type !== 'String'">
        <template v-for="(site) in aggArr.small" :site="site" >
          <div v-bind:key="site" v-if="site === aggSel" class="agg agg-small-active">
            {{site}}
          </div>
          <div v-bind:key="site" v-else class="agg agg-small" @click="aggClick(site)">
            {{site}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkSheetChartYSel',
  props: ['datas', 'initCol'],
  beforeMount () {
    this.colArr = this.datas
    this.selCol = this.initCol

    if (this.initCol.type === 'String') {
      this.aggSel = this.aggArr.big[1]
    } else {
      this.aggSel = this.aggArr.small[2]
    }
  },
  data () {
    return {
      selCol: '',
      aggSel: 'count',
      aggArr: {
        'big': ['none', 'count'],
        'small': ['Min', 'Max', 'Sum'] // 字符/时间只有count
      },
      colArr: [
        {
          id: 'sdfdf',
          name: 'CC_xx_nnnM',
          type: 'String'
        },
        {
          id: 'dfdfdf',
          name: 'CC_xx_nnnM',
          type: 'int'
        },
        {
          id: 'cvccb',
          name: 'CC_xx_nnnM',
          type: 'Date'
        }
      ]
    }
  },
  methods: {
    dbChange: function (item) {
      console.info('yyyy', item)
      this.selCol = item
      // if string
      if (item.type === 'String') {
        this.aggSel = this.aggArr.big[1]
      }

      this.$emit('yColChange', item)
    },
    aggClick: function (val) {
      if (this.selCol.type === 'String' && val === 'none') {
        return
      }
      this.aggSel = val
      this.$emit('yAggChange', val)
    }
  }
}
</script>
<style>
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
  color: #c5bfbf;
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
.x-wapper{
  width: 214px;
  position: absolute;
  background-color: white;
  left: -1px;
  top: -1px;
  border: 1px solid #EEEEEE;
}
.cx-left,.cx-right{
  width: 40px;
  text-align: center;
  line-height: 30px;
}
.cx-cont{
  flex: 1;
  text-align: center;
  line-height: 30px;
}
.x-wapper-item:hover{
  background-color: #EEEEEE;
}
</style>
<style scoped>

</style>
