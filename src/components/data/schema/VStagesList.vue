<template>
  <div>
    <el-row style="margin: 1px">
      <el-col :span="12">
        <div style="padding-left: 5px">
          <h4> 0 Stages</h4>
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
        <el-table v-if="tableData.length>0"
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
              <router-link :to="{name:'VStageInfo'}" tag="div">
                <p>
                  {{ scope.row.date }}
                </p>
              </router-link>
            </template>

          </el-table-column>
          <el-table-column
            prop="name"
            label="NAME"
            sortable
            width="180">
          </el-table-column>
        </el-table>
        <el-empty :image-size="200" v-if="tableData.length == 0" description="No stages">
          <el-row style="color: #909399">This schema contains no stages.</el-row>
        </el-empty>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// /**/

export default {
  name: 'VStagesList',
  mounted: function () {
  },
  data () {
    return {
      formQeryInline: {},
      tableData: []
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
