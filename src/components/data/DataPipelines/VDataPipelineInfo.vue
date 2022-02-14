<template>
  <div>

    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
    </el-row>
    <el-row align="middle" type="flex" style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="22">
        <div>
          <h1>
            <v-schema-obj-breadcrumb :db-info="{label:$route.params.dbLabel}" :schema-info="{label:$route.params.nameLabel}" :level="2"/>
          </h1>
        </div>
      </el-col>
      <el-col :span="2">
        <el-dropdown size="small" type="info" click="dropClick">
          <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
            <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
      <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
    </el-row>
    <el-row>
      <el-col :span="24"><el-tag type="info"><i class="el-icon-connection"></i> Pipe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-user"></i>
        {{ pipeLineDetail.createRole }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i> {{ pipeLineDetail.createTime | changeTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> {{ pipeLineDetail.desc }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag></el-col>
    </el-row>
    <el-row :span="24">&nbsp;</el-row>
    <el-row>
    <el-col :span="24">
      <el-card class="box-card card-gutter">
        <el-row>
          <el-col :span="24">
            <div class="details-name">Details</div>
          </el-col>
        </el-row>
        <div class="details-item-row">
          <el-row>
            <el-col :span="8">
              <div class="details-item-cell-top">Status</div>
              <!--v-if解决控制台渲染报错问题-->
              <div class="details-item-cell-bottom" >{{ pipeLineDetail.status }}</div>
            </el-col>
            <el-col :span="8">
              <div class="details-item-cell-top">WareHouse</div>
              <!--v-if解决控制台渲染报错问题-->
              <div class="details-item-cell-bottom" >{{ pipeLineDetail. warehouse}}</div>
            </el-col>
            <el-col :span="8">
              <div class="details-item-cell-top">Data Destination</div>
              <div class="details-item-cell-bottom">{{ pipeLineDetail.dataDestination }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="details-item-row">
          <el-row>
            <el-col :span="8">
              <div class="details-item-cell-top">Source type</div>
              <div class="details-item-cell-bottom">{{ pipeLineDetail.sourceType }}</div>
            </el-col>
            <el-col :span="8">
              <div class="details-item-cell-top">Source Detail</div>
              <div class="details-item-cell-bottom" >pipeLineDetail.sourceDetail（之后再改值）</div>
            </el-col>
          </el-row>
        </div>
        <div class="details-item-row">
          <el-row>
            <el-col :span="8">
              <div class="details-item-cell-top">File Format</div>
              <div class="details-item-cell-bottom">{{ pipeLineDetail.fileFormat }}</div>
            </el-col>
            <el-col :span="8">
              <div class="details-item-cell-top">File Detail</div>
              <div class="details-item-cell-bottom">{{ pipeLineDetail.fileDetail }}</div>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="8">
            <div class="details-item-cell-top">Scheduler</div>
            <div class="details-item-cell-bottom">
              {{ pipeLineDetail.scheduler }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="details-item-cell-top">Encryption</div>
            <div class="details-item-cell-bottom">{{ pipeLineDetail.encryption }}</div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    </el-row>
    <el-row>&nbsp;</el-row>
    <v-privileges-panel :dbId="$route.params.dbId" :type="4" :paramId="pipeLineDetail.id" :priData="privilegesData" :roleData="rolesData">
      <template slot="subhead"><i class="el-icon-connection"></i> {{pipeLineDetail.name}}</template>
    </v-privileges-panel>
  </div>
</template>

<script>

import VShowRouterLabel from '../common/VShowRouterLabel'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VPrivilegesPanel from '../common/VPrivilegesPanel'
import { mapState } from 'vuex'

// /**/
export default {
  name: 'VDataPipelineInfo',
  components: { VShowRouterLabel, VSchemaObjBreadcrumb, VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VPrivilegesPanel },
  computed: mapState(['services']),
  mounted: async function () {
    this.$bus.$on('updateWarehouseDetail', this.updateWarehouseDetail)
    await this.getInfoByID()
    this.$route.params.objectType = '3'
    this.$bus.$emit('updateTreeNodeItem', this.$route.params)
  },
  methods: {
    async getInfoByID () {
      this.databaseId = this.$route.params.dbId
      this.pipeId = this.$route.params.pipeId
      this.dataObj = {
        id: this.pipeId,
        databaseId: this.databaseId,
        schemaId: '',
        type: 'pipe'
      }
      let dataBaseInfoRes = await this.services.databaseService.getInfoById(this.dataObj)
      this.pipeLineDetail = dataBaseInfoRes.data
      this.$set(this.dataObj, 'name', this.pipeLineDetail.name)
      this.$set(this.dataObj, 'comment', this.pipeLineDetail.desc)
      // this.privilegesData = JSON.parse(dataBaseInfoRes.data).privileges.privilege
      // this.rolesData = JSON.parse(dataBaseInfoRes.data).privileges.role
      this.privilegesData = dataBaseInfoRes.data.byPrivilege
      this.rolesData = dataBaseInfoRes.data.byRole
    },
    handleClick () {},
    editDetail () {
      console.log('editDetail !!! ')
      this.dialogDataBaseEditVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseEditVisible)
    },
    dropDetail () {
      console.log('dropDetail !!! ')
      this.dialogDataBaseDropVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseDropVisible)
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
    async updateWarehouseDetail () {
      await this.getInfoByID()
    }
  },
  data () {
    return {
      privilegesData: [],
      rolesData: [],
      columnsList: [],
      dataList: [],
      dialogDataBaseEditVisible: false,
      dialogDataBaseDropVisible: false,
      dialogEditTitle: 'Edit Table',
      dialogEditInfo: 'Renaming will require you to update objects that reference this table.',
      dialogDropTitle: 'Drop Table',
      dialogDropInfo: 'Remove the table TB001 from the system. Dropping a table referenced by a view invalidates the view.',
      tableData: {},
      activeTabName: 'Table_Details',
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
      },
      pipeLineDetail: {
        // status: 'Running',
        // wareHouse: 'DEMO',
        // destination: 'Table A',
        // sourceType: 'Local',
        // sourceDetail: '/home/red/Desktop/demo.csv',
        // fileFormat: 'CSV',
        // fileDetail: 'Compression:null;',
        // scheduler: '0 */1 * * * ?',
        // encryption: 'RES'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.card-gutter {
  margin-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 15px;
}

.details-name {
  font-weight: 700;
  font-size: 20px;
  color: #2c2f34;
  /*margin-left: 10px;*/
  margin-bottom: 20px;
}

.details-item-cell-top {
  font-size: 12px;
  color: #65676c;
  margin-bottom: 10px;
}

.details-item-cell-bottom {
  font-size: 12px;
  font-weight: bold;
  color: #2c2f34;
}

.details-item-row {
  margin-bottom: 25px;
  font-size: 12px;
}
</style>
