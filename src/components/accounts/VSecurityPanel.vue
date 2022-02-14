<template>
  <div>
    <div>
      <el-row>
        <el-col :span="5">
          <span class="liMenu" :class="showAddNetworkPolicy ? 'hover':''" @click="changeButtonStyle(true)">Network Policies</span>
        </el-col>
        <el-col :span="5">
          <span class="liMenu" :class="!showAddNetworkPolicy ? 'hover':''" @click="changeButtonStyle(false)">Sessions</span>
        </el-col>
        <el-col :span="14" class="inputDeep">
          <div class="addNetworkPolicies">
            <el-button size="small" v-show="showAddNetworkPolicy" type="primary" @click="addNetworkPolicy"  icon="el-icon-plus">Network Policy</el-button>
          </div>
        </el-col>
      </el-row>
      <div v-if="showAddNetworkPolicy">
        <security-network-tab-table-body :show-add-network-policy="showAddNetworkPolicy"></security-network-tab-table-body>
      </div>
      <div v-else>
        <security-sessions-tab-table-body :show-add-network-policy="!showAddNetworkPolicy"></security-sessions-tab-table-body>
      </div>
    </div>
    <net-work-policy-dialog
      :dialog-visible="dialogVisible"
      :form="form"
      :rules="rules"
      :current-role="currentRole"
      @handleClose="handleClose"
      @submit="submit"
    ></net-work-policy-dialog>
  </div>
</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
import SecuritySessionsTabTableBody from './security/SecuritySessionsTabTableBody'
import SecurityNetworkTabTableBody from './security/SecurityNetworkTabTableBody'
import NetWorkPolicyDialog from './dialog/NetWorkPolicyDialog'
import {mapState} from 'vuex'
export default {
  name: 'VSecurityPanel',
  computed: {
    ...mapState([ 'services' ])
  },
  components: {SecuritySessionsTabTableBody, SecurityNetworkTabTableBody, NetWorkPolicyDialog},
  methods: {
    gotoDashboardDetailPages: function () {
      // this.$router.push({name: 'DashboardDetail'})
    },
    changeButtonStyle (event) {
      this.showAddNetworkPolicy = event
      this.change()
    },
    addNetworkPolicy () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
      this.form = {}
    },
    submit () {
      let data = {}
      data.policyName = this.form.policyName
      let query = []
      var allowedIps = this.form.allowedIpAddresses.split(',')
      const ips = []
      for (var i = 0; i < allowedIps.length; i++) {
        const ip = allowedIps[i].trim()
        if (ip.length > 0) {
          ips.push(ip)
        }
      }
      query.push({typeIP: 0, ips: ips})

      if (this.form.bolckedIpAddresses !== undefined && this.form.bolckedIpAddresses.length > 0) {
        var blockIps = this.form.bolckedIpAddresses.split(',')
        const blockIpsArray = []
        for (var j = 0; j < blockIps.length; j++) {
          const ip = blockIps[j].trim()
          if (ip.length > 0) {
            blockIpsArray.push(ip)
          }
        }
        if (blockIpsArray.length > 0) {
          query.push({typeIP: 1, ips: blockIpsArray})
        }
      }
      data.query = query
      if (this.form.comment !== undefined && this.form.comment.length > 0) {
        data.comment = this.form.comment
      }
      this.dialogVisible = false
      this.form = {}
      this.insertPolicyFirst(data)
    },
    async insertPolicyFirst (data) {
      let result = await this.services.securityService.insertPolicyFirst(data)
      if (result.code === 0) {
        this.$message({
          type: 'success',
          message: 'success!'
        })
      } else {
        this.$message({
          type: 'info',
          message: result.msg
        })
      }
    },
    change () {
      this.$forceUpdate()
    },
    async initData () {
      const remoteRoleData = await this.services.rolesService.queryRolesList()
      this.currentRoleId = remoteRoleData.data.currentRoleId
      let roleList = remoteRoleData.data.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
    }
  },
  async mounted () {
    this.initData()
  },
  data () {
    let checkIp = (rule, value, callback) => {
      if (value === undefined || value.length <= 0) {
        callback()
      }
      const passReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
      const ips = value.split(',')
      for (var i = 0; i < ips.length; i++) {
        const ip = ips[i].trim()
        if (!passReg.test(ip)) {
          callback(new Error('Enter valid IPV4 addresses'))
          return
        }
      }
      callback()
    }
    return {
      msg: 'ResouceMonitorsPanel',
      activeTabName: 'recentWSTab_1',
      showAddNetworkPolicy: true,
      dialogVisible: false,
      form: {},
      ruleForm: 'ruleForm',
      rules: {
        policyName: [
          { required: true, message: 'Please enter the policy name', trigger: 'change' },
          { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'change' }
        ],
        bolckedIpAddresses: [
          {validator: checkIp, trigger: ['change']}
        ],
        allowedIpAddresses: [
          { required: true, message: 'Enter valid IPV4 addresses', trigger: 'change' },
          {validator: checkIp, trigger: ['change']}
        ]
      },
      currentRole: '',
      currentRoleId: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addNetworkPolicies {
  font-weight: 600;
  font-size: 16px;
  text-align: right;
}
.liMenu{
  margin-right: 20px;
  font-size: 20px;
  cursor:pointer;
  line-height: 32px;
  font-weight: 700;
  fill: rgb(139, 141, 145);
  stroke: rgb(139, 141, 145);
  color: rgb(139, 141, 145);
  margin-bottom: 20px;
}
.liMenu.hover{
  color: rgb(44, 47, 52);
  stroke: rgb(44, 47, 52);
  fill: rgb(44, 47, 52);
}
</style>
