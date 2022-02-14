// import { services } from '../../store/appStore'
import {URL} from '../../store/URLConst'
import {services} from '../../store/appStore'

/***
 * 读取数据库list Obj
 */
export default class SecurityService {
  getTableList () {
    return []
  }

  async querySessionsList (data) {
    return services.axiosService.postSync(URL.grantsInter.ablist_session_list, data)
    // return {
    //   'code': 0,
    //   'msg': 'success',
    //   'data': {
    //     'result': [
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:56:58',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '4a8f6cde-436e-4d3a-8a8f-6cde436ebd3a'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:56:58',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '4a8f6cde-436e-4d3a-8a8f-6cde436ebd3a'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:03',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '25ba1d3a-2f8a-4f49-a5ba-1d3a2f8adf49'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:03',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '25ba1d3a-2f8a-4f49-a5ba-1d3a2f8adf49'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:08',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': 'cc64690b-f366-43ba-8c64-690bf366d3ba'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:08',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': 'cc64690b-f366-43ba-8c64-690bf366d3ba'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:13',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': 'eafd67bf-b227-43dc-aafd-67bfb227b3dc'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:13',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': 'eafd67bf-b227-43dc-aafd-67bfb227b3dc'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:18',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '803ccfe6-966d-4da0-803c-cfe6966d1da0'
    //       },
    //       {
    //         'sessionId': '',
    //         'userName': 'admin',
    //         'startTime': '2022-01-07 08:57:18',
    //         'clientDriver': 'HTTP',
    //         'clientNetAddress': '::ffff:10.244.22.230',
    //         'authentication': '803ccfe6-966d-4da0-803c-cfe6966d1da0'
    //       }
    //     ],
    //     'countSize': 1361426
    //   }
    // }
  }

  async querySecurityOperationConfigs () {
    const resultData = await services.axiosService.getData(URL.grantsInter.ablist_session_config, {})
    const resultDataMap = resultData.data.result
    const defaultObj = {
      id: 0,
      name: 'All',
      checked: true
    }
    const userNameConfigList = []
    const authenticationConfigList = []
    const clientDriverConfigList = []
    userNameConfigList.push(defaultObj)
    authenticationConfigList.push(defaultObj)
    clientDriverConfigList.push(defaultObj)
    resultDataMap.userName.forEach(function (item) {
      const obj = {}
      obj.id = item
      obj.name = item
      obj.checked = false
      userNameConfigList.push(obj)
    })
    resultDataMap.AuthType.forEach(function (item) {
      const obj = {}
      obj.id = item
      obj.name = item
      obj.checked = false
      authenticationConfigList.push(obj)
    })
    resultDataMap.ClientDriver.forEach(function (item) {
      const obj = {}
      obj.id = item
      obj.name = item
      obj.checked = false
      clientDriverConfigList.push(obj)
    })
    const result = {}
    result.userNameConfigList = userNameConfigList
    result.authenticationConfigList = authenticationConfigList
    result.clientDriverConfigList = clientDriverConfigList
    return result
  }

  async insertPolicyFirst (data) {
    return services.axiosService.postSync(URL.grantsInter.ablist_insert, data)
  }

  async selectData () {
    return services.axiosService.postSync(URL.grantsInter.ablist_select_data, {})
    // return {
    //   'code': 0,
    //   'msg': 'success',
    //   'data': {
    //     'result': [
    //       {
    //         'policyName': 'vectbase1',
    //         'createTime': '2022-01-13 16:15:59',
    //         'activatedStates': 1,
    //         'showTime': '1 day ago',
    //         'blocked': [
    //           '192.168.1.6',
    //           '192.168.1.7'
    //         ],
    //         'allowed': [
    //           '192.168.1.5',
    //           '192.168.1.8'
    //         ]
    //       },
    //       {
    //         'policyName': 'vectbase2',
    //         'createTime': '2022-01-13 16:18:13',
    //         'activatedStates': 0,
    //         'showTime': '1 day ago',
    //         'blocked': [
    //           '192.168.1.9'
    //         ],
    //         'allowed': [
    //           '192.168.1.10'
    //         ]
    //       }
    //     ]
    //   }
    // }
  }

  async activatePolicyRemote (data) {
    return services.axiosService.postSync(URL.grantsInter.ablist_active_policy, data)
  }

  async dropPolicy (data) {
    return services.axiosService.postSync(URL.grantsInter.ablist_delete_policy, data)
  }

  async editPolicy (data) {
    return services.axiosService.postSync(URL.grantsInter.ablist_update_policy, data)
  }
}
