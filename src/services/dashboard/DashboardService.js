import { services } from '../../store/appStore'
import {URL} from '../../store/URLConst'
/***
 * 读取数据库list Obj
 */
export default class DashboardService {
  // dashboard
  getList (params) {
    return services.axiosService.postSyncWs(URL.dashboard.list, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/getListForDashboard', params)
  }
}
