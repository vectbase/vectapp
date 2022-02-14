<template>
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
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'RecentWorkSheets',
  data () {
    return {
      tableData: []
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
      var month = t.getMonth() + 1
      month = month < 10 ? '0' + month : month
      var day = t.getDate()
      day = day < 10 ? '0' + day : day
      var hour = t.getHours()
      hour = hour < 10 ? '0' + hour : hour
      var minutes = t.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      var seconds = t.getSeconds()
      seconds = seconds < 10 ? '0' + seconds : seconds
      return t.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
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
    }
  },
  beforeMount () {
    let data = this.services.workSheetService.getList()
    data.then(res => {
      console.info('res', res)
      this.tableData = res.data
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
