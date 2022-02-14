<template>
  <div class="container" style="background-color: white;padding-left: 20px;">
    <div class="row">
      <div class="col-sm-8" style="font-size: 18px;text-align: left;font-weight: 700;padding-top: 10px;">Worksheets</div>
      <div class="col-sm-4" style="text-align: right;position: relative;padding-top: 10px;">
        <div @click="showSel" style="cursor:pointer;width: 120px;border: 1px solid #eee;border-radius: 4px;display: inline-block;height: 40px;line-height: 40px;text-align: center;position: absolute;right: 160px;">
          <i class="el-icon-search"></i>
          Search
        </div>
        <el-button>+ Worksheet</el-button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Recent" name="Recent"></el-tab-pane>
          <el-tab-pane label="My Worksheets" name="MyWorksheets"></el-tab-pane>
        </el-tabs>
        <div :is="activeName" keep-alive></div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="showSelCtl" :show-close="false">
      <div class="dia-search" style="height: 60px;line-height: 60px;text-align: left;margin-bottom: 15px;">
        <div style="font-size: 25px;display: inline-block;width: 6%;"><a-icon type="search"></a-icon></div>
        <div style="display: inline-block;font-size: 24px;width: 93%">
          <input placeholder="Search all documents" style="width: 100%;border: none"/>
        </div>
      </div>
      <div class="sel-item">
        <div class="sel-item-left">2021-10-02 10:00pm</div>
        <div class="sel-item-right">a week ago</div>
      </div>
      <div class="sel-item">
        <div class="sel-item-left">2021-10-02 10:00pm</div>
        <div class="sel-item-right">a week ago</div>
      </div>
      <div class="sel-item">
        <div class="sel-item-left">2021-10-02 10:00pm</div>
        <div class="sel-item-right">a week ago</div>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import $ from 'jquery'
// import RecentTabTable from './worksheets/RecentTabTable'
import { Icon } from 'ant-design-vue'
export default {
  name: 'Worksheets',
  components: {
    Recent: resolve => {
      require(['./worksheets/RecentWorkSheets.vue'], resolve)
    },
    MyWorksheets: resolve => {
      require(['./worksheets/RecentWorkSheets.vue'], resolve)
    },
    'a-icon': Icon
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeName: 'Recent',
      showSelCtl: false
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    showSel () {
      this.showSelCtl = true
    }
  },
  mounted () {
    $('.el-dialog__header').hide()
    // el-dialog__header
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
  font-size: 18px
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
</style>
