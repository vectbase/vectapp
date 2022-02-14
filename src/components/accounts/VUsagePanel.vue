<template>
  <div class="card">
    <div class="card-body">
      <div style='position: relative;'>
        <el-tabs v-model="activeTabName">
          <el-tab-pane label="Consumption" name="recentWSTab_Consumption">
            <usage-consumption-body table-id="Consumption"></usage-consumption-body>
          </el-tab-pane>
          <!--<el-tab-pane label="Storage" name="recentWSTab_Storage">-->
            <!--<usage-storage-body table-id="Storage"></usage-storage-body>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane label="Transfers" name="recentWSTab_Transfers">-->
            <!--<usage-transfers-body table-id="Transfers"></usage-transfers-body>-->
          <!--</el-tab-pane>-->
        </el-tabs>
        <el-select size="mini" style="position: absolute;right:10px;top:5px;" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options.wareHouseConfigList"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>

</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
import UsageConsumptionBody from './usage/UsageConsumptionBody'
import UsageStorageBody from './usage/UsageStorageBody'
import UsageTransfersBody from './usage/UsageTransfersBody'
import {mapState} from 'vuex'
export default {
  name: 'VUsagePanel',
  computed: mapState(['services']),
  components: {UsageConsumptionBody, UsageStorageBody, UsageTransfersBody},
  async mounted () {
    await this.initUsersData()
  },
  methods: {
    async initUsersData () {
      this.options = await this.services.usersService.queryUsersOperationConfigs()
    }
  },
  data () {
    return {
      msg: 'VUsagePanel',
      activeTabName: 'recentWSTab_Consumption',
      options: [],
      value: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
