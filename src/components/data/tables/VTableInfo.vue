<template>
  <div>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
    </el-row>
    <el-row align="middle" type="flex" style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="22">
        <div>
          <h1>
            <v-schema-obj-breadcrumb :db-info="{label:$route.params.dbLabel,id:this.$route.params.dbId, name:this.$route.params.dbLabel}" :schema-info="{label:$route.params.nameLabel}" :level="2"/>
          </h1>
        </div>
      </el-col>
      <el-col :span="2">
          <el-dropdown size="small" type="info" click="dropClick">
            <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
              <el-dropdown-item @click.native="cloneDetail()">Clone</el-dropdown-item>
              <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
              <el-dropdown-item @click.native="transferDetail()">Transfer Ownership</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
      <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObj" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
      <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" :dataObject="dataObj" @closeDialogFather="getSonCancelClone"  @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
      <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObj" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
      <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" :dataObject="dataObj" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
    </el-row>
    <el-row>
<!--      <el-col :span="24"><el-tag type="info"><i class="el-icon-document"></i> Table&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-user"></i> testRole&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i> 2020-01-01&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> desc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag></el-col>-->
      <el-col :span="24"><el-tag type="info"><i class="el-icon-document"></i> Table&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-user"></i> {{ tableInfo.createRole === null ? 'testRole': tableInfo.createRole }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i> {{ tableInfo.createTime === null ? 'testRole': tableInfo.createTime | changeTime }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> {{ tableInfo.desc === null ? 'testDesc': tableInfo.desc }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag></el-col>
    </el-row>
    <el-row :span="24">&nbsp;</el-row>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTabName"  @tab-click="handleClick">

          <el-tab-pane label="Table Details" name="detail">
            <el-card class="box-card card-gutter">
              <el-row><h3>Table definition</h3></el-row>
              <el-card :body-style="{ padding: '30px' }">
                <span style="font-size: 10px"> {{ tableInfo.createSql }}</span>
                <div class="popover-card-bottom">
                  <el-button size="mini" @click="openInWorkSheets"><i class="el-icon-thumb icon-style"></i> Open in WorkSheets</el-button>
                  <span v-clipboard:copy="tableInfo.createSql" v-clipboard:success="onCopy">
                      <el-button size="mini" class="button-fillet"><i class="el-icon-document-copy icon-style"></i>Copy</el-button>
                    </span>
                </div>
                </el-card>
              <el-row>&nbsp;</el-row>
            </el-card>
            <el-row>&nbsp;</el-row>
            <v-privileges-panel :dbId="$route.params.dbId" :type="3" :paramId="tableInfo.id" :priData="privilegesData" :roleData="rolesData">
              <template slot="subhead"><i class="el-icon-document"></i> {{tableInfo.name}}</template>
            </v-privileges-panel>
          </el-tab-pane>

          <el-tab-pane label="Columns" name="columns">

            <v-column-list :databaseId="databaseId4Columns" :detailId="tableId4Columns" :classType="tableOrViewType4Columns" :dataObj="columnsList" @dataToFather="getColumnList"></v-column-list>
          </el-tab-pane>

          <el-tab-pane label="Data Preview" name="datas">
            <v-data-list :databaseId="databaseId4Datas" :detailId="tableId4Datas" :classType="tableOrViewType4Datas" :dataObj="dataList" @dataToFather="getDataList"></v-data-list>
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import VShowRouterLabel from '../common/VShowRouterLabel'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'
import VColumnList from './VColumnList'
import VDataList from './VDataList'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VPrivilegesPanel from '../common/VPrivilegesPanel'
import { mapState } from 'vuex'

// tableService
// /**/
export default {
  name: 'VTableInfo',
  computed: mapState(['services']),
  components: {VShowRouterLabel, VSchemaObjBreadcrumb, VColumnList, VDataList, VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VPrivilegesPanel},
  mounted: async function () {
    this.$bus.$on('updateWarehouseDetail', this.updateWarehouseDetail)
    await this.getInfoByID()
    this.$route.params.objectType = '0'
    this.$bus.$emit('updateTreeNodeItem', this.$route.params)
  },
  methods: {
    async getInfoByID () {
      this.databaseId = this.$route.params.dbId
      this.tableId = this.$route.params.tableId
      this.dataObj = {
        id: this.tableId,
        databaseId: this.databaseId,
        schemaId: '',
        type: 'table'
      }
      let dataBaseInfoRes = await this.services.databaseService.getInfoById(this.dataObj)
      if (dataBaseInfoRes.code === 200) {
        // this.tableInfo = JSON.parse(dataBaseInfoRes.data)
        this.tableInfo = dataBaseInfoRes.data
        this.$set(this.dataObj, 'name', this.tableInfo.name)
        this.$set(this.dataObj, 'comment', this.tableInfo.desc)
        // this.privilegesData = JSON.parse(dataBaseInfoRes.data).privileges.privilege
        // this.rolesData = JSON.parse(dataBaseInfoRes.data).privileges.role
        this.privilegesData = dataBaseInfoRes.data.byPrivilege
        this.rolesData = dataBaseInfoRes.data.byRole
      } else {
        this.$message.error('get table info fail !!!')
      }
    },
    async openInWorkSheets () {
      let sqlInfoRes = await this.services.workSheetService.createNewWs(this.tableInfo.createSql)
      if (sqlInfoRes.code === '1') {
        let workSheetId = sqlInfoRes.data.id
        let workSheetTitle = sqlInfoRes.data.title
        let workSheetSql = sqlInfoRes.data.sqlCon
        let routePath = this.$router.resolve({path: '/sqlCode', query: {id: workSheetId, title: workSheetTitle, sqlCon: workSheetSql}})
        window.open(routePath.href, '_blank')
      } else {
        this.$message.error('create new worksheet fail')
      }
    },
    onCopy () {
      this.$message.success('Copied')
    },
    handleClick (tab, event) {
      if (tab.name === 'columns') {
        this.tableOrViewType4Columns = 'table'
        this.databaseId4Columns = this.$route.params.dbId
        this.tableId4Columns = this.$route.params.tableId
        // eslint-disable-next-line eqeqeq
      } else if (tab.name === 'datas') {
        this.tableOrViewType4Datas = 'table'
        this.databaseId4Datas = this.$route.params.dbId
        this.tableId4Datas = this.$route.params.tableId
      }
    },
    getColumnList (val) {
      this.columnList = val
    },
    getDataList (val) {
      this.dataList = val
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
    getSonSureEdit (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        this.getInfoByID()
        this.dialogDataBaseEditVisible = false
      } else {
        this.dialogDataBaseEditVisible = false
        this.$message({
          showClose: true,
          message: 'edit fail: ' + res.message,
          type: 'error'
        })
      }
    },
    getSonCancelClone (val) {
      this.dialogDataBaseCloneVisible = val
    },
    getSonSureClone (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        this.getInfoByID()
        this.dialogDataBaseCloneVisible = false
      } else {
        this.dialogDataBaseCloneVisible = false
        this.$message({
          showClose: true,
          message: 'clone fail: ' + res.message,
          type: 'error'
        })
      }
    },
    getSonCancelDrop (val) {
      this.dialogDataBaseDropVisible = val
    },
    getSonSureDrop (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        this.getInfoByID()
        this.dialogDataBaseDropVisible = false
      } else {
        this.dialogDataBaseDropVisible = false
        this.$message({
          showClose: true,
          message: 'drop fail: ' + res.message,
          type: 'error'
        })
      }
    },
    getSonCancelTransfer (val) {
      this.dialogDataBaseTransferVisible = val
    },
    getSonSureTransfer (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        this.getInfoByID()
        this.dialogDataBaseTransferVisible = false
      } else {
        this.dialogDataBaseTransferVisible = false
        this.$message({
          showClose: true,
          message: 'drop fail: ' + res.message,
          type: 'error'
        })
      }
    },
    async updateWarehouseDetail () {
      await this.getInfoByID()
    }
  },
  data () {
    return {
      databaseId4Columns: '',
      databaseId4Datas: '',
      tableId4Columns: '',
      tableId4Datas: '',
      tableOrViewType4Columns: '',
      tableOrViewType4Datas: '',
      tableInfo: {},
      dataObj: {},
      privilegesData: [],
      rolesData: [],
      columnsList: [],
      dataList: [],
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit Table',
      dialogEditInfo: 'Renaming will require you to update objects that reference this table.',
      dialogCloneTitle: 'Clone Table',
      dialogCloneInfo: 'Create a copy of this table in the system. Cloning a table will create a replica of the structure and data, but will not include the load history.',
      dialogDropTitle: 'Drop Table',
      dialogDropInfo: 'Remove the table TB001 from the system. Dropping a table referenced by a view invalidates the view.',
      tableData: {},
      activeTabName: 'detail',
      formQeryInline: {},
      dialogFormPrivilegeVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.popover-card-bottom {
  margin-top: 30px;
  margin-bottom: 10px;
  float: right
}
.card-gutter {
  margin-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 15px;
}
</style>

<style>
.info {
  background-color: #2c2f34;
  border-color: #2c2f34;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
