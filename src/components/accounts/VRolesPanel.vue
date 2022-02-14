<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-row>
          <el-col :span="12" style="text-align: left">
            <h3>Roles</h3>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <h3>
              <el-button size="mini" type="primary" @click="addRole" icon="el-icon-plus">Roles</el-button>
            </h3>
          </el-col>
        </el-row>
        <div id="card-body-title">
          <el-row>
            <el-col :span="4" style="text-align: left">
              <el-switch
                v-model="tabSwitch"
                inactive-text="Graph"
                active-text="Table"
              >
              </el-switch>
            </el-col>
            <el-col v-if="tabSwitch" :span="20">
              <el-row>
                <el-col :span="6" style="text-align: left">
                  <label>{{tableCount}} Roles</label>
                </el-col>
                <el-col :span="4" :offset="12" style="text-align: right">
                  <el-button
                    size="mini"
                    class="filtrate-button"
                    style="color:#8b8d91"
                    v-if="!searchInputVisible && !searchInputFixed"
                    @mouseover.native="handleSearchClick">
                    <i class="el-icon-search"></i>
                    <span style="color: #3f4246" >Search</span>
                  </el-button>
                  <el-input size="mini"
                            placeholder="Search Name"
                            prefix-icon="el-icon-search"
                            ref="searchInputRef"
                            v-if="searchInputVisible || searchInputFixed"
                            v-model.trim="queryString"
                            class="search-input border-radius-class"
                            @mouseout.native="handleMouseout"
                            @click.native="handleInputClick"
                            @blur="handleInputBlur">
                  </el-input>
                </el-col>
                <el-col :span="2">
                  <el-button size="mini" icon="el-icon-refresh" style="margin-left: 4px" @click="refreshUserData"></el-button>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </div>
        <div v-if="tabSwitch">
          <el-table
            :data="tableData"
            size="mini">
            <el-table-column
              prop="name"
              label="NAME"
              sortable
              width="130">
            </el-table-column>
            <el-table-column
              prop="grantedRoles"
              label="GRANTED ROLES"
              sortable
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="grantedToRoles"
              sortable
              label="GRANTED TO ROLES"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="users"
              label="USERS"
              sortable
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="createTimeStr"
              label="CREATED"
              sortable
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="owner"
              label="OWNER"
              sortable
              min-width="160">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="transToDetail(scope.row)">
                  <i v-if="scope.row.owner.trim().length > 0" class="el-icon-user-solid"> {{scope.row.owner}} </i>
                  <label v-if="scope.row.owner.trim().length === 0">-----</label>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="OPERATION"
              min-width="200"
              align="center">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.creator != 9999999999"
                  width="200"
                  trigger="click"
                  id="roleStyleConfig"
                  visible-arrow="false">
                  <ul class="list-unstyled components text-secondary">
                    <li>
                      <el-dropdown @command="handleCommand" style="width: 100%; margin-bottom: 5px; margin-top: 5px;">
                        <span class="el-dropdown-link" style="width: 100%;">
                          <el-row>
                            <el-col :span="12" style="text-align: left">
                              Grant
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-col>
                          </el-row>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'grantRole')">Grant role</el-dropdown-item>
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'grantToRole')">Grant to role</el-dropdown-item>
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'grantToUser')">Grant to User</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </li>
                    <li>
                      <el-dropdown @command="handleCommand" style="width: 100%; margin-bottom: 5px; margin-top: 5px;">
                        <span class="el-dropdown-link" style="width: 100%;">
                          <el-row>
                            <el-col :span="12" style="text-align: left">
                              Revoke
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-col>
                          </el-row>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'revokeGrantRole')">Revoke grant of role</el-dropdown-item>
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'revokeGrantToRole')">Revoke grant to role</el-dropdown-item>
                          <el-dropdown-item :command="beforeHandleCommand(scope.row, 'revokeGrantUser')">Revoke grant to  user</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </li>
                    <li>
                      <div class="el-dropdown" style="width: 100%; margin-bottom: 5px; margin-top: 5px;">
                        <span class="el-dropdown-link el-dropdown-selfdefine" @click="handleManage(scope.row)">
                          <el-row>
                            <el-col :span="24">
                              Manage global privileges
                            </el-col>
                          </el-row>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="el-dropdown" style="width: 100%; margin-bottom: 5px; margin-top: 5px;">
                        <span class="el-dropdown-link el-dropdown-selfdefine" @click="editRole(scope.row)">
                          <el-row>
                            <el-col :span="24">
                              Edit role
                            </el-col>
                          </el-row>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="el-dropdown" style="width: 100%; margin-bottom: 5px; margin-top: 5px;">
                        <span class="el-dropdown-link el-dropdown-selfdefine" @click="dorpRole(scope.row)">
                          <el-row>
                            <el-col :span="24">
                              Drop role
                            </el-col>
                          </el-row>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <el-button size="mini" type="text" slot="reference" @click="showOperationConfig"><i class="el-icon-more"></i></el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <el-dialog center :title="roleDialogTitle" :visible.sync="dialogFormVisible" width="30%" :before-close="handleClose">
        <div class="relationContainer">
          <span>{{ruleForm.label}}<i class="el-icon-user"></i> {{currentRole}} </span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-row>
            <el-col :span="23">
              <el-form-item label="Name" prop="name">
                <el-input size="mini" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isEdit">
            <el-col :span="23">
              <el-form-item label="Grant to role" prop="grantRole">
                <el-select style="width: 100%;" size="mini" v-model="ruleForm.grantRole" clearable placeholder="select" @change="change">
                  <el-option
                    v-for="item in operations.roleConfigList"
                    :key="item.entityId"
                    :label="item.name"
                    :value="item.entityId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-tooltip content="Inherits any privilege granted to the new role" placement="bottom-end" effect="light">
                <i class="el-icon-info" style="margin-top: 15px"></i>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="Comment" prop="comment">
                <el-input size="mini" v-model="ruleForm.comment" @input="change"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px; text-align: center">
            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">submit</el-button>
            <el-button size="mini" @click="resetForm()">reset</el-button>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog :title="dialogObject.title" :visible.sync="dialogObjectFormVisible" width="40%" center :before-close="handleClose">
        <div class="relationContainer">
          <span>{{dialogObject.description}}<i class="el-icon-user"></i> {{currentRole}} </span>
        </div>
        <el-form :model="dialogObject.form" ref="dialogObject.form" label-width="200px" class="demo-ruleForm">
          <el-form-item :label="item.label" v-for="(item, index) in dialogObject.data" v-bind:key="index">
            <el-input :disabled="item.disabled" :prop="item.key" size="mini" @input="$forceUpdate()" v-if="item.type === 'input'" v-model="dialogObject.form[item.key]"></el-input>
            <el-select :disabled="item.disabled" style="width: 100%" :prop="item.key" size="mini" @change="$forceUpdate()" v-if="item.type === 'select'" v-model="dialogObject.form[item.key]" placeholder="select">
              <el-option
                v-for="it in item.options"
                :key="it.entityId"
                :label="it.name"
                :value="it.entityId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogObjectFormVisible = false">cancel</el-button>
          <el-button size="mini" type="primary" @click="grantRole">submit</el-button>
        </div>
      </el-dialog>

      <el-dialog title="Manage Global Privileges for Role"  :visible.sync="pivilegesFormVisible" width="40%" center :before-close="handleClose">
        <div class="relationContainer">
          <span>Granting and revoking as <i class="el-icon-user"></i>{{currentRole}}</span>
        </div>
        <el-form :model="privilegesForm" ref="privilegesForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="Role to receive grants">
            <el-input disabled size="mini" v-model="privilegesForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Global privilege to grant">
            <el-select style="width: 100%" size="mini" @change="privilegesChange" v-model="privilegesForm.value" placeholder="Select a privilege">
              <el-option
                v-for="it in privilegesForm.options"
                :key="it.id"
                :label="it.name"
                :value="it.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-table
            :data="privilegesForm.privilegeTableData"
            style="width: 100%"
          >
            <el-table-column
              label="Name"
            >
              <template slot-scope="scope"><el-button size="mini" type="info" round>{{ scope.row.name }}</el-button></template>
            </el-table-column>
            <el-table-column
              label="Grant option" width="120"
            >
              <template slot-scope="scope"><el-checkbox v-model="scope.row.grantOption"></el-checkbox></template>
            </el-table-column>
            <el-table-column label="Revoke" width="80">
              <template slot-scope="scope">
                <el-button @click="handleRevokeClick(scope.row)" type="text" size="small"><i class="el-icon-close"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogObjectFormVisible = false">cancel</el-button>
          <el-button size="mini" type="primary" @click="grantPrivilege">submit</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'VRolesPanel',
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
  methods: {
    handleClose () {
      this.resetForm()
      this.dialogObjectFormVisible = false
      this.pivilegesFormVisible = false
      this.privilegesForm.privilegeTableData = []
    },
    async initData () {
      this.remoteData = await this.services.rolesService.queryRolesTableList()
      let responseData = this.remoteData.data
      for (let i = 0; i < responseData.length; i++) {
        let obj = responseData[i]
        for (let key in obj) {
          if (obj[key] == null) {
            obj[key] = ''
          }
        }
        responseData[i] = obj
      }
      this.remoteData = responseData
      this.tableData = this.remoteData
      this.tableCount = this.tableData.length
      this.operations = await this.services.usersService.queryUsersOperationConfigs()
      this.operations.roleConfigList = this.tableData
      let userData = await this.services.usersService.queryGrantUsersList()
      this.usersList = userData.data
      let roleList = this.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
    },
    async refreshUserData () {
      this.remoteData = await this.services.rolesService.queryRolesList()
      this.querySearchAsync()
    },
    querySearchAsync () {
      this.tableData = this.remoteData
      if ((this.queryString !== undefined && this.queryString.length > 0)) {
        var queryStringNew = this.queryString
        if (queryStringNew.length > 0) {
          this.tableData = this.tableData.filter(function (item) {
            if (item.name.toString().indexOf(queryStringNew) > -1) {
              return item
            }
          })
        }
      }
      this.tableCount = this.tableData.length
    },
    grantRole () {
      this.dialogObjectFormVisible = false
      const data = {}
      data.command = this.dialogObject.command
      data.name = this.dialogObject.form.name
      data.selectEntityId = this.dialogObject.form[data.command]
      if (this.dialogObject.form[data.command] === '' || this.dialogObject.form[data.command].length <= 0) {
        return false
      }
      data.entityId = this.dialogObject.form.entityId
      this.operation(data)
    },
    grantPrivilege () {
      this.pivilegesFormVisible = false
      if (this.privilegesForm.privilegeTableData.length !== 0) {
        this.managePrivilageOperation()
      }
    },
    async managePrivilageOperation () {
      let constData = {}
      constData.roleUuid = this.privilegesForm.entityId
      constData.privilegeInfos = this.privilegesForm.privilegeTableData
      constData.currentRoleUuid = this.currentRoleId
      let result = this.services.rolesService.addPrivilege(constData)
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
    async operation (data) {
      let result = await this.services.rolesService.operation(data)
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRemoteRole()
        }
      })
    },
    async addRemoteRole () {
      const resopnseResult = await this.services.rolesService.addRole(this.ruleForm)
      if (resopnseResult.success) {
        this.resetForm()
        this.dialogFormVisible = false
        this.initData()
        this.$message({
          type: 'success',
          message: 'add success !'
        })
      } else {
        this.$message({
          type: 'info',
          message: resopnseResult.msg
        })
      }
    },
    resetForm () {
      this.ruleForm.name = ''
      this.ruleForm.comment = ''
      this.ruleForm.grantRole = ''
      this.dialogFormVisible = false
    },
    showOperationConfig: function () {
      console.log('this.visible is ')
    },
    handleOperationConfig: function (row, value) {
      alert(value)
    },
    async handleCommand (command) {
      this.dialogObject = {
        form: {}
      }
      this.dialogObject.owner = command.row.owner
      this.dialogObject.form.name = command.row.name
      this.dialogObject.form.entityId = command.row.entityId
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
      this.dialogObject.command = command.command
      if (command.command === 'grantRole') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantRole = ''
        this.dialogObject.title = 'Grant Role a Role'
        obj = this.getSelectData(this.operations.roleConfigList, obj)
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command.command === 'grantToRole') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantToRole = ''
        this.dialogObject.title = 'Grant Role to Role'
        obj.key = 'grantToRole'
        obj = this.getSelectData(this.operations.roleConfigList, obj)
        obj.label = 'Role to receive grant'
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command.command === 'grantToUser') {
        this.dialogObject.description = 'Granting as'
        this.dialogObject.form.grantToUser = ''
        this.dialogObject.title = 'Grant Role to User'
        obj.key = 'grantToUser'
        obj = this.getSelectData(this.usersList, obj)
        obj.label = 'User to receive grant'
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command.command === 'revokeGrantRole') {
        this.dialogObject.description = 'Revoking as'
        this.dialogObject.form.revokeGrantRole = ''
        this.dialogObject.title = 'Revoke Role Granted to Role'
        data[0].label = 'Role to revoke grant from'
        obj.key = 'revokeGrantRole'
        const grantRoleData = await this.services.rolesService.queryGrantRolesList(command.row)
        obj = this.getSelectData(grantRoleData.data, obj)
        obj.label = 'Role to revoke'
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command.command === 'revokeGrantToRole') {
        this.dialogObject.description = 'Revoking as'
        this.dialogObject.form.revokeGrantToRole = ''
        this.dialogObject.title = 'Revoke Grant of Role to Role'
        data[0].label = 'Role to revoke'
        obj.key = 'revokeGrantToRole'
        const grantRoleData = await this.services.rolesService.queryGrantToRolesList(command.row)
        obj = this.getSelectData(grantRoleData.data, obj)
        obj.label = 'Role to revoke grant from'
        data.push(obj)
        this.dialogObject.data = data
      }
      if (command.command === 'revokeGrantUser') {
        this.dialogObject.description = 'Revoking as'
        this.dialogObject.form.revokeGrantUser = ''
        this.dialogObject.title = 'Revoke Grant of Role to User'
        data[0].label = 'Role to revoke'
        obj.key = 'revokeGrantUser'
        const grantUserData = await this.services.rolesService.queryGrantUserList(command.row)
        obj = this.getSelectData(grantUserData.data, obj)
        obj.label = 'User to revoke grant from'
        data.push(obj)
        this.dialogObject.data = data
      }
      this.dialogObjectFormVisible = true
    },
    getSelectData: function (options, obj) {
      obj.options = options
      return obj
    },
    async handleManage (row) {
      this.privilegesForm.privilegeTableData = []
      const grantUserData = await this.services.rolesService.queryManageGlobalPrivileges(this.currentRoleId)
      this.privilegesForm.options = grantUserData.data
      this.privilegesForm.name = row.name
      this.pivilegesFormVisible = true
      this.privilegesForm.entityId = row.entityId
    },
    privilegesChange () {
      for (let i = 0; i < this.privilegesForm.privilegeTableData.length; i++) {
        if (this.privilegesForm.privilegeTableData[i].id === this.privilegesForm.value) {
          return
        }
      }
      for (let i = 0; i < this.privilegesForm.options.length; i++) {
        if (this.privilegesForm.options[i].id === this.privilegesForm.value) {
          this.privilegesForm.privilegeTableData.push(this.privilegesForm.options[i])
          this.privilegesForm.value = ''
          return
        }
      }
    },
    handleRevokeClick (row) {
      for (let i = 0; i < this.privilegesForm.privilegeTableData.length; i++) {
        if (this.privilegesForm.privilegeTableData[i].id === row.id) {
          this.privilegesForm.privilegeTableData.splice(i, 1)
          return
        }
      }
    },
    beforeHandleCommand: function (row, command) {
      return {
        'row': row,
        'command': command
      }
    },
    async dorpRole (row) {
      this.$confirm('Remove the role ' + row.name + ' from the system. Dropped roles cannot be recovered.', 'Drop Role', {
        confirmButtonText: 'commit',
        cancelButtonText: 'cancel',
        type: 'error'
      }).then(() => {
        this.remoteDrop(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        })
      })
    },
    async remoteDrop (row) {
      const data = await this.services.rolesService.dropRole(row.entityId, row.name)
      if (data.success) {
        this.initData()
        this.$message({
          type: 'success',
          message: 'successfully deleted!'
        })
      } else {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        })
      }
    },
    editRole: function (row) {
      this.roleDialogTitle = 'Edit Role'
      this.isEdit = true
      this.ruleForm.label = row.name
      this.ruleForm.name = row.name
      this.ruleForm.comment = row.description
      this.ruleForm.entityId = row.entityId
      this.dialogFormVisible = true
    },
    addRole: function () {
      this.roleDialogTitle = 'New Role'
      this.isEdit = false
      this.ruleForm.label = 'Creating as'
      this.ruleForm.entityId = ''
      this.ruleForm.grantRole = ''
      this.ruleForm.comment = ''
      this.dialogFormVisible = true
    },
    transToDetail: function (role) {
      this.$router.push({
        path: '/vbase/vrolepannel/detail',
        query: {
          id: role.entityId
        },
        name: 'VRoleDetail'
      })
    },
    handleSearchClick () {
      this.searchInputVisible = true
      this.$nextTick(function () {
        this.$refs.searchInputRef.focus()
      })
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
    change () {
      this.$forceUpdate()
    }
  },
  data () {
    return {
      msg: 'ResouceMonitorsPanel',
      tabSwitch: true,
      tableData: [],
      tableCount: 0,
      remoteData: [],
      operations: [],
      roleDialogTitle: 'New Role',
      queryString: '',
      dialogFormVisible: false,
      dialogObjectFormVisible: false,
      searchInputVisible: false,
      searchInputFixed: false,
      pivilegesFormVisible: false,
      privilegesForm: {
        privilegeTableData: []
      },
      isEdit: false,
      usersList: [],
      ruleForm: {
        name: ''
      },
      dialogObject: {
      },
      currentRole: '',
      rules: {
        name: [
          { required: true, message: 'please input role name', trigger: 'blur' },
          { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li:hover,
  li.active {
    background: #ecedee;
    cursor: pointer;
    color: #409EFF;
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
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
