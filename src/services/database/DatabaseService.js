/***
 * 读取数据库list Obj
 */
import {services} from '../../store/appStore'
import {URL} from '../../store/URLConst'

export default class DatabaseService {
  /***
   *
   * @param params
   */
  queryList (jsonParams) {
    return services.axiosService.postSync(URL.databases.queryList, jsonParams)
    // return [
    //   {label: 'DEmo_DB', name: 'DEmo_DB', source: 'local', owner: 'SYSAdmin', created: '2019-9'},
    //   {label: 'SNOWFLAKE_SAMPLE_DATA', name: 'Share', source: 'local', owner: 'SYSAdmin', created: '2019-9'},
    //   {label: 'UTIL_DB', name: 'DEmo_DB', source: 'local', owner: 'SYSAdmin', created: '2019-9'}
    // ]
    // return {code: 200,
    //   message: 'success',
    //   data: {list: [{id: 1, type: 'database', name: 'demodata'},
    //     {id: 1, type: 'database', name: 'demodata'}]}}
  }

  /***
   *
   * @param params
   */
  querySchemaObjTypleList (jsonParams) {
    return [
      {name: 'Tables', objectTyle: '0', type: 'tables'},
      {name: 'Views', objectTyle: '1', type: 'views'},
      {name: 'Pipes', objectTyle: '3', type: 'pipes'}
      // {name: 'functions', objectTyle: '2', type: 'functions'},
      // {name: 'produces', objectTyle: '4', type: 'produces'},
      // {name: 'data piples', objectTyle: '3', type: 'data piples'},
      // {name: 'stagesÍ', objectTyle: '5', type: 'stages'}
    ]
  }
  /***
   *
   * @param params  sss
   */
  querySchameTableList (jsonParams) {
    return services.axiosService.postSync(URL.databases.queryList, jsonParams)
    // return [{name: 'public_table1_DEmo', id: '1111table', type: 'table'}, {name: 'public_table_DEmo_2', id: '2222table', type: 'table'}]
  }
  /***
   *
   * @param params
   */
  querySchameViewList (jsonParams) {
    return services.axiosService.postSync(URL.databases.queryList, jsonParams)
    // return [{name: 'vpublic_view_DEmo', id: '1111view', type: 'view'}, {name: 'vpublic_view_DEmo_2', id: '2222view', type: 'view'}]
  }
  /***
   *
   * @param params
   */
  querySchameFunctionList (jsonParams) {
    return [{name: 'ffpublic_schame_DEmo', type: 'function'}, {name: 'ffpublic_schame_DEmo_2', type: 'function'}]
  }
  /***
   *
   * @param params
   */
  querySchameDataPiplineList (jsonParams) {
    return [{name: 'pipiline_1', type: 'dataPipeLines'}, {name: 'pipiline_2', type: 'dataPipeLines'}]
  }
  /***
   *
   * @param params
   */
  querySchameProduceList (jsonParams) {
    return [{id: 111, name: 'public_schame_DEmo', type: 'produce'}, {id: 222, name: 'public_schame_DEmo_2', type: 'produce'}]
  }
  /***
   *
   * @param params
   */
  querySchameStagesList (jsonParams) {
    return [{name: 'public_schame_DEmo', isLeaf: true, type: 'stage'}, {name: 'public_schame_DEmo_2', isLeaf: true, type: 'stage'}]
  }

  /***
   *
   * @param params
   */
  getInfoById (jsonParams) {
    return services.axiosService.postSync(URL.databases.getInfoById, jsonParams)
  }

  /***
   *
   * @param params
   */
  getColumnsList (jsonParams) {
    return services.axiosService.postSync(URL.databases.getColumnsList, jsonParams)
  }

  /***
   *
   * @param params
   */
  getDataList (jsonParams) {
    return services.axiosService.postSync(URL.databases.getDatas, jsonParams)
  }

  /***
   *
   * @param params
   */
  create (jsonParams) {
    return services.axiosService.postSync(URL.databases.create, jsonParams)
  }

  /***
   *
   * @param params
   */
  edit (jsonParams) {
    return services.axiosService.postSync(URL.databases.edit, jsonParams)
  }

  /***
   *
   * @param params
   */
  clone (jsonParams) {
    return services.axiosService.postSync(URL.databases.clone, jsonParams)
  }

  /***
   *
   * @param params
   */
  drop (jsonParams) {
    return services.axiosService.postSync(URL.databases.drop, jsonParams)
  }

  /***
   *
   * @param params
   */
  transfer (jsonParams) {
    return services.axiosService.postSync(URL.databases.transfer, jsonParams)
  }

  /***
   * pipe create
   * @param params
   */
  createPipe (jsonParams) {
    return services.axiosService.postSync(URL.pipe.createPipe, jsonParams)
  }

  /***
   * pipe create
   * @param params
   */
  createFileStreamPipe (jsonParams) {
    return services.axiosService.postSyncUpload(URL.pipe.createPipe, jsonParams)
  }

  /***
   * pipe create
   * @param params
   */
  dropPipe (jsonParams) {
    return services.axiosService.postSync(URL.pipe.dropPipe, jsonParams)
  }

  privilegeList (jsonParams) {
    return services.axiosService.postSync(URL.databases.privilegeList, jsonParams)
  }

  grantPrivilege (jsonParams) {
    return services.axiosService.postSync(URL.databases.grantPrivilege, jsonParams)
  }

  grantRoles (jsonParams) {
    return services.axiosService.postSync(URL.databases.grantRoles, jsonParams)
  }

  editPrivileges (jsonParams) {
    return services.axiosService.postSync(URL.databases.editPrivileges, jsonParams)
  }

  editRoles (jsonParams) {
    return services.axiosService.postSync(URL.databases.editRoles, jsonParams)
  }
}
