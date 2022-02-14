<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :span="8">
        <div style="padding-left: 5px">
          <h4> {{viewList.length}} Views</h4>
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
<!--    <el-row style="margin: 1px">-->
<!--      <el-col :span="12">-->
<!--        <div style="padding-left: 5px">-->
<!--          <h4> {{viewList.length}} Views</h4>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <p>-->
<!--          <el-form :inline="true" :model="formQeryInline" >-->
<!--            <el-col :span="6">-->
<!--              <el-form-item label="">-->
<!--                &nbsp;-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-form-item label="">-->
<!--                <el-input v-model="formQeryInline.user" placeholder="Search"   size="mini"     prefix-icon="el-icon-search"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->

<!--            <el-col :span="6">-->
<!--              <el-form-item label="">-->
<!--                <el-button size="mini" round>&nbsp;<i class="el-icon-refresh el-icon&#45;&#45;right"/>&nbsp;&nbsp;</el-button>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-form>-->
<!--        </p>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row style="margin: 1px">
      <el-col :span="24">
        <el-table
          :data="viewList"
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
                  <el-dropdown-item @click.native="transferDetail(scope.row)">Transfer</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
    <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" :dataObject="dataObject" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
    <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" @closeDialogFather="getSonCancelTransfer" :dataObject="dataObject" @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
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
import {VViewInfo} from '../../../router/ConstPathCfg'

export default {
  name: 'VViewList',
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
      this.viewList = this.dataObj
    },
    async databaseId () {
      this.dbId = this.databaseId
      console.log('watche :TABLE LIST: ' + this.dbId)
      let data = await this.services.databaseService.queryList({
        databaseId: this.dbId,
        schemaId: '',
        type: 'view',
        searchName: ''
      })
      // this.viewList = JSON.parse(data.data).list
      // this.viewAllList = JSON.parse(data.data).list
      this.viewList = data.data.list
      this.viewAllList = data.data.list
      this.$emit('dataToFather', this.viewList)
    }
  },
  computed: mapState(['services']),
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VSearchInput, VDropdownSelect},
  mounted: function () {
  },
  data () {
    return {
      viewList: [],
      viewAllList: [],
      searchName: '',
      sourceList: [],
      dataObject: {},
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit View',
      dialogEditInfo: 'Renaming will require you to update objects that reference this view.',
      dialogDropTitle: 'Drop View',
      dialogDropInfo: 'Remove the view from the system. Dropped views cannot be recovered.',
      querySourceObjs: [
        {id: 0, sourceName: 'All Views', checked: true},
        {id: 1, sourceName: 'Views', checked: true},
        {id: 2, sourceName: 'Materialized Views', checked: true},
        {id: 3, sourceName: 'Secure Materialized Views', checked: true},
        {id: 4, sourceName: 'Secure Views', checked: true}
      ]
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
        type: 'view',
        searchName: ''
      })
      // this.viewList = JSON.parse(data.data).list
      this.viewList = data.data.list
      for (let item of this.viewList) {
        this.$set(item, 'databaseId', this.dbId)
        // this.$set(item, 'id', item.id)
        this.$set(item, 'type', 'view')
        this.$set(item, 'comment', item.desc)
      }
      this.viewAllList = this.viewList
      this.$emit('dataToFather', this.viewList)
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
          message: 'edit fail: ' + res.message,
          type: 'error'
        })
      }
    },
    getSearchValue (val) {
      this.searchName = val
      this.filterData()
    },
    getSelectListValue (val) {
      this.sourceList = val
      this.filterData()
    },
    filterData () {
      this.viewList = this.viewAllList
      console.log('**** viewList000:' + this.sourceList.toString())
      console.log('**** viewList:' + this.viewList.length)
      if (this.searchName !== null && this.searchName.trim() !== '' && this.viewList.length > 0) {
        this.viewList = this.viewList.filter(database => {
          return database.name.indexOf(this.searchName) === 0
        })
      }
      console.log('**** viewList222:' + this.viewList.length)
      if (this.sourceList.length > 0 && this.viewList.length > 0) {
        this.viewList = this.viewList.filter(database => {
          return this.sourceList.indexOf(database.type) === 0
        })
      }
      console.log('**** viewList3333:' + this.viewList.length)
      this.$emit('dataToFather', this.viewList)
    },
    refresh () {
      this.filterData()
    },
    clickRow (row) {
      row.dbId = this.dbId
      row.viewId = row.id
      row.dbLabel = this.databaseName
      row.nameLabel = row.name
      this.$router.push({ name: VViewInfo, params: row })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*import 'font-awesome/css/font-awesome.min.css'*/

</style>
