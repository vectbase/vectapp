<template>
  <el-container>
    <el-header height="50px">
      <div class="logo">
        <img src="../../assets/image/LOGO.png"/>
      </div>
      <div style="float: right">
        <VBaseUserProfile></VBaseUserProfile>
      </div>
    </el-header>
    <el-container :style="{height: screenHeight - 50 - 5 + 'px'}">
      <v-base-aside></v-base-aside>
      <el-main v-if="this.$route.fullPath.indexOf('vbasedata')>=0" class="databaseClass">
        <router-view/>
      </el-main>
      <el-main v-else>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import {mapState} from 'vuex'
import VBaseAside from './VBaseAside'
import VBaseUserProfile from './VBaseUserProfile'

export default {
  computed: mapState(['showBootstrapNavbar']),
  components: {VBaseAside, VBaseUserProfile},
  name: 'VBaseLayout',
  data () {
    return {
      screenHeight: document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
.logo {
  float: left;
  height: 50px;
  display: flex;
  align-items: center;
}

</style>

<style>
.el-header {
  margin-bottom: 5px;
  box-shadow: 0 1px 5px 1px rgba(45, 47, 51, 0.10000000149011612);
}
.el-main {
  padding-left: 40px;
  padding-right: 40px;
}
.databaseClass {
  padding-left: 5px;
  padding-right: 0px;
  padding-top: 0px;
}
</style>
