import { services } from '../../store/appStore'
import { URL } from '../../store/URLConst'

/***
 * 读取数据库list Obj
 */
export default class RolesService {
  getTableList () {
    return []
  }

  async queryRolesList () {
    return services.axiosService.postSync(URL.userres.user_roles, {})
    /* return {
      'success': true,
      'code': 200,
      'msg': 'success',
      'data': {
        'currentRoleId': '6',
        'roleList': [
          {
            'creator': 9999999999,
            'updateUser': 9999999999,
            'createTime': '2021-11-27T14:44:31',
            'updateTime': '2021-11-27T14:44:31',
            'createTimeStr': '3 hour ago',
            'updateTimeStr': '3 hour ago',
            'remark': null,
            'page': 0,
            'pageSize': 10,
            'start': null,
            'entityId': '6',
            'name': 'ACCOUNTADMIN',
            'defaultRoleId': null,
            'nodeType': 1,
            'owner': null,
            'accountId': 1464485266608627714,
            'type': null,
            'grantedToRoles': null,
            'grantedRoles': null
          },
          {
            'creator': 9999999999,
            'updateUser': 9999999999,
            'createTime': '2021-11-27T14:44:32',
            'updateTime': '2021-11-27T14:44:32',
            'createTimeStr': '3 hour ago',
            'updateTimeStr': '3 hour ago',
            'remark': null,
            'page': 0,
            'pageSize': 10,
            'start': null,
            'entityId': '7',
            'name': 'SYSTEMADMIN',
            'defaultRoleId': null,
            'nodeType': 2,
            'owner': null,
            'accountId': 1464485266608627714,
            'type': null,
            'grantedToRoles': null,
            'grantedRoles': null
          },
          {
            'creator': 9999999999,
            'updateUser': 9999999999,
            'createTime': '2021-11-27T14:44:32',
            'updateTime': '2021-11-27T14:44:32',
            'createTimeStr': '3 hour ago',
            'updateTimeStr': '3 hour ago',
            'remark': null,
            'page': 0,
            'pageSize': 10,
            'start': null,
            'entityId': '8',
            'name': 'SECURITYADMIN',
            'defaultRoleId': null,
            'nodeType': 2,
            'owner': null,
            'accountId': 1464485266608627714,
            'type': null,
            'grantedToRoles': null,
            'grantedRoles': null
          },
          {
            'creator': 9999999999,
            'updateUser': 9999999999,
            'createTime': '2021-11-27T14:44:32',
            'updateTime': '2021-11-27T14:44:32',
            'createTimeStr': '3 hour ago',
            'updateTimeStr': '3 hour ago',
            'remark': null,
            'page': 0,
            'pageSize': 10,
            'start': null,
            'entityId': '9',
            'name': 'USAGEADMIN',
            'defaultRoleId': null,
            'nodeType': 1,
            'owner': null,
            'accountId': 1464485266608627714,
            'type': null,
            'grantedToRoles': null,
            'grantedRoles': null
          },
          {
            'creator': 9999999999,
            'updateUser': 9999999999,
            'createTime': '2021-11-27T14:44:32',
            'updateTime': '2021-11-27T14:44:32',
            'createTimeStr': '3 hour ago',
            'updateTimeStr': '3 hour ago',
            'remark': null,
            'page': 0,
            'pageSize': 10,
            'start': null,
            'entityId': '10',
            'name': 'PUBLIC',
            'defaultRoleId': null,
            'nodeType': 1,
            'owner': null,
            'accountId': 1464485266608627714,
            'type': null,
            'grantedToRoles': null,
            'grantedRoles': null
          }
        ]
      }
    } */
  }

  async queryRolesTableList () {
    return services.axiosService.postSync(URL.userres.role_list, {})
  }

  async queryGrantRolesList (data) {
    let dataParams = {}
    dataParams.roleEntityId = data.entityId
    return services.axiosService.postSync(URL.userres.grant_role_list, dataParams)
  }

  async queryGrantToRolesList (data) {
    let dataParams = {}
    dataParams.roleEntityId = data.entityId
    return services.axiosService.postSync(URL.userres.grant_to_role_list, dataParams)
  }

  async queryGrantUserList (data) {
    let dataParams = {}
    dataParams.roleEntityId = data.entityId
    return services.axiosService.postSync(URL.userres.grant_user_list, dataParams)
  }

  async queryGrantUserRoleList (entityId) {
    let dataParams = {}
    dataParams.roleEntityId = entityId
    return services.axiosService.postSync(URL.userres.grant_user_role_list, dataParams)
  }

  async queryManageGlobalPrivileges (entityId) {
    let dataParams = {}
    dataParams.roleUuid = entityId
    return services.axiosService.postSync(URL.grantsInter.privilege_list, dataParams)
  }

  async addPrivilege (data) {
    return services.axiosService.postSync(URL.grantsInter.privilege_add, data)
  }

  async addRole (data) {
    return services.axiosService.postSync(URL.userres.role_add, data)
  }

  async changeRole (id) {
    return services.axiosService.postSync(URL.userres.change_role, {'id': id})
  }

  async getRoleInfo (id) {
    return services.axiosService.postSync(URL.userres.get_role_info, {'id': id})
  }

  async operation (data) {
    return services.axiosService.postSync(URL.userres.grant_revoke_operation, data)
  }

  async dropRole (entityId, name) {
    const data = {}
    data.name = name
    data.entityId = entityId
    return services.axiosService.postSync(URL.userres.role_drop, data)
  }
}
