# VectApp

## 前言

```
当snowflake出现时，我们无比兴奋的看到了云上数据服务的曙光和其带来的巨大数据变革。
我们相信数据的流动和碰撞，将会产生巨大的价值！ 
本着致力于加速数据流动的效率、提升数据的价值和降低用户使用数据的门槛难度，我们创办了云上数据服务公司vectbase
我们围绕着snowflake、databricks、airtable等产品展开了调研，决定在第一版中，使用类似snowflake的页面来开发前端产品
遗憾的是，伴随着我们的技术合伙人的离开，我们的创业梦暂告一个段落，我们也不得不为了生活去寻觅工作

现在，我们决定将部分代码开源，希望能够帮助跟我们有着相同梦想的朋友们，在此，感谢我们的老朋友dennis,也感谢所有vectbase的兄弟们！

我们的整体设计思路是snowflake+data fabric，也期望在此设计下，可以创造出全新的databank 
现阶段，我们的架构上依然是存储层、计算层和服务层组成
1) 在存储层中，提供s3/dfs来为用户提供数据存储
2）在计算层中，基于二次修改的clickhouse来提供弹性计算服务
3）在服务层中，在snowflake的架构上，引入了更多的数据治理和隐私安全相关的内容，如基于推荐技术的智能化元数据管理、同态加密、多方安全隐私计算等

未来的数据平台，将不再是我们看到的样子，它将更加高效、更加安全、更加便捷、更加智能，更加有意义！祝好，一切的同行者们
```

## 前端应用框架

公有云（私有云类似）

![publiccloud](https://user-images.githubusercontent.com/15904680/157379400-e0d296f2-534b-4dc8-9b69-d9c4546ed1ad.png)

微服务

![mircoservice](https://user-images.githubusercontent.com/15904680/157379210-4ddc482d-d627-43a3-9ac0-5e3a6977aee9.png)


## 前端效果图

完整视频介绍，请看doc/video目录

入口页面
<img width="1680" alt="vectapp-login" src="https://user-images.githubusercontent.com/15904680/156934464-ede6df30-275b-4344-b472-cb3eb8b7bef1.png">

注册页面
<img width="1680" alt="vectapp-register" src="https://user-images.githubusercontent.com/15904680/156934503-8d206dbc-f4c8-4dd5-b727-ff8e63469034.png">

主页面
<img width="1680" alt="vectapp-main" src="https://user-images.githubusercontent.com/15904680/156934521-5e22b319-1a97-4f45-a21f-7296718bd488.png">

worksheet
<img width="1680" alt="vectapp-worksheet" src="https://user-images.githubusercontent.com/15904680/156934547-a4685b41-3cfe-4148-a34e-5ca7bc2a175c.png">

database
<img width="1680" alt="vectapp-database" src="https://user-images.githubusercontent.com/15904680/156934561-82b65b53-5286-4482-80db-447a86cd3b99.png">
<img width="1680" alt="vectapp-database-2" src="https://user-images.githubusercontent.com/15904680/156934565-83188b08-57d0-4b1b-826e-d03ff94e70c9.png">

查询历史
<img width="1680" alt="vectapp-queryhistory-3" src="https://user-images.githubusercontent.com/15904680/156934637-47e9b51d-774b-4da4-88fa-56b5306e20a3.png">

用户
<img width="1680" alt="vectapp-user-2" src="https://user-images.githubusercontent.com/15904680/156934611-87dd919c-341b-4cf5-92bc-b8f576aae0e3.png">

角色
<img width="1680" alt="vectapp-role-2" src="https://user-images.githubusercontent.com/15904680/156934621-ea4b5bb5-1b4e-4eab-abe8-4e682a4a7f09.png">


## 本地测试前需要准备的工作

因为有安全拦截的存在，在本地调试时，需要将相应代码进行注释，否则无法正常运行页面

1.router
```
# src/router/index.js

// 这地方实现安全拦截
appRouter.beforeEach(async (to, from, next) => {
  console.log('[appRouter] beforeEach() , from: ' + JSON.stringify(from.name) + '  to:' + JSON.stringify(to.name))
  if (to.name !== 'accountLogin' && to.name !== 'userLogin' && to.name !== 'signUp' && !store.state.csrfToken) {
    store.commit('CSRF_TOKEN', await store.state.services.loginService.csrf())
  }
  next()
})

```

2.service
```
# src/services/netService/AxiosService.js

AXIOS.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

AXIOS_Ws.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

AXIOS_UPLOAD.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

AXIOS1.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})


```


## 前端项目的编译

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 说明

### 与后端对接的接口

测试和线上环境切换配置请见 config ，多语种请见 src/i18n ， 无论您是选择java还是go语言作为后端开发，前端页面的接口入口均为：

src/store/URLConst.js
```
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
```

## 待完成

* usage [ 70% ]
* role [ 90% ]
* security [ 90% ]
* dashboard [ 80% ]
* i18n [ 1% ]

## 关于我们

公司网址：http://www.vectbase.com/

