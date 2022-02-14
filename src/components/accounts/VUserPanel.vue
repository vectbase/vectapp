<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-row>
          <el-col :span="12" style="text-align: left">
            <h3>Users</h3>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <h3>
              <el-button size="mini" type="primary" @click="addUserClick" icon="el-icon-plus">User</el-button>
            </h3>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="14" style="text-align: left">
              {{tableCount}} Users
            </el-col>
            <el-col :span="3">
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
              <!--<el-input size="mini" type="text" class="search" placeholder="search Name" clearable v-model.trim="queryString" />-->
            </el-col>
            <el-col :span="3">
              <select-assembly
                v-if="showSelect"
                :select-objects="ownerConfigList"
                id="userNameLableKey"
                :label-key="ownerLabel"
                @handleSelectClose="handleSelectClose"
                @handleSelectChecked="handleSelectChecked"
              >
              </select-assembly>
            </el-col>
            <el-col :span="3">
              <el-dropdown trigger="click" :hide-on-click="false">
                <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                  Status
                  <span style="color: #3f4246"
                        class="icon-style"
                        v-if="statusConfigList[0].checked">
                    {{ showCheckedStatusName }}
                  </span>
                  <span style="color: #085bd7"
                        class="icon-style"
                        v-if="!statusConfigList[0].checked">
                    {{ showCheckedStatusName }}
                  </span>
                  <span style="color: #8b8d91" v-show="showCheckedStatusExtend"> +{{ showCheckedStatusCount - 1 }}</span>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="statusObj in statusConfigList" :key="statusObj.id">
                    <div v-show="showStatusChecked(statusObj)" class="checkedActiveClass" @click="handleStatusChecked(statusObj)">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ statusObj.statusName }}
                    </div>
                    <div v-show="!showStatusChecked(statusObj)" @click="handleStatusChecked(statusObj)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ statusObj.statusName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-col>
            <el-col :span="1">
              <el-button size="mini" icon="el-icon-refresh" style="margin-left: 4px" @click="refreshUserData"></el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            size="mini">
            <el-table-column
              prop="userName"
              label="Name"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="displayName"
              label="DISPLAY NAME"
              sortable
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="status"
              label="STATUS"
              sortable
              min-width="160">
              <template slot-scope="scope">
                <span v-show="scope.row.status === 1">
                  <el-badge class="userStatusSlotStyle" is-dot type="success"></el-badge>Enable
                </span>
                <span v-show="scope.row.status === 2">
                  <el-badge class="userStatusSlotStyle" is-dot></el-badge>Disable
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="lastLogin"
              label="LAST LOGIN"
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
                  <i v-if="scope.row.owner.trim().length > 0" class="el-icon-user-solid">
                    {{scope.row.owner}}
                  </i>
                  <label v-if="scope.row.owner.trim().length === 0">
                    -----
                  </label>
                </el-button>

              </template>
            </el-table-column>
            <el-table-column
              label="operation"
              align="center">
              <template slot-scope="scope">
                <el-popover
                  width="160"
                  trigger="click"
                  id="userStyleConfig"
                  visible-arrow="false">
                  <ul class="list-unstyled components text-secondary">
                    <li v-for="config in operations.operationConfig" v-bind:key="config.value" @click="handleOperationConfig(scope.row, config.value)">
                      <p>{{ config.label }}</p>
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
      <el-dialog :title="ruleForm.title"
                 :visible.sync="dialogFormVisible"
                 :before-close="handleClose" center>
        <div class="relationContainer">
          <span>{{ruleForm.label}}<i class="el-icon-user"></i> {{currentRole}} </span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="User Name" prop="userName">
                <el-input size="mini" v-model="ruleForm.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email" prop="email">
                <el-input size="mini" v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="ruleForm.operationType == 1">
            <el-col :span="12">
              <el-form-item label="Password" prop="password">
                <el-input show-password size="mini" v-model="ruleForm.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Confirm password" prop="confirmPassword">
                <el-input show-password size="mini" v-model="ruleForm.confirmPassword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="Comment (optional)" prop="remark">
                <el-input size="mini" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="ruleForm.operationType == 1">
            <el-col :span="24" style="text-align: left; padding: 0 0 16px 20px;">
              <el-checkbox v-model="ruleForm.type" label="Force user to change password on first time login" name="type"></el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-collapse v-model="ruleForm.activeNames">
              <el-collapse-item title="Advanced User Options" name="1">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Login Name" prop="loginName">
                      <el-input size="mini" v-model="ruleForm.loginName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Display Name" prop="displayName">
                      <el-input size="mini" v-model="ruleForm.displayName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="First Name" prop="firstName">
                      <el-input size="mini" v-model="ruleForm.firstName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Last Name" prop="lastName">
                      <el-input size="mini" v-model="ruleForm.lastName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Default Role" prop="defaultRole">
                      <el-select size="mini" v-model="ruleForm.defaultRole" clearable placeholder="select">
                        <el-option
                          v-for="item in operations.roleConfigList"
                          :key="item.entityId"
                          :label="item.name"
                          :value="item.entityId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Default Warehouse" prop="defaultWarehouse">
                      <el-select size="mini" v-model="ruleForm.defaultWarehouse" clearable placeholder="select">
                        <el-option
                          v-for="item in operations.wareHouseConfigList"
                          :key="item.name"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Default Namespace" prop="defaultNamespace">
                      <el-input size="mini" v-model="ruleForm.defaultNamespace" placeholder="<db_name>.<schema_name>"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-row>
          <el-row style="margin-top: 20px; text-align: center;">
            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">submit</el-button>
            <el-button size="mini" @click="resetForm('ruleForm')">reset</el-button>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog title="Change User Password" width="30%" :visible.sync="changePasswordDialogFormVisible" center>
        <div class="relationContainer">
          <span>{{ruleForm.label}}<i class="el-icon-user"></i> {{currentRole}} </span>
        </div>
        <el-form :model="ruleForm" :rules="resetPassWordRules" ref="ruleForm">
          <el-form-item label="Name" prop="userName" style="margin-bottom: 0px">
            <el-input :disabled="true" size="mini" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password" style="margin-bottom: 0px">
            <el-input size="mini" show-password v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="confirmPassword" prop="confirmPassword" style="margin-bottom: 0px">
            <el-input size="mini" show-password v-model="ruleForm.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">submit</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">reset</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Grant User a Role" width="30%" :visible.sync="changeRoleDialogFormVisible" center>
        <div class="relationContainer">
          <span>{{ruleForm.label}}<i class="el-icon-user"></i> {{currentRole}} </span>
        </div>
        <el-form :model="ruleForm" :rules="grantRoleRules">
          <el-form-item label="User to receive grant" prop="userName" style="margin-bottom: 0px">
            <el-input :disabled="true" size="mini" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Role to grant" prop="defaultRole" style="margin-bottom: 0px">
            <el-select style="width:100%" size="mini" v-model="ruleForm.grantRoleEntityId" clearable placeholder="select">
              <el-option
                v-for="item in operations.roleConfigList"
                :key="item.entityId"
                :label="item.name"
                :value="item.entityId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="grantToUser()">submit</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">reset</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {selectAssemblyJs} from './assembly/select-assembly'
import { mapState, mapGetters } from 'vuex'
import {JSEncrypt} from 'jsencrypt'
const SelectAssembly = () => import('./assembly/SelectAssembly')
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'VUsersPanel',
  components: {SelectAssembly},
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
  methods: {
    async initUsersData () {
      this.remoteData = await this.services.usersService.queryUsersList()
      this.tableData = this.remoteData.data
      this.tableCount = this.tableData.length
      this.operations = await this.services.usersService.queryUsersOperationConfigs()
      this.remoteRoleData = await this.services.rolesService.queryRolesList()
      this.operations.roleConfigList = this.remoteRoleData.data.roleList
      this.operations.wareHouseConfigList = await this.services.usersService.wareHouseList()
      let roleList = this.roleList.filter(roleObj => {
        return roleObj.entityId === this.currentRoleId
      })
      if (roleList) {
        this.currentRole = roleList.pop().name
      }
      this.ownerConfigList = JSON.parse(JSON.stringify(this.operations.ownerConfigList))
      this.showSelect = true
    },
    change () {
      this.$forceUpdate()
    },
    handleSelectClose (labelKey) {
      selectAssemblyJs.handleSelectClose(this.ownerConfigList, this.ownerValue)
      this.change()
      this.querySearchAsync()
    },
    handleSelectChecked (selectObj, labelKey) {
      selectAssemblyJs.commonHandleChecked(this.ownerConfigList, this.ownerValue, selectObj)
      this.change()
      this.querySearchAsync()
    },
    async refreshUserData () {
      this.remoteData = await this.services.usersService.queryUsersList()
      this.querySearchAsync()
    },
    querySearchAsync () {
      this.tableData = this.remoteData.data
      if ((this.queryString !== undefined && this.queryString.length > 0) || this.ownerValue.length > 0 || this.statusValue.length > 0) {
        var queryStringNew = this.queryString
        if (queryStringNew.length > 0) {
          this.tableData = this.tableData.filter(function (item) {
            if (item.userName.toString().indexOf(queryStringNew) > -1) {
              return item
            }
          })
        }
        if (this.ownerValue.length > 0) {
          if (this.ownerValue[0] !== 0) {
            var ownerValueList = this.ownerValue
            this.tableData = this.tableData.filter(function (item) {
              console.log('statusValue indexof is' + ownerValueList.indexOf(item.owner.toString()))
              if (ownerValueList.indexOf(item.owner.toString()) >= 0) {
                return item
              }
            })
          }
        }
        if (this.statusValue.length > 0) {
          if (this.statusValue[0] !== 0) {
            var statusValueNew = this.statusValue
            this.tableData = this.tableData.filter(function (item) {
              console.log('statusValue indexof is' + statusValueNew.indexOf(item.status.toString()))
              if (statusValueNew.indexOf(item.status.toString()) >= 0) {
                return item
              }
            })
          }
        }
      }
      this.tableCount = this.tableData.length
    },
    async grantToUser () {
      const data = {}
      data.command = 'grantToUser'
      data.name = 'grant to user'
      data.selectEntityId = this.ruleForm.grantRoleEntityId
      data.entityId = this.ruleForm.entityId
      this.changeRoleDialogFormVisible = false
      let result = await this.services.rolesService.operation(data)
      if (result.code === 200) {
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
    async submitForm (formName) {
      if (this.changePasswordDialogFormVisible || (this.dialogFormVisible && this.ruleForm.operationType === 1)) {
        if (this.ruleForm.password !== this.ruleForm.confirmPassword) {
          this.$message({
            type: 'info',
            message: 'this password must same as confirm password'
          })
          return false
        }
        let {code, data} = await this.services.loginService.password()
        if (code === 200 && data) {
          let [[time, pubKey]] = Object.entries(data)
          console.log(pubKey)
          const encrypt = new JSEncrypt()
          encrypt.setPublicKey(pubKey)
          this.paramsForm = JSON.parse(JSON.stringify(this.ruleForm))
          this.paramsForm.password = encrypt.encrypt(time + this.ruleForm.password)
          this.paramsForm.confirmPassword = this.paramsForm.password
        } else {
          this.$message({
            type: 'info',
            message: 'Operation failed, please try again'
          })
          return false
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addUser () {
      const responseResult = await this.services.usersService.addUser(this.paramsForm)
      if (responseResult.success) {
        this.initUsersData()
        this.$message({
          type: 'success',
          message: 'add success!'
        })
      } else {
        this.$message({
          type: 'info',
          message: responseResult.msg
        })
      }
      this.ruleForm.operationType = 1
    },
    addUserClick () {
      this.clearAddUserData()
      this.dialogFormVisible = true
    },
    handleClose () {
      this.dialogFormVisible = false
      this.clearAddUserData()
    },
    clearAddUserData () {
      this.ruleForm = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        optional: '',
        type: true,
        resource: '',
        desc: '',
        activeNames: '',
        loginName: '',
        displayName: '',
        firstName: '',
        lastName: '',
        defaultRole: '',
        defaultWarehouse: '',
        defaultNamespace: '',
        operationType: 1,
        entityId: '',
        title: 'New User',
        label: 'Creating as'
      }
    },
    resetForm (formName) {
      this.ruleForm.operationType = 1
      this.$refs[formName].resetFields()
    },
    handleOperationConfig: function (row, value) {
      console.log(row)
      this.visible = false
      this.ruleForm.label = row.userName
      // 编辑
      if (value === 1) {
        this.ruleForm = row
        this.ruleForm.activeNames = '1'
        this.ruleForm.operationType = 2
        this.dialogFormVisible = true
        this.ruleForm.title = 'Edit User'
      }
      // 重置密码
      if (value === 2) {
        this.ruleForm.userName = row.userName
        this.changePasswordDialogFormVisible = true
      }
      // 禁用
      if (value === 3) {
        this.$confirm('Are you sure you want to disable user ' + row.userName + '?', 'Disable User', {
          confirmButtonText: 'submit',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          this.ruleForm.status = 3
          this.addUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Undisabled'
          })
        })
      }
      // 删除
      if (value === 4) {
        this.$confirm('Remove the user ' + row.userName + ' from the system. Dropped users cannot be recovered.', 'Drop User', {
          confirmButtonText: 'submit',
          cancelButtonText: 'cancel',
          type: 'error'
        }).then(() => {
          this.ruleForm.status = 2
          this.addUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted'
          })
        })
      }
      // 授权
      if (value === 5) {
        this.ruleForm.userName = row.userName
        this.ruleForm.entityId = row.entityId
        this.changeRoleDialogFormVisible = true
      }
      // 取消授权
      if (value === 6) {
        alert('点击报错')
      }
    },
    showOperationConfig: function () {
      console.log('this.visible is ' + this.visible)
    },
    transToDetail: function (user) {
      this.$router.push({
        path: '/vbase/vuserpannel/detail',
        query: {
          id: user.entityId
        },
        name: 'VUserDetail'
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
    showStatusChecked (statusObj) {
      if (statusObj.id === 0) {
        return statusObj.checked
      } else {
        return !this.statusConfigList[0].checked && statusObj.checked
      }
    },
    handleStatusChecked (statusObj) {
      if (statusObj.id === 0) {
        // statusObj.checked = true
        this.statusConfigList.forEach(status => {
          status.checked = true
        })
      } else {
        if (this.isStatusSelectedAll()) {
          this.statusConfigList.forEach(status => {
            status.checked = false
          })
          statusObj.checked = true
        } else {
          statusObj.checked = !statusObj.checked
          if (this.isStatusSelectedAll() || this.isStatusSelectedNone()) {
            this.statusConfigList.forEach(status => {
              status.checked = true
            })
          }
        }
      }
      let filterStatus = this.statusConfigList.filter(statusObj => statusObj.checked)
      let filterStatusArray = []
      filterStatus.forEach(statusObj => filterStatusArray.push(statusObj.label))
      this.statusValue = filterStatusArray
      this.querySearchAsync()
    },
    isStatusSelectedAll () {
      return this.statusConfigList.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === this.statusConfigList.length - 1
    },
    isStatusSelectedNone () {
      return this.statusConfigList.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === 0
    }
  },
  data () {
    let checkPassword = (rule, value, callback) => {
      const passReg = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{8,}$/
      if (!passReg.test(value)) {
        callback(new Error('Your password must be at least 8 characters long and contain a number, uppercase, and lowercase letters.'))
      } else {
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      const emailReg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailReg.test(value)) {
        callback(new Error('email is not valid email'))
      } else {
        callback()
      }
    }
    return {
      msg: 'ResouceMonitorsPanel',
      queryString: '',
      remoteData: [],
      tableData: [],
      tableCount: 0,
      operations: {},
      searchInputVisible: false,
      searchInputFixed: false,
      currentRole: '',
      ruleForm: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        optional: '',
        type: true,
        resource: '',
        desc: '',
        activeNames: '',
        loginName: '',
        displayName: '',
        firstName: '',
        lastName: '',
        defaultRole: '',
        defaultWarehouse: '',
        defaultNamespace: '',
        operationType: 1,
        entityId: '',
        label: 'Creating as ',
        title: 'New User'
      },
      paramsForm: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        optional: '',
        type: true,
        resource: '',
        desc: '',
        activeNames: '',
        loginName: '',
        displayName: '',
        firstName: '',
        lastName: '',
        defaultRole: '',
        defaultWarehouse: '',
        defaultNamespace: '',
        operationType: 1,
        entityId: '',
        label: 'Creating as ',
        title: 'New User'
      },
      resetPasswordForm: {
        userName: '',
        password: '',
        confirmPassword: ''
      },
      showSelect: false,
      ownerValue: [],
      statusValue: [],
      grantRoleRules: {
        userName: [
          { required: true, message: 'Please enter the user name', trigger: 'blur' },
          { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }
        ],
        defaultRole: [
          { required: true, message: 'Please enter the email', trigger: 'blur' }
        ]
      },
      rules: {
        userName: [
          { required: true, message: 'Please enter the user name', trigger: 'blur' },
          { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter the email', trigger: 'blur' },
          {validator: checkEmail, trigger: ['blur', 'change']}
        ],
        password: [
          { required: true, message: 'Please enter the password', trigger: 'blur' },
          {validator: checkPassword, trigger: ['blur', 'change']}
        ],
        confirmPassword: [
          { required: true, message: 'Please enter confirm password', trigger: 'blur' },
          {validator: checkPassword, trigger: ['blur', 'change']}
        ]
      },
      resetPassWordRules: {
        password: [
          { required: true, message: 'Please enter the password', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Please enter confirm password', trigger: 'blur' }
        ]
      },
      changePasswordRules: {
        userName: [
          { required: true, message: 'Please enter the user name', trigger: 'blur' },
          { min: 3, max: 20, message: '3 to 20 characters in length', trigger: 'blur' }
        ],
        password: [
          { type: 'date', required: true, message: 'Please enter the password', trigger: 'blur' },
          {validator: checkPassword, trigger: ['blur', 'change']}
        ],
        confirmPassword: [
          { type: 'date', required: true, message: 'Please enter confirm password', trigger: 'blur' },
          {validator: checkPassword, trigger: ['blur', 'change']}
        ]
      },
      dialogFormVisible: false,
      changePasswordDialogFormVisible: false,
      changeRoleDialogFormVisible: false,
      visible: false,
      ownerLabel: 'Owner',
      ownerConfigList: [],
      statusConfigList: [
        {
          id: 0,
          statusName: 'All',
          value: 'All',
          label: 'all',
          checked: true
        }, {
          id: 1,
          statusName: 'Enabled',
          value: 'Enabled',
          label: '1',
          checked: true
        }, {
          id: 2,
          value: 'Disabled',
          statusName: 'Disabled',
          label: '2',
          checked: true
        }
      ]
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'}),

    showCheckedStatusName () {
      const statusFilters = this.statusConfigList.filter(statusObj => {
        return statusObj.checked === true
      })
      return statusFilters[0].statusName
    },
    showCheckedStatusCount () {
      const statusFilters = this.statusConfigList.filter(statusObj => {
        return statusObj.checked === true
      })
      return statusFilters.length
    },
    showCheckedStatusExtend () {
      return this.showCheckedStatusCount - 1 > 0 && this.statusConfigList[0].checked === false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .userStatusSlotStyle {
    top: .4em;
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
  .filtrate-button {
    border-radius: 8px;
    color: #3f4246;
    font-weight: 550;
    margin-right: 4px;
    margin-left: 4px;
    font-size: 12px;
  }
  .icon-style {
    margin-right: 4px;
  }
  .checkedActiveClass {
    color: #085bd7
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
