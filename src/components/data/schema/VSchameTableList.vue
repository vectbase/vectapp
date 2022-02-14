<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;font-size:10px"
      :row-style="{height:'10px'}"
      :cell-style="{padding:'5px 0'}"
      :fit="true"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >

      <el-table-column
        prop="Name"
        label="Name"
        sortable>
        <template slot-scope="scope">
          <router-link :to="{name:'VSchemaInfo'}" tag="div">
            <p>
              {{ scope.row.Name }}
            </p>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="Owner"
        label="Owner">
      </el-table-column>
      <el-table-column
        prop="Created"
        label="Created">
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <el-dropdown size="small" type="info" click="dropClick">
            <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
              <el-dropdown-item @click.native="cloneDetail()">Clone</el-dropdown-item>
              <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
              <el-dropdown-item @click.native="transferDetail()">Transfer Ownership</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
    <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" @closeDialogFather="getSonCancelClone"  @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
    <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
    <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
 </div>
</template>

<script>

// /**/
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'

export default {
  name: 'VSchameTableList',
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog},
  mounted: function () {
  },
  data () {
    return {
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit Schema',
      dialogEditInfo: 'Renaming will require you to update objects that reference this schema.',
      dialogCloneTitle: 'Clone Schema',
      dialogCloneInfo: 'Create a copy of this schema in the system. All contents except for external tables and internal stages will be copied.',
      dialogDropTitle: 'Drop Schema',
      dialogDropInfo: 'Remove the schema INFORMATION_SCHEMA from the system. A version will be retained in Time Travel for a specified amount of time.',

      tableData: [{
        Created: '2016-05-02',
        Owner: '王小虎',
        Name: 'SChame1'
      }, {
        Created: '2016-05-04',
        Owner: '王小虎',
        Name: '上SChame12'
      }, {
        Created: '2016-05-01',
        Owner: '王小虎',
        Name: 'SChame122'
      }, {
        Created: '2016-05-03',
        Owner: '王小虎',
        Name: '22SChame1'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
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
    getSonCancelClone (val) {
      this.dialogDataBaseCloneVisible = val
    },
    getSonSureClone () {
      this.dialogDataBaseCloneVisible = false
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
