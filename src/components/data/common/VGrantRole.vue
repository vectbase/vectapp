<template>
  <el-dialog :visible.sync="visibleOrigin"
             :show-close="false"
             center
             width="33%"
             @open="getPrivileges"
             @close="handleClickCancel">
    <div slot="title">
      <span class="dialog-title">Grant new privileges on</span>
      <!--<div class="dialog-sub-title"><i class="el-icon-c-scale-to-original"></i> {{ subhead }} as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>-->
      <div class="dialog-sub-title">
        <slot name="subhead"></slot>
        as <i class="el-icon-user-solid"></i> {{ currentRole }}
      </div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formPrivilege">
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Privilege</div>
            <el-form-item>
              <el-select size="medium"
                         placeholder="Select privilege"
                         v-model="formPrivilege.selectPrivilegeId"
                         @change="handlePrivilegeSelected"
                         style="width: 100%">
                <el-option v-for="(privilege, index) in privilegeOptions" :label="privilege.name"
                           :value="privilege.id" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formPrivilege.selectPrivilegeId">
          <el-col :span="18">
            <span>
              Grant option
              <div class="dialog-row-label-desc-span">
                Allows roles with this privilege to grant it to other roles
              </div>
            </span>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-switch
                v-model="formPrivilege.grantOption"
                active-color="#1a6ce7"
                inactive-color="#cccdd0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Roles</div>
            <el-form-item>
              <el-select v-show="formPrivilege.selectPrivilegeId"
                         size="medium"
                         placeholder="Select roles"
                         v-model="selectRoleId"
                         @change="handleRoleSelected"
                         style="width: 100%">
                <el-option v-for="(role, index) in roleOptions" :label="role.name"
                           :value="role.entityId" :key="index">
                </el-option>
              </el-select>
              <el-select v-show="!formPrivilege.selectPrivilegeId"
                         size="medium"
                         placeholder="Select privileges"
                         v-model="selectRoleId"
                         disabled
                         style="width: 100%">
                <el-option v-for="(role, index) in roleOptions" :label="role.name"
                           :value="role.entityId" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formPrivilege.roles.length">
          <el-col :span="23">
            <el-form-item>
              <div class="alignment-horizontal-between">
                <div class="grant-font">Name</div>
                <div class="grant-font">Remove</div>
              </div>
              <div class="alignment-horizontal-between" v-for="(obj, index) in formPrivilege.roles" :key="index">
                <div>
                  <i class="el-icon-user icon-style"></i>
                  <span>{{ obj.name }}</span>
                </div>
                <div>
                  <el-button type="text" class="grant-close-icon" @click="cancelRoleSelected(obj)">
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
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Grant Privileges</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'VGrantRole',
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
    subhead: {
      type: String,
      default: () => ''
    },
    grantRoleVisible: {
      type: Boolean,
      default: false
    },
    privilegesData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visibleOrigin: false,
      formPrivilege: {
        id: '',
        selectPrivilegeId: '',
        grantOption: false,
        roles: []
      },
      selectRoleId: '',
      privilegeOptions: [],
      roleOptions: []
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
    },
    handlePrivilegeSelected (privilegeId) {
      /* let roleRow = []
      if (this.privilegesData) {
        roleRow = this.privilegesData.filter(privilege => {
          return privilege.id === privilegeId
        })
      }

      let roleIds = []
      if (roleRow.length) {
        let roles = roleRow.pop().roles
        if (roles.length) {
          roleIds = roles.map(role => {
            return role.id
          })
        }
      }

      console.log('========roleIds========', roleIds)
      this.roleOptions = this.roleList.filter(obj => {
        return roleIds.indexOf(obj.entityId) === -1
      })
      console.log('========this.roleOptions========', this.roleOptions) */
      this.roleOptions = this.roleList
    },
    async handleRoleSelected () {
      let obj = this.roleOptions.filter(roleObj => {
        return roleObj.entityId === this.selectRoleId
      }).pop()
      this.formPrivilege.roles = this.formPrivilege.roles.concat(obj)
      // role选项中剩余的项
      this.roleOptions = this.roleOptions.filter(roleObj => {
        return roleObj.entityId !== this.selectRoleId
      })
      // 清空选择grant后select中显示的内容
      this.selectRoleId = ''
    },
    cancelRoleSelected (val) {
      let notCancelledObjs = this.formPrivilege.roles.filter(obj => {
        return obj.entityId !== val.entityId
      })
      let cancelledObj = this.formPrivilege.roles.filter(obj => {
        return obj.entityId === val.entityId
      })
      this.formPrivilege.roles = notCancelledObjs
      // 取消后重新添加到选项中
      this.roleOptions = this.roleOptions.concat(cancelledObj)
    },
    async handleClickOk () {
      this.selectRoleId = ''
      this.visibleOrigin = false
      this.$emit('updateDialogVisible', this.visibleOrigin)
      console.log('==========添加roles==========', JSON.stringify(this.formPrivilege))
      console.log('==========添加roles==========selectPrivilegeId', this.formPrivilege.selectPrivilegeId)
      console.log('==========添加roles==========grantOption', this.formPrivilege.grantOption)
      console.log('==========添加roles==========roles', this.formPrivilege.roles)
      if (this.type === 2 || this.type === 3 || this.type === 4) {
        this.formPrivilege.databaseId = this.dbId
        this.formPrivilege.type = this.type === 2 ? 'database' : (this.type === 3 ? 'table' : (this.type === 4 ? 'pipe' : ''))
        await this.services.databaseService.grantRoles(this.formPrivilege)
      } else if (this.type === 1) {
        await this.services.warehouseService.grantRoles(JSON.stringify(this.formPrivilege))
      }
      this.$bus.$emit('updateWarehouseDetail')
    },
    handleClickCancel () {
      this.formPrivilege.selectPrivilegeId = ''
      this.formPrivilege.roles = []
      this.formPrivilege.grantOption = false
      this.selectRoleId = ''
      this.visibleOrigin = false
      this.$emit('updateDialogVisible', this.visibleOrigin)
    }
  },
  computed: {
    ...mapState(['services']),
    ...mapGetters({currentRole: 'getCurrentRole', roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'})
  },
  watch: {
    paramId (val) {
      this.formPrivilege.id = val
    },
    grantRoleVisible (val) {
      console.log('================visibleOrigin================', val)
      this.visibleOrigin = val
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
  margin-right: 4px;
}

.dialog-row-label-desc-span {
  color: #65676c;
  font-size: 12px;
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
