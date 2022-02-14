<template>
  <div v-if="loadingDialogVisible">
    <el-dialog
      :visible.sync="loadingDialogVisible"
      width="20%"
      center
    >
      <div slot="title" class="header-title">
        <span style="font-size: 80px;color: #0a53be"><i class="el-icon-loading"></i></span><br />
        <span style="font-size: 24px;margin: 20px;">Actativing...</span><br/><br/>
        <span style="margin: 20px;">{{policyName}}</span><br/><br/>
        <el-button style="width: 100%;" size="small" @click="handleClose">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ActivatePolicyLoadingDialog',
  props: {
    loadingDialogVisible: {
      type: Boolean,
      required: true
    },
    policyName: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style scoped>
  .iconTitle {
    font-size: 16px;
    fill: rgb(44, 47, 52);
    color: rgb(44, 47, 52);
    font-weight: 700;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
  }
  /deep/ .el-dialog--center .el-dialog__body {
    padding: 20px 25px 0px 30px;
  }
</style>
