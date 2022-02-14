import { services } from '../../store/appStore'
import {URL} from '../../store/URLConst'
/***
 * 读取数据库list Obj
 */
export default class WorkSheetService {
  /***
   *
   * @param params
   */
  demoData (jsonParams) {
    return [
      {label: 'DEmo_DB', name: 'DEmo_DB', source: 'local', owner: 'SYSAdmin', created: '2019-9'},
      {label: 'SNOWFLAKE_SAMPLE_DATA', name: 'Share', source: 'local', owner: 'SYSAdmin', created: '2019-9'},
      {label: 'UTIL_DB', name: 'DEmo_DB', source: 'local', owner: 'SYSAdmin', created: '2019-9'}
    ]
  }

  getList () {
    // return services.axiosService.getData('/wsql/getList', {})http://fretend.vectbase.com:32222/wsql   平哥
    return services.axiosService.postSyncWs(URL.worksheets.getList, {})
    // console.info('data', data)
  }

  createNewWs (sql, role) {
    // return services.axiosService.getData('/wsql/createNewWs', {})
    return services.axiosService.postSyncWs(URL.worksheets.createNewWs, {'sqlCon': sql, 'roleName': role})
  }

  duplWs (oid) {
    // return services.axiosService.getData('/wsql/duplWs', {'oid': oid})
    return services.axiosService.postSyncWs(URL.worksheets.duplWs, {'oid': oid})
  }

  deletelWs (oid) {
    // return services.axiosService.getData('/wsql/deletelWs', {'id': oid})
    return services.axiosService.postSyncWs(URL.worksheets.deletelWs, {'id': oid})
  }

  getListByPage (page) {
    // return services.axiosService.getData('/wsql/getListByPage', {'curPage': page})
    return services.axiosService.postSyncWs(URL.worksheets.getListByPage, {'curPage': page})
  }

  asyn// c generateCodeMirSets () {
  // let res = await services.axiosService.postSync('http://fretend.vectbase.com:32222/interactive/select', jsonParams)
  // return  [{
  //   id: 1,
  //   parent: 0,
  //   text: 'select',
  //   displayText: 'select',
  //   displayInfo: 'keyword'
  // }, {
  //   id: 2,
  //   parent: 0,
  //   text: 'from',
  //   displayText: 'from',
  //   displayInfo: 'keyword'
  // },
  //   {
  //     id: 3,
  //     parent: 0,
  //     text: 'sequence',
  //     displayText: 'sequence',
  //     displayInfo: 'keyword',
  //     render: this.hintRender
  //   },
  //   {
  //     id: 4,
  //     parent: 0,
  //     text: 'testdb',
  //     displayText: 'testdb',
  //     displayInfo: 'database'
  //   },
  //   {
  //     id: 5,
  //     parent: 4,
  //     text: 'sequence',
  //     displayText: 'sequence',
  //     displayInfo: 'schema'
  //   },
  //   {
  //     id: 6,
  //     parent: 5,
  //     text: 'testtable',
  //     displayText: 'testtable',
  //     displayInfo: 'table 60 rows'
  //   },
  //   {
  //     id: 7,
  //     parent: 5,
  //     text: 'testtable2',
  //     displayText: 'testtable',
  //     displayInfo: 'table 10 rows'
  //   }]
  // }

  exeSql (jsonParams) {
    return services.axiosService.postSyncWs(URL.worksheets.exesql, jsonParams)
  }

  saveSql (params) {
    return services.axiosService.postSyncWs(URL.worksheets.saveSql, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/saveSql', params)
  }
  getWsInfo (params) {
    return services.axiosService.postSyncWs(URL.worksheets.getWsInfo, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/getWsInfo', params)
  }
  getHistoryList (params) {
    return services.axiosService.postSyncWs(URL.worksheets.getHistoryList, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/getHistoryList', params)
  }
  updateWsHistory (params) {
    return services.axiosService.postSyncWs(URL.worksheets.updateHistoryInfo, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/updateHistoryInfo', params)
  }
  downLoadTabResult (params) {
    return services.axiosService.postDownload(URL.worksheets.downloadTabRes, params)
  }
  getListForSearch (params) {
    return services.axiosService.postSync(URL.worksheets.downloadTabRes, params)
    // return services.axiosService.postSyncWs('http://127.0.0.1:8081/wsql/getListForSearch', params)
  }
}
