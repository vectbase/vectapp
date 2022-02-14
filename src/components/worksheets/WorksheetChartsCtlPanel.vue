<template>
  <div>
    <!--    设置 Chart Type-->
    <el-row>
      <el-col :span=8>
        <div>Chart type</div>
      </el-col>
      <el-col :span=8>
        &nbsp;
      </el-col>
      <el-col :span=8>
        <el-dropdown>
        <span class="el-dropdown-link">  Line <i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> Line </el-dropdown-item>
            <el-dropdown-item> Bar </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    </el-row>

    <el-divider></el-divider>
    <!--    设置 data-->
    <div>Data</div>
    <el-row>

      <el-col :span=8>
        <el-button type="text">+ Add column </el-button>
      </el-col>

      <el-col :span=8>
        <el-divider></el-divider>
      </el-col>
      <el-col :span=8>
        <div>X-Axis/</div>
      </el-col>

    </el-row>

    <el-divider></el-divider>

    <!--    设置Appearance-->
    <div>Appearance</div>
    <el-form ref="form" :model="appearanceForm" label-width="150px">
      <el-form-item label="Order  bars  by ">
        <el-select v-model="appearanceForm.size" placeholder="">
          <el-option label="Bar size" value="Bar size"></el-option>
          <el-option label="Grantee" value="Grantee"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Order  direction">
        <el-select v-model="appearanceForm.direction" placeholder="">
          <el-option label="Descending" value="Descending"></el-option>
          <el-option label="Ascending" value="Ascending"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Serier  direction ">
        <el-select v-model="appearanceForm.direction">
          <el-option label="Ascending" value="Ascending"></el-option>
          <el-option label="Descending" value="Descending"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div>
      <el-switch v-model="xValue" active-text="Label X-Axis"></el-switch>
      <p></p>
      <el-input v-if="xValue" v-model="inputxValue" placeholder=""></el-input>
    </div>
    <div>
      <el-switch v-model="yValue" active-text="Label Y-Axis"></el-switch>
      <p></p>
      <el-input v-if="yValue" v-model="inputyValue" placeholder=""></el-input>
    </div>
    <div>
      <el-switch v-model="limitNumber" active-text="Limit number of bars"></el-switch>
      <p></p>
      <el-input v-if="limitNumber" v-model="inputlimitNumber" placeholder=""></el-input>
    </div>
  </div>

</template>

<script>

export default {
  name: 'WorksheetChartsCtlPanel',
  // components: { '' },

  data () {
    return {
      appearanceForm: {},
      xValue: false,
      yValue: false,
      limitNumber: false,
      inputxValue: '',
      inputyValue: '',
      inputlimitNumber: ''

    }
  }
}
</script>

<style scoped>

</style>
