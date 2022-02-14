<template>
  <el-dialog :visible.sync="visibleOrigin"
             :show-close="false"
             center
             width="33%"
             @open="getRoles"
             @close="handleClickCancel">
    <div slot="title">
      <span class="dialog-title">Edit privileges for</span>
      <div class="dialog-sub-title">
        <el-button round
                   size="mini"
                   style="background-color: #f2f2f2; color: #8b8d91; border: none; margin-right: 4px">
          {{ roleRowInfoOrigin.name }}
          <i v-if="roleRowInfoOrigin.grantOption" class="el-icon-share"></i>
        </el-button>
        as <i class="el-icon-user-solid"></i> {{ currentRole }}
      </div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="roleRowInfoOrigin">
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Roles</div>
            <el-form-item>
              <el-select size="medium"
                         placeholder="Add roles"
                         v-model="selectRoleId"
                         @change="handleRoleSelected"
                         style="width: 100%">
                <el-option v-for="(role, index) in roleOptions" :label="role.name"
                           :value="role.id" :key="index">
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
                <div class="grant-font">Revoke</div>
              </div>
              <div class="alignment-horizontal-between" v-for="(obj, index) in roleRowInfoOrigin.roles" :key="index">
                <div>
                  <i class="el-icon-user icon-style"></i>
                  <span>{{ obj.name }}</span>
                </div>
                <div>
                  <el-button v-if="obj.revoke" type="text" class="grant-close-icon" @click="cancelRoleSelected(obj)">
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
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Edit Privileges</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'VEditRole',
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
    editRoleVisible: {
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
      formPrivilege: {
        selectPrivilegeId: '',
        roleSelectedObjs: [],
        grantSwitchOn: false
      },
      selectRoleId: '',
      roleOptions: []
    }
  },
  methods: {
    async getRoles () {
      this.roleOptions = this.roleList
      this.roleOptions = this.roleOptions.map(option => (
        {
          id: option.entityId,
          name: option.name
        }
      ))

      // 把原有的roleRowInfoOrigin中的role过滤掉，select中显示的是还没有选择的role
      if (this.roleRowInfoOrigin.roles.length) {
        let selectedRoleIds = this.roleRowInfoOrigin.roles.map(role => {
          return role.id
        })
        this.roleOptions = this.roleOptions.filter(obj => {
          return selectedRoleIds.indexOf(obj.id) === -1 || obj.id === this.currentRoleId
        })
      }
    },
    handleRoleSelected () {
      let obj = this.roleOptions.filter(option => {
        return option.id === this.selectRoleId
      }).pop()
      this.$set(obj, 'revoke', true)
      this.roleRowInfoOrigin.roles = this.roleRowInfoOrigin.roles.concat(obj)
      // role选项中剩余的项
      this.roleOptions = this.roleOptions.filter(option => {
        return option.id !== this.selectRoleId
      })
      // 清空选择grant后select中显示的内容
      this.selectRoleId = ''
    },
    cancelRoleSelected (val) {
      let notCancelledObjs = this.roleRowInfoOrigin.roles.filter(obj => {
        return obj.id !== val.id
      })
      let cancelledObj = this.roleRowInfoOrigin.roles.filter(obj => {
        return obj.id === val.id
      })
      this.roleRowInfoOrigin.roles = notCancelledObjs
      // 取消后重新添加到选项中
      this.roleOptions = this.roleOptions.concat(cancelledObj)
    },
    async handleClickOk () {
      this.selectRoleId = ''
      this.visibleOrigin = false
      this.$emit('updateDialogGrantVisible', this.visibleOrigin)

      let requestData = {}
      requestData.selectPrivilegeId = this.roleRowInfoOrigin.id
      requestData.id = this.paramId
      requestData.roles = this.roleRowInfoOrigin.roles
      requestData.roles = requestData.roles.map(role => ({
        entityId: role.id,
        name: role.name
      }))

      console.log('==========更新roles==========', requestData)
      if (this.type === 2 || this.type === 3 || this.type === 4) {
        requestData.databaseId = this.dbId
        requestData.type = this.type === 2 ? 'database' : (this.type === 3 ? 'table' : (this.type === 4 ? 'pipe' : ''))
        await this.services.databaseService.editRoles(requestData)
      } else if (this.type === 1) {
        await this.services.warehouseService.editRoles(requestData)
      }
      this.$bus.$emit('updateWarehouseDetail')
    },
    handleClickCancel () {
      this.selectRoleId = ''
      this.visibleOrigin = false
      // 还原数据
      this.roleRowInfoOrigin = JSON.parse(JSON.stringify(this.roleRowInfoOriginCopy))
      this.$emit('updateDialogVisible', this.visibleOrigin)
    }
  },
  computed: {
    ...mapState(['services']),
    ...mapGetters({currentRole: 'getCurrentRole', roleList: 'getRoleList', currentRoleId: 'getCurrentRoleId'})
  },
  watch: {
    editRoleVisible (val) {
      console.log('================visibleOrigin================', val)
      this.visibleOrigin = val
    },
    async roleRowInfo (val) {
      this.roleRowInfoOrigin = JSON.parse(JSON.stringify(val))
      if (this.roleRowInfoOrigin.roles) {
        let responseData = await this.services.warehouseService.isOperable()
        this.roleRowInfoOrigin.roles.map(role => {
          this.$set(role, 'revoke', responseData.data)
          return role
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
