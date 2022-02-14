<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @row-click="wsDetail"
      :row-style="rowCss">
      <el-table-column
        label="TITLE"
        width="280">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="VIEWED"
        width="180">
        <template slot-scope="scope">
          <span>{{ getDateFormat(scope.row.dateCreated) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="UPDATE">
        <template slot-scope="scope">
          <span>{{ getDateFormat(scope.row.lastUpdated) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="ROLE">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right;margin-top: 10px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totSize"
        v-on:current-change="clickPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'MyWorkSheets',
  data () {
    return {
      tableData: [],
      totSize: 10
    }
  },
  computed: {
    ...mapState(['services'])
  },
  methods: {
    wsDetail (row) {
      //
      this.$router.push({path: '/sqlCode', query: row})
    },
    dateFormat: function (row, column) {
      var t = new Date(row.dateCreated)
      return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
    },
    getDateFormat (start) {
      var end = new Date().getTime()
      var sub = end - start
      console.info('start:', end, start, sub)
      if ((sub / (365 * 24 * 3600 * 1000)) >= 1) {
        // year
        var year = parseInt(sub / (365 * 24 * 3600 * 1000))
        return year + (year > 1 ? ' years' : ' year') + ' ago'
      }
      if ((sub / (30 * 24 * 3600 * 1000)) >= 1) {
        // month
        var month = parseInt(sub / (30 * 24 * 3600 * 1000))
        return month + (month > 1 ? ' months' : ' month') + ' ago'
      }
      if ((sub / (24 * 3600 * 1000)) >= 1) {
        // day
        var day = parseInt(sub / (24 * 3600 * 1000))
        return day + (day > 1 ? ' days' : ' day') + ' ago'
      }
      if ((sub / (3600 * 1000)) >= 1) {
        // hour
        var hours = parseInt(sub / (3600 * 1000))
        return hours + (hours > 1 ? ' hours' : ' hour') + ' ago'
      }
      if ((sub / (60 * 1000)) >= 1) {
        // minuts
        var minuts = parseInt(sub / (60 * 1000))
        return minuts + (minuts > 1 ? ' minutes' : ' minut') + ' ago'
      }
      return 'just now'
    },
    rowCss () {
      let rowCss = {}
      rowCss.cursor = 'pointer'
      return rowCss
    },
    clickPage (curPage) {
      let data = this.services.workSheetService.getListByPage(curPage)
      data.then(res => {
        if (res.code === '1') {
          this.tableData = res.data.list
          this.totSize = res.data.totSize
        }
      })
    }
  },
  beforeMount () {
    let data = this.services.workSheetService.getListByPage(1)
    data.then(res => {
      console.info('res', res)
      if (res.code === '1') {
        this.tableData = res.data.list
        this.totSize = res.data.totSize
      }
    })
    // this.tableData = data.data
    // console.info('data1sss', this.tableData)
  }
}
</script>

<style scoped>

</style>
<style>
.trCss{

}
</style>
