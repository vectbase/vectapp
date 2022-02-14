<template>
  <el-dialog :visible.sync="dialogVisibleOrigin"
             :show-close="false"
             center
             width="30%">
    <div slot="title">
      <span class="dialog-title">Query Results</span>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div" style="margin-top: 40px; margin-bottom: 20px">
      <span style="font-size: 18px; color: #65676c; font-weight: 700">Results not found</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-divider class="divider-class"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="14" :offset="9">
          <el-button size="small" class="query-filters-button-right" @click="handleClickCancel">Close</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'VViewResults',
  props: ['dialogVisible'],
  data () {
    return {
      dialogVisibleOrigin: false
    }
  },
  methods: {
    handleClickCancel () {
      this.dialogVisibleOrigin = false
      this.$emit('updateDialogVisible', this.dialogVisibleOrigin)
    }
  },
  watch: {
    dialogVisible (val) {
      this.dialogVisibleOrigin = val
    }
  }
}
</script>

<style scoped>
.dialog-title {
  font-size: 20px;
  color: #2c2f34;
  font-weight: 700;
}

.dialog-div {
  max-height: 60vh;
  overflow: auto;
  text-align: center;
}

.query-filters-button-right {
  font-size: 14px;
  border-radius: 8px;
  background-color: #ffffff;
  float: right;
}
</style>

<style>
.el-divider--horizontal {
  margin-bottom: 20px;
}
</style>
