<template>
  <div class="wsn-box">
    <div style="text-align: center;font-size: 14px;font-weight: bold;margin-bottom: 5px;">History</div>
    <div v-for="(site) in list" :site="site" :key="site.id">
      <div class="wsn-box-item-active" v-if="site.id === selected">
        {{site.name}}
        <svg style="float: right" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="wsn-box-item" @click="chHistory(site)" v-else>{{site.name}}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'WsHistory',
  data () {
    return {
      title: this.curWs.title,
      list: [],
      selected: ''
    }
  },
  props: {
    upCallBack: Function,
    curWs: Object
  },
  computed: {
    ...mapState(['services'])
  },
  beforeMount () {
    this.freshData()
  },
  methods: {
    chHistory (info) {
      this.title = info.name
      this.selected = info.id
      this.$emit('upCallBack', info)
    },
    freshData: function () {
      this.services.workSheetService.getHistoryList({'wsId': this.curWs.id}).then(res => {
        if (res.code === '200') {
          if (res.list && res.list.length > 0) {
            this.list = res.list
            this.title = this.list[0].name
            this.selected = this.list[0].id
            this.$emit('upCallBack', {'name': this.list[0].name, 'id': this.list[0].id})
          }
        }
      })
    }
  }
}
</script>

<style>
.wsn-box{
  width: 300px;
  margin: 5px 0;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.wsn-box-item{
  padding:5px 5px 5px 15px;
  cursor: pointer;
  font-size: 13px;
}
.wsn-box-item-active{
  padding:8px 5px 8px 15px;
  cursor: pointer;
  font-size: 13px;
  color: white;
  background-color: #409EFF;
}
.wsn-box-item:hover{
  background-color: #EEEEEE;
  /*font-size: 16px;*/
}
.el-popover{
  padding: 0!important;
}
.input-wapper{
  border-radius: 5px;
  border: 2px solid #409EFF;
  height: 35px;
  margin: 5px 15px;
  padding-left: 2px;
}
.input-wapper input{
  width: 90%;border: none;font-size: 14px;
  height: 32px;
}
.input-wapper input:focus{
  outline: none;
}
</style>
