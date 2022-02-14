<template>
  <div>

    <el-tree :props="defaultProps"  node-key="id" :load="loadNode" lazy v-on:node-click="nodeClickCallback" :render-content="renderNode" :default-expanded-keys="expandKey" v-if="freshFlag">
          <span  slot-scope="{ node, data }"  class="treenode">
            <slot name="cuxNode" v-bind:node="node" v-bind:data="data"></slot>
            <!--            <span v-if="node.level==1"> <i class="el-icon-coin"></i>{{ node.label }}   </span>-->
            <!--            <span v-if="node.level==2"><i class="el-icon-document-copy"></i>{{ node.label }}   </span>-->
            <!--            <span v-if="node.level==3">{{  node.label }} </span>-->
            <!--            <span v-if="node.level==4">{{  node.label }} </span>-->
          </span>
    </el-tree>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'VDataBaseTree',
  props: {
    nodeClickCallback: Function,
    renderNode: Function,
    loadCallback: Function
  },
  computed: mapState(['services']),
  mounted () {
    this.$bus.$on('updateTreeNode', myMsg => {
      this.expandKey.length = 0
      this.expandKey.push(myMsg)
    })
    this.$bus.$on('updateTreeNodeItem', async myMsg => {
      if (this.chooseNode.level === 0) {
        this.chooseNode.loadData()
      }
      if (this.chooseNode.level === 1) {
        let nodedata = this.chooseNode.childNodes[0] // Tables节点
        if (myMsg.objectType === '1') {
          nodedata = this.chooseNode.childNodes[1] // Views节点
        }
        if (myMsg.objectType === '3') {
          nodedata = this.chooseNode.childNodes[2] // Pipes节点
        }
        nodedata.expanded = true
        nodedata.loadData()
        this.expandKey.length = 0
        this.expandKey.push(myMsg)
      }
    })
  },
  methods: {
    freshTree: function () {
      this.freshFlag = false
      var _this = this
      setTimeout(function () {
        _this.freshFlag = true
      }, 100)
    },
    renderContenFn: function (h, {node, data, store}) {
      /* eslint-disable */
      return (
        1
      )
      /* eslint-disable */

    },
    loadNode: async function (node, resolve) {
      this.chooseNode = node

      if (node.level === 0) {
        // databases
        let data = await this.services.databaseService.queryList({
          databaseId: '',
          schemaId: '',
          type: 'database'
        })
        //resolve(JSON.parse(data.data).list)
        resolve(data.data.list)
        this.$emit('loadCallback')
        return
      }
      if (node.level === 1) {
        let data = this.services.databaseService.querySchemaObjTypleList({...node})
        this.$emit('loadCallback')
        return resolve(data)
      }
      if (node.level === 2) {
        // 查询数据对象objectTyle:(talbes=0,views=1,functions=2,dataPiples=3,produces=4,stages=5)
        return await this.querySchameObjlist(node, resolve)
      }
      if (node.level === 3) {
        resolve([])
      }

    },
    querySchameObjlist: async function (node, resolve) {
      let objectTyle = node['data'].objectTyle
      let dbId = node.parent.data.id
      console.log('querySchameObjlist():' + JSON.stringify(objectTyle) + ',dbid:' + dbId)
      // tables
      if (objectTyle === '0') {
        let data = await this.services.databaseService.queryList({
          databaseId: dbId,
          id: '',
          searchName: '',
          type: 'table'
        })
        this.$emit('loadCallback')
        return resolve(data.data.list)
        //return resolve(JSON.parse(data.data).list)
      }
      if (objectTyle === '1') {
        let data = await this.services.databaseService.queryList({
          databaseId: dbId,
          id: '',
          searchName: '',
          type: 'view'
        })
        this.$emit('loadCallback')
        return resolve(data.data.list)
        //return resolve(JSON.parse(data.data).list)
      }
      if (objectTyle === '2') {
        let data = this.services.databaseService.querySchameFunctionList({...node})
        return resolve(data)
      }
      if (objectTyle === '3') {
        let data = await this.services.databaseService.queryList({
          databaseId: dbId,
          id: '',
          searchName: '',
          type: 'pipe'
        })
        // let data = this.services.databaseService.querySchameDataPiplineList({...node})
        this.$emit('loadCallback')
        return resolve(data.data.list)
      }
      if (objectTyle === '4') {
        let data = this.services.databaseService.querySchameProduceList({...node})
        this.$emit('loadCallback')
        return resolve(data)
      }
      if (objectTyle === '5') {
        let data = this.services.databaseService.querySchameStagesList({...node})
        this.$emit('loadCallback')
        return resolve(data)
      }
    }
  },
  data () {
    return {
      expandKey:[],
      freshFlag: true,
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: (data, node) => {
          if(node.level === 3) {
            return true
          }
        },
      },
      chooseNode: {}
    }
  }
}
</script>

<style>
.treenode {
  font-size:14px
}
</style>
