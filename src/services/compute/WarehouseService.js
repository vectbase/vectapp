import { services } from '../../store/appStore'
import { URL } from '../../store/URLConst'

/**
 * 读取数据库list Obj
 */
export default class WarehouseService {
  async warehouseList (requestData) {
    console.log('======================', requestData)
    // return services.axiosService.postSync('/compute/warehouseList', requestData)
    return services.axiosService.postSync(URL.warehouse.warehouseList, requestData)
  }

  async saveWarehouse (requestData) {
    // return services.axiosService.postSync('/compute/saveWarehouse', requestData)
    return services.axiosService.postSync(URL.warehouse.saveWarehouse, requestData)
  }

  async dropWarehouse (id) {
    // return services.axiosService.postSync('/compute/dropWarehouse', id)
    return services.axiosService.postSync(URL.warehouse.dropWarehouse, {'id': id})
  }

  async transferOwnership (id, targetRoleId, roleId) {
    let requestParam = {'id': id, 'roleId': targetRoleId, 'srcRoleId': roleId}
    // return services.axiosService.postSync('/compute/transferOwnership', requestParam)
    return services.axiosService.postSync(URL.warehouse.transferOwnership, requestParam)
  }

  async warehouseDetail (id) {
    console.log('================id', id)
    // return services.axiosService.postSync('/compute/warehouseDetail', {'id': id})
    return services.axiosService.postSync(URL.warehouse.warehouseDetail, {'id': id})
  }

  async privilegeListById (paramId) {
    return services.axiosService.postSync(URL.warehouse.privilegeList, {'id': paramId})
    /* return {
      code: 200,
      message: '',
      data: [
        {id: 'qqq', name: 'MODIFY'},
        {id: 'rrr', name: 'MONITOR'},
        {id: 'cccc', name: 'OPERATE'},
        {id: 'dddd', name: 'USAGE'}
      ]
    } */
  }

  async loadActivity (param) {
    return services.axiosService.postSync(URL.warehouse.loadActivity, param)
  }

  async grantPrivileges (param) {
    return services.axiosService.postSync(URL.warehouse.grantPrivileges, param)
  }

  async grantRoles (param) {
    return services.axiosService.postSync(URL.warehouse.grantRoles, param)
  }

  async editPrivileges (param) {
    return services.axiosService.postSync(URL.warehouse.editPrivileges, param)
  }

  async editRoles (param) {
    return services.axiosService.postSync(URL.warehouse.editRoles, param)
  }

  async warehouseListByRole (param) {
    return services.axiosService.postSync(URL.warehouse.warehouseListByRole, param)
  }

  async isOperable () {
    return services.axiosService.postSync(URL.warehouse.isOperable, {})
    // return {
    //   data: true
    // }
  }
}
