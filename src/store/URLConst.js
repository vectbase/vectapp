const BASE_URL = process.env.HTTP_URL
const AUTH_PREFIX = process.env.AUTH_PREFIX
const AUTHPUBLIC_PREFIX = process.env.AUTHPUBLIC_PREFIX
const USERRES_PREFIX = process.env.USERRES_PREFIX
const WORKSHEET_PREFIX = process.env.WORKSHEET_PREFIX
const INTERACTIVE_PREFIX = process.env.INTERACTIVE_PREFIX
const DATABASE_PREFIX = process.env.DATABASE_PREFIX
const PIPE_PREFIX = process.env.PIPE_PREFIX
const QUERYHISTORY_PREFIX = process.env.QUERYHISTORY_PREFIX
const WAREHOUSE_PREFIX = process.env.WAREHOUSE_PREFIX
const GRANT_PREFIX = process.env.GRANT_PREFIX
export const URL = {
  'BASE_URL': BASE_URL,
  'BASE_URL_NEW': BASE_URL,
  'auth': {
    'register_url': BASE_URL + AUTHPUBLIC_PREFIX + '/account/register',
    'chk_domain_url': BASE_URL + AUTHPUBLIC_PREFIX + '/account/check',
    'login_user_url': BASE_URL + AUTHPUBLIC_PREFIX + '/user/login',
    'csrf_init': BASE_URL + AUTH_PREFIX + '/passwd/csrf',
    'passwd_init': BASE_URL + AUTHPUBLIC_PREFIX + '/passwd/init',
    'current_user': BASE_URL + AUTH_PREFIX + '/user/query',
    'user_list': BASE_URL + AUTH_PREFIX + '/user/list',
    'sign_out': BASE_URL + AUTH_PREFIX + '/history/signOut',
    'change_user_info': BASE_URL + AUTH_PREFIX + '/user/add',
    'change_password': BASE_URL + AUTH_PREFIX + '/user/resetPassword'
  },
  'userres': {
    'role_list': BASE_URL + USERRES_PREFIX + '/role/list',
    'user_list': BASE_URL + USERRES_PREFIX + '/user/list',
    'user_config_list': BASE_URL + USERRES_PREFIX + '/user/configList',
    'user_add': BASE_URL + USERRES_PREFIX + '/user/addUser',
    'role_add': BASE_URL + USERRES_PREFIX + '/role/add',
    'user_roles': BASE_URL + USERRES_PREFIX + '/role/userRoleList',
    'change_role': BASE_URL + USERRES_PREFIX + '/user/changeRole',
    'get_role_info': BASE_URL + USERRES_PREFIX + '/role/getRoleInfo',
    'grant_role_list': BASE_URL + USERRES_PREFIX + '/grantRole/grantRoleList',
    'grant_to_role_list': BASE_URL + USERRES_PREFIX + '/grantRole/grantToRoleList',
    'grant_revoke_operation': BASE_URL + USERRES_PREFIX + '/role/operation',
    'grant_user_list': BASE_URL + USERRES_PREFIX + '/grantUser/grantUserList',
    'role_drop': BASE_URL + USERRES_PREFIX + '/role/dropRole',
    'user_info': BASE_URL + USERRES_PREFIX + '/user/info',
    'grant_user_role_list': BASE_URL + USERRES_PREFIX + '/grantUser/grantUserRoleList'
  },
  'worksheets': {
    'exesql': BASE_URL + INTERACTIVE_PREFIX + '/interactive/select',
    'downloadTabRes': BASE_URL + INTERACTIVE_PREFIX + '/interactive/download',
    'deletelWs': BASE_URL + WORKSHEET_PREFIX + '/wsql/deletelWs',
    'duplWs': BASE_URL + WORKSHEET_PREFIX + '/wsql/duplWs',
    'createNewWs': BASE_URL + WORKSHEET_PREFIX + '/wsql/createNewWs',
    'getList': BASE_URL + WORKSHEET_PREFIX + '/wsql/getList',
    'getListByPage': BASE_URL + WORKSHEET_PREFIX + '/wsql/getListByPage',
    'saveSql': BASE_URL + WORKSHEET_PREFIX + '/wsql/saveSql',
    'getWsInfo': BASE_URL + WORKSHEET_PREFIX + '/wsql/getWsInfo',
    'getHistoryList': BASE_URL + WORKSHEET_PREFIX + '/wsql/getHistoryList',
    'updateHistoryInfo': BASE_URL + WORKSHEET_PREFIX + '/wsql/updateHistoryInfo'
  },
  'dashboard': {
    'list': BASE_URL + WORKSHEET_PREFIX + '/wsql/getListForDashboard'
  },
  'databases': {
    'queryList': BASE_URL + DATABASE_PREFIX + '/databases/getList',
    'getInfoById': BASE_URL + DATABASE_PREFIX + '/databases/getInfoById',
    'getColumnsList': BASE_URL + DATABASE_PREFIX + '/databases/getColumnsList',
    'getDatas': BASE_URL + DATABASE_PREFIX + '/databases/getDatas',
    'create': BASE_URL + DATABASE_PREFIX + '/databases/create',
    'edit': BASE_URL + DATABASE_PREFIX + '/databases/edit',
    'clone': BASE_URL + DATABASE_PREFIX + '/databases/clone',
    'drop': BASE_URL + DATABASE_PREFIX + '/databases/drop',
    'transfer': BASE_URL + DATABASE_PREFIX + '/databases/transfer',
    'privilegeList': BASE_URL + DATABASE_PREFIX + '/databases/privilegeList',
    'grantPrivilege': BASE_URL + DATABASE_PREFIX + '/databases/grantPrivilege',
    'grantRoles': BASE_URL + DATABASE_PREFIX + '/databases/grantRoles',
    'editPrivileges': BASE_URL + DATABASE_PREFIX + '/databases/editPrivileges',
    'editRoles': BASE_URL + DATABASE_PREFIX + '/databases/editRoles'
  },
  'pipe': {
    'createPipe': BASE_URL + PIPE_PREFIX + '/pipe/start',
    'dropPipe': BASE_URL + PIPE_PREFIX + '/pipe/stop'
  },
  'queryHistory': {
    'queryHistoryList': BASE_URL + QUERYHISTORY_PREFIX + '/queryhistory/select'
  },
  'warehouse': {
    'warehouseList': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/warehouseList',
    'warehouseDetail': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/warehouseDetail',
    'saveWarehouse': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/saveWarehouse',
    'dropWarehouse': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/dropWarehouse',
    'transferOwnership': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/transferOwnership',
    'grantPrivileges': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/grantPrivileges',
    'grantRoles': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/grantRoles',
    'editPrivileges': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/editPrivileges',
    'editRoles': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/editRoles',
    'isOperable': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/isOperable',
    'privilegeList': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/privilegeList',
    'loadActivity': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/load',
    'warehouseListByRole': BASE_URL + WAREHOUSE_PREFIX + '/warehouse/warehouseListByRole'
  },
  'grantsInter': {
    'ablist_insert': BASE_URL + GRANT_PREFIX + '/ablist/createPolicy',
    'ablist_select_data': BASE_URL + GRANT_PREFIX + '/ablist/selectData',
    'ablist_delete_policy': BASE_URL + GRANT_PREFIX + '/ablist/deleteData',
    'ablist_update_policy': BASE_URL + GRANT_PREFIX + '/ablist/editPolicy',
    'ablist_active_policy': BASE_URL + GRANT_PREFIX + '/ablist/isActive',
    'ablist_session_list': BASE_URL + GRANT_PREFIX + '/session/getListByPage',
    'ablist_session_config': BASE_URL + GRANT_PREFIX + '/session/selectBatch',
    'privilege_list': BASE_URL + GRANT_PREFIX + '/grant/privilege/get_by_role',
    'privilege_add': BASE_URL + GRANT_PREFIX + '/grant/privilege/add'
  }
}
