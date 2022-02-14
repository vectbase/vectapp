/***
 * 路径配置参数
 */
import HelloWorld from '@/components/demo/HelloWorld'
import Forms from '@/components/demo/Forms'
import Tables from '@/components/demo/Tables'
import Dashboard from '@/components/dashboard/Dashboard'
import NotFind404 from '@/components/common/NotFind404'
import BootstrapLayout from '@/components/layout/BootstrapLayout'
import AccountLogin from '@/components/common/AccountLogin'
import UserLogin from '@/components/common/UserLogin'
import ForgotPassword from '@/components/common/ForgotPassword'
import SignUp from '@/components/common/Signup'
import Error505 from '@/components/common/Error505'
import Worksheets from '@/components/Worksheets'
import DashboardDetail from '@/components/dashboard/DashboardDetail'
import WarehousesTable from '@/components/compute/WarehousesTable'
import ResouceMonitorsPanel from '@/components/compute/ResouceMonitorsPanel'
import WorksheetSqlCode from '../components/worksheets/WorksheetSqlCode'
import VBaseLayout from '../components/layout/VBaseLayout'
import VWorksheets from '../components/worksheets/VWorksheets'
import VQueryHistoryTable from '../components/compute/queryhistory/VQueryHistoryTable'
import VWarehouseTable from '../components/compute/warehouse/VWarehouseTable'
import VRolesPanel from '../components/accounts/VRolesPanel'
import VSecurityPanel from '../components/accounts/VSecurityPanel'
import VUserPanel from '../components/accounts/VUserPanel'
import VDatabasesPanel from '../components/data/database/VDatabasesPanel'
import VBaseDataLayout from '../components/data/VBaseDataLayout'
import VDatabaseInfo from '../components/data/database/VDatabaseInfo'
import VSchemaInfo from '../components/data/schema/VSchemaInfo'
import VTableInfo from '../components/data/tables/VTableInfo'
import VStageInfo from '../components/data/Stages/VStageInfo'
import VFunctionInfo from '../components/data/Functions/VFunctionInfo'
import VDataPipelineInfo from '../components/data/DataPipelines/VDataPipelineInfo'
import VProceduresInfo from '../components/data/Procedures/VProceduresInfo'
import VViewInfo from '../components/data/Views/VViewInfo'
import VUsagePanel from '../components/accounts/VUsagePanel'
import VWarehouseDetail from '../components/compute/warehouse/VWarehouseDetail'
import VUserDetail from '../components/accounts/user/VUserDetail'
import VRoleDetail from '../components/accounts/role/VRoleDetail'
import WorksheetCharts from '../components/worksheets/WorksheetCharts'
import RoleGraph from '../components/common/RoleGraph'
/***
 * 路径配置参数
 */
const appComponetChildren = [
  {
    path: '/app/ResouceMonitorsPanel',
    name: 'ResouceMonitorsPanel',
    component: ResouceMonitorsPanel
  },
  {
    path: '/app/WorksheetSqlCode',
    name: 'WorksheetSqlCode',
    component: WorksheetSqlCode
  },

  {
    path: '/app/WarehousesTable',
    name: 'WarehousesTable',
    component: WarehousesTable
  },
  {
    path: '/app/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/app/QueryHistoryTable',
    name: 'QueryHistoryTable',
    component: VQueryHistoryTable
  },
  {
    path: '/app/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/app/DashboardDetail',
    name: 'DashboardDetail',
    component: DashboardDetail
  },

  {
    path: '/app/Worksheets',
    name: 'Worksheets',
    component: Worksheets
  },
  {
    path: '/app/Tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/app/Forms',
    name: 'Forms',
    component: Forms
  }]

/// //-------- vbase---------
const VBASE_URL = '/vbase'
const VBASE_DATA_URL = '/vbasedata'
const vBaseDataComponetChildren = [
  {
    path: VBASE_DATA_URL + '/vdatabasesPanel',
    name: 'VDatabasesPanel',
    component: VDatabasesPanel
  },
  {
    path: VBASE_DATA_URL + '/vdatabaseinfo/:name',
    name: 'VDatabaseInfo',
    component: VDatabaseInfo
  },
  {
    path: VBASE_DATA_URL + '/vschemainfo/:label',
    name: 'VSchemaInfo',
    component: VSchemaInfo
  },
  {
    path: VBASE_DATA_URL + '/vtableinfo/:id',
    name: 'VTableInfo',
    component: VTableInfo
  },

  {
    path: VBASE_DATA_URL + '/vstageinfo/:label',
    name: 'VStageInfo',
    component: VStageInfo
  },

  {
    path: VBASE_DATA_URL + '/vviewinfo/:id',
    name: 'VViewInfo',
    component: VViewInfo
  },

  {
    path: VBASE_DATA_URL + '/vproceduresinfo/:label',
    name: 'VProceduresInfo',
    component: VProceduresInfo
  },

  {
    path: VBASE_DATA_URL + '/vfunctioninfo/:label',
    name: 'VFunctionInfo',
    component: VFunctionInfo
  },

  {
    path: VBASE_DATA_URL + '/vdatapipelineinfo/:id',
    name: 'VDataPipelineInfo',
    component: VDataPipelineInfo
  }

]
const vBaseComponetChildren = [

  {
    path: VBASE_URL + '/vrolespanel',
    name: 'VRolesPanel',
    component: VRolesPanel
  },
  {
    path: VBASE_URL + '/vdashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: VBASE_URL + '/vrolespanel/detail',
    name: 'VRoleDetail',
    component: VRoleDetail
  },
  {
    path: VBASE_URL + '/vsecuritypanel',
    name: 'VSecurityPanel',
    component: VSecurityPanel
  },
  {
    path: VBASE_URL + '/vuserpanel',
    name: 'VUserPanel',
    component: VUserPanel
  },
  {
    path: VBASE_URL + '/vuserpannel/detail',
    name: 'VUserDetail',
    component: VUserDetail
  },
  {
    path: VBASE_URL + '/vusagepanel',
    name: 'VUsagePanel',
    component: VUsagePanel
  },
  {
    path: VBASE_URL + '/vworksheets',
    name: 'VWorksheets',
    component: VWorksheets
  },
  {
    path: VBASE_URL + '/vqueryhistorytable',
    name: 'VQueryHistoryTable',
    component: VQueryHistoryTable
  },
  {
    path: VBASE_URL + '/vwarehousetable',
    name: 'VWarehouseTable',
    component: VWarehouseTable
  },
  {
    path: VBASE_URL + '/vwarehousetable/:name/:id',
    name: 'VWarehouseDetail',
    component: VWarehouseDetail
  },
  {
    path: VBASE_DATA_URL,
    name: 'vbasedata',
    component: VBaseDataLayout,
    children: vBaseDataComponetChildren
  }
]
//

export default class RouterPathCfg {
  // 路径配置参数
  static pathCfgInfo () {
    return [
      {path: '/', name: 'accountLogin', component: AccountLogin},
      {path: '/signIn', name: 'userLogin', component: UserLogin},
      {path: VBASE_URL, name: 'vbase', component: VBaseLayout, children: vBaseComponetChildren},
      {path: '/signUp', name: 'signUp', component: SignUp},
      {path: '/forgotPassword', name: 'forgotPassword', component: ForgotPassword},
      // sysError 404 and 505
      {path: '/NotFind404', name: 'NotFind404', component: NotFind404},
      {path: '/error505', name: 'Error505', component: Error505},

      // app
      {path: '/app', name: 'app', component: BootstrapLayout, children: appComponetChildren},
      // sqlCode
      {path: '/sqlCode', name: 'sqlCode', component: WorksheetSqlCode},
      {path: '/charts', name: 'charts', component: WorksheetCharts},
      // 测试用户 RoleGraph
      {path: '/rolegraph', name: 'RoleGraph', component: RoleGraph},

      // 跳转定义url http://localhost:8081/#/vbase/vworksheets
      {path: '/worksheets', redirect: '/vbase/vworksheets', name: 'appindex'}
      // { path: '*', redirect: '/NotFind404' }

    ]
  }

  // 查找路径
  findAppPathByName (pathName) {
    return appComponetChildren.find(item => item.name === pathName)
  }
}
