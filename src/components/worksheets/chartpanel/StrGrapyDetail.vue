<template>
 <div class="s-detail" @click="toDetail">
   <div style="margin-bottom: 5px;font-size:11px;padding: 5px 10px;">
     <span style="font-weight:500;color:#2c2f34;">{{datas.name}}</span>
     <span style="float:right;color: #b3afaf;">
        Aa
      </span>
   </div>
   <div v-for="(site, index) in strs" v-if="index < 3" :key="site.name" style="margin:0 10px;font-size: 12px;color: rgb(122 120 120);">
     {{site.name}}
     <span style="float:right;">{{site.count}}</span>
     <div style="height: 2px;background-color: rgb(204, 205, 208);margin:5px 0;position: relative;">
       <div :class="'count_'+index" style="background-color: #409EFF;position: absolute;top: 0;left: 0;height: 2px;"></div>
     </div>
   </div>
   <div style="text-align: center;font-size: 12px;color: rgb(122 120 120);" v-if="strs.length > 3">+{{strs.length - 3}}&nbsp;more</div>
 </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'StrGrapyDetail',
  props: ['datas'],
  data () {
    return {
      strs: []
    }
  },
  beforeMount () {
    var arr = []
    if (this.datas.data && this.datas.data.length > 0) {
      this.datas.data.forEach(val => {
        let t = arr.filter(tmp => tmp.name === val)
        if (t && t.length > 0) {
          let obj = t[0]
          obj.count = obj.count * 1 + 1
        } else {
          let n = {
            name: val,
            count: 1
          }
          arr.push(n)
        }
      })
    }
    this.strs = arr
  },
  mounted () {
    var tot = 0
    this.strs.forEach(val => {
      tot += val.count
    })
    this.strs.forEach((val, index) => {
      let process = (val.count / tot) * 100 + '%'
      $('.count_' + index).css({'width': process})
    })
  },
  methods: {
    toDetail: function () {
      this.$emit('toDetail')
    }
  }
}
</script>

<style>
.s-detail{
  width: 100%;margin-top: 5px;border-radius: 8px;padding-bottom: 5px;padding-top: 5px;
  background-color: rgb(242, 242, 242);
  cursor: pointer;
}
.s-detail:hover{
  background-color: rgb(227 224 224);
}
</style>
