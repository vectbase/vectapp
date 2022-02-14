import { services } from '../../store/appStore'
import { URL } from '../../store/URLConst'

/***
 * 读取数据库list Obj
 */
export default class QueryHistoryService {
  getTableList () {
    return []
  }

  async queryHistoryList (requestData) {
    // return services.axiosService.getData('/compute/queryHistoryList', requestData)
    return services.axiosService.postSync(URL.queryHistory.queryHistoryList, requestData)

    // return [
    //   {
    //     sqlText: 'select * from demo_db.information_schema.applicable_roles',
    //     queryId: '019f67ad-0400-b7c8-003f-e0030001110a',
    //     status: 1,
    //     user: '普陀区',
    //     warehouse: 'COMPUTE_WH',
    //     sessionId: '123456789',
    //     duration: {
    //       totalDuration: 180,
    //       durationUnit: 0, // 0-millisecond 1-Seconds 2-Minutes 3-Hours
    //       compilationTime: 12, // ms
    //       queuedResumeTime: 24, // ms
    //       externalFilesTime: 48, // ms
    //       xpExecTime: 96 // ms
    //     },
    //     started: '2021-01-01 10:10:10',
    //     endTime: '2021-01-01 10:10:10'
    //   },
    //   {
    //     sqlText: 'select * from demo_db.information_schema.applicable_roles',
    //     queryId: '019f67ad-0400-b7c8-003f-e0030001110b',
    //     status: 2,
    //     user: '普陀区',
    //     warehouse: 'COMPUTE_WH',
    //     sessionId: '123456789',
    //     duration: {
    //       totalDuration: 48,
    //       durationUnit: 0, // 0-millisecond 1-Seconds 2-Minutes 3-Hours
    //       compilationTime: 12, // ms
    //       queuedResumeTime: 12, // ms
    //       externalFilesTime: 12, // ms
    //       xpExecTime: 12 // ms
    //     },
    //     started: '2021/01/01',
    //     endTime: '2021/01/01'
    //   },
    //   {
    //     sqlText: 'select * from IDENTIFIER(\'"DEMO_DB"."PUBLIC"."TB001"\') limit 100',
    //     queryId: '019f67ad-0400-b7c8-003f-e0030001110c',
    //     status: 3,
    //     user: '普陀区',
    //     warehouse: 'COMPUTE_WH',
    //     sessionId: '123456789',
    //     duration: {
    //       totalDuration: 48,
    //       durationUnit: 0, // 0-millisecond 1-Seconds 2-Minutes 3-Hours
    //       compilationTime: 12, // ms
    //       queuedResumeTime: 12, // ms
    //       externalFilesTime: 12, // ms
    //       xpExecTime: 12 // ms
    //     },
    //     started: '2021/01/01 10:10:10',
    //     endTime: '2021/01/01 10:10:10'
    //   },
    //   {
    //     sqlText: 'select * from IDENTIFIER(\'"DEMO_DB"."PUBLIC"."TB001"\') limit 100',
    //     queryId: '019f67ad-0400-b7c8-003f-e0030001110d',
    //     status: 4,
    //     user: '普陀区',
    //     warehouse: 'COMPUTE_WH',
    //     sessionId: '123456789',
    //     duration: {
    //       totalDuration: 48,
    //       durationUnit: 0, // 0-millisecond 1-Seconds 2-Minutes 3-Hours
    //       compilationTime: 12, // ms
    //       queuedResumeTime: 12, // ms
    //       externalFilesTime: 12, // ms
    //       xpExecTime: 12 // ms
    //     },
    //     started: '2021-01-01',
    //     endTime: '2021-01-01'
    //   },
    //   {
    //     sqlText: 'select * from snowflake_sample_data.tpcds_sf100tcl.ship_mode limit 10;',
    //     queryId: '019f67ad-0400-b7c8-003f-e0030001110e',
    //     status: 5,
    //     user: '普陀区',
    //     warehouse: 'COMPUTE_WH',
    //     sessionId: '123456789',
    //     duration: {
    //       totalDuration: 48,
    //       durationUnit: 0, // 0-millisecond 1-Seconds 2-Minutes 3-Hours
    //       compilationTime: 12, // ms
    //       queuedResumeTime: 12, // ms
    //       externalFilesTime: 12, // ms
    //       xpExecTime: 12 // ms
    //     },
    //     started: new Date(),
    //     endTime: new Date()
    //   }]
  }

  async queryUserList () {
    return services.axiosService.postSync1(URL.auth.user_list, {})

    /* return {
      'code': 200,
      'message': '请求响应成功!',
      'data': [
        {
          'id': 1,
          'username': 'nlu0001'
        },
        {
          'id': 2,
          'username': 'snowflake'
        }
      ],
      'ok': true
    } */
  }
}
