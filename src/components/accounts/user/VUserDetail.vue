<template>
  <div>
    <el-breadcrumb separator="" style="margin: 20px;">
      <el-breadcrumb-item :to="{ path: '/vbase/vuserpanel' }">
        <el-button plain  type="info"><i class="el-icon-arrow-left"></i></el-button></el-breadcrumb-item>
      <el-breadcrumb-item style="font-size: 24px; margin-top: 10px;" >{{userInfo.userName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 20px;">
      <el-row>
        <el-col :span="8">
          <h2>
            About
          </h2>
        </el-col>
      </el-row>
      <el-row class="cardTitle">
        <el-col :span="8">
          Login Name
        </el-col>
        <el-col :span="8">
          Display Name
        </el-col>
        <el-col :span="8">
          Default Role
        </el-col>
      </el-row>
      <el-row  style="padding: 10px;">
        <el-col :span="8">
          {{userInfo.userName}}
        </el-col>
        <el-col :span="8">
         {{userInfo.displayName}}
        </el-col>
        <el-col :span="8">
          {{userInfo.defaultRole}}
        </el-col>
      </el-row>
      <el-row  class="cardTitle">
        <el-col :span="8">
          Default Warehouse
        </el-col>
        <el-col :span="8">
          Default Namespace
        </el-col>
        <el-col :span="8">
          MFA
        </el-col>
      </el-row>
      <el-row  style="padding: 10px;">
        <el-col :span="8">
          {{userInfo.defaultWarehouse}}
        </el-col>
        <el-col :span="8">
          {{userInfo.defaultNamespace}}
        </el-col>
        <el-col :span="8">
          {{userInfo.mfa}}
        </el-col>
      </el-row>
      <el-row class="cardTitle">
        <el-col :span="8">
          Last Login
        </el-col>
        <el-col :span="8">
          Status
        </el-col>
        <el-col :span="8">
          Roles
        </el-col>
      </el-row>
      <el-row style="padding: 10px;">
        <el-col :span="8">
          {{userInfo.updateTimeStr}}
        </el-col>
        <el-col :span="8">
          {{userInfo.statusStr}}
        </el-col>
        <el-col :span="8">
          Granted roles({{userInfo.roles}})
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
          <el-button size="mini" type="info" icon="el-icon-plus">privilege</el-button>
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

    <el-card style="margin: 20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Granted Roles" name="first">
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="16" style="border: #1c1f23">
              {{userInfo.userName}} has been granted {{grantedRolesCount}} roles
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
                            @mouseout.native="handleMouseout()"
                            @click.native="handleInputClick()"
                            @blur="handleInputBlur()">
                  </el-input>
                </el-col>
                <el-col :span="8" :offset="2">
                  <el-button size="mini" @click="handleCommand('grantToUser')">grant role</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button size="mini" icon="el-icon-search" @click="initUsersData"></el-button>
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
                Click Grant Role to grant a role to {{userInfo.userName}}.
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
  name: 'VUserDetail',
  watch: {
    queryString () {
      delay(() => {
        this.querySearchAsync()
      }, 300)
    }
  },
  async mounted () {
    await this.initUsersData()
  },
  components: {
    GrantRevokeDialog,
    'grant-revoke-dialog': GrantRevokeDialog
  },
  methods: {
    async initUsersData () {
      let userEntityId = this.$route.query.id
      let response = await this.services.usersService.queryUserInfo(userEntityId)
      this.userInfo = response.data.userInfo
      this.grantUsers = response.data.grantUsers
      this.remoteGrantRolesData = await this.services.rolesService.queryGrantUserRoleList(userEntityId)
      if (this.userInfo.status === 1) {
        this.userInfo.statusStr = 'Enabled'
      } else {
        this.userInfo.statusStr = 'Disabled'
      }
      this.userInfo.roles = this.grantUsers.length
      this.$forceUpdate()
      let roleList = this.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
      this.querySearchAsync()
    },
    grantRole () {
      this.dialogObjectFormVisible = false
      const data = {}
      data.command = this.dialogObject.command
      data.name = this.dialogObject.form.name
      data.selectEntityId = this.dialogObject.form.entityId
      data.entityId = this.dialogObject.form[data.command]
      this.revokeData = data
      this.operation()
    },
    async handleCommand (command) {
      this.dialogObject = {
        form: {}
      }
      this.dialogObject.form.name = this.userInfo.userName
      this.dialogObject.form.entityId = this.userInfo.entityId
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
      if (command === 'grantToUser') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantToUser = ''
        this.dialogObject.title = 'Grant Role to User'
        obj.key = 'grantToUser'
        obj = this.getSelectData(this.roleList, obj)
        obj.label = 'User to receive grant'
        data.push(obj)
        this.dialogObject.data = data
      }
      this.dialogObjectFormVisible = true
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSearchClick () {
      this.searchInputVisible = true
      this.$nextTick(function () {
        this.$refs.searchInputRef.focus()
      })
    },
    getSelectData: function (options, obj) {
      obj.options = options
      return obj
    },
    async operation () {
      let result = await this.services.rolesService.operation(this.revokeData)
      this.dialogFormVisible = false
      if (result.code === 200 || result.code === 0) {
        this.initUsersData()
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
    showOperationConfig: function (row, command) {
      this.revokeData.command = command
      this.revokeData.name = row.name
      this.revokeData.selectEntityId = this.$route.query.id
      this.revokeData.entityId = row.entityId
      if (command === 'revokeGrantUser') {
        this.dialogFormTitle = 'Revoke Grant of Role to User'
        this.dialogIsRevokeRole = false
        this.dialogFormContent = 'Revoke grant of role ' + this.currentRole + ' to user ' + row.userName + '. Revoked roles can be added again.'
        this.dialogFormObject = this.userInfo.userName
      }
      this.dialogFormVisible = true
    },
    handleInputBlur () {
      this.searchInputVisible = false
      this.searchInputFixed = false
    },
    handleMouseout () {
      this.searchInputVisible = false
    },
    handleInputClick () {
      this.searchInputFixed = true
    },
    querySearchAsync () {
      this.grantRoles = this.remoteGrantRolesData.data
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
      if (this.grantRoles.length > 0) {
        this.hasGrantRole = true
      }
      this.grantedRolesCount = this.grantRoles.length
    },
    handleClose () {
      this.dialogObjectFormVisible = false
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'})
  },
  data () {
    return {
      msg: 'VUserDetail',
      showTable: false,
      userInfo: {},
      grantUsers: [],
      options: [{
        value: '1',
        label: 'Group by Role'
      }, {
        value: '2',
        label: 'Group by Privilege'
      }],
      value: '1',
      activeName: 'first',
      searchInputVisible: false,
      searchInputFixed: false,
      grantRoles: [],
      remoteGrantRolesData: [],
      dialogFormTitle: '',
      dialogIsRevokeRole: false,
      dialogFormContent: '',
      dialogFormObject: '',
      queryString: '',
      hasGrantRole: '',
      dialogObjectFormVisible: false,
      grantedRolesCount: 0,
      dialogFormVisible: false,
      currentRole: '',
      dialogObject: {},
      revokeData: {}
    }
  }
}
</script>

<style scoped>
  .breadcrumbType {
    font-size: 36px;
  }
  .cardTitle {
    font-size: 14px;
    color: #65676c;
  }
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
</style>
