<template>
  <!--  <el-aside width="240px" class="page-aside" :style="{height: screenHeight - 50 - 5 + 'vh'}">-->
  <el-aside width="240px" class="page-aside">
    <el-menu default-active="1"
             unique-opened
             :collapse="false"
             :default-openeds="openeds"
             @open="handleOpen" class="el-menu-vertical-demo">
      <template v-for="item in menuList">
        <el-menu-item v-if="(!item.children || item.children.length === 0)" :key="item.title" :index="item.title"
                      @click="loadComponent(item.component)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <path :d="item.icon"
                  stroke-width="2"
                  stroke-linejoin="round">
            </path>
          </svg>
          <span slot="title" class="aside-menu-font">{{item.title}}</span>
        </el-menu-item>

        <el-submenu v-else :index="item.title" :key="item.title">
          <template slot="title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
              <path :d="item.icon"
                    stroke-width="2"
                    stroke-linejoin="round">
              </path>
            </svg>
            <span class="aside-menu-font">{{item.title}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.title" :key="subItem.title" @click="loadComponent(subItem.component)">
            <span slot="title" class="aside-submenu-font">{{subItem.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>

      <!--workSheets-->
      <!--<el-menu-item index="1"-->
      <!--style="margin-bottom: -12px"-->
      <!--@click="loadComponent('VWorksheets')">-->
      <!--<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">-->
      <!--<path d="M7.99116 1H4C2.89543 1 2 1.89543 2 3V13C2 14.1046 2.89543 15 4 15H11.9912C13.0957 15 13.9912 14.1046 13.9912 13V6.98969M7.99116 1V4.98969C7.99116 6.09426 8.88659 6.98969 9.99116 6.98969H13.9912M7.99116 1C8.09922 1 8.20423 1.0358 8.28979 1.1018L13.2128 4.89953C13.7036 5.2782 13.9912 5.86312 13.9912 6.48309V6.98969"-->
      <!--stroke-width="2"-->
      <!--stroke-linejoin="round">-->
      <!--</path>-->
      <!--</svg>-->
      <!--<span slot="title" class="aside-menu-font">WorkSheets</span>-->
      <!--</el-menu-item>-->
      <!--&lt;!&ndash;data&ndash;&gt;-->
      <!--<el-submenu index="3" style="margin-bottom: -12px">-->
      <!--<template slot="title">-->
      <!--<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">-->
      <!--<path d="M11.0172 5.01192C10.4786 3.4801 9.27949 2.3819 7.5625 2.3819C4.41633 2.3819 3.46814 5.19025 3.64904 6.75388C2.36065 6.75388 1 7.66312 1 9.37689C1 10.8256 2.17525 12 3.625 12H11.5C13.433 12 15 10.4341 15 8.50252C15 5.49545 12.2577 4.92251 11.0172 5.01192Z"-->
      <!--stroke-width="2"-->
      <!--stroke-linejoin="round">-->
      <!--</path>-->
      <!--</svg>-->
      <!--<span class="aside-menu-font">Data</span>-->
      <!--</template>-->
      <!--<el-menu-item index="3-1" style="margin-top: -12px" @click="loadComponent('VDatabasesPanel')">-->
      <!--<span slot="title" class="aside-submenu-font">Database</span>-->
      <!--</el-menu-item>-->
      <!--</el-submenu>-->

      <!--&lt;!&ndash;Compute&ndash;&gt;-->
      <!--<el-submenu index="4" style="margin-bottom: -12px">-->
      <!--<template slot="title">-->
      <!--<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">-->
      <!--<path d="M8.98942 2.02852C8.9894 1.0383 7.70446 0.65038 7.15649 1.47516L2.97249 7.77279C2.53091 8.43745 3.00744 9.32617 3.80542 9.32617H6.63977L6.63985 13.9715C6.63987 14.9617 7.92482 15.3496 8.47278 14.5248L12.6568 8.22719C13.0984 7.56253 12.6218 6.67381 11.8239 6.67381H8.9895L8.98942 2.02852Z"-->
      <!--stroke-width="2"-->
      <!--stroke-linejoin="round">-->
      <!--</path>-->
      <!--</svg>-->
      <!--<span class="aside-menu-font">Compute</span>-->
      <!--</template>-->
      <!--<el-menu-item index="4-1" style="margin-top: -12px" @click="loadComponent('VQueryHistoryTable')">-->
      <!--<span slot="title" class="aside-submenu-font">Query History</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4-2" style="margin-top: -12px" @click="loadComponent('VWarehouseTable')">-->
      <!--<span slot="title" class="aside-submenu-font">Warehouses</span>-->
      <!--</el-menu-item>-->
      <!--</el-submenu>-->

      <!--&lt;!&ndash;Accounts&ndash;&gt;-->
      <!--<el-submenu index="5" style="margin-bottom: -12px">-->
      <!--<template slot="title">-->
      <!--<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#65676C" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">-->
      <!--<circle cx="7.97386" cy="6.57143" r="1.57143" stroke-width="2"></circle>-->
      <!--<path d="M3.97388 12.0914C5.03539 11.1018 6.43717 10.5 7.97388 10.5C9.51059 10.5 10.9124 11.1018 11.9739 12.0914"-->
      <!--stroke-width="2">-->
      <!--</path>-->
      <!--<path d="M2.20437 3.20561L7.18601 1.16171C7.68911 0.946097 8.25859 0.946097 8.76169 1.16171L13.7624 3.20561C14.6095 3.56866 15.1048 4.46385 14.9328 5.3693C14.1678 9.3969 12.3764 15 7.97385 15C3.57127 15 1.79895 9.3969 1.03395 5.3693C0.861972 4.46385 1.35725 3.56866 2.20437 3.20561Z"-->
      <!--stroke-width="2">-->
      <!--</path>-->
      <!--</svg>-->
      <!--<span class="aside-menu-font">Accounts</span>-->
      <!--</template>-->
      <!--&lt;!&ndash;roles&ndash;&gt;-->
      <!--<el-menu-item index="5-1" style="margin-top: -12px" @click="loadComponent('VRolesPanel')">-->
      <!--<span slot="title" class="aside-submenu-font">Roles</span>-->
      <!--</el-menu-item>-->
      <!--&lt;!&ndash;users&ndash;&gt;-->
      <!--<el-menu-item index="5-2" style="margin-top: -12px" @click="loadComponent('VUserPanel')">-->
      <!--<span slot="title" class="aside-submenu-font">Users</span>-->
      <!--</el-menu-item>-->
      <!--&lt;!&ndash;security&ndash;&gt;-->
      <!--<el-menu-item index="5-3" style="margin-top: -12px" @click="loadComponent('VSecurityPanel')">-->
      <!--<span slot="title" class="aside-submenu-font">Security</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="5-4" style="margin-top: -12px" @click="loadComponent('VUsagePanel')">-->
      <!--<span slot="title" class="aside-submenu-font">Usage</span>-->
      <!--</el-menu-item>-->
      <!--</el-submenu>-->
    </el-menu>

    <div :style="{position: 'absolute', top: screenHeight - 20 - 100 + 'px'}">
      <img src="../../assets/image/LOGO2.png" alt="" style="height: 100px; margin-left: 40px">
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'VBaseAside',
  data () {
    return {
      screenHeight: document.documentElement.clientHeight,
      logoUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      currentLoadComponentName: '',
      demo: '',
      openeds: ['WorkSheets', 'Data', 'Compute', 'Accounts'],
      menuList: []
    }
  },
  mounted () {
    this.initData()
  },
  created () {
    window.addEventListener('setItem', () => {
      console.log('setItem')
      this.initData()
    })
  },
  methods: {
    initData () {
      this.$post('api/userres/role/getRolePath', {}).then(
        (response) => {
          if (response.success) {
            this.menuList = response.data
          }
        }
      ).catch(err => {
        console.log('error is {}', err)
        this.menuList = [
          {
            'title': 'WorkSheets',
            'component': 'VWorksheets',
            'icon': 'M7.99116 1H4C2.89543 1 2 1.89543 2 3V13C2 14.1046 2.89543 15 4 15H11.9912C13.0957 15 13.9912 14.1046 13.9912 13V6.98969M7.99116 1V4.98969C7.99116 6.09426 8.88659 6.98969 9.99116 6.98969H13.9912M7.99116 1C8.09922 1 8.20423 1.0358 8.28979 1.1018L13.2128 4.89953C13.7036 5.2782 13.9912 5.86312 13.9912 6.48309V6.98969'
          },
          {
            'title': 'DashBoards',
            'component': 'Dashboard',
            'icon': 'M7.99116 1H4C2.89543 1 2 1.89543 2 3V13C2 14.1046 2.89543 15 4 15H11.9912C13.0957 15 13.9912 14.1046 13.9912 13V6.98969M7.99116 1V4.98969C7.99116 6.09426 8.88659 6.98969 9.99116 6.98969H13.9912M7.99116 1C8.09922 1 8.20423 1.0358 8.28979 1.1018L13.2128 4.89953C13.7036 5.2782 13.9912 5.86312 13.9912 6.48309V6.98969'
          },
          {
            'title': 'Data',
            'icon': 'M11.0172 5.01192C10.4786 3.4801 9.27949 2.3819 7.5625 2.3819C4.41633 2.3819 3.46814 5.19025 3.64904 6.75388C2.36065 6.75388 1 7.66312 1 9.37689C1 10.8256 2.17525 12 3.625 12H11.5C13.433 12 15 10.4341 15 8.50252C15 5.49545 12.2577 4.92251 11.0172 5.01192Z',
            'children': [
              {
                'title': 'Database',
                'component': 'VDatabasesPanel'
              }
            ]
          },
          {
            'title': 'Compute',
            'icon': 'M8.98942 2.02852C8.9894 1.0383 7.70446 0.65038 7.15649 1.47516L2.97249 7.77279C2.53091 8.43745 3.00744 9.32617 3.80542 9.32617H6.63977L6.63985 13.9715C6.63987 14.9617 7.92482 15.3496 8.47278 14.5248L12.6568 8.22719C13.0984 7.56253 12.6218 6.67381 11.8239 6.67381H8.9895L8.98942 2.02852Z',
            'children': [
              {
                'title': 'Query History',
                'component': 'VQueryHistoryTable'
              },
              {
                'title': 'Warehouses',
                'component': 'VWarehouseTable'
              }
            ]
          },
          {
            'title': 'Accounts',
            'icon': 'M2.20437 3.20561L7.18601 1.16171C7.68911 0.946097 8.25859 0.946097 8.76169 1.16171L13.7624 3.20561C14.6095 3.56866 15.1048 4.46385 14.9328 5.3693C14.1678 9.3969 12.3764 15 7.97385 15C3.57127 15 1.79895 9.3969 1.03395 5.3693C0.861972 4.46385 1.35725 3.56866 2.20437 3.20561Z',
            'children': [
              {
                'title': 'Roles',
                'component': 'VRolesPanel'
              },
              {
                'title': 'Users',
                'component': 'VUserPanel'
              },
              {
                'title': 'Security',
                'component': 'VSecurityPanel'
              },
              {
                'title': 'Usage',
                'component': 'VUsagePanel'
              }
            ]
          }
        ]
      })
    },
    loadComponent (componentName) {
      if (componentName === this.currentLoadComponentName) {
        console.log('loadComponent()' + this.currentLoadComponentName + ', so return!')
        return
      }
      this.currentLoadComponentName = componentName
      console.log('loadComponent():' + componentName)
      this.$router.push({name: componentName})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.aside-menu-font {
  font-size: 15px;
  padding-left: 8px;
  /*color: #65676C;*/
  /*font-weight: 600;*/
}

.aside-submenu-font {
  font-size: 15px;
  padding-left: 8px;
  /*color: #65676C;*/
  /*font-weight: 600;*/
}

.page-aside {
  /*height: 80vh;*/
  padding-top: 10px;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>

<style>
.el-menu {
  border-right: none;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item, .el-submenu__title {
  height: 40px;
  line-height: 40px;
  color: #65676c;
}
</style>
