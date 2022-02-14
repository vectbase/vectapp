<template>
  <div>
    <el-row style="margin: 1px">
      <el-col :span="12">
        <div style="padding-left: 5px">
          <h4> 4 Procedures</h4>
        </div>
      </el-col>
      <el-col :span="12">
        <p>
          <el-form :inline="true" :model="formQeryInline" >
            <el-col :span="6">
              <el-form-item label="">
                &nbsp;
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="">
                <el-input v-model="formQeryInline.user" placeholder="Search"   size="mini"     prefix-icon="el-icon-search"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="">
                <el-button size="mini" round>&nbsp;<i class="el-icon-refresh el-icon--right"/>&nbsp;&nbsp;</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </p>
      </el-col>
    </el-row>
    <el-row style="margin: 1px">
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
            <template slot-scope="scope">
              <router-link :to="{name:'VProceduresInfo'}" tag="div">
                <p>
                  {{ scope.row.date }}
                </p>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            :formatter="formatter">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// /**/

export default {
  name: 'VProceduresList',
  mounted: function () {
  },
  data () {
    return {
      formQeryInline: {},
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*import 'font-awesome/css/font-awesome.min.css'*/

</style>
