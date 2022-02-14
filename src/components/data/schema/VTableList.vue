<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :span="8">
        <div style="padding-left: 5px">
          <h4> {{ tableList.length }} Tables</h4>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="float: right;">
          <v-search-input @dataToFather="getSearchValue"></v-search-input>
          <v-dropdown-select :selectObjs="querySourceObjs" @dataToFather="getSelectListValue"></v-dropdown-select>
          <el-button size="mini" class="filtrate-button" @click="refresh">
            <i class="el-icon-refresh-right"></i>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 1px">
        <el-table
          :data="tableList"
          style="width: 100%"
          @row-click="clickRow"
          :default-sort = "{prop: 'name', order: 'descending'}"
        >
          <el-table-column
            prop="name"
            label="NAME"
            :show-overflow-tooltip="true"
            sortable>
          </el-table-column>
          <el-table-column
            prop="type"
            label="TYPE">
          </el-table-column>
          <el-table-column
            prop="owner"
            label="OWNER"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="rows"
            label="ROWS">
          </el-table-column>
          <el-table-column
            prop="bytes"
            label="BYTES">
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
                  <el-dropdown-item @click.native="cloneDetail(scope.row)">clone</el-dropdown-item>
                  <el-dropdown-item @click.native="dropDetail(scope.row)">drop</el-dropdown-item>
                  <el-dropdown-item @click.native="transferDetail(scope.row)">Transfer</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
</el-table>
    </el-row>
    <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
    <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelClone"  @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
    <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
    <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" :dataObject="dataObject" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>

  </div>
</template>

<script>

// /**/
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'
import VSearchInput from '../common/VSearchInput'
import VDropdownSelect from '../common/VDropdownSelect'
import {mapState} from 'vuex'
import {VTableInfo} from '../../../router/ConstPathCfg'

export default {
  name: 'VTableList',
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VSearchInput, VDropdownSelect},
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
      this.tableList = this.dataObj
    },
    async databaseId () {
      this.dbId = this.databaseId
      console.log('watche :TABLE LIST: ' + this.dbId)
      let data = await this.services.databaseService.queryList({
        databaseId: this.dbId,
        schemaId: '',
        type: 'table',
        searchName: ''
      })
      // this.tableList = JSON.parse(data.data).list
      this.tableList = data.data.list
      for (let item of this.tableList) {
        this.$set(item, 'databaseId', this.dbId)
        // this.$set(item, 'id', item.id)
        this.$set(item, 'type', 'table')
        this.$set(item, 'comment', item.desc)
      }
      this.tableAllList = this.tableList
      this.$emit('dataToFather', this.tableList)
    }
  },
  computed: {
    ...mapState(['services', 'state'])
  },
  mounted: function () {
  },
  data () {
    return {
      dbId: '',
      tableList: [],
      tableAllList: [],
      searchName: '',
      sourceList: [],
      querySourceObjs: [
        {id: 0, sourceName: 'All Tables', checked: true},
        {id: 1, sourceName: 'table', checked: true},
        {id: 2, sourceName: 'External Tables', checked: true}
      ],
      dataObject: {},
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit Table',
      dialogEditInfo: 'Renaming will require you to update objects that reference this table.',
      dialogCloneTitle: 'Clone Table',
      dialogCloneInfo: 'Create a copy of this table in the system. Cloning a table will create a replica of the structure and data, but will not include the load history.',
      dialogDropTitle: 'Drop Table',
      dialogDropInfo: 'Remove the table from the system. Dropping a table referenced by a view invalidates the view.'
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    getSearchValue (val) {
      this.searchName = val
      this.filterData()
    },
    getSelectListValue (val) {
      this.sourceList = val
      this.filterData()
    },
    async getList () {
      let data = await this.services.databaseService.queryList({
        databaseId: this.dbId,
        schemaId: '',
        type: 'table',
        searchName: ''
      })
      // this.tableList = JSON.parse(data.data).list
      this.tableList = data.data.list
      for (let item of this.tableList) {
        this.$set(item, 'databaseId', this.dbId)
        // this.$set(item, 'id', item.id)
        this.$set(item, 'type', 'table')
        this.$set(item, 'comment', item.desc)
      }
      this.tableAllList = this.tableList
      this.$emit('dataToFather', this.tableList)
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
    getSonCancelTransfer (val) {
      this.dialogDataBaseTransferVisible = val
    },
    getSonSureTransfer (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        this.getList()
        this.dialogDataBaseTransferVisible = false
      } else {
        this.dialogDataBaseTransferVisible = false
        this.$message({
          showClose: true,
          message: 'edit fail: ' + res.message,
          type: 'error'
        })
      }
    },
    filterData () {
      this.tableList = this.tableAllList
      console.log('**** tableList000:' + this.sourceList.toString())
      console.log('**** tableList:' + this.tableList.length)
      if (this.searchName !== null && this.searchName.trim() !== '' && this.tableList.length > 0) {
        this.tableList = this.tableList.filter(database => {
          return database.name.indexOf(this.searchName) === 0
        })
      }
      console.log('**** tableList222:' + this.tableList.length)
      if (this.sourceList.length > 0 && this.tableList.length > 0) {
        this.tableList = this.tableList.filter(database => {
          return this.sourceList.indexOf(database.type) === 0
        })
      }
      console.log('**** tableList3333:' + this.tableList.length)
      this.$emit('dataToFather', this.tableList)
    },
    refresh () {
      this.filterData()
    },
    clickRow (row) {
      row.dbId = this.dbId
      row.tableId = row.id
      row.dbLabel = this.databaseName
      row.nameLabel = row.name
      this.$router.push({ name: VTableInfo, params: row })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 550;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}
.search-input {
  width: 150px;
  margin-right: 4px;
}
</style>
