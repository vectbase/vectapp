<template>
  <el-dialog :visible.sync="visibleOrigin"
             :show-close="false"
             center
             width="33%"
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
            <div style="margin-bottom: 10px">Role</div>
            <el-form-item>
              <el-select size="medium"
                         placeholder="Select role"
                         v-model="formPrivilege.selectRoleId"
                         style="width: 100%"
                         @change="handleRoleSelected">
                <el-option
                  v-for="(role, index) in roleList"
                  :label="role.name"
                  :value="role.entityId"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Privileges</div>
            <el-form-item>
              <el-select v-show="formPrivilege.selectRoleId"
                         size="medium"
                         placeholder="Select privileges"
                         v-model="selectPrivilegeId"
                         @change="handlePrivilegeSelected"
                         style="width: 100%">
                <el-option v-for="(privilege, index) in privilegeOptions" :label="privilege.name"
                           :value="privilege.id" :key="index">
                </el-option>
              </el-select>
              <el-select v-show="!formPrivilege.selectRoleId"
                         size="medium"
                         placeholder="Select privileges"
                         v-model="selectPrivilegeId"
                         disabled
                         style="width: 100%">
                <el-option v-for="(privilege, index) in privilegeOptions" :label="privilege.name"
                           :value="privilege.id" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="formPrivilege.privileges.length">
          <el-col :span="23">
            <el-form-item>
              <div class="alignment-horizontal-between">
                <div class="grant-font">Name</div>
                <div>
                  <span class="grant-font">Grant option
                    <el-tooltip effect="dark" content="Allows roles with this privilege to grant it to other roles"
                                placement="top">
                      <i class="el-icon-question icon-style"></i>
                    </el-tooltip>
                  </span>
                  <span class="grant-font">Remove</span>
                </div>
              </div>
              <div class="alignment-horizontal-between" v-for="(obj, index) in formPrivilege.privileges"
                   :key="index">
                <div>
                  <el-button round
                             size="mini"
                             style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
                    {{ obj.name }}
                    <i v-if="obj.grantOption" class="el-icon-right"></i>
                  </el-button>
                </div>
                <div>
                  <el-checkbox v-model="obj.grantOption"></el-checkbox>
                  <el-button type="text" class="grant-close-icon" @click="cancelPrivilegeSelected(obj)">
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
  name: 'VGrantPrivilege',
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
    grantPrivilegeVisible: {
      type: Boolean,
      default: false
    },
    rolesData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visibleOrigin: false,
      formPrivilege: {
        id: '',
        selectRoleId: '',
        privileges: []
      },
      selectPrivilegeId: '',
      privilegeOptions: [],
      grantOptionChecked: false
    }
  },
  methods: {
    async handleRoleSelected () {
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

      console.log('=============this.paramId --> warehouse id=============', this.paramId)

      // 根据选中的roleId获取外层的roleRow
      /* let roleRow = []
      if (this.rolesData) {
        roleRow = this.rolesData.filter(role => {
          return role.id === roleId
        })
      }

      let privilegeIds = []
      if (roleRow.length) {
        let privileges = roleRow.pop().privileges
        if (privileges.length) {
          privilegeIds = privileges.map(pri => {
            return pri.id
          })
        }
      }

      console.log('========privilegeIds========', privilegeIds)
      this.privilegeOptions = this.privilegeOptions.filter(obj => {
        return privilegeIds.indexOf(obj.id) === -1
      }) */
    },
    handlePrivilegeSelected () {
      let obj = this.privilegeOptions.filter(privilegeObj => {
        return privilegeObj.id === this.selectPrivilegeId
      }).pop()
      // 给选中的值添加grantOption属性
      this.$set(obj, 'grantOption', false)
      this.formPrivilege.privileges = this.formPrivilege.privileges.concat(obj)
      // privilege选项中剩余的项
      this.privilegeOptions = this.privilegeOptions.filter(privilegeObj => {
        return privilegeObj.id !== this.selectPrivilegeId
      })
      // 清空选择privilege后select中显示的内容
      this.selectPrivilegeId = ''
    },
    cancelPrivilegeSelected (val) {
      let notCancelledObjs = this.formPrivilege.privileges.filter(obj => {
        return obj.id !== val.id
      })
      let cancelledObj = this.formPrivilege.privileges.filter(obj => {
        return obj.id === val.id
      })
      this.formPrivilege.privileges = notCancelledObjs
      // 取消后重新添加到选项中
      this.privilegeOptions = this.privilegeOptions.concat(cancelledObj)
      // 取消复选框选中状态
      val.grantOption = false
    },
    async handleClickOk () {
      this.selectRoleId = ''
      this.visibleOrigin = false
      this.$emit('updateDialogVisible', this.visibleOrigin)
      console.log('==========添加privileges==========', JSON.stringify(this.formPrivilege))
      console.log('==========添加privileges==========selectRoleId', this.formPrivilege.selectRoleId)
      console.log('==========添加privileges==========privileges', this.formPrivilege.privileges)
      if (this.type === 2 || this.type === 3 || this.type === 4) {
        this.formPrivilege.databaseId = this.dbId
        this.formPrivilege.type = this.type === 2 ? 'database' : (this.type === 3 ? 'table' : (this.type === 4 ? 'pipe' : ''))
        await this.services.databaseService.grantPrivilege(this.formPrivilege)
      } else if (this.type === 1) {
        await this.services.warehouseService.grantPrivileges(JSON.stringify(this.formPrivilege))
      }
      this.$bus.$emit('updateWarehouseDetail')
    },
    handleClickCancel () {
      this.formPrivilege.selectRoleId = ''
      this.formPrivilege.privileges = []
      this.selectPrivilegeId = ''
      this.visibleOrigin = false
      // 还原数据
      // this.privilegeOptions = this.privilegeList
      this.$emit('updateDialogVisible', this.visibleOrigin)
    }
  },
  computed: {
    ...mapState(['services']),
    ...mapGetters({currentRole: 'getCurrentRole', roleList: 'getRoleList'})
  },
  watch: {
    paramId (val) {
      this.formPrivilege.id = val
    },
    grantPrivilegeVisible (val) {
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

.alignment-horizontal-between {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
