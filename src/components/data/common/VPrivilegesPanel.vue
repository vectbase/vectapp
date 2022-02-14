<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div style="font-weight: 700; font-size: 20px; color: #2c2f34">Privileges</div>
      </el-col>
      <el-col :span="12">
        <div style="float: right">
          <el-select size="mini" v-model="groupIndex" style="width: 150px; border-radius: 8px">
            <el-option v-for="(item, index) in privilegeOptions" :label="item"
                       :value="index" :key="index">
            </el-option>
          </el-select>
          <el-button size="mini" class="filtrate-button" @click="handleAddPrivilege">
            <i class="el-icon-plus icon-style"></i>
            Privilege
          </el-button>
        </div>
      </el-col>
    </el-row>

    <hr style="margin-bottom: 1px; border: none"/>
    <el-table
      :data="rolesData"
      :show-header=false
      v-show="groupIndex === 0"
      @row-click="editRole"
      style="width: 100%; margin-left: -12px">
      <el-table-column
        prop="rolesData.name"
        label=""
        width="350">
        <template slot-scope="scope">
          <i class="el-icon-user icon-style"></i>
          <span>{{ scope.row.name }}</span>
          <span v-if="scope.row.id === currentRoleId" style="color: #aeb0b3; margin-right: 50px">(Current Role)</span>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        min-width="350">
        <template slot-scope="scope">
          <span v-for="(data, index) in scope.row.privileges" :key="index">
            <span v-if="data.inherited">
              <el-popover trigger="hover" :open-delay="600" placement="bottom-start" :visible-arrow="false">
                <div style="margin: 6px 10px;">
                  <div>Inherited from:</div>
                  <div style="margin-top: 10px">
                    <i class="el-icon-user icon-style"></i>
                    <span style="color: #2C2F34">{{ data.inherited }}</span>
                  </div>
                </div>
                <el-button round
                           size="mini"
                           slot="reference"
                           v-if="data.name === 'OWNERSHIP'"
                           style="background-color: #0c0c0c; color: #fafafa; margin-right: 4px">
                  <i class="el-icon-right icon-style"></i>
                  <i class="el-icon-key icon-style icon-key"></i>
                  {{ data.name }}
                </el-button>
                <el-button round
                           size="mini"
                           slot="reference"
                           v-if="data.name !== 'OWNERSHIP'"
                           style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
                  <i class="el-icon-right icon-style"></i>
                  {{ data.name }}
                  <i v-if="data.grantOption" class="el-icon-share"></i>
                </el-button>
              </el-popover>
            </span>

            <span v-if="!data.inherited && data.grantOption">
              <el-tooltip content="With grant option"
                          placement="top"
                          popper-class="tooltip-style"
                          :open-delay="600">
                <el-button round
                           size="mini"
                           v-if="data.name === 'OWNERSHIP'"
                           style="background-color: #0c0c0c; color: #fafafa; margin-right: 4px">
                  <i class="el-icon-key icon-style icon-key"></i>
                  {{ data.name }}
                </el-button>
                <el-button round
                           size="mini"
                           v-if="data.name !== 'OWNERSHIP'"
                           style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
                  {{ data.name }}
                  <i class="el-icon-share"></i>
                </el-button>
              </el-tooltip>
            </span>

            <span v-if="!data.inherited && !data.grantOption">
              <el-button round
                         size="mini"
                         v-if="data.name === 'OWNERSHIP'"
                         style="background-color: #0c0c0c; color: #fafafa; margin-right: 4px">
                <i class="el-icon-key icon-style icon-key"></i>
                {{ data.name }}
              </el-button>
              <el-button round
                         size="mini"
                         v-if="data.name !== 'OWNERSHIP'"
                         style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
                {{ data.name }}
              </el-button>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="privilegesData"
      :show-header=false
      v-show="groupIndex === 1"
      @row-click="editPrivilege"
      style="width: 100%; margin-left: -12px">
      <el-table-column
        prop="privilegesData.name"
        label=""
        width="350">
        <template slot-scope="scope">
          <el-button round
                     size="mini"
                     v-if="scope.row.name === 'OWNERSHIP'"
                     style="background-color: #0c0c0c; color: #fafafa; margin-right: 4px">
            <i class="el-icon-key icon-style icon-key"></i>{{ scope.row.name }}
          </el-button>
          <el-button round
                     size="mini"
                     v-if="scope.row.name !== 'OWNERSHIP'"
                     style="background-color: #f2f2f2; color: #2c2f34; border: none; margin-right: 4px">
            {{ scope.row.name }}
            <i v-if="scope.row.grantOption" class="el-icon-share"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        min-width="350">
        <template slot-scope="scope">
          <span v-for="(data, index) in scope.row.roles" :key="index">
            <span v-if="data.inherited">
              <el-popover trigger="hover" :open-delay="600" placement="bottom-start" :visible-arrow="false">
                <div style="margin: 6px 10px;">
                  <div>Inherited from:</div>
                  <div style="margin-top: 10px">
                    <i class="el-icon-user icon-style"></i>
                    <span style="color: #2C2F34">{{ data.inherited }}</span>
                  </div>
                </div>

                <div v-if="data.id === currentRoleId" slot="reference">
                  <i class="el-icon-right icon-style"></i>
                  <i class="el-icon-user icon-style"></i>
                  {{ data.name }}
                  <span style="color: #aeb0b3">(Current Role)</span>
                </div>
                <div v-if="data.id !== currentRoleId" slot="reference">
                  <i class="el-icon-right icon-style"></i>
                  <i class="el-icon-user icon-style"></i>
                  {{ data.name }}
                </div>
              </el-popover>
            </span>

            <span v-if="!data.inherited">
              <div>
                <i class="el-icon-user icon-style"></i>
                {{ data.name }}
              </div>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <VEditPrivilege :paramId="paramId"
                    :dbId="dbId"
                    :type="type"
                    :editPrivilegeVisible="editPrivilegeVisible"
                    :roleRowInfo="roleRowInfo"
                    @updateDialogVisible="updateDialogVisible">
    </VEditPrivilege>
    <VEditRole :paramId="paramId"
               :dbId="dbId"
               :type="type"
               :editRoleVisible="editRoleVisible"
               :roleRowInfo="roleRowInfo"
               @updateDialogVisible="updateDialogVisible">
    </VEditRole>
    <VGrantPrivilege :paramId="paramId"
                     :dbId="dbId"
                     :type="type"
                     :grantPrivilegeVisible="grantPrivilegeVisible"
                     :rolesData="rolesData"
                     @updateDialogVisible="updateDialogVisible">
      <template slot="subhead">
        <slot name="subhead"></slot>
      </template>
    </VGrantPrivilege>
    <VGrantRole :paramId="paramId"
                :dbId="dbId"
                :type="type"
                :grantRoleVisible="grantRoleVisible"
                :privilegesData="privilegesData"
                @updateDialogVisible="updateDialogVisible">
      <template slot="subhead">
        <slot name="subhead"></slot>
      </template>
    </VGrantRole>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import VGrantPrivilege from './VGrantPrivilege'
import VGrantRole from './VGrantRole'
import VEditPrivilege from './VEditPrivilege'
import VEditRole from './VEditRole'

export default {
  name: 'VPrivilegesPanel',
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
    roleData: {
      type: Array,
      default: () => []
    },
    priData: {
      type: Array,
      default: () => []
    }
  },
  components: { VEditPrivilege, VEditRole, VGrantPrivilege, VGrantRole },
  data () {
    return {
      groupIndex: 0,
      privilegeOptions: [
        'Group by Role',
        'Group by Privilege'
      ],
      privilegesData: [
        // {"role": "SYSTEMADMIN", "grants": "OWNERSHIP, MODIFY"},
        // {"role": "admin", "grants": "OWNERSHIP, MODIFY"}
        // {"grants": "MODIFY", "role": "SYSTEMADMIN"},
        // {"grants": "OWNERSHIP", "role": "admin, public"}
      ],
      rolesData: [],
      roleRowInfo: {},
      editPrivilegeVisible: false,
      editRoleVisible: false,
      grantPrivilegeVisible: false,
      grantRoleVisible: false
    }
  },
  async mounted () {
    // // 获取当前用户所有权限的对象列表
    // let responsePrivilegeData = await this.services.warehouseService.getPrivilegeListByRoleId()
    // this.privilegeList = responsePrivilegeData.data
  },
  methods: {
    handleAddPrivilege () {
      if (this.groupIndex === 0) {
        this.grantPrivilegeVisible = true
      } else {
        this.grantRoleVisible = true
        console.log('============grantRoleVisible============', this.grantRoleVisible)
      }
    },
    updateDialogVisible (val) {
      this.editPrivilegeVisible = val
      this.editRoleVisible = val
      this.grantPrivilegeVisible = val
      this.grantRoleVisible = val
    },
    editRole (row) {
      console.log('==================row==================', row)
      if (row.id !== this.currentRoleId && !this.isOwnerShip(row.privileges)) {
        this.editPrivilegeVisible = true
        this.roleRowInfo = row
      }
    },
    editPrivilege (row) {
      console.log('==================row==================', row)
      if (row.name !== 'OWNERSHIP') {
        this.editRoleVisible = true
        this.roleRowInfo = row
      }
    },
    isOwnerShip (roles) {
      if (roles.filter(role => {
        return role.name === 'OWNERSHIP'
      }).length) {
        return true
      }
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({currentRole: 'getCurrentRole', currentRoleId: 'getCurrentRoleId'})
  },
  watch: {
    priData () {
      this.privilegesData = this.priData
      console.log('privilegesData !!! ', this.privilegesData)

      // currentRole显示在第一行
      if (this.privilegesData) {
        this.privilegesData = this.privilegesData.map(item => {
          item.roles = item.roles.filter(role => {
            return role.id === this.currentRoleId
          }).concat(
            item.roles.filter(role => {
              return role.id !== this.currentRoleId
            })
          )
          return item
        })

        this.privilegesData = this.privilegesData.filter(priObj => {
          return priObj.name === 'OWNERSHIP'
        }).concat(
          this.privilegesData.filter(priObj => {
            return priObj.name !== 'OWNERSHIP'
          })
        )
      }
      console.log('privilegesData ===>>>  ', this.privilegesData)
    },
    roleData () {
      this.rolesData = this.roleData
      console.log('rolesData !!! ', this.rolesData)

      // currentRole显示在第一行
      if (this.rolesData) {
        this.rolesData = this.rolesData.filter(roleObj => {
          return roleObj.id === this.currentRoleId
        }).concat(
          this.rolesData.filter(roleObj => {
            return roleObj.id !== this.currentRoleId
          })
        )
      }
      console.log('rolesData ===>  ', this.rolesData)
    }
  }
}
</script>

<style scoped>
.filtrate-button {
  border-radius: 8px;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}

.icon-style {
  margin-right: 4px;
}

.icon-key {
  transform: rotate(135deg); /*旋转135度*/
}
</style>

<style>
.el-input__inner {
  border-radius: 8px;
}

.el-popover {
  border-radius: 8px;
}
</style>
