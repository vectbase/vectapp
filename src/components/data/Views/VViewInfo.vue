<template>
  <div>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
    </el-row>
    <el-row align="middle" type="flex" style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="22">
        <div>
          <h1>
            <v-schema-obj-breadcrumb :db-info="{label:$route.params.dbLabel}" :schema-info="{label:$route.params.nameLabel}"/>
          </h1>
        </div>
      </el-col>
      <el-col :span="2">
          <el-dropdown size="small" type="info" click="dropClick">
            <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
              <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
              <el-dropdown-item @click.native="transferDetail()">Transfer Ownership</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
      <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObj" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
      <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObj" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
      <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" :dataObject="dataObj" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
    </el-row>
    <el-row>
      <el-col :span="24"><el-tag type="info"><i class="el-icon-document-copy"></i> View&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> {{ viewInfo.desc }}</el-tag></el-col>
    </el-row>
    <el-row :span="24">&nbsp;</el-row>

    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTabName"  @tab-click="handleClick">

          <el-tab-pane label="Columns" name="Columns">
            <v-column-list :databaseId="databaseId4Columns" :detailId="viewId4" :classType="tableOrViewType4Columns" :dataObj="columnsList" @dataToFather="getColumnList"></v-column-list>
          </el-tab-pane>
          <el-tab-pane label="Data Preview" name="Data_Preview">
            <v-data-list :databaseId="databaseId4Datas" :detailId="viewId4Datas" :classType="tableOrViewType4Datas" :dataObj="dataList" @dataToFather="getDataList"></v-data-list>
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import VShowRouterLabel from '../common/VShowRouterLabel'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'
import VColumnList from '../tables/VColumnList'
import VDataList from '../tables/VDataList'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import { mapState } from 'vuex'

// /**/
export default {
  name: 'VViewInfo',
  computed: mapState(['services']),
  components: {VShowRouterLabel, VSchemaObjBreadcrumb, VColumnList, VDataList, VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog},
  mounted: async function () {
    await this.getInfoByID()
    this.databaseId4Columns = this.$route.params.dbId
    this.viewId4 = this.$route.params.viewId
    this.tableOrViewType4Columns = 'view'
    let dataBaseInfoRes = await this.services.databaseService.getColumnsList({
      id: this.viewId4,
      databaseId: this.databaseId4Columns,
      schemaId: '',
      type: this.tableOrViewType4Columns
    })
    // this.columnsList = JSON.parse(dataBaseInfoRes.data).list
    this.columnsList = dataBaseInfoRes.data.list
    this.$route.params.objectType = '1'
    this.$bus.$emit('updateTreeNodeItem', this.$route.params)
  },
  methods: {
    async getInfoByID () {
      this.databaseId = this.$route.params.dbId
      this.viewId = this.$route.params.viewId
      this.dataObj = {
        id: this.viewId,
        databaseId: this.databaseId,
        schemaId: '',
        type: 'view'
      }
      let dataBaseInfoRes = await this.services.databaseService.getInfoById(this.dataObj)
      this.viewInfo = dataBaseInfoRes.data
      this.$set(this.dataObj, 'name', this.viewInfo.name)
      this.$set(this.dataObj, 'comment', this.viewInfo.desc)
    },
    handleClick  (tab, event) {
      // eslint-disable-next-line eqeqeq
      if (tab.index == 1) {
        this.databaseId4Datas = this.$route.params.dbId
        this.viewId4Datas = this.$route.params.viewId
        this.tableOrViewType4Datas = 'view'
      }
    },
    getDataList (val) {
      this.dataList = val
    },
    getColumnList (val) {
      this.columnsList = val
    },
    editDetail () {
      console.log('editDetail !!! ')
      this.dialogDataBaseEditVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseEditVisible)
    },
    cloneDetail () {
      console.log('cloneDetail !!! ')
      this.dialogDataBaseCloneVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseCloneVisible)
    },
    dropDetail () {
      console.log('dropDetail !!! ')
      this.dialogDataBaseDropVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseDropVisible)
    },
    transferDetail () {
      console.log('transferDetail !!! ')
      this.dialogDataBaseTransferVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseTransferVisible)
    },
    getSonCancelEdit (val) {
      this.dialogDataBaseEditVisible = val
    },
    getSonSureEdit () {
      this.dialogDataBaseEditVisible = false
    },
    getSonCancelDrop (val) {
      this.dialogDataBaseDropVisible = val
    },
    getSonSureDrop () {
      this.dialogDataBaseDropVisible = false
    },
    getSonCancelTransfer (val) {
      this.dialogDataBaseTransferVisible = val
    },
    getSonSureTransfer () {
      this.dialogDataBaseTransferVisible = false
    }
  },
  data () {
    return {
      databaseId4Columns: '',
      databaseId4Datas: '',
      viewId4: '',
      viewId4Datas: '',
      tableOrViewType4Columns: '',
      tableOrViewType4Datas: '',
      viewInfo: {},
      dataObj: {},
      columnsList: [],
      dataList: [],
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit View',
      dialogEditInfo: 'Renaming will require you to update objects that reference this view.',
      dialogDropTitle: 'Drop View',
      dialogDropInfo: 'RRemove the view APPLICABLE_ROLES from the system. Dropped views cannot be recovered.',
      viewColumns: [],
      tableData: [{
        name: 'GRANTEE',
        type: 'VARCHAR(16777216)',
        nullable: 'Yes',
        default: 'NULL'
      }, {
        name: 'IS_GRANTABLE',
        type: 'TIMESTAMP_LTZ(9)',
        nullable: 'Yes',
        default: 'NULL'
      }, {
        name: 'ROLE_NAME',
        type: 'VARCHAR(16777216)',
        nullable: 'No',
        default: 'NULL'
      }, {
        name: 'ROLE_OWNER',
        type: 'VARCHAR(16777216)',
        nullable: 'Yes',
        default: 'NULL'
      }],
      activeTabName: 'Columns',
      formQeryInline: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
