<template>
  <div class="container" style="background-color: white;padding-left: 20px;">
    <el-row>
      <el-col :span="18" style="font-size: 18px;text-align: left;font-weight: 700;padding-top: 10px;">Worksheets</el-col>
      <el-col :span="6" style="text-align: right;position: relative;padding-top: 10px;">
        <div @click="showSel" style="cursor:pointer;width: 120px;border: 1px solid #eee;border-radius: 4px;display: inline-block;height: 40px;line-height: 40px;text-align: center;position: absolute;right: 160px;">
          <i class="el-icon-search"></i>
          Search
        </div>
        <el-button @click="createNewWs">+ Worksheet</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="col-md-12 col-lg-12" :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Recent" name="Recent"></el-tab-pane>
          <el-tab-pane label="My Worksheets" name="MyWorksheets"></el-tab-pane>
        </el-tabs>
        <div :is="activeName" keep-alive></div>
      </el-col>
    </el-row>
    <el-dialog title="" :visible.sync="showSelCtl" :show-close="false">
      <div class="dia-search" style="height: 60px;line-height: 60px;text-align: left;margin-bottom: 15px;">
        <div style="font-size: 25px;display: inline-block;width: 6%;"><a-icon type="search"></a-icon></div>
        <div style="display: inline-block;font-size: 24px;width: 93%">
          <input placeholder="Search all documents" style="width: 100%;border: none;font-size: 24px;" @input="loadSearchDatas" v-model="search"/>
        </div>
      </div>
      <template v-for="site in selsData">
        <div class="sel-item" :key="site.id" @click="toSqlCode(site)">
          <div class="sel-item-left">{{site.title}}</div>
          <div class="sel-item-right">{{getDateFormat(site.lastUpdated)}}</div>
        </div>
      </template>
    </el-dialog>

  </div>

</template>

<script>
import $ from 'jquery'
// import RecentTabTable from './worksheets/RecentTabTable'
import { Icon } from 'ant-design-vue'
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'Worksheets',
  components: {
    Recent: resolve => {
      require(['./RecentWorkSheets.vue'], resolve)
    },
    MyWorksheets: resolve => {
      require(['./MyWorkSheets.vue'], resolve)
    },
    'a-icon': Icon
  },
  computed: {
    ...mapState(['services']),
    ...mapGetters({currentRole: 'getCurrentRole'})
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeName: 'Recent',
      showSelCtl: false,
      selsData: [],
      orginData: [],
      search: ''
    }
  },
  methods: {
    loadSearchDatas: function () {
      let data = this.services.workSheetService.getListForSearch(this.search == '' ? null : {'title': this.search})
      data.then(res => {
        this.selsData = res.data
        this.orginData = res.data
        var date1 = new Date()
        var date2 = res.data[0].lastUpdated
        var sub = date1.getTime() - date2
        // 504455570  (date2.getTime()-date1.getTime())/(1000*60*60*24)
        var mo = sub / (24 * 3600 * 1000)
        console.info('bbbbbbbbbb', sub, mo)
        // date format
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    toSqlCode (item) {
      this.$router.push({path: '/sqlCode', query: item})
    },
    changeVal () {
      // s
      var sear = this.search
      if (sear !== null && sear.trim() !== '') {
        this.selsData = this.orginData.filter(data => !this.search || data.title.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        this.selsData = this.orginData
      }
    },
    showSel () {
      this.showSelCtl = true
    },
    createNewWs () {
      this.services.workSheetService.createNewWs('', this.currentRole ? this.currentRole.name : '').then(res => {
        if (res.code === '1') {
          this.$router.push({path: '/sqlCode', query: res.data})
        }
      })
      // this.$router.push({name: 'sqlCode', params: {'title': 'abc', 'id': 110}})
    },
    getDateFormat (start) {
      var end = new Date().getTime()
      var sub = end - start
      console.info('start:', end, start, sub)
      if ((sub / (365 * 24 * 3600 * 1000)) >= 1) {
        // year
        var year = parseInt(sub / (365 * 24 * 3600 * 1000))
        return year + (year > 1 ? ' years' : ' year') + ' ago'
      }
      if ((sub / (30 * 24 * 3600 * 1000)) >= 1) {
        // month
        var month = parseInt(sub / (30 * 24 * 3600 * 1000))
        return month + (month > 1 ? ' months' : ' month') + ' ago'
      }
      if ((sub / (24 * 3600 * 1000)) >= 1) {
        // day
        var day = parseInt(sub / (24 * 3600 * 1000))
        return day + (day > 1 ? ' days' : ' day') + ' ago'
      }
      if ((sub / (3600 * 1000)) >= 1) {
        // hour
        var hours = parseInt(sub / (3600 * 1000))
        return hours + (hours > 1 ? ' hours' : ' hour') + ' ago'
      }
      if ((sub / (60 * 1000)) >= 1) {
        // minuts
        var minuts = parseInt(sub / (60 * 1000))
        return minuts + (minuts > 1 ? ' minutes' : ' minut') + ' ago'
      }
      return 'just now'
    }
  },
  mounted () {
    $('.el-dialog__header').hide()
    // el-dialog__header
  },
  beforeMount () {
    // 加载数据
    this.loadSearchDatas()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
.sel-item{
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #eee;
  font-size: 18px;
  cursor: pointer;
}
.sel-item-right{
  font-size: 14px;display: inline-block;float: right
}
.sel-item-left{
  display: inline-block;float: left;
}
.dia-search input:focus{
  outline: none;
}
.el-dialog{
  height: 80%!important;
  overflow-y: scroll;
}
</style>
