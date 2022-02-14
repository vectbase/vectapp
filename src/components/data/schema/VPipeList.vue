<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :span="8">
        <div style="padding-left: 5px">
          <h4>  {{pipeList.length}} Pipes</h4>
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
    <el-row style="margin: 1px">
      <el-col :span="24">
        <el-table
          :data="pipeList"
          style="width: 100%"
          @row-click="clickRow"
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
            prop="owner"
            label="OWNER">
          </el-table-column>
          <el-table-column
            prop="created"
            label="CREATE">
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
                  <el-dropdown-item @click.native="dropDetail(scope.row)">drop</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
    <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
  </div>
</template>

<script>

// /**/
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VSearchInput from '../common/VSearchInput'
import {mapState} from 'vuex'
import {VDataPipelineInfo} from '../../../router/ConstPathCfg'

export default {
  name: 'VPipeList',
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
    databaseName: {
      type: String,
      default: ''
    }
  },
  watch: {
    dataObj () {
      this.pipeList = this.dataObj
    },
    async databaseId () {
      this.dbId = this.databaseId
      console.log('watche :TABLE LIST: ' + this.dbId)
      let data = await this.services.databaseService.queryList({
        databaseId: this.dbId,
        schemaId: '',
        type: 'pipe',
        searchName: ''
      })
      this.pipeList = data.data.list
      this.pipeAllList = this.pipeList
      this.$emit('dataToFather', this.pipeList)
    }
  },
  computed: mapState(['services']),
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VSearchInput},
  mounted: function () {
  },
  data () {
    return {
      pipeList: [],
      pipeAllList: [],
      searchName: '',
      dataObject: {},
      dialogDataBaseEditVisible: false,
      dialogDataBaseDropVisible: false,
      dialogEditTitle: 'Edit View',
      dialogEditInfo: 'Renaming will require you to update objects that reference this pipe.',
      dialogDropTitle: 'Drop Pipe',
      dialogDropInfo: 'Remove the pipe from the system. Dropped views cannot be recovered.'
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    async getList () {
      let data = await this.services.databaseService.queryList({
        databaseId: this.dbId,
        schemaId: '',
        type: 'pipe',
        searchName: ''
      })
      // this.pipeList = JSON.parse(data.data).list
      this.pipeList = data.data.list
      for (let item of this.pipeList) {
        this.$set(item, 'databaseId', this.dbId)
        // this.$set(item, 'id', item.id)
        this.$set(item, 'type', 'pipe')
        this.$set(item, 'comment', item.desc)
      }
      this.pipeAllList = this.pipeList
      this.$emit('dataToFather', this.pipeList)
    },
    editDetail (row) {
      console.log('editDetail111 !!! ')
      this.dataObject = row
      this.dialogDataBaseEditVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseEditVisible)
    },
    cloneDetail (row) {
      console.log('cloneDetail !!! ')
      this.dataObject = row
      this.dialogDataBaseCloneVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseCloneVisible)
    },
    dropDetail (row) {
      console.log('dropDetail !!! ')
      this.dataObject = row
      this.dialogDataBaseDropVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseDropVisible)
    },
    transferDetail (row) {
      console.log('transferDetail !!! ')
      this.dataObject = row
      this.dialogDataBaseTransferVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseTransferVisible)
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
          message: 'edit fail: ' + res.message,
          type: 'error'
        })
      }
    },
    getSearchValue (val) {
      this.searchName = val
      this.filterData()
    },
    filterData () {
      this.pipeList = this.pipeAllList
      console.log('**** pipeList:' + this.pipeList.length)
      if (this.searchName !== null && this.searchName.trim() !== '' && this.pipeList.length > 0) {
        this.pipeList = this.pipeList.filter(database => {
          return database.name.indexOf(this.searchName) === 0
        })
      }
      this.$emit('dataToFather', this.pipeList)
    },
    refresh () {
      this.filterData()
    },
    clickRow (row) {
      row.dbId = this.dbId
      row.pipeId = row.id
      row.dbLabel = this.databaseName
      row.nameLabel = row.name
      this.$router.push({ name: VDataPipelineInfo, params: row })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
