<template>
  <div v-if="showAddNetworkPolicy">
    <div v-if="hasData">
      <el-card class="box-card" v-if="noneActive">
        <div class="warningType">
          <i class="el-icon-warning-outline"></i>No active policies
        </div>
        <div class="descType">
          A policy is only enforced once it has been activated
        </div>
      </el-card>
      <div v-for="(item, index) in tableData" :key="item.id">
        <div style="margin-top: 20px; margin-bottom: 20px;">
          <el-row>
            <el-col :span="12">
              <span class="policyTitle">{{item.policyName}}</span>
              <span class="policyActiveStatus" v-if="item.activatedStates === 1">Active</span>
              <span class="policyStatus" v-else>Inactive</span>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-button size="mini" @click="activatePolicy(item)" v-if="item.activatedStates === 1">Deactivate Policy</el-button>
              <el-button size="mini" @click="activatePolicy(item)" v-else>Activate Policy</el-button>
              <el-popover
                width="160"
                trigger="click"
                id="userStyleConfig"
                visible-arrow="false">
                <ul class="list-unstyled components text-secondary">
                  <li v-for="config in operationConfig" v-bind:key="config.value" @click="handleOperationConfig(item, config.value)">
                    <p><i :class="config.icon" style="margin-right: 10px;"></i> {{ config.label }}</p>
                  </li>
                </ul>
                <el-button size="mini" slot="reference"><i class="el-icon-more"></i></el-button>
              </el-popover>
            </el-col>
          </el-row>
          <el-row>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{item.createTime}}</div>
              <span class="policyTime"><i class="el-icon-time"></i>{{item.showTime}}</span>
            </el-tooltip>
            <span class="policyTime" v-if="item.comment && item.comment != undefined && item.comment != ''">
                <i class="el-icon-tickets"></i>{{item.comment}}
              </span>
            <el-card class="box-card">
              <el-row>
                <el-col :span="3">
                  <span class="liMenu" :class="item.show ? 'hover':''" @click="changeButtonStyle(index, true)">{{item.allowedLength}} Allowed</span>
                </el-col>
                <el-col :span="3">
                  <span class="liMenu" :class="!item.show ? 'hover':''" @click="changeButtonStyle(index, false)">{{item.blockedLength}} Blocked</span>
                </el-col>
                <el-col :span="18" class="inputDeep">
                  <el-input size="mini" v-model="item.value" @input="searchIps(item, index)" placeholder="Search allowed address"><i slot="prefix" style="font-size: 16px;" class="el-input__icon el-icon-search"></i></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px;">
                <el-col :span="4" v-for="ip in item.showIps" :key="index + ip">
                  {{ip}}
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </div>
      </div>
    </div>
    <div v-if="!hasData">
      <el-row>
        <div style="text-align: center">
          <img src="../../../assets/image/No-network-policies.png"/>
        </div>
        No network policies
        Restrict or allow access to your Snowflake account based on IP address. Learn More
      </el-row>
    </div>
    <activate-policy-loading-dialog
      :loading-dialog-visible="loadingDialogVisible"
      :policy-name="policyName"
      @handleClose="handleClose">
    </activate-policy-loading-dialog>
    <delete-dialog
      :delete-dialog-visible="deleteDialogVisible"
      :current-role="currentRole"
      :policy-name="policyName"
      @dropPolicy="dropPolicy"
      @handleClose="handleClose">
    </delete-dialog>
    <policy-edit-dialog
      :edit-dialog-visible="editDialogVisible"
      :current-role="currentRole"
      :policy-name="policyName"
      :form="operationObject"
      :allow-count="allowCount"
      :block-count="blockCount"
      :allowed="allowed"
      :blocked="blocked"
      @deleteTag="deleteTag(arguments)"
      @searchEditIps="searchEditIps(arguments)"
      @editPolicy="editPolicy"
      @handleClose="handleClose"
      @addNewIp="addNewIp"
    >
    </policy-edit-dialog>
    <edit-response-dialog
      :edit-response-visible="editResponseVisible"
      :current-role="currentRole"
      :policy-name="policyName"
      :responseErrorMsg="responseErrorMsg"
      @handleClose="handleClose">
    </edit-response-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ActivatePolicyLoadingDialog from '../dialog/ActivatePolicyLoadingDialog'
import DeleteDialog from '../dialog/DeleteDialog'
import PolicyEditDialog from '../dialog/PolicyEditDialog'
import EditResponseDialog from '../dialog/EditResponseDialog'

export default {
  name: 'SecurityNetworkTabTableBody',
  props: {
    showAddNetworkPolicy: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState([ 'services' ])
  },
  components: {EditResponseDialog, ActivatePolicyLoadingDialog, DeleteDialog, PolicyEditDialog},
  methods: {
    async editPolicy () {
      this.editDialogVisible = false
      const paramsData = {}
      paramsData.policyName = this.operationObject.policyName
      let query = []
      const allowIpsValues = []
      for (var i = 0; i < this.operationObject.allowed.length; i++) {
        const ip = this.operationObject.allowed[i].trim()
        if (ip.length > 0) {
          allowIpsValues.push(ip)
        }
      }
      query.push({typeIP: 0, ips: allowIpsValues})
      const blockIpsValues = []
      for (var j = 0; j < this.operationObject.blocked.length; j++) {
        const ip = this.operationObject.blocked[j].trim()
        if (ip.length > 0) {
          blockIpsValues.push(ip)
        }
      }
      query.push({typeIP: 1, ips: blockIpsValues})
      paramsData.query = query
      const resultData = this.services.securityService.editPolicy(paramsData)
      if (resultData.code === 0) {
        this.initData()
        this.$message({
          type: 'success',
          message: 'success!'
        })
      } else {
        this.$message({
          type: 'info',
          message: resultData.msg
        })
      }
      this.change()
    },
    async activatePolicy (item) {
      this.policyName = item.policyName
      this.loadingDialogVisible = true
      const data = {}
      data.activatedStates = item.activatedStates === 0 ? 1 : 0
      data.policyName = item.policyName
      const result = this.services.securityService.activatePolicyRemote(data)
      if (result.code === 0) {
        this.loadingDialogVisible = false
        this.initData()
      } else {
        this.loadingDialogVisible = false
        this.responseErrorMsg = 'The network policy ' + this.policyName + ' cannot be activated because your IP address 222.128.1.181 is not in the allowed list.'
        this.editResponseVisible = true
      }
      this.change()
    },
    searchIps (item, index) {
      const ipsArray = []
      if (this.tableData[index].show) {
        for (var i = 0; i < this.tableData[index].allowed.length; i++) {
          if (this.tableData[index].allowed[i].indexOf(item.value) >= 0) {
            ipsArray.push(this.tableData[index].allowed[i])
          }
        }
      } else {
        for (var j = 0; j < this.tableData[index].blocked.length; j++) {
          if (this.tableData[index].blocked[j].indexOf(item.value) >= 0) {
            ipsArray.push(this.tableData[index].blocked[j])
          }
        }
      }
      this.tableData[index].showIps = ipsArray
      this.change()
    },
    changeButtonStyle (index, show) {
      this.tableData[index].show = show
      if (show) {
        this.tableData[index].showIps = this.tableData[index].allowed
      } else {
        this.tableData[index].showIps = this.tableData[index].blocked
      }
      this.change()
    },
    gotoDashboardDetailPages: function () {
      this.$router.push({name: 'SecurityDetail'})
    },
    querySearchAsync () {
      if (this.queryString !== undefined && this.queryString.length > 0) {
        var queryStringNew = this.queryString
        this.tableData = this.tableData.filter(function (item) {
          if (item.sessionId.toString().indexOf(queryStringNew) > -1) {
            return item
          }
        })
      }
    },
    async initData () {
      const remoteData = await this.services.securityService.selectData()
      this.tableData = remoteData.data.result
      this.hasData = this.tableData.length > 0
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].allowedLength = this.tableData[i].allowed.length
        this.tableData[i].blockedLength = this.tableData[i].blocked.length
        this.tableData[i].showIps = this.tableData[i].allowed
        this.tableData[i].show = true
        if (this.tableData[i].activatedStates === 1) {
          this.noneActive = false
        }
      }
      const remoteRoleData = await this.services.rolesService.queryRolesList()
      this.currentRoleId = remoteRoleData.data.currentRoleId
      let roleList = remoteRoleData.data.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
    },
    deleteTag (args) {
      if (args[1] === 0) {
        this.blocked.splice(this.blocked.indexOf(args[0]), 1)
        this.operationObject.blocked = this.blocked
        this.blockCount = this.blocked.length
      }
      if (args[1] === 1) {
        this.allowed.splice(this.allowed.indexOf(args[0]), 1)
        this.operationObject.allowed = this.allowed
        this.allowCount = this.allowed.length
      }
    },
    searchEditIps (args) {
      const seachData = []
      if (args[0] === 0) { // allow
        const allowedData = JSON.parse(JSON.stringify(this.operationObject.allowed))
        for (var i = 0; i < allowedData.length; i++) {
          if (allowedData[i].indexOf(this.operationObject.addAllowed) >= 0) {
            seachData.push(allowedData[i])
          }
        }
        this.allowed = seachData
        this.allowCount = this.allowed.length
      }
      if (args[0] === 1) { // block
        const blockData = JSON.parse(JSON.stringify(this.operationObject.blocked))
        for (var j = 0; j < blockData.length; j++) {
          if (blockData[j].indexOf(this.operationObject.addBlocked) >= 0) {
            seachData.push(blockData[j])
          }
        }
        this.blocked = blockData
        this.blockCount = this.blocked.length
      }
      this.change()
    },
    addNewIp (label) {
      if (label === undefined || label.length <= 0) {
        return false
      }
      const passReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
      var ip = this.operationObject.addAllowed
      if (label === 1) {
        ip = this.operationObject.addBlocked
      }
      if (!passReg.test(ip)) {
        this.$confirm('Enter valid IPV4 addresses', 'Message', {
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {}).catch(() => {})
        return false
      }
      if (label === 0) {
        this.operationObject.addAllowed = ''
        this.operationObject.allowed.push(ip)
      } else {
        this.operationObject.addBlocked = ''
        this.operationObject.blocked.push(ip)
      }
      const args = []
      args.push(label)
      this.searchEditIps(args)
    },
    change () {
      this.$forceUpdate()
    },
    handleClose () {
      this.loadingDialogVisible = false
      this.deleteDialogVisible = false
      this.centerDialogVisible = false
      this.editDialogVisible = false
      this.editResponseVisible = false
      this.operationObject = {}
      this.allowCount = 0
      this.blockCount = 0
      this.allowed = []
      this.blocked = []
    },
    async dropPolicy () {
      const paramsData = {}
      paramsData.id = this.operationObject.id
      paramsData.policyName = this.operationObject.policyName
      const data = this.services.securityService.dropPolicy(paramsData)
      if (data.code === 0) {
        this.initData()
        this.$message({
          type: 'success',
          message: 'success!'
        })
      } else {
        this.$message({
          type: 'info',
          message: data.msg
        })
        this.handleClose()
        this.change()
      }
    },
    handleOperationConfig (item, label) {
      this.operationObject = item
      if (label === 'drop') {
        this.policyName = item.policyName
        this.deleteDialogVisible = true
      }
      if (label === 'edit') {
        this.policyName = item.policyName
        this.editDialogVisible = true
        this.operationObject.addAllowed = ''
        this.operationObject.addBlocked = ''
        this.allowCount = item.allowed.length
        this.blockCount = item.blocked.length
        // 深copy对象
        this.allowed = JSON.parse(JSON.stringify(item.allowed))
        this.blocked = JSON.parse(JSON.stringify(item.blocked))
      }
    }
  },
  async mounted () {
    this.initData()
  },
  data () {
    return {
      msg: 'SecurityTabTable',
      queryString: '',
      value: '',
      hasData: false,
      timeout: null,
      tableData: [],
      rules: [],
      options: [{
        value: 'NLU0001',
        label: 'NLU0001'
      }, {
        value: 'all',
        label: 'all'
      }],
      centerDialogVisible: false,
      loadingDialogVisible: false,
      policyName: '',
      operationConfig: [
        {
          label: 'Edit Policy',
          value: 'edit',
          icon: 'el-icon-edit'
        },
        {
          label: 'Drop Plicy',
          value: 'drop',
          icon: 'el-icon-delete'
        }
      ],
      deleteDialogVisible: false,
      operationObject: {},
      noneActive: true,
      editDialogVisible: false,
      allowCount: 0,
      blockCount: 0,
      allowed: [],
      blocked: [],
      editResponseVisible: false,
      responseErrorMsg: '',
      currentRole: '',
      currentRoleId: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .liMenu{
    margin-right: 20px;
    cursor:pointer;
    line-height: 24px;
    font-weight: 700;
    fill: rgb(139, 141, 145);
    stroke: rgb(139, 141, 145);
    color: rgb(139, 141, 145);
  }
  .liMenu.hover{
    color: rgb(44, 47, 52);
    stroke: rgb(44, 47, 52);
    fill: rgb(44, 47, 52);
  }
  .box-card {
    border-radius: 8px;
    font-family: Inter;
    font-style: normal;
    box-shadow: none;
    padding-top: 16px;
    padding-bottom: 16px;
    border-left-color: rgb(226, 227, 229);
    border-top-color: rgb(226, 227, 229);
    border-bottom-color: rgb(226, 227, 229);
    border-left-width: 1px;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-left-style: solid;
    border-bottom-style: solid;
    border-top-style: solid;
    margin-top: 16px;
    background-color: rgb(242, 242, 242);
    padding-left: 24px;
    box-sizing: border-box;
    border-right-style: solid;
    border-right-color: rgb(226, 227, 229);
    border-right-width: 1px;
  }
  .warningType {
    color: rgb(44, 47, 52);
    font-weight: 500;
    stroke: rgb(44, 47, 52);
    fill: rgb(44, 47, 52);
    margin-bottom: 8px;
    font-size: 14px;
  }
  .descType {
    font-weight: 400;
    margin-left: 24px;
    font-size: 12px;
    fill: rgb(101, 103, 108);
    stroke: rgb(101, 103, 108);
    color: rgb(101, 103, 108);
  }
  .policyTitle {
    font-size: 16px;
    color: rgb(44, 47, 52);
    font-weight: 700;
    stroke: rgb(44, 47, 52);
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-y: hidden;
    padding-left: 6px;
    padding-bottom: 3px;
    padding-right: 6px;
    padding-top: 5px;
    display: inline-block;
  }
  .policyStatus {
    padding-left: 6px;
    padding-bottom: 3px;
    padding-right: 6px;
    padding-top: 5px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: 24px;
    display: inline-block;
    max-width: 100%;
    color: rgb(63, 66, 70);
    font-size: 11px;
    background-color: rgb(226, 227, 229);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-y: hidden;
    overflow-x: hidden;
    font-weight: 600;
    margin-left: 8px;
    box-sizing: border-box;
  }
  .policyActiveStatus {
    padding-left: 6px;
    padding-bottom: 3px;
    padding-right: 6px;
    padding-top: 5px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: 24px;
    display: inline-block;
    max-width: 100%;
    color: rgb(63, 66, 70);
    font-size: 11px;
    background-color: rgb(168, 252, 215);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-y: hidden;
    overflow-x: hidden;
    font-weight: 600;
    margin-left: 8px;
    box-sizing: border-box;
  }
  .policyTime {
    max-width: calc(100% - 24px);
    margin-top: 12px;
    padding-right: 4px;
    padding-left: 4px;
    line-height: 16px;
    display: inline-block;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 6px;
    font-size: 12px;
    color: rgb(101, 103, 108);
    background-color: rgb(250, 250, 250);
  }
  .inputDeep>>>.el-input__inner {
    border: 0;
    background-color: rgb(242, 242, 242);
    font-size: 16px;
  }
  .userStatusSlotStyle {
    top: .4em;
  }
  li:hover,
  li.active {
    background: #ecedee;
    cursor: pointer;
  }
  li {
    list-style-type:none;
  }
  ul.components {
    padding: 0 0;
  }

  ul p {
    padding: 5px;
  }
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
