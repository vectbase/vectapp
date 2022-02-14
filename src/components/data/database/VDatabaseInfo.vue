<template>
  <div>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
    </el-row>
    <el-row align="middle" type="flex" style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="18">
        <div>
          <h1>
            <v-schema-obj-breadcrumb :db-info="{label:$route.params.name}" :schema-info="{label:''}" :level="1"/>
          </h1>
        </div>
      </el-col>
      <el-col :span="2">
        <el-dropdown size="small" type="info">
          <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
            <el-dropdown-item @click.native="cloneDetail()">Clone</el-dropdown-item>
            <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
            <el-dropdown-item @click.native="transferDetail()">Transfer Ownership</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <v-data-table-view-dialog :isShow="dialogDataTableViewVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObj" :create-type="dialogDataTableViewType"
                          @closeDialogFather="getSonCancelTableView" @sureDialogFather="getSonSureTableView"></v-data-table-view-dialog>
      <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObj"
                          @closeDialogFather="getSonCancelEdit" @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
      <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" :dataObject="dataObj"
                           @closeDialogFather="getSonCancelClone"
                           @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
      <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObj"
                          @closeDialogFather="getSonCancelDrop" @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
      <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" :dataObject="dataObj" @closeDialogFather="getSonCancelTransfer"
                              @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
      <v-create-pipe-line-dialog :isShow="dialogCreatePipeVisible" title="New Pipe"
                                 @closeDialogFather="getSonCancelCreatePipe"
                                 @sureDialogFather="getSonSureCreatePipe"></v-create-pipe-line-dialog>
      <el-col :span="4">
        <el-dropdown trigger="click" :hide-on-click="false" ref="dropdownLevelOne">
          <el-button type="primary" size="small">
            Create<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="item in options" :key="item.label">
              <el-dropdown-item v-if='!item.children' @click.native="createElementLevelOne(item.value)">
                {{ item.label }}
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <el-dropdown placement="left">
                  <span class="el-dropdown-link">{{ item.label }}&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <div v-for='items in item.children' :key="items.label">
                      <el-dropdown-item @click.native="createElementLevelTwo(items.value,items.type)">
                        {{ items.label }}
                      </el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-tag type="info"><i class="el-icon-coin"></i> Database&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
          class="el-icon-user"></i> {{ dataBaseInfo.createRole }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i>
          {{ dataBaseInfo.createTime | changeTime }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> {{ dataBaseInfo.desc }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-tag>
      </el-col>
    </el-row>
    <el-row :span="24">&nbsp;</el-row>
    <!--      <el-tag type="info">Database</el-tag>-->
    <el-row>
      <!--      <el-divider style="height: 5px"></el-divider>-->
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTabName" @tab-click="handleClick">
          <el-tab-pane label="Database Details" name="DatabaseDetailsTab_1">
            <v-privileges-panel :dbId="$route.params.id" :type="2" :paramId="databaseId" :priData="privilegesData" :roleData="rolesData">
              <template slot="subhead"><i class="el-icon-coin"></i> {{dataBaseInfo.name}}</template>
            </v-privileges-panel>

          </el-tab-pane>
          <el-tab-pane label="Tables" name="tables">
            <el-row style="margin: 1px">
              <el-col :span="24">
                <v-table-list :databaseId="databaseId4Tables" :databaseName="dataBaseInfo.name" :dataObj="tableList" @dataToFather="getTableList"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Views" name="views">
            <el-row style="margin: 1px">
              <el-col :span="24">
                <v-view-list :databaseId="databaseId4Views" :databaseName="dataBaseInfo.name" :dataObj="viewList" @dataToFather="getViewList"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Pipes" name="pipes">
            <el-row style="margin: 1px">
              <el-col :span="24">
                <v-pipe-list :databaseId="databaseId4Pipes" :databaseName="dataBaseInfo.name" :dataObj="pipeList" @dataToFather="getPipeList"/>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// /**/
import {mapState} from 'vuex'
import VTableList from '../schema/VTableList'
import VViewList from '../schema/VViewList'
import VPipeList from '../schema/VPipeList'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VDataTableViewDialog from '../common/VDataTableViewDialog'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'
import VPrivilegesPanel from '../common/VPrivilegesPanel'
import VCreatePipeLineDialog from './VCreatePipeLineDialog'

export default {
  name: 'VDatabaseInfo',
  components: {
    VSchemaObjBreadcrumb,
    VTableList,
    VViewList,
    VPipeList,
    VDataEditDialog,
    VDataCloneDialog,
    VDataDropDialog,
    VDataTransferDialog,
    VPrivilegesPanel,
    VCreatePipeLineDialog,
    VDataTableViewDialog
  },
  computed: mapState(['services']),
  mounted: async function () {
    this.$bus.$on('updateWarehouseDetail', this.updateWarehouseDetail)
    await this.getInfoByID()
    this.$bus.$emit('updateTreeNode', this.$route.params.id)
  },
  methods: {
    async getInfoByID () {
      let databaseId = this.$route.params.id
      this.dataObj = {
        id: '',
        databaseId: databaseId,
        schemaId: '',
        type: 'database'
      }
      let dataBaseInfoRes = await this.services.databaseService.getInfoById(this.dataObj)
      this.dataBaseInfo = dataBaseInfoRes.data
      this.$set(this.dataObj, 'name', this.dataBaseInfo.name)
      this.$set(this.dataObj, 'comment', this.dataBaseInfo.desc)
      this.privilegesData = dataBaseInfoRes.data.byPrivilege
      this.rolesData = dataBaseInfoRes.data.byRole
    },
    handleClick (tab, event) {
      console.log('database：tab.index:' + tab.index)
      // eslint-disable-next-line eqeqeq
      if (tab.index == 1) {
        this.databaseId4Tables = this.$route.params.id
        // eslint-disable-next-line eqeqeq
      } else if (tab.index == 2) {
        this.databaseId4Views = this.$route.params.id
        // eslint-disable-next-line eqeqeq
      } else if (tab.index == 3) {
        this.databaseId4Pipes = this.$route.params.id
      }
    },
    handleChange (value) {
      console.log(value)
    },
    createElementLevelOne (val) {
      this.$refs.dropdownLevelOne.hide()
      this.dialogCreatePipeVisible = true
      console.log('*****createElementLevelOne :' + val)
    },
    createElementLevelTwo (val1, val2) {
      console.log('*****createElementLevelTwo :' + val1 + ',***' + val2)
      this.$refs.dropdownLevelOne.hide()
      this.dialogDataTableViewVisible = true
      this.dialogDataTableViewType = val2
    },
    getTableList (val) {
      this.tableList = val
    },
    getViewList (val) {
      this.viewList = val
    },
    getPipeList (val) {
      this.pipeList = val
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
    getSonCancelCreatePipe (val) {
      this.dialogCreatePipeVisible = val
    },
    getSonSureCreatePipe () {
      this.dialogCreatePipeVisible = false
    },
    getSonCancelTableView (val) {
      this.dialogDataTableViewVisible = val
    },
    getSonSureTableView (val) {
      this.dialogDataTableViewVisible = false
    },
    async updateWarehouseDetail () {
      await this.getInfoByID()
    }
  },
  data () {
    return {
      databaseId: '',
      databaseId4Tables: '',
      databaseId4Views: '',
      databaseId4Pipes: '',
      dataBaseInfo: {},
      dataObj: {},
      tableList: [],
      viewList: [],
      pipeList: [],
      value: [],
      options: [{
        value: 'table',
        label: 'Table',
        children: [{
          value: 'standard',
          label: 'Standard',
          type: '1'
        },
        {
          value: 'asSelect',
          label: 'As Select',
          type: '2'
        },
        {
          value: 'external',
          label: 'External',
          type: '3'
        }
        ]
      },
      {
        value: 'view',
        label: 'View',
        children: [{
          value: 'standard',
          label: 'Standard',
          type: '4'
        },
        {
          value: 'materialized',
          label: 'Materialized',
          type: '5'
        },
        {
          value: 'secure',
          label: 'Secure',
          type: '6'
        },
        {
          value: 'secureMaterialized',
          label: 'Secure Materialized',
          type: '7'
        }
        ]
      },
      {
        value: 'pipe',
        label: 'Pipe'
      }],
      dialogDataBaseCreateVisible: false,
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogCreatePipeVisible: false,
      dialogDataTableViewVisible: false,
      dialogEditTitle: 'Edit Database',
      dialogEditInfo: 'Renaming will require you to update objects that reference this database.',
      dialogCloneTitle: 'Clone Database',
      dialogCloneInfo: 'Create a copy of this database in the system. All contents except for external tables and internal stages will be copied.',
      dialogDropTitle: 'Drop Database',
      dialogDropInfo: 'Remove the database DEMO_DB from the system. A version will be retained in Time Travel for a specified amount of time.',
      activeTabName: 'DatabaseDetailsTab_1',
      formQeryInline: {},
      privilegesData: [],
      rolesData: [],
      dialogDataTableViewType: '0'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.relationContainer {
  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
  font-size: 12px;
  color: #65676c;
}

.customWidth {
  width: 60%;
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

.el-cascader-menu {
  height: 150px;
}

.el-cascader .el-input .el-input__inner {
  background: #409EFF;
  color: white;
}
</style>
