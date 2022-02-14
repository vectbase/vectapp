<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'VDatabasesPanel' }">DataBase</el-breadcrumb-item>
      <el-breadcrumb-item v-if="level==1">{{ dbInfo.label }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="level==2" :to="{ name: 'VDatabaseInfo',params:{ ...dbInfo } }">{{ dbInfo.label }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="level==2" > {{ schemaInfo.label }}</el-breadcrumb-item>
<!--      <el-breadcrumb-item :to="{ name: 'VSchemaInfo',params:{ ...schemaInfo }  }" v-if="schemaInfo">{{ schemaInfo.label }}</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
</template>

<script>

// /**/
export default {
  name: 'VSchemaObjBreadcrumb',
  props: {dbInfo: Object, schemaInfo: Object, level: Number},
  mounted: function () {
    console.log('VSchemaObjBreadcrumb , mounted() $route.params scLabel:=' + JSON.stringify(this.$route.params))
    this.initparams()
  },
  methods: {
    initparams () {
      this.dbLabel = this.$route.params.dbLabel
      this.schemaLabel = this.$route.params.scLabel
    }
  },
  data () {
    return {
      dbLabel: '',
      schemaLabel: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
