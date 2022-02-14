<template>
  <!--      左边菜单区域-->
  <nav id="sidebar" class="active1">
    <div class="sidebar-header">
      <img src="@/assets/assetsbootstrap/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">
    </div>
    <ul class="list-unstyled components text-secondary">
      <!--      test demo-->
      <router-link :to="{name:'HelloWorld'}" tag="li">
        <a>
          <i class="fas "></i>
          Demo page
        </a>
      </router-link>
      <!--      Worksheets-->
      <router-link :to="{name:'Worksheets'}" tag="li">
        <a>
          <i class="fas fa-table"></i>
          Worksheets
        </a>
      </router-link>
      <!--      dashboard-->
      <router-link :to="{name:'Dashboard'}" tag="li">
        <a>
          <i class="fas fa-home"></i>
          Dashboard
        </a>
      </router-link>
      <!--      Data 多this.$store级菜单-->
      <data-sidebar></data-sidebar>
      <!--      Compute-->
      <compute-sidebar></compute-sidebar>
      <!--      Authentication 多级菜单-->
      <authentication-sidebar></authentication-sidebar>
      <!--      Common Pages 多级菜单-->
      <common-pages-sidebar></common-pages-sidebar>
      <!--      Account users 多级菜单-->
      <users-sidebar></users-sidebar>
    </ul>
  </nav>
</template>

<script>
import AuthenticationSidebar from './sidebar/AuthenticationSidebar'
import CommonPagesSidebar from './sidebar/CommonPagesSidebar'
import ComputeSidebar from './sidebar/ComputeSidebar'
import DataSidebar from './sidebar/DataSidebar'
import UsersSidebar from './sidebar/UsersSidebar'

import {mapState} from 'vuex'

export default {
  name: 'BootstrapSidebar',
  components: {AuthenticationSidebar, CommonPagesSidebar, ComputeSidebar, DataSidebar, UsersSidebar},
  data: function () {
    return {
      data: 'data1'
    }
  },
  methods: {},
  computed: mapState(['routerPathCfg']),
  created () {
    console.log(this.routerPathCfg)
  }
}
</script>

<style>

</style>
