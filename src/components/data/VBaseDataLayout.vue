<template>

        <el-container>
          <el-aside width="240px" class="page-aside">
            <v-data-base-tree :node-click-callback="handleNodeClick">
              <template v-slot:cuxNode="{ node, data }">
                <span v-if="node.level==1"> <i class="el-icon-coin"></i> {{ data.name }}   </span>
                <span v-if="node.level==2">{{ data.name }}   </span>
                <span v-if="node.level==3 && data.vtype=='table'"><i class="el-icon-document"></i>&nbsp;{{  data.name }} </span>
                <span v-if="node.level==3 && data.vtype=='view'"><i class="el-icon-document-copy"></i>&nbsp;{{  data.name }} </span>
                <span v-if="node.level==3 && data.vtype=='pipe'"><i class="el-icon-connection"></i>&nbsp;{{  data.name }} </span>
              </template>
            </v-data-base-tree>
          </el-aside>
          <el-main>
            <router-view :key="guid()"/>
          </el-main>
        </el-container>

</template>

<script>

import { mapState } from 'vuex'
import { VDatabaseInfo, VFunctionInfo, VProceduresInfo, VViewInfo, VStageInfo, VTableInfo, VDataPipelineInfo } from '../../router/ConstPathCfg'
import VDataBaseTree from './common/VDataBaseTree'

//
export default {
  computed: mapState(['services']),
  components: {VDataBaseTree},
  name: 'VBaseDataLayout',
  methods: {
    guid: function () {
      function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    },
    /***
     * node 点击查询，路由router切换
     * @param nodedata
     * @param node
     * @param menu
     * @returns {*|number|void}
     */
    handleNodeClick: function (nodedata, node, menu) {
      console.log('handleNodeClick() : nodeType: layout:' + JSON.stringify(nodedata) + ' node.level: = ' + node.level)
      if (nodedata === undefined) {
        return
      }
      if (node.level === 1) {
        // databases
        return this.$router.push({ name: VDatabaseInfo, params: { ...nodedata } })
      }

      if (node.level === 3) {
        // 查询数据对象objectTyle:(talbes=0,views=1,functions=2,dataPiples=3,produces=4,stages=5)
        console.log('handleNodeClick():level 3:' + JSON.stringify(node.data))
        return this.handleObjectTypeNodeClick(nodedata, node, menu)
      }
    },
    // 根据ObjectTyle 切换类似
    handleObjectTypeNodeClick: function (nodedata, node, menu) {
      console.log('handleObjectTypeNodeClick() : node.data =' + JSON.stringify(node.data))
      let objectType = node.data.vtype
      console.log('handleObjectTypeNodeClick() : node.data.objectTyle:' + objectType)
      // tables
      let dbLabel = node.parent.parent.data.name
      let dbId = node.parent.parent.data.id
      let tableId = node.data.id
      let scLabel = 'schema'
      let tableName = node.data.name
      console.log('******dbLabel:' + dbLabel + ',******tableId:' + tableId + '******tableName:' + tableName)
      console.log('******objectType:' + objectType)

      if (objectType === 'table') {
        return this.$router.push({name: VTableInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, dbId: dbId, scLabel: scLabel, nameLabel: tableName, tableId: tableId}})
      }
      // views
      if (objectType === 'view') {
        return this.$router.push({name: VViewInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, dbId: dbId, scLabel: scLabel, nameLabel: tableName, viewId: tableId}})
      }
      // fucntions
      if (objectType === '2') {
        return this.$router.push({name: VFunctionInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, scLabel: scLabel}})
      }
      // datapiplines
      if (objectType === 'pipe') {
        console.log('******objectType222:' + objectType)
        return this.$router.push({name: VDataPipelineInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, dbId: dbId, scLabel: scLabel, nameLabel: tableName, pipeId: tableId}})
      }
      // producres
      if (objectType === '4') {
        return this.$router.push({name: VProceduresInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, scLabel: scLabel}})
      }
      // stages
      if (objectType === '5') {
        return this.$router.push({name: VStageInfo, params: {...nodedata, level: node.level, dbLabel: dbLabel, scLabel: scLabel}})
      }
    }
  },
  data () {
    return {
      data: [
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      screenHeight: document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
.logo {
  float: left;
  height: 60px;
  display: flex;
  align-items: center;
}
.el-main {
  padding-left: 40px !important;
  padding-right: 40px !important;
  padding-top: 10px;
}
.page-aside {
  /*height: 80vh;*/
  padding-top: 20px;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>

<style>
</style>
