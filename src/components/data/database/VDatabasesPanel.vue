<template>
  <div>
    <el-row align="middle" type="flex" justify="space-between" style="height: 50px;margin: 2px">
      <el-col :span="20">
        <div>
          <h1>DataBases</h1>
        </div>
      </el-col>
      <el-col :span="4" style="float: right">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogDataBaseCreateVisible=true">DataBase</el-button>
      </el-col>
      <v-data-create-dialog :isShow="dialogDataBaseCreateVisible" :title="dialogCreateTitle" @closeDialogFather="getSonCancelCreate"  @sureDialogFather="getSonSureCreate"></v-data-create-dialog>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :span="8">
        <div style="padding-left: 5px">
          <h4> {{ dataBaseList.length }} Databases</h4>
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
    <el-row>
      <el-col :span="24">
        <v-databases-list :dataObj="dataBaseList" @dataToFather="getDataBaseList"></v-databases-list>
      </el-col>
    </el-row>
  </div>

</template>

<script>
// /**/
// import 'font-awesome/css/font-awesome.min.css'
import VDatabasesList from './VDatabasesList'
import VDataCreateDialog from '../common/VDataCreateDialog'
import VSearchInput from '../common/VSearchInput'
import VDropdownSelect from '../common/VDropdownSelect'
import {mapState} from 'vuex'

export default {
  name: 'VDatabasesPanel',
  components: {VDatabasesList, VDataCreateDialog, VSearchInput, VDropdownSelect},
  data () {
    return {
      dataBaseList: [],
      dataBaseAllList: [],
      searchInputVisible: false,
      searchInputFixed: false,
      searchName: '',
      sourceList: [],
      dialogDataBaseCreateVisible: false,
      dialogCreateTitle: 'New Database',
      formInline: {
        user: '',
        region: ''
      },
      form: {
        name: '',
        comment: ''
      },
      querySourceObjs: [
        {id: 0, sourceName: 'All', checked: true},
        {id: 1, sourceName: 'Share', checked: true},
        {id: 2, sourceName: 'Local', checked: true},
        {id: 3, sourceName: 'Replication', checked: true}
      ],
      sourceIds: []
    }
  },
  mounted () {

  },
  methods: {
    getDataBaseList (val) {
      this.dataBaseList = val
      this.dataBaseAllList = val
    },
    showSourceChecked (sourceObj) {
      if (sourceObj.id === 0) {
        return sourceObj.checked
      } else {
        return !this.querySourceObjs[0].checked && sourceObj.checked
      }
    },
    handleMouseout () {
      this.searchInputVisible = false
    },
    handleInputClick () {
      this.searchInputFixed = true
    },
    async handleSourceChecked (sourceObj) {
      if (sourceObj.id === 0) {
        this.querySourceObjs.forEach(status => {
          status.checked = true
        })
        this.sourceList = []
      } else {
        if (this.isStatusSelectedAll()) {
          this.querySourceObjs.forEach(status => {
            status.checked = false
          })
          sourceObj.checked = true
          this.sourceList = this.sourceList.concat(sourceObj.sourceName)
        } else {
          sourceObj.checked = !sourceObj.checked
          if (sourceObj.checked) {
            this.sourceList = this.sourceList.concat(sourceObj.sourceName)
          } else {
            this.sourceList = this.sourceList.filter(sourceId => {
              return sourceId !== sourceObj.sourceName
            })
          }
          if (this.isStatusSelectedAll() || this.isStatusSelectedNone()) {
            this.querySourceObjs.forEach(status => {
              status.checked = true
            })
            this.sourceIds = []
          }
        }
      }
      await this.filterData()
    },
    handleSearchClick () {
      this.searchInputVisible = true
      this.$nextTick(function () {
        this.$refs.searchInputRef.focus()
      })
    },
    handleInputBlur () {
      this.searchInputVisible = false
      this.searchInputFixed = false
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
      this.dataBaseList = this.dataBaseAllList
      if (this.searchName !== null && this.searchName.trim() !== '' && this.dataBaseList.length > 0) {
        this.dataBaseList = this.dataBaseList.filter(database => {
          return database.name.indexOf(this.searchName) === 0
        })
      }
      if (this.sourceList.length > 0 && this.dataBaseList.length > 0) {
        this.dataBaseList = this.dataBaseList.filter(database => {
          return this.sourceList.indexOf(database.source) === 0
        })
      }
    },
    refresh () {
      this.filterData()
    },
    getSonCancelCreate (val) {
      this.dialogDataBaseCreateVisible = val
    },
    async getSonSureCreate (val) {
      // let res = JSON.parse(val)
      let res = val
      if (res.code === 200) {
        await this.getDatabaseList()
        this.$bus.$emit('updateTreeNodeItem', null)
        this.dialogDataBaseCreateVisible = false
      } else {
        this.dialogDataBaseCreateVisible = false
        this.$message({
          showClose: true,
          message: 'create database fail: ' + res.message,
          type: 'error'
        })
      }
    },
    async getDatabaseList () {
      let data = await this.services.databaseService.queryList({
        databaseId: '',
        schemaId: '',
        type: 'database',
        searchName: ''
      })
      console.log('&&&&&dataBaseList data: ' + data.data)
      // this.dataBaseList = JSON.parse(data.data).list
      // this.dataBaseAllList = JSON.parse(data.data).list
      this.dataBaseList = data.data.list
      this.dataBaseAllList = data.data.list
    }
  },
  computed: {
    ...mapState(['services', 'state'])
  }
}
</script>

<style scoped>
.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 550;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}
</style>
