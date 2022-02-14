<template>
  <div v-if="columnsListLength==0">
    <el-empty :image-size="200"  description="No datas">
    </el-empty>
    </div>
  <div v-else-if ="columnsListLength>0">
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :span="8">
        <div style="padding-left: 5px">
          <h4>  {{ columnsList.length }} columns</h4>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="float: right;">
          <v-search-input @dataToFather="getSearchValue"></v-search-input>
          <el-button size="mini" class="filtrate-button" @click="refresh">
            <i class="el-icon-refresh-right"></i>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="columnsList"
      style="width: 100%"
      :default-sort = "{prop: 'name', order: 'descending'}"
    >
      <el-table-column
        prop="name"
        label="NAME"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="TYPE">
      </el-table-column>
      <el-table-column
        prop="nullable"
        label="NULLABLE">
        <template slot-scope="scope">
          <span v-if="scope.row.nullable==null">NULL</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="default"
        label="DEFAULT">
        <template slot-scope="scope">
          <span v-if="scope.row.default==null">NULL</span>
        </template>
      </el-table-column>
      <el-table-column
        label="">
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="Comment for this pipe">
          <i class="el-icon-document" slot="reference"></i>
        </el-popover>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VSearchInput from '../common/VSearchInput'

export default {
  name: 'VColumnList',
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VSearchInput},
  props: {
    dataObj: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    databaseId: {
      type: String,
      default: ''
    },
    detailId: {
      type: String,
      default: ''
    },
    classType: {
      type: String,
      default: ''
    }
  },
  watch: {
    classType () {
      this.tableOrViewType = this.classType
      console.log('*** watch : vcolumnsList : classType:' + this.tableOrViewType)
    },
    databaseId () {
      this.dbId = this.databaseId
      console.log('*** watch : vcolumnsList : dbId:' + this.dbId)
    },
    async detailId () {
      this.tableOrViewId = this.detailId
      console.log('*** watch : vcolumnsList : tableOrViewId:' + this.tableOrViewId)
      let listInfo = await this.services.databaseService.getColumnsList({
        id: this.tableOrViewId,
        databaseId: this.dbId,
        schemaId: '',
        type: this.tableOrViewType
      })
      console.log('****** columnsInfo:' + listInfo.data)
      // this.columnsList = JSON.parse(listInfo.data).list
      this.columnsList = listInfo.data.list
      this.columnsAllList = this.columnsList
      this.columnsListLength = this.columnsList.length
    },
    dataObj () {
      this.columnsList = this.dataObj
      this.columnsAllList = this.columnsList
      console.log('*** watch : vcolumnsList : dataObj:' + this.columnsList)
    }
  },
  computed: mapState(['services']),
  mounted: function () {
  },
  data () {
    return {
      tableOrViewType: '',
      dbId: '',
      tableOrViewId: '',
      columnsList: [],
      columnsListLength: -1,
      columnsAllList: [],
      searchName: '',
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit View',
      dialogEditInfo: 'Renaming will require you to update objects that reference this view.',
      dialogDropTitle: 'Drop View',
      dialogDropInfo: 'RRemove the view APPLICABLE_ROLES from the system. Dropped views cannot be recovered.'
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
    },
    getSearchValue (val) {
      this.searchName = val
      this.filterData()
    },
    filterData () {
      this.columnsList = this.columnsAllList
      console.log('**** columnsList:' + this.columnsList.length)
      if (this.searchName !== null && this.searchName.trim() !== '' && this.columnsList.length > 0) {
        this.columnsList = this.columnsList.filter(database => {
          return database.name.indexOf(this.searchName) === 0
        })
      }
    },
    refresh () {
      this.filterData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
