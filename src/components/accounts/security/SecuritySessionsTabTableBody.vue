<template>
  <div style="margin-top: 24px;" v-if="showAddNetworkPolicy">
    <div v-if="hasData">
      <el-row v-if="hasData">
        <el-col :span="5" style="text-align: left">
          {{tableCount}} Open Sessions
        </el-col>
        <el-col :span="18" style="text-align: right;">
          <el-row>
            <el-col :offset="1" :span="4" style="text-align: right;">
              <v-account-search-input
                search-placeholder="Search Session ID"
                @dataToFather="getSearchValue">
              </v-account-search-input>
            </el-col>
            <el-col :span="6">
              <select-assembly
                v-if="showSelect"
                :select-objects="userNameConfigList"
                id="userNameLableKey"
                :label-key="userNameLableKey"
                @handleSelectClose="handleSelectClose"
                @handleSelectChecked="handleSelectChecked"
              >
              </select-assembly>
            </el-col>
            <el-col :span="6">
              <client-select-assembly
                v-if="showSelect"
                id="clientDriverLabelKey"
                :select-objects="clientDriverConfigList"
                :label-key="clientDriverLabelKey"
                @handleSelectClose="handleSelectClose"
                @handleSelectChecked="handleSelectChecked">
              </client-select-assembly>
            </el-col>
            <el-col :span="7">
              <auth-select-assembly
                v-if="showSelect"
                id="authenticationLabelKey"
                :select-objects="authenticationConfigList"
                :label-key="authenticationLabelKey"
                @handleSelectClose="handleSelectClose"
                @handleSelectChecked="handleSelectChecked"
              >
              </auth-select-assembly>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" icon="el-icon-refresh" @click="initUsersData" style="margin-left: 12px"></el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        size="mini">
        <el-table-column
          prop="sessionId"
          label="SESSION ID"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="USER NAME"
          sortable
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="startTime"
          sortable
          label="START TIME"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="clientDriver"
          label="CLIENT DRIVER"
          sortable
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="clientNetAddress"
          label="CLIENT NET ADDRESS"
          sortable
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="AUTHENTICATION"
          sortable
          show-overflow-tooltip
          min-width="160">
        </el-table-column>
      </el-table>
      <div style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="tableCount">
        </el-pagination>
      </div>
    </div>
    <div v-if="!hasData">
      <el-row>
        <div style="text-align: center">
          <img src="../../../assets/image/No-network-policies.png"/>
        </div>
        Sessions
        Restrict or allow access to your Snowflake account based on IP address. Learn More
      </el-row>
    </div>
  </div>
</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
import {selectAssemblyJs} from '../assembly/select-assembly'
import {mapState, mapGetters} from 'vuex'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
const VAccountSearchInput = () => import('../assembly/VAccountSearchInput')
const SelectAssembly = () => import('../assembly/SelectAssembly')
const ClientSelectAssembly = () => import('../assembly/SelectAssembly')
const AuthSelectAssembly = () => import('../assembly/SelectAssembly')

export default {
  name: 'SecuritySessionsTabTableBody',
  props: {
    showAddNetworkPolicy: {
      type: Boolean,
      required: true
    }
  },
  components: {VAccountSearchInput, SelectAssembly, ClientSelectAssembly, AuthSelectAssembly},
  async mounted () {
    await this.initConfigData()
    await this.initUsersData()
  },
  methods: {
    handleSelectClose (labelKey) {
      if (this.userNameLableKey === labelKey) {
        selectAssemblyJs.handleSelectClose(this.userNameConfigList, this.userNameValue)
      }
      if (this.authenticationLabelKey === labelKey) {
        selectAssemblyJs.handleSelectClose(this.authenticationConfigList, this.authenticationValue)
      }
      if (this.clientDriverLabelKey === labelKey) {
        selectAssemblyJs.handleSelectClose(this.clientDriverConfigList, this.clientDriverValue)
      }
      this.initUsersData()
    },
    handleSelectChecked (selectObj, labelKey) {
      if (this.userNameLableKey === labelKey) {
        selectAssemblyJs.commonHandleChecked(this.userNameConfigList, this.userNameValue, selectObj)
      }
      if (this.authenticationLabelKey === labelKey) {
        selectAssemblyJs.commonHandleChecked(this.authenticationConfigList, this.authenticationValue, selectObj)
      }
      if (this.clientDriverLabelKey === labelKey) {
        selectAssemblyJs.commonHandleChecked(this.clientDriverConfigList, this.clientDriverValue, selectObj)
      }
      this.initUsersData()
      this.change()
    },
    change () {
      this.$forceUpdate()
    },
    getSearchValue (val) {
      this.queryString = val
      this.initUsersData()
    },
    gotoDashboardDetailPages: function () {
      this.$router.push({name: 'SecurityDetail'})
    },
    async initUsersData () {
      const paramsData = {}
      paramsData.curPage = this.currentPage
      paramsData.pageSize = this.pageSize
      paramsData.sessionId = this.queryString
      paramsData.userNames = this.userNameValue
      paramsData.clientDrivers = this.clientDriverValue
      paramsData.authentications = this.authenticationValue
      const result = await this.services.securityService.querySessionsList(paramsData)
      this.tableData = result.data.result
      this.tableCount = result.data.countSize
      this.hasData = this.tableCount > 0
    },
    async initConfigData () {
      this.options = await this.services.securityService.querySecurityOperationConfigs()
      this.userNameConfigList = JSON.parse(JSON.stringify(this.options.userNameConfigList))
      this.clientDriverConfigList = JSON.parse(JSON.stringify(this.options.clientDriverConfigList))
      this.authenticationConfigList = JSON.parse(JSON.stringify(this.options.authenticationConfigList))
      this.showSelect = true
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.initUsersData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initUsersData()
    }
  },
  data () {
    return {
      msg: 'SecurityTabTable',
      queryString: '',
      authenticationValue: [],
      clientDriverValue: [],
      userNameValue: [],
      hasData: false,
      timeout: null,
      tableData: [],
      tableCount: 0,
      options: {},
      currentPage: 1,
      pageSize: 10,
      userNameConfigList: [],
      clientDriverConfigList: [],
      authenticationConfigList: [],
      userNameLableKey: 'User Name',
      clientDriverLabelKey: 'Client Driver',
      authenticationLabelKey: 'Authentication',
      showSelect: false
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({currentRole: 'getCurrentRole', currentRoleId: 'getCurrentRoleId'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<i18n>
  {
  "en": {
  "hello": "hello world!"
  },
  "zh": {
  "hello22": "hello22、世fff界!"
  }
  }
</i18n>
