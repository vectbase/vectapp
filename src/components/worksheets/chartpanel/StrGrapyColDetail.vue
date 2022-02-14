<template>
 <div class="s-detail-col">
    <div style="font-size: 16px;padding-left: 5px;margin-bottom: 10px;padding-right: 5px;">
      column
      <span class="showAll" @click="toShowAll" style="float: right;cursor: pointer;font-size: 16px;color: #b3afaf;">x</span>
    </div>
    <div style="font-size:11px;margin: 0 10px;padding: 5px 0;">
      <span style="color: #b3afaf;">Aa</span>
      <span style="font-weight:500;color:#2c2f34;">{{datas.name}}</span>
    </div>
    <div style="margin:5px 10px 10px 10px;height: 2px;background-color: rgb(204, 205, 208);"></div>
   <div style="font-size: 12px;margin-bottom: 10px;">
     <div style="margin:5px 10px;font-size: 12px;color: rgb(122, 120, 120);">
       <span style="width: 50%;float: left;text-align: left">{{(this.datas.tot - this.datas.etot)/this.datas.tot * 100}}%&nbsp;filled</span>
       <span style="width: 50%;float: right;text-align: right;" v-if="this.datas.etot > 0">{{this.datas.etot/this.datas.tot * 100}}%&nbsp;blank</span>
     </div>
     <div style="clear: both"></div>
     <div style="margin:5px 10px;height: 2px;background-color: rgb(204, 205, 208);position: relative;">
       <div class="s-process" style="background-color: #409EFF;position: absolute;top: 0;left: 0;height: 2px;"></div>
     </div>
     <div style="text-align: center;color: rgb(122, 120, 120);">{{this.strs.length}} distinct values</div>
   </div>
   <div v-for="(site, index) in strs" :key="site.name" style="margin:0 10px;font-size: 12px;color: rgb(122 120 120);">
     {{site.name}}
     <span style="float:right;">{{site.count}}</span>
     <div style="height: 2px;background-color: rgb(204, 205, 208);margin:5px 0;position: relative;">
       <div :class="'count_'+index" style="background-color: #409EFF;position: absolute;top: 0;left: 0;height: 2px;"></div>
     </div>
   </div>
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
    $('.showAll').hide()
    let sprocess = (this.datas.tot - this.datas.etot) / this.datas.tot * 100 + '%'
    $('.s-process').css({'width': sprocess})
    if (this.strs.length === 0) {
      return
    }
    var tot = 0
    this.strs.forEach(val => {
      tot += val.count
    })
    this.strs.forEach((val, index) => {
      let process = (val.count / tot) * 100 + '%'
      $('.count_' + index).css({'width': process})
    })
    // mouse in out
    $('.s-detail-col').on('mouseover', function () {
      $('.showAll').show()
    })
    $('.s-detail-col').on('mouseout', function () {
      $('.showAll').hide()
    })
  },
  methods: {
    // m
    toShowAll: function () {
      this.$emit('showTableInfo', '')
    },
    freshStrs: function () {
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
    }
  }
}
</script>

<style>
.s-detail-col{
  width: 100%;margin-top: 5px;border-radius: 8px;padding-bottom: 5px;padding-top: 5px;
}
</style>
