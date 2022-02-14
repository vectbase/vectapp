<template>
  <div class="wrapper">
    <!--      左边菜单区域-->
    <bootstrap-sidebar></bootstrap-sidebar>

    <div id="body" class="active">

<!--      头部导航栏-->
      <bootstrap-navbar v-show="showBootstrapNavbar.isshowBar"></bootstrap-navbar>

      <div class="content">
        <!--          内容区域组件，动态load-->
        <router-view/>
        <!--          动态组件区域 end-->
      </div>
    </div>

  </div>
</template>

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../../assets/assetsbootstrap/vendor/chartsjs/Chart.min.js'
import '../../assets/assetsbootstrap/js/dashboard-charts.js'
import '../../assets/assetsbootstrap/js/script.js'
import BootstrapSidebar from './BootstrapSidebar'
import BootstrapNavbar from './BootstrapNavbar'
import {mapState} from 'vuex'

export default {
  name: 'BootstrapLayout',
  computed: mapState(['showBootstrapNavbar']),
  components: {BootstrapSidebar, BootstrapNavbar}

}
</script>

<style>

  @import "../../assets/assetsbootstrap/vendor/fontawesome/css/fontawesome.min.css";
  @import "../../assets/assetsbootstrap/vendor/fontawesome/css/solid.min.css";
  @import "../../assets/assetsbootstrap/vendor/fontawesome/css/brands.min.css";
  @import "../../assets/assetsbootstrap/vendor/bootstrap/css/bootstrap.min.css";
  @import "../../assets/assetsbootstrap/vendor/flagiconcss/css/flag-icon.min.css";
  @import "../../assets/assetsbootstrap/css/master.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
