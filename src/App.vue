<template>
  <div id="app">
    <!--    <bootstrap-layout></bootstrap-layout>-->
    <router-view/>
  </div>
</template>

<script>

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// import BootstrapLayout from './components/layout/BootstrapLayout'

export default {
  name: 'App'
  // components: {BootstrapLayout}
}
</script>

<style>
th {
  color: #4b4b4b;
}
body {
  overflow-y: hidden;
}
</style>
