<template>
  <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-end" ref="dropdownRef">
    <el-button class="button-hidden-style">
      <div class="alignment-horizontal-reverse">
        <div style="display:flex; align-items:center">
          <!--<el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>-->
          <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
        </div>
        <div class="alignment-vertical">
          <div class="user-div">{{ currentUserInfo.name }}</div>
          <div class="role-div">{{ currentRole }}</div>
        </div>
        <div class="icon-arrow-down" style="margin-left: 60px">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </el-button>

    <el-dropdown-menu slot="dropdown" style="width: 260px">
      <el-dropdown-item disabled>
        <div class="alignment-horizontal-start" style="margin-top: 10px">
          <!--<el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>-->
          <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
          <div style="margin-left: 10px; margin-top: -3px">
            <span class="user-inner">{{ currentUserInfo.name }}</span><br/>
          </div>
        </div>
      </el-dropdown-item>

      <el-dropdown-item divided>
        <el-dropdown placement="left-start"
                     :hide-on-click="true">

          <div class="alignment-horizontal-between" style="width: 220px" @mouseover.stop.prevent="initUserRoles">
            <div>
              <div class="switch-role">Switch Role</div>
              <div style="margin-top: -10px">
                <i class="el-icon-user"></i> {{ currentRole }}
              </div>
            </div>
            <div class="icon-arrow-down">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>

          <el-dropdown-menu slot="dropdown" style="width: 260px">
            <!--<el-dropdown-item>
              <div style="margin-top: 10px">
                <el-input size="mini"
                          placeholder="Role"
                          prefix-icon="el-icon-search"
                          ref="searchInputRef"
                          v-model="inputRole"
                          @blur="handleBlur">
                </el-input>
              </div>
            </el-dropdown-item>-->
            <el-dropdown-item v-for="(role, index) in getRoleList" :key="index">
              <div class="dropdown-role alignment-horizontal-between"
                   @click="handleChangeRole(role.entityId, role.name)"
                   v-if="role.entityId === userRoles.currentRoleId">
                <div>
                  <i class="el-icon-user-solid icon-style"></i>
                  <span class="current-role-checked">{{ role.name }}</span>
                </div>
                <div>
                  <i class="el-icon-check current-role-checked"></i>
                </div>
              </div>
              <div class="dropdown-role"
                   @click="handleChangeRole(role.entityId, role.name)"
                   v-if="role.entityId !== userRoles.currentRoleId">
                <i class="el-icon-user icon-style"></i>
                <span>{{ role.name }}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-dropdown-item>

      <el-dropdown-item divided @click.native="handleProfile">
        <span>Profile</span>
      </el-dropdown-item>

      <el-dropdown-item divided @click.native="handleSignOut">
        <span>Sign Out</span>
      </el-dropdown-item>
    </el-dropdown-menu>

    <VChangeUserInfo :profileVisible="profileVisible"
                     :currentUserInfo="currentUserInfo"
                     @updateVisible="updateVisible">
    </VChangeUserInfo>
  </el-dropdown>

</template>

<script>

import { mapState, mapActions } from 'vuex'
import VChangeUserInfo from './VChangeUserInfo'
export default {
  name: 'VBaseUserProfile',
  components: {VChangeUserInfo},
  data () {
    return {
      profileVisible: false,
      dropDownHideOnClick: true,
      inputRole: '',
      userRoles: {},
      currentUserInfo: {},
      currentRole: ''
    }
  },
  async mounted () {
    await this.initUserRoles()
    await this.initUser()
  },
  computed: {
    ...mapState(['services']),
    getRoleList () {
      if (this.userRoles.roleList) {
        return this.userRoles.roleList.filter(role => {
          return role.entityId === this.userRoles.currentRoleId
        }).concat(
          this.userRoles.roleList.filter(role => {
            return role.entityId !== this.userRoles.currentRoleId
          })
        )
      }
    }
  },
  methods: {
    ...mapActions({userRolesObj: 'userRolesObj'}),
    async initUserRoles () {
      console.log('========initUserRoles========')
      let responseData = await this.services.rolesService.queryRolesList()
      this.userRoles = responseData.data
      this.userRolesObj(responseData.data)
      this.resetSetItem('userRoles', JSON.stringify(responseData.data))
      console.log('========userRolesObj========', this.userRolesObj)
      this.currentRole = this.getCurrentRole(responseData.data)
    },
    async initUser () {
      let responseData = await this.services.loginService.getCurrentUser()
      this.currentUserInfo = responseData.data
    },
    getCurrentRole (roleObj) {
      let currentRoleId = roleObj.currentRoleId
      console.log('==========currentRoleId==========', currentRoleId)
      let roleList = roleObj.roleList.filter(userRole => {
        return userRole.entityId === currentRoleId
      })
      if (roleList.length) {
        return roleList.pop().name
      }
    },
    handleProfile () {
      this.$refs.dropdownRef.hide()
      this.profileVisible = true
    },
    updateVisible (val) {
      this.profileVisible = val
    },
    async handleSignOut () {
      this.$refs.dropdownRef.hide()
      let responseData = await this.services.loginService.signOut()
      if (responseData.code === 200) {
        this.$router.push({
          name: 'userLogin'
        })
      }
    },
    async handleChangeRole (entityId, name) {
      console.log('=========切换到的roleId=========', entityId)
      let response = await this.services.rolesService.changeRole(entityId)
      if (response.code === 200) {
        console.log('========role切换成功========', name)
        this.currentRole = name
      }
      // 切换角色之后更新state
      let responseData = await this.services.rolesService.queryRolesList()
      console.log('========userRoles========', this.userRoles)
      // this.userRoles = responseData.data
      this.userRolesObj(responseData.data)
      this.resetSetItem('userRoles', JSON.stringify(responseData.data))
    }
  }
}
</script>

<style scoped>
.button-hidden-style {
  border: #ffffff;
  border-radius: 8px;
  height: 50px;
}

.icon-arrow-down {
  /*margin-left: 60px;*/
  display: flex;
  align-items: center;
}

.current-role-checked {
  color: #1a6ce7
}

.alignment-horizontal-reverse  {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: nowrap
}

.alignment-horizontal-start  {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
}

.alignment-horizontal-between  {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}

.alignment-vertical  {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: nowrap
}

.user-div {
  color: #65676c;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  margin-left: 10px;
}

.user-inner {
  color: #2c2f34;
  font-size: 14px;
}

.role-div {
  color: #8b8d91;
  font-size: 12px;
  margin-left: 10px;
}

.switch-role {
  color: #8b8d91;
  font-size: 12px;
}

.icon-style {
  margin-right: 6px;
  margin-left: 10px;
}

.dropdown-role {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: -10px;
}
</style>

<style>
.el-popper .popper__arrow, .el-popper .popper__arrow::after {
  border-style: none;
}

.el-avatar {
  background-color: #ffffff;
  color: #8b8d91;
  border: 1px solid #bababa;
}

.el-dropdown-menu__item i {
  margin-right: 0;
}
</style>
