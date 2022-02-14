import Vue from 'vue'
import vuex from 'vuex'
import RouterPathCfg from '@/router/RouterPathCfg'
import AxiosService from '@/services/netService/AxiosService'
import DatabaseService from '@/services/database/DatabaseService'
import TableService from '../services/table/TableService'
import QueryHistoryService from '../services/compute/QueryHistoryService'
import WarehouseService from '../services/compute/WarehouseService'
import WorkSheetService from '../services/worksheet/WorkSheetService'
import UsersService from '../services/account/UsersService'
import LoginService from '../services/login/LoginService'
import RolesService from '../services/account/RolesService'
import SecurityService from '../services/account/SecurityService'
import DashboardService from '../services/dashboard/DashboardService';

Vue.use(vuex)

export const services = {
  axiosService: new AxiosService(),
  databaseService: new DatabaseService(),
  tableService: new TableService(),
  queryHistoryService: new QueryHistoryService(),
  warehouseService: new WarehouseService(),
  usersService: new UsersService(),
  workSheetService: new WorkSheetService(),
  rolesService: new RolesService(),
  securityService: new SecurityService(),
  loginService: new LoginService(),
  dashboardService: new DashboardService()
}

const stateParams = {
  showBootstrapNavbar: {isshowBar: true},
  routerPathCfg: new RouterPathCfg(),
  services: services,
  csrfToken: '',
  host: '',
  userRoles: {} // role对象，包含currentRoleId
}

// mutationsObj
const mutationsObj = {
  // 加1
  SHOW_BootstrapNavbar (state) {
    console.log('SHOW_BootstrapNavbar')
    state.showBootstrapNavbar.isshowBar = true
  },
  // 减1
  HIDDEN_BootstrapNavbar (state) {
    console.log('HIDDEN_BootstrapNavbar')
    state.showBootstrapNavbar.isshowBar = false
  },
  // 切换角色，修改角色列表
  USER_ROLES_OBJ (state, value) {
    state.userRoles = value
    console.log('update userRoles：', state.userRoles)
    // 存储到sessionStorage（在组件中存）
    // sessionStorage.setItem('userRoles', JSON.stringify(value))
  },
  CSRF_TOKEN (state, value) {
    state.csrfToken = value
  },
  SET_HOST (state, value) {
    state.host = value
  }
}

const actionsObj = {
  showBar (context) {
    console.log('showBar')
    context.commit('SHOW_BootstrapNavbar')
  },
  hiddenBar (context) {
    console.log('hiddenBar')
    context.commit('HIDDEN_BootstrapNavbar')
  },
  userRolesObj (context, value) {
    context.commit('USER_ROLES_OBJ', value)
  }
}

const getters = {
  getCurrentRoleId (state) {
    if (state.userRoles) {
      return state.userRoles.currentRoleId
    } else {
      // 刷新页面从sessionStorage中取
      return JSON.parse(sessionStorage.getItem('userRoles')).currentRoleId
    }
  },
  getCurrentRole (state) {
    let userRoles
    if (state.userRoles) {
      userRoles = state.userRoles
    } else {
      userRoles = JSON.parse(sessionStorage.getItem('userRoles'))
    }
    let currentRoleId = userRoles.currentRoleId
    let roleList = userRoles.roleList.filter(roleObj => {
      return roleObj.entityId === currentRoleId
    })
    if (roleList) {
      return roleList.pop().name
    }
  },
  getRoleList (state) {
    if (state.userRoles) {
      return state.userRoles.roleList
    } else {
      // 刷新页面从sessionStorage中取
      return JSON.parse(sessionStorage.getItem('userRoles')).roleList
      // return [{'name': 'ws1', 'id': 1}, {'name': 'ws2', 'id': 2}, {'name': 'ws3', 'id': 3}]
    }
  }
}

export default new vuex.Store({
  mutations: mutationsObj,
  actions: actionsObj,
  state: stateParams,
  getters: getters
})
