<template>
  <div>
    <el-table
      :data="tableDatabaseList"
      @row-click="clickRow"
      style="width: 100%;font-size:14px" :row-style="{height:'10px'}" :cell-style="{padding:'5px 0'}">
      <!--    label-->
      <el-table-column
        prop="name"
        label="NAME"
        width="200">
        <!--        <template slot-scope="scope">-->
        <!--          <router-link :to="{name:'VDatabaseInfo'}" tag="div">-->
        <!--            <p>-->
        <!--              {{ scope.row.name }}-->
        <!--            </p>-->
        <!--          </router-link>-->
        <!--        </template>-->
      </el-table-column>
      <!--    source-->
      <el-table-column
        prop="source"
        label="SOURCE"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.source==null">NULL</span>
        </template>
      </el-table-column>
      <!--    owner-->
      <el-table-column
        prop="owner"
        label="OWNER">
        <template slot-scope="scope">
          <span v-if="scope.row.owner==null">NULL</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="created"
        label="CREATED">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.created"
                      placement="top"
                      popper-class="tooltip-style"
                      :open-delay="600">
            <span v-show="scope.row.created">{{ scope.row.created | changeTime }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label=""
        width="100"
        align="center">
        <template slot-scope="scope">
          <el-dropdown>
                    <span class="el-dropdown-link">
                      ...
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editDetail(scope.row)">Edit</el-dropdown-item>
              <el-dropdown-item @click.native="cloneDetail(scope.row)">clone</el-dropdown-item>
              <el-dropdown-item @click.native="dropDetail(scope.row)">drop</el-dropdown-item>
              <el-dropdown-item @click.native="transferDetail(scope.row)">Transfer</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <v-data-edit-dialog :isShow="dialogDataBaseEditVisible"  :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
    <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelClone"  @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
    <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
    <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" :dataObject="dataObject" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
  </div>
</template>

<script>

// /**/
import {mapState} from 'vuex'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import {VDatabaseInfo} from '../../../router/ConstPathCfg'

export default {
  name: 'VDatabasesList',
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog},
  props: {
    dataObj: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: mapState(['services']),
  watch: {
    dataObj () {
      this.tableDatabaseList = this.dataObj
      console.log(this.tableDatabaseList.length + '*****')
    }
  },
  mounted: async function () {
    await this.getList()
    this.$emit('dataToFather', this.tableDatabaseList)
  },
  methods: {
    // ...this.services.databaseService
    async getList () {
      let data = await this.services.databaseService.queryList({
        databaseId: '',
        schemaId: '',
        type: 'database',
        searchName: ''
      })
      console.log('&&&&&dataBaseList data: ' + data.data)
      // this.tableDatabaseList = JSON.parse(data.data).list
      this.tableDatabaseList = data.data.list
      for (let item of this.tableDatabaseList) {
        this.$set(item, 'databaseId', item.id)
        this.$set(item, 'id', '')
        this.$set(item, 'type', 'database')
        this.$set(item, 'comment', item.desc)
      }
      console.log('&&&&&dataBaseList length: ' + this.tableDatabaseList.length)
    },
    editDetail (row) {
      console.log('name: ' + row.name)
      this.dataObject = row
      this.dialogDataBaseEditVisible = true
    },
    cloneDetail (row) {
      console.log('name: ' + row.name)
      this.dataObject = row
      this.dialogDataBaseCloneVisible = true
    },
    dropDetail (row) {
      console.log('name: ' + row.name)
      this.dataObject = row
      this.dialogDataBaseDropVisible = true
    },
    transferDetail (row) {
      console.log('name: ' + JSON.stringify(row))
      this.dataObject = row
      this.dialogDataBaseTransferVisible = true
    },
    getSonCancelEdit (val) {
      this.dialogDataBaseEditVisible = val
    },
    async getSonSureEdit (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        await this.getList()
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
    async getSonSureClone (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        await this.getList()
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
    async getSonSureDrop (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        await this.getList()
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
    async getSonSureTransfer (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        await this.getList()
        this.dialogDataBaseTransferVisible = false
      } else {
        this.dialogDataBaseTransferVisible = false
        this.$message({
          showClose: true,
          message: 'transfer fail: ' + res.message,
          type: 'error'
        })
      }
    },
    clickRow (row) {
      row.id = row.databaseId
      this.$router.push({ name: VDatabaseInfo, params: row })
    }
  },
  data () {
    return {
      dataObject: {},
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      labelPosition: 'right',
      dialogFormVisible: false,
      dialogEditTitle: 'Edit Database',
      dialogEditInfo: 'Renaming will require you to update objects that reference this database.',
      dialogCloneTitle: 'Clone Database',
      dialogCloneInfo: 'Create a copy of this database in the system. All contents except for external tables and internal stages will be copied.',
      dialogDropTitle: 'Drop Database',
      dialogDropInfo: 'Remove the database DEMO_DB from the system. A version will be retained in Time Travel for a specified amount of time.',
      createdDBform: {
        name: '',
        comment: ''
      },
      tableDatabaseList: [],
      form: {
        name: '',
        command: ''
      }
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
  font-size: 14px;
  color: #65676c;
}
</style>
