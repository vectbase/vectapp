<template>
  <div>
    <el-breadcrumb separator="" style="margin: 20px;">
      <el-breadcrumb-item :to="{ path: '/vbase/vrolespanel' }">
        <el-button plain  type="info"><i class="el-icon-arrow-left"></i></el-button></el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 24px; margin-top: 10px;" >{{roleInfo.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-left: 20px;">
      <el-col :span="8">
        <el-alert
          type="info"
          :closable="false">
          <span v-if="!isDefault"><i class="el-icon-user"></i>{{roleInfo.owner}}&ensp;&ensp;</span>
          <el-tooltip placement="top">
            <div slot="content">{{roleInfo.updateTime}}</div>
            <i class="el-icon-time">{{roleInfo.updateTimeStr}} &ensp;&ensp; </i>
          </el-tooltip>
          <span v-if="isDefault">
            <el-tooltip placement="top">
            <div slot="content">{{roleMessage}}</div>
            <i class="el-icon-tickets">{{roleMessageShort}} &ensp;&ensp; </i>
          </el-tooltip>
          </span>
        </el-alert>
      </el-col>
    </el-row>
    <div>
      <el-card style="margin: 20px;">
        <el-row>
          <el-col :span="8">
            <h2>
              About
            </h2>
          </el-col>
        </el-row>
        <el-row class="cardTitle">
          <el-col :span="12">
            roles
            <el-row><el-link href="javascript:void(0)" @click.native="goAnchor('#granRolePannel')">Grant roles({{roleInfo.grantedRolesCount}})</el-link></el-row>
            <el-row><el-link>Grant to roles({{roleInfo.grantedToRolesCount}})</el-link></el-row>
          </el-col>
          <el-col :span="12">
            users
            <el-row><el-link>Granted to users ({{roleInfo.grantUsersCount}})</el-link></el-row>
          </el-col>
        </el-row>
      </el-card>

      <el-card style="margin: 20px;">
        <el-row>
          <el-col :span="8">
            <h2>
              Privileges
            </h2>
          </el-col>
          <el-col :span="16" style="text-align: right;margin-top: 20px;">
            <el-select v-model="value" size="mini" clearable placeholder="select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="cardTitle">
          <el-col :span="8">
            <el-button size="mini" type="info" icon="el-icon-key">OWNERSHIP</el-button>
          </el-col>
          <el-col :span="8">
            ACCOUNTADMIN
          </el-col>
        </el-row>
      </el-card>

      <el-card style="margin: 20px;" id="granRolePannel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Granted Roles" name="first">
            <el-row :gutter="20" style="margin-top: 20px;">
              <el-col :span="16" style="border: #1c1f23">
                {{roleInfo.name}} has been granted {{roleInfo.grantedRolesCount}} roles
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="8">
                    <el-button
                      size="mini"
                      class="filtrate-button"
                      style="color:#8b8d91"
                      v-if="!searchInputVisible && !searchInputFixed"
                      @mouseover.native="handleSearchClick('grant')">
                      <i class="el-icon-search"></i>
                      <span style="color: #3f4246" >Search</span>
                    </el-button>
                    <el-input size="mini"
                              placeholder="Search"
                              prefix-icon="el-icon-search"
                              ref="searchInputRef"
                              v-if="searchInputVisible || searchInputFixed"
                              v-model.trim="queryString"
                              class="search-input border-radius-class"
                              @mouseout.native="handleMouseout('grant')"
                              @click.native="handleInputClick('grant')"
                              @blur="handleInputBlur('grant')">
                    </el-input>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <el-button size="mini" @click="handleCommand('grantRole')">grant role</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button size="mini" icon="el-icon-search" @click="initData"></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="!hasGrantRole">
              <div style="margin: 50px 0 0; text-align:center">
                <el-row>
                  No granted roles
                </el-row>
                <el-row>
                  Click Grant Role to grant a role to {{roleInfo.name}}.
                </el-row>
              </div>
            </el-row>
            <el-row v-else>
              <el-table
                :data="grantRoles"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="NAME">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="GRANTED ON">
                </el-table-column>
                <el-table-column
                  prop="owner"
                  label="GRANTED BY">
                </el-table-column>
                <el-table-column
                  label="OPERATION">
                  <template slot-scope="scope">
                    <el-popover
                      width="160"
                      trigger="click"
                      id="userStyleConfig"
                      visible-arrow="false">
                      <ul class="list-unstyled components text-secondary">
                        <li @click="showOperationConfig(scope.row, 'revokeGrantRole')">
                          <p>revoke</p>
                        </li>
                      </ul>
                      <el-button size="mini" type="text" slot="reference"><i class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>

              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Granted to Roles" name="second">
            <el-row :gutter="20" style="margin-top: 20px;">
              <el-col :span="16" style="border: #1c1f23">
                {{roleInfo.grantedToRolesCount}} roles have been granted {{roleInfo.name}}
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-col :span="8">
                    <el-button
                      size="mini"
                      class="filtrate-button"
                      style="color:#8b8d91"
                      v-if="!searchInputVisibleGrantTo && !searchInputFixedGrantTo"
                      @mouseover.native="handleSearchClick('grantTo')">
                      <i class="el-icon-search"></i>
                      <span style="color: #3f4246" >Search</span>
                    </el-button>
                    <el-input size="mini"
                              placeholder="Search"
                              prefix-icon="el-icon-search"
                              ref="searchInputGrantToRef"
                              v-if="searchInputVisibleGrantTo || searchInputFixedGrantTo"
                              v-model.trim="queryStringGrantTo"
                              class="search-input border-radius-class"
                              @mouseout.native="handleMouseout('grantTo')"
                              @click.native="handleInputClick('grantTo')"
                              @blur="handleInputBlur('grantTo')">
                    </el-input>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <el-button size="mini" @click="handleCommand('grantToRole')">grant to role</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button size="mini" icon="el-icon-search" @click="initData"></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="!hasGrantToRole">
              <div style="margin: 50px 0 0; text-align:center">
                <el-row>
                  No grants to roles
                </el-row>
                <el-row>
                  Click Grant to Role to grant {{roleInfo.name}} to another role.
                </el-row>
              </div>
            </el-row>
            <el-row v-else>
              <el-table
                :data="grantToRoles"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="NAME">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="GRANTED ON">
                </el-table-column>
                <el-table-column
                  prop="owner"
                  label="GRANTED BY">
                </el-table-column>
                <el-table-column
                  label="OPERATION">
                  <template slot-scope="scope">
                    <el-popover
                      width="160"
                      trigger="click"
                      id="userStyleConfig"
                      visible-arrow="false">
                      <ul class="list-unstyled components text-secondary">
                        <li @click="showOperationConfig(scope.row, 'revokeGrantToRole')">
                          <p>revoke</p>
                        </li>
                      </ul>
                      <el-button size="mini" type="text" slot="reference"><i class="el-icon-more"></i></el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card style="margin: 20px;">
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="16" style="border: #1c1f23">
            {{roleInfo.grantUsersCount}} user has been granted {{roleInfo.name}}
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="8">
                <el-button
                  size="mini"
                  class="filtrate-button"
                  style="color:#8b8d91"
                  v-if="!searchInputVisibleGrantUser && !searchInputFixedGrantUser"
                  @mouseover.native="handleSearchClick('grantUser')">
                  <i class="el-icon-search"></i>
                  <span style="color: #3f4246" >Search</span>
                </el-button>
                <el-input size="mini"
                          placeholder="Search"
                          prefix-icon="el-icon-search"
                          ref="searchInputGrantUserRef"
                          v-if="searchInputVisibleGrantUser || searchInputFixedGrantUser"
                          v-model.trim="queryStringGrantUser"
                          class="search-input border-radius-class"
                          @mouseout.native="handleMouseout('grantUser')"
                          @click.native="handleInputClick('grantUser')"
                          @blur="handleInputBlur('grantUser')">
                </el-input>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-button size="mini" @click="handleCommand('grantToUser')">grant to User</el-button>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" icon="el-icon-search" @click="initData"></el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="!hasGrantUser">
          <div style="margin: 50px 0 0; text-align:center">
            <el-row>
              No grants to users
            </el-row>
            <el-row>
              Click Grant to User to grant {{roleInfo.name}} to a user.
            </el-row>
          </div>
        </el-row>
        <el-row v-else>
          <el-table
            :data="grantUsers"
            style="width: 100%">
            <el-table-column
              prop="userName"
              label="NAME">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="GRANTED ON">
            </el-table-column>
            <el-table-column
              prop="owner"
              label="GRANTED BY">
            </el-table-column>
            <el-table-column
              label="OPERATION">
              <template slot-scope="scope">
                <el-popover
                  width="160"
                  trigger="click"
                  id="userStyleConfig"
                  visible-arrow="false">
                  <ul class="list-unstyled components text-secondary">
                    <li @click="showOperationConfig(scope.row, 'revokeGrantUser')">
                      <p>revoke</p>
                    </li>
                  </ul>
                  <el-button size="mini" type="text" slot="reference"><i class="el-icon-more"></i></el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-card>
    </div>
    <el-dialog center :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <div class="relationContainer">
        <span><i v-if="dialogIsRevokeRole" class="el-icon-user"></i>{{dialogFormObject}} as <i class="el-icon-user"></i>{{currentRole}}</span>
      </div>
      <div style="margin: 50px 0 0; text-align:center">
        <el-row>
          {{dialogFormContent}}
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">cancel</el-button>
        <el-button size="mini" type="danger" @click="operation">Revoke</el-button>
      </div>
    </el-dialog>
    <grant-revoke-dialog
      :dialog-object-form-visible="dialogObjectFormVisible"
      :current-role="currentRole"
      :dialog-object="dialogObject" @grantRole="grantRole" @handleClose="handleClose"></grant-revoke-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import GrantRevokeDialog from '../dialog/GrantRevokeDialog'
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'VRoleDetail',
  watch: {
    queryString () {
      delay(() => {
        this.querySearchAsync()
      }, 300)
    }
  },
  async mounted () {
    await this.initData()
  },
  components: {
    GrantRevokeDialog,
    'grant-revoke-dialog': GrantRevokeDialog
  },
  methods: {
    goAnchor (selector) {
      const anchor = this.$el.querySelector(selector)
      let setTop = anchor.offsetTop
      console.log('set top is {}', setTop)
      console.log(document.scroll)
      document.getElementById('granRolePannel').scrollTop = setTop
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    showOperationConfig: function (row, command) {
      this.revokeData.command = command
      this.revokeData.name = row.name
      this.revokeData.selectEntityId = row.entityId
      this.revokeData.entityId = this.$route.query.id
      if (command === 'revokeGrantRole') {
        this.dialogFormTitle = 'Revoke Grant of Role to Role'
        this.dialogIsRevokeRole = true
        this.dialogFormContent = 'Revoke grant of role ' + row.name + ' to role ' + this.currentRole + '. Revoked roles can be added again.'
        this.dialogFormObject = row.name
      }

      if (command === 'revokeGrantToRole') {
        this.dialogFormTitle = 'Revoke Grant of Role to Role'
        this.dialogIsRevokeRole = true
        this.dialogFormContent = 'Revoke grant of role ' + row.name + ' to role ' + this.currentRole + '. Revoked roles can be added again.'
        this.dialogFormObject = row.name
      }

      if (command === 'revokeGrantUser') {
        this.dialogFormTitle = 'Revoke Grant of Role to User'
        this.dialogIsRevokeRole = false
        this.dialogFormContent = 'Revoke grant of role ' + this.currentRole + ' to user ' + row.userName + '. Revoked roles can be added again.'
        this.dialogFormObject = row.userName
      }
      this.dialogFormVisible = true
    },
    async initData () {
      let roleEntityId = this.$route.query.id
      let response = await this.services.rolesService.getRoleInfo(roleEntityId)
      this.roleInfo = response.data.role
      this.remoteGrantUsersData = response.data.grantUsers
      this.remoteGrantRolesData = response.data.grantRoles
      this.remoteGrantToRolesData = response.data.grantToRoles
      const defaultRole = {
        ACCOUNTADMIN: 'Account administrator can manage all aspects of the account.',
        ORGADMIN: 'Organization administrator can manage organizations and accounts in organizations.',
        PUBLIC: 'Public role is automatically available to every user in the account.',
        SECURITYADMIN: 'Security administrator can manage security aspects of the account.',
        SYSADMIN: 'System administrator can create and manage databases and warehouses.',
        USERADMIN: 'User administrator can create and manage users and roles'
      }
      if (defaultRole.hasOwnProperty(this.roleInfo.name) && defaultRole[this.roleInfo.name].length > 0) {
        this.isDefault = true
        this.roleMessage = defaultRole[this.roleInfo.name]
        this.roleMessageShort = defaultRole[this.roleInfo.name].substring(0, 20) + '...'
      }
      let roleList = this.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
      this.querySearchAsync()
    },
    async operation () {
      let result = await this.services.rolesService.operation(this.revokeData)
      this.dialogFormVisible = false
      if (result.code === 200 || result.code === 0) {
        this.initData()
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
    handleSearchClick (command) {
      if (command === 'grant') {
        this.searchInputVisible = true
        this.$nextTick(function () {
          this.$refs.searchInputRef.focus()
        })
      }
      if (command === 'grantTo') {
        this.searchInputVisibleGrantTo = true
        this.$nextTick(function () {
          this.$refs.searchInputGrantToRef.focus()
        })
      }
      if (command === 'grantUser') {
        this.searchInputVisibleGrantUser = true
        this.$nextTick(function () {
          this.$refs.searchInputGrantUserRef.focus()
        })
      }
    },
    handleInputBlur (command) {
      if (command === 'grant') {
        this.searchInputVisible = false
        this.searchInputFixed = false
      }
      if (command === 'grantTo') {
        this.searchInputVisibleGrantTo = false
        this.searchInputFixedGrantTo = false
      }
      if (command === 'grantUser') {
        this.searchInputVisibleGrantUser = false
        this.searchInputFixedGrantUser = false
      }
    },
    handleMouseout (command) {
      if (command === 'grant') {
        this.searchInputVisible = false
      }
      if (command === 'grantTo') {
        this.searchInputVisibleGrantTo = false
      }
      if (command === 'grantUser') {
        this.searchInputVisibleGrantUser = false
      }
    },
    handleInputClick (command) {
      if (command === 'grant') {
        this.searchInputFixed = true
      }
      if (command === 'grantTo') {
        this.searchInputFixedGrantTo = true
      }
      if (command === 'grantUser') {
        this.searchInputFixedGrantUser = true
      }
    },
    querySearchAsync () {
      this.grantUsers = this.remoteGrantUsersData
      if ((this.queryStringGrantUser !== undefined && this.queryStringGrantUser.length > 0)) {
        var queryStringGrantUser = this.queryStringGrantUser
        if (queryStringGrantUser.length > 0) {
          this.grantUsers = this.grantUsers.filter(function (item) {
            if (item.userName.toString().indexOf(queryStringGrantUser) > -1) {
              return item
            }
          })
        }
      }
      this.grantRoles = this.remoteGrantRolesData
      if ((this.queryString !== undefined && this.queryString.length > 0)) {
        var queryStringNew = this.queryString
        if (queryStringNew.length > 0) {
          this.grantRoles = this.grantRoles.filter(function (item) {
            if (item.name.toString().indexOf(queryStringNew) > -1) {
              return item
            }
          })
        }
      }
      this.grantToRoles = this.remoteGrantToRolesData
      if ((this.queryStringGrantTo !== undefined && this.queryStringGrantTo.length > 0)) {
        var queryStringGrantToNew = this.queryStringGrantTo
        if (queryStringGrantToNew.length > 0) {
          this.grantToRoles = this.grantToRoles.filter(function (item) {
            if (item.name.toString().indexOf(queryStringGrantToNew) > -1) {
              return item
            }
          })
        }
      }
      if (this.grantUsers.length > 0) {
        this.hasGrantUser = true
      }
      if (this.grantRoles.length > 0) {
        this.hasGrantRole = true
      }
      if (this.grantToRoles.length > 0) {
        this.hasGrantToRole = true
      }
      this.roleInfo.grantedToRolesCount = this.grantToRoles.length
      this.roleInfo.grantUsersCount = this.grantUsers.length
      this.roleInfo.grantedRolesCount = this.grantRoles.length
    },
    grantRole () {
      this.dialogObjectFormVisible = false
      const data = {}
      data.command = this.dialogObject.command
      data.name = this.dialogObject.form.name
      data.selectEntityId = this.dialogObject.form[data.command]
      data.entityId = this.dialogObject.form.entityId
      this.revokeData = data
      this.operation()
    },
    async handleCommand (command) {
      this.dialogObject = {
        form: {}
      }
      this.dialogObject.owner = this.roleInfo.owner
      this.dialogObject.form.name = this.roleInfo.name
      this.dialogObject.form.entityId = this.roleInfo.entityId
      const data = [
        {
          label: 'Role to grant',
          type: 'input',
          key: 'name',
          isShowValidate: false,
          disabled: true
        }
      ]

      var obj = {
        label: 'User to receive grant',
        type: 'select',
        key: 'grantRole',
        isShowValidate: true,
        disabled: false
      }
      this.dialogObject.command = command
      if (command === 'grantRole') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantRole = ''
        this.dialogObject.title = 'Grant Role a Role'
        obj = this.getSelectData(this.roleList, obj)
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command === 'grantToRole') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantToRole = ''
        this.dialogObject.title = 'Grant Role to Role'
        obj.key = 'grantToRole'

        obj = this.getSelectData(this.roleList, obj)
        obj.label = 'Role to receive grant'
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command === 'grantToUser') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantToUser = ''
        this.dialogObject.title = 'Grant Role to User'
        obj.key = 'grantToUser'
        let userData = await this.services.usersService.queryGrantUsersList()
        obj = this.getSelectData(userData.data, obj)
        obj.label = 'User to receive grant'
        data.push(obj)
        this.dialogObject.data = data
      }
      this.dialogObjectFormVisible = true
    },
    getSelectData: function (options, obj) {
      obj.options = options
      return obj
    },
    handleClose () {
      this.dialogObjectFormVisible = false
    }
  },
  data () {
    return {
      msg: 'VUserDetail',
      roleInfo: {
        loginName: 'DEMO',
        displayName: 'DEMO',
        defaultRole: '',
        defaultWarehouse: '',
        mfa: 'No',
        lastLogin: '2021-11-05',
        status: 'Enabled',
        roles: 'Granted roles(0)'
      },
      options: [{
        value: '1',
        label: 'Group by Role'
      }, {
        value: '2',
        label: 'Group by Privilege'
      }],
      dialogFormVisible: false,
      dialogFormTitle: '',
      dialogIsRevokeRole: false,
      dialogFormContent: '',
      dialogFormObject: '',
      value: '1',
      activeName: 'first',
      privilegesData: {},
      rolesData: {},
      isDefault: false,
      roleMessage: '',
      roleMessageShort: '',
      grantUsers: [],
      remoteGrantUsersData: [],
      grantRoles: [],
      remoteGrantRolesData: [],
      grantToRoles: [],
      remoteGrantToRolesData: [],
      hasGrantRole: false,
      hasGrantToRole: false,
      hasGrantUser: false,
      currentRole: '',
      revokeData: {},
      searchInputVisible: false,
      searchInputFixed: false,
      searchInputVisibleGrantTo: false,
      searchInputFixedGrantTo: false,
      searchInputVisibleGrantUser: false,
      searchInputFixedGrantUser: false,
      queryString: '',
      queryStringGrantTo: '',
      queryStringGrantUser: '',
      dialogObjectFormVisible: false,
      dialogObject: {}
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'})
  }
}
</script>

<style scoped>
  li:hover,
  li.active {
    background: #ecedee;
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
  .breadcrumbType {
    font-size: 36px;
  }
  .cardTitle {
    font-size: 14px;
    color: #65676c;
  }
  .relationContainer {
    display: flex;
    justify-content: center; /*主轴上居中*/
    align-items: center; /*侧轴上居中*/
    font-size: 12px;
    color: #65676c;
    margin-top: -5px;
    margin-bottom: 10px;
    height: 20px;
  }
  /deep/ .el-card {
    border-radius: 16px;
  }
</style>
