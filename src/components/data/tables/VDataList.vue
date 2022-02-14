<template>
  <div>
    <el-row style="margin: 1px">
      <el-col :span="12">
        <div style="padding-left: 5px">
          <el-row>
            <el-popover
              placement="bottom-start"
              width="400"
              v-model="wareHouseVisible">
              <el-input
                placeholder="Warehouses"
                prefix-icon="el-icon-search"
                v-model="searchValue"
                @input="getSearchDataValue()">>
              </el-input>
              <div style="width:400px; height: 200px; max-height:280px;overflow-y: auto">
                <el-row v-for="(item, index) in wareHouseList" v-bind:key="index" @click.native="clickWarehouse(item)">
                  <div style="float: left;height: 30px; margin-left: 20px;margin-top: 10px">
                    <li class="item.id==wareHouseId?warehouseSelect:warehouseNotSelect">{{ item.name }}</li>
                  </div>
                  <div style="float: right;height: 30px; margin-top: 10px"><i
                    class="item.id==wareHouseId?iconSelect:iconNotSelect" style="margin-right: 10px"></i></div>
                </el-row>
              </div>
              <el-button size="mini" class="filtrate-button" slot="reference">
                <li>{{ warehouseName }}</li>
              </el-button>&nbsp;&nbsp;
            </el-popover>
            <span style="font-size: 12px;color: #909399">{{columnsList.length}} Rows • Updated 6 minutes ago</span></el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="float: right;">
          <el-button size="mini" class="filtrate-button" @click="refresh">
            <i class="el-icon-refresh-right"></i>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="columnsListLength==0">
      <el-empty :image-size="200" description="No datas">
      </el-empty>
    </el-row>
    <el-row style="margin: 1px" v-else-if="columnsListLength>0">
      <el-col :span="24">
        <el-table
          :data="columnsList"
          style="width: 100%"
          border
        >
          <el-table-column label="" type="index" width="50" :index='indexMethod'></el-table-column>
          <el-table-column v-for="(val, key) in tableHeader" :key="key"
                           :prop="val.prop"
                           :label="val.name"
                           sortable>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div v-else>
      <el-empty :image-size="200" description="No datas">
      </el-empty>
    </div>
  </div>
</template>

<script>

// /**/

import {mapState} from 'vuex'

export default {
  name: 'VDataList',
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
      console.log('*** watch : vdataList : classType:' + this.tableOrViewType)
    },
    databaseId () {
      this.dbId = this.databaseId
      console.log('*** watch : vdataList : dbId:' + this.dbId)
    },
    async detailId () {
      console.log('***** this.tableId4Datas222: ' + this.detailId)
      this.tableOrViewId = this.detailId
      console.log('*** watch1 : vdataList : tableOrViewId:' + this.tableOrViewId)
      let listInfo = await this.services.databaseService.getDataList({
        id: this.tableOrViewId,
        databaseId: this.dbId,
        schemaId: '',
        type: this.tableOrViewType // todo 加warehouseId
      })
      // this.columnsList = JSON.parse(listInfo.data).list
      this.columnsList = listInfo.data.list
      this.columnsListLength = this.columnsList.length
      let elTableHeader = this.columnsList[0]
      for (var keyHeader in elTableHeader) {
        console.log('****** keyHeader:' + keyHeader + '****' + keyHeader.toUpperCase())
        let jsonTmp = {'prop': keyHeader, 'name': keyHeader.toUpperCase()}
        this.tableHeader.push(jsonTmp)
      }
      console.log('****** tableHeader length:' + this.tableHeader.length + JSON.stringify(this.tableHeader))
    },
    async dataObj () {
      this.columnsList = this.dataObj
      // console.log('*** watch : vdataList : dataObj:' + this.columnsList)
      // let listInfo = await this.services.databaseService.getDataList({
      //   id: this.tableOrViewId,
      //   databaseId: this.dbId,
      //   schemaId: '',
      //   type: this.tableOrViewType
      // })
      // console.log('****** cvdataList:' + listInfo.data)
      // this.columnsList = JSON.parse(listInfo.data).list
    },
    async getDatas () {
      // todo 先执行mounted里的方法
      let listInfo = await this.services.databaseService.getDataList({
        id: this.tableOrViewId,
        databaseId: this.dbId,
        schemaId: '',
        type: this.tableOrViewType // todo 加warehouseId
      })
      // this.columnsList = JSON.parse(listInfo.data).list
      this.columnsList = listInfo.data.list
      this.columnsListLength = this.columnsList.length
      let elTableHeader = this.columnsList[0]
      for (var keyHeader in elTableHeader) {
        console.log('****** keyHeader:' + keyHeader + '****' + keyHeader.toUpperCase())
        let jsonTmp = {'prop': keyHeader, 'name': keyHeader.toUpperCase()}
        this.tableHeader.push(jsonTmp)
      }
      console.log('****** tableHeader length:' + this.tableHeader.length + JSON.stringify(this.tableHeader))
    }
  },
  computed: mapState(['services']),
  mounted: async function () { // todo 后续放到watch里
    let responseData = await this.services.warehouseService.warehouseList({})
    this.wareHouseList = responseData.data
    this.wareHouseAllList = this.wareHouseList
    if (this.wareHouseList.length > 0) {
      this.warehouseName = this.wareHouseList[0].name
    }
  },
  data () {
    return {
      columnsList: [],
      columnsListLength: -1,
      tableHeader: [],
      tableOrViewType: '',
      dbId: '',
      tableOrViewId: '',
      searchValue: '',
      wareHouseVisible: false,
      wareHouseList: [{'id': 1, 'name': 'aaa'},
        {'id': 2, 'name': 'bbb'},
        {'id': 3, 'name': 'bbb'},
        {'id': 4, 'name': 'bbb'},
        {'id': 5, 'name': 'bbb'},
        {'id': 6, 'name': 'bbb'},
        {'id': 7, 'name': 'bbb'},
        {'id': 8, 'name': 'bbb'}],
      wareHouseId: '',
      warehouseName: ''
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    indexMethod (index) {
      return index + 1
    },
    async refresh () {
      let listInfo = await this.services.databaseService.getDataList({
        id: this.tableOrViewId,
        databaseId: this.dbId,
        schemaId: '',
        type: this.tableOrViewType
      })
      // this.columnsList = JSON.parse(listInfo.data).list
      this.columnsList = listInfo.data.list
      this.columnsListLength = this.columnsList.length
      let elTableHeader = this.columnsList[0]
      this.tableHeader.length = 0
      for (var keyHeader in elTableHeader) {
        console.log('****** keyHeader:' + keyHeader + '****' + keyHeader.toUpperCase())
        let jsonTmp = {'prop': keyHeader, 'name': keyHeader.toUpperCase()}
        this.tableHeader.push(jsonTmp)
      }
    },
    clickWarehouse (obj) {
      console.log('***clickWarehouse: ' + obj.name)
      this.wareHouseId = obj.id
      this.warehouseName = obj.name
      this.wareHouseVisible = false
      this.getDatas()
    },
    getSearchDataValue () {
      this.wareHouseList = this.wareHouseAllList.filter(item => {
        return item.name.indexOf(this.searchValue) === 0
      })
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

.warehouseSelect {
  color: #0a58ca;
}

.warehouseNotSelect {
}

.iconSelect {
  color: #0a58ca;
}

.iconNotSelect {
}
</style>
