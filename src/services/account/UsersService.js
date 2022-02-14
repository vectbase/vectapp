// import { services } from '../../store/appStore'
import {services} from '../../store/appStore'
import {URL} from '../../store/URLConst'
/***
 * 读取数据库list Obj
 */
export default class UsersService {
  async queryUsersList () {
    let data = services.axiosService.postSync(URL.userres.user_list, {})
    return data
  }

  async addUser (data) {
    return services.axiosService.postSync(URL.userres.user_add, data)
  }

  async wareHouseList () {
    let result = services.axiosService.postSync(URL.worksheets.warehouse_list, {})
    return result.data
  }

  async queryUsersOperationConfigs () {
    return {
      statusConfigList: [
        {
          id: 0,
          statusName: 'All',
          value: 'All',
          label: 'All',
          checked: true
        }, {
          id: 1,
          statusName: 'Enabled',
          value: 'Enabled',
          label: 'Enabled',
          checked: true
        }, {
          id: 2,
          value: 'Disabled',
          statusName: 'Disabled',
          label: 'Disabled',
          checked: true
        }
      ],
      ownerConfigList: [
        {
          id: 0,
          name: 'All',
          checked: true
        }, {
          id: 'ACCOUNTADMIN',
          name: 'ACCOUNTADMIN',
          checked: false
        }, {
          id: 'Empty',
          name: 'Empty',
          checked: false
        }, {
          id: 'SECURITYADMIN',
          name: 'SECURITYADMIN',
          checked: false
        }
      ],
      operationConfig: [
        {
          label: 'Edit',
          value: 1
        },
        {
          label: 'Reset Password',
          value: 2
        },
        {
          label: 'Disable User',
          value: 3
        },
        {
          label: 'Drop',
          value: 4
        },
        {
          label: 'Grant a Role',
          value: 5
        },
        {
          label: 'Revoke a Role',
          value: 6
        }
      ],
      wareHouseConfigList: [
        {
          'id': 1,
          'label': 'COMPUTE_TH'
        },
        {
          'id': 2,
          'label': 'NEW'
        },
        {
          'id': 3,
          'label': 'S'
        },
        {
          'id': 4,
          'label': 'V'
        }
      ]
    }
  }

  async queryGrantUsersList () {
    let data = services.axiosService.postSync(URL.userres.user_config_list, {})
    return data
  }
  async queryUserInfo (entityId) {
    const params = {}
    params.entityId = entityId
    return services.axiosService.postSync(URL.userres.user_info, params)
  }
}
