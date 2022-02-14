<template>
  <el-dialog :visible.sync="visibleOrigin"
             :show-close="false"
             center
             width="33%"
             @open="getPrivileges"
             @close="handleClickCancel">
    <div slot="title">
      <span class="dialog-title">Edit privileges for</span>
      <div class="dialog-sub-title"><i class="el-icon-user-solid"></i> {{ roleRowInfoOrigin.name }} as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="roleRowInfoOrigin">
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Privileges</div>
            <el-form-item>
              <el-select size="medium"
                         placeholder="Add privileges"
                         v-model="selectPrivilegeId"
                         @change="handlePrivilegeSelected"
                         style="width: 100%">
                <el-option v-for="(privilege, index) in privilegeOptions" :label="privilege.name"
                           :value="privilege.id" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="23">
            <el-form-item>
              <div class="alignment-horizontal-between">
                <div class="grant-font">Name</div>
                <div>
                  <span class="grant-font">Grant option
                    <el-tooltip effect="dark" content="Allows roles with this privilege to grant it to other roles" placement="top">
                      <i class="el-icon-question icon-style"></i>
                    </el-tooltip>
                  </span>
                  <span class="grant-font">Revoke</span>
                </div>
              </div>
              <div class="alignment-horizontal-between" v-for="(obj, index) in roleRowInfoOrigin.privileges" :key="index">
                <div>
                  <el-button round
                             size="mini"
                             style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
                    {{ obj.name }}
                    <i v-if="obj.grantOption" class="el-icon-share"></i>
                  </el-button>
                </div>
                <div>
                  <el-checkbox v-model="obj.grantOption" v-if="obj.revoke"></el-checkbox>
                  <el-checkbox v-model="obj.grantOption" style="margin-right: 108px" v-if="!obj.revoke"></el-checkbox>
                  <el-button v-if="obj.revoke" type="text" class="grant-close-icon" @click="cancelPrivilegeSelected(obj)">
                    <i class="el-icon-close"></i>
                  </el-button>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="15" :offset="8">
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Update Privileges</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'VEditPrivilege',
  props: {
    paramId: {
      type: String,
      default: () => ''
    },
    dbId: {
      type: String,
      default: () => ''
    },
    type: {
      type: Number,
      default: () => 0
    },
    editPrivilegeVisible: {
      type: Boolean,
      default: false
    },
    roleRowInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visibleOrigin: false,
      roleRowInfoOrigin: {},
      roleRowInfoOriginCopy: {},
      selectPrivilegeId: '',
      privilegeOptions: [],
      grantOptionChecked: false
    }
  },
  methods: {
    async getPrivileges () {
      // 获取当前用户所有权限的对象列表
      let responseData
      if (this.type === 2 || this.type === 3 || this.type === 4) {
        let databaseReq = {
          id: this.paramId,
          databaseId: this.dbId,
          type: this.type === 2 ? 'database' : (this.type === 3 ? 'table' : (this.type === 4 ? 'pipe' : ''))
        }
        responseData = await this.services.databaseService.privilegeList(databaseReq)
      } else if (this.type === 1) {
        responseData = await this.services.warehouseService.privilegeListById(this.paramId)
      }
      this.privilegeOptions = responseData.data

      // 把原有的roleRowInfoOrigin中的privilege过滤掉，select中显示的是还没有选择的privilege
      if (this.roleRowInfoOrigin.privileges.length) {
        let selectedPriIds = this.roleRowInfoOrigin.privileges.map(pri => {
          return pri.id
        })
        this.privilegeOptions = this.privilegeOptions.filter(obj => {
          return selectedPriIds.indexOf(obj.id) === -1
        })
      }

      // 给option选项添加grantOption属性
      this.privilegeOptions.map(option => {
        this.$set(option, 'grantOption', false)
        return option
      })
    },
    handlePrivilegeSelected () {
      let obj = this.privilegeOptions.filter(option => {
        return option.id === this.selectPrivilegeId
      }).pop()
      this.$set(obj, 'revoke', true)
      this.roleRowInfoOrigin.privileges = this.roleRowInfoOrigin.privileges.concat(obj)
      // privilege选项中剩余的项
      this.privilegeOptions = this.privilegeOptions.filter(option => {
        return option.id !== this.selectPrivilegeId
      })
      // 清空选择grant后select中显示的内容
      this.selectPrivilegeId = ''
    },
    cancelPrivilegeSelected (val) {
      let notCancelledObjs = this.roleRowInfoOrigin.privileges.filter(obj => {
        return obj.id !== val.id
      })
      let cancelledObj = this.roleRowInfoOrigin.privileges.filter(obj => {
        /* if (obj.id === val.id) {
          // this.$set(obj, 'revoke', false)
          return true
        } else {
          return false
        } */
        return obj.id === val.id
      })
      this.roleRowInfoOrigin.privileges = notCancelledObjs
      // 取消后重新添加到选项中
      this.privilegeOptions = this.privilegeOptions.concat(cancelledObj)
      // 取消复选框选中状态
      val.grantOption = false
    },
    async handleClickOk () {
      this.selectPrivilegeId = ''
      this.visibleOrigin = false
      this.$emit('updateDialogGrantVisible', this.visibleOrigin)

      let requestData = {}
      requestData.selectRoleId = this.roleRowInfoOrigin.id
      requestData.id = this.paramId
      requestData.privileges = this.roleRowInfoOrigin.privileges
      console.log('==========更新privileges==========', requestData)

      if (this.type === 2 || this.type === 3 || this.type === 4) {
        requestData.databaseId = this.dbId
        requestData.type = this.type === 2 ? 'database' : (this.type === 3 ? 'table' : (this.type === 4 ? 'pipe' : ''))
        await this.services.databaseService.editPrivileges(requestData)
      } else if (this.type === 1) {
        await this.services.warehouseService.editPrivileges(requestData)
      }
      this.$bus.$emit('updateWarehouseDetail')
    },
    handleClickCancel () {
      this.selectPrivilegeId = ''
      this.visibleOrigin = false
      // 还原数据
      this.roleRowInfoOrigin = JSON.parse(JSON.stringify(this.roleRowInfoOriginCopy))
      this.$emit('updateDialogVisible', this.visibleOrigin)
    }
  },
  computed: {
    ...mapState(['services']),
    ...mapGetters({currentRole: 'getCurrentRole', roleList: 'getRoleList'})
  },
  watch: {
    editPrivilegeVisible (val) {
      console.log('================visibleOrigin================', val)
      this.visibleOrigin = val
    },
    async roleRowInfo (val) {
      this.roleRowInfoOrigin = JSON.parse(JSON.stringify(val))
      if (this.roleRowInfoOrigin.privileges) {
        let responseData = await this.services.warehouseService.isOperable()
        this.roleRowInfoOrigin.privileges.map(pri => {
          this.$set(pri, 'revoke', responseData.data)
          return pri
        })
      }
      this.roleRowInfoOriginCopy = JSON.parse(JSON.stringify(this.roleRowInfoOrigin))
    }
  }
}
</script>

<style scoped>
.dialog-title {
  font-size: 18px;
  color: #2c2f34;
  font-weight: 700;
}

.dialog-sub-title {
  font-size: 12px;
  color: #8b8d91;
  font-weight: 400;
  margin-top: 8px;
}

.dialog-div {
  max-height: 60vh;
  overflow: auto;
  margin-left: 20px;
}

.icon-style {
  margin-right: 10px;
}

.grant-font {
  color: #65676c;
  font-size: 12px;
}

.grant-close-icon {
  color: #65676c;
  margin-right: 18px;
  margin-left: 70px;
}

.query-filters-button-left {
  font-size: 14px;
  border-radius: 8px;
  margin-right: 10px;
  float: right;
}

.query-filters-button-right {
  font-size: 14px;
  color: #ffffff;
  border-radius: 8px;
  background-color: #1a6ce7;
  float: right;
}

.alignment-horizontal-between  {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1a6ce7;
  border-color: #1a6ce7;
}
</style>
