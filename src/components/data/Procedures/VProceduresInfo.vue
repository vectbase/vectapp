<template>
  <div>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
      <v-schema-obj-breadcrumb :db-info="{label:$route.params.dbLabel}" :schema-info="{label:$route.params.scLabel}"/>

    </el-row>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="20">
        <div>
          <v-show-router-label/>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus">Created</el-button>
      </el-col>
      <el-col :span="24">
        <el-divider style="height: 5px"></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-button round size="mini" type="info" plain disabled>Table</el-button>
      <el-button size="mini" round type="info" plain disabled>SYSADMIN</el-button>
      <el-button size="mini" round type="info" plain disabled>4 weeks ago</el-button>
      <el-button size="mini" round type="info" plain disabled>0 rows</el-button>
      <el-button size="mini" round type="info" plain disabled>0 kB</el-button>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTabName"  @tab-click="handleClick">
          <el-tab-pane label="Table Details" name="Table_Details">
            <el-card class="box-card">
              <div v-for="o in 4" :key="o" class="text item">
                {{'Details ' + o }}
              </div>
            </el-card>

          </el-tab-pane>
          <el-tab-pane label="Columns" name="Tables">

            Columns
          </el-tab-pane>
          <el-tab-pane label="Data Preview" name="Data_Preview">
            Data Preview
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import VShowRouterLabel from '../common/VShowRouterLabel'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'

// /**/
export default {
  name: 'VProceduresInfo',
  components: {VShowRouterLabel, VSchemaObjBreadcrumb},
  mounted: function () {
  },
  methods: {
    handleClick () {}
  },
  data () {
    return {
      tableData: {},
      activeTabName: 'Table_Details',
      formQeryInline: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
