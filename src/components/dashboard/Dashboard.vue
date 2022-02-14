<template>
  <div style="background-color: white;height: 100%">
    <div class="row">
      <div class="col-sm-12" style="font-size: 18px;text-align: left;font-weight: 700;padding-top: 10px;">Dashboards</div>
    </div>
    <div class="ds-main">
      <div v-if="list.length === 0" style="width: 100%;text-align: center">
        <div style="font-weight: bold;margin-bottom: 10px;font-size: 16px;">Get started</div>
        <span style="color: #65676c;font-size: 14px;">Please create your your Worksheets first!</span>
      </div>
      <div v-else v-for="(site) in list" :key="site.name" :class="{ 'ds-item-wapper': list.length > 1, 'ds-item-wapper-all': list.length === 1}">
        <DashBar v-if="site.type === 3" :init-datas="site"></DashBar>
        <DashLine v-else-if="site.type === 2" :init-datas="site"></DashLine>
        <DashTable v-else :init-datas="site" :id="site.id"></DashTable>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'

import DashTable from './DashTable'
import {mapState} from 'vuex'
import DashLine from './DashLine'
import DashBar from './DashBar'
export default {
  name: 'Dashboard',
  components: {DashBar, DashLine, DashTable},
  data () {
    return {
      activeName: 'Recent',
      list: []
    }
  },
  beforeMount () {
    this.freshData()
  },
  computed: {
    ...mapState([
      'services'
    ])
  },
  methods: {
    freshData: function () {
      this.services.dashboardService.getList().then(res => {
        console.info('history res:', res.list)
        if (res.code === '200') {
          this.list = res.list
        }
      })
    }
  }
}
</script>

<style>
.ds-main{
  margin-top: 15px;border-top: 1px solid rgb(226, 227, 229);display: flex;flex-direction: row;padding: 0 5px;
  height: calc(100% - 56px);
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.ds-item-wapper{
  width: 49%;
  height: 300px;
  background-color: white;
  margin-top:15px;
  /*border:1px solid rgb(226, 227, 229);*/
}
.ds-item-wapper-all{
  width: 98%;
  height: 400px;
  background-color: white;
  margin-top:15px;
  border:1px solid rgb(226, 227, 229);
}
</style>
