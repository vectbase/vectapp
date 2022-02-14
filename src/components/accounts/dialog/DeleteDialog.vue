<template>
    <div v-if="deleteDialogVisible">
      <el-dialog
        :visible.sync="deleteDialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div slot="title" class="header-title">
          <span class="dialogTitle"> Drop Network Policy </span><br />
          <span class="iconTitle">{{policyName}} as <i class="el-icon-user"></i>{{currentRole}}</span>
        </div>
        <span class="descClass">
          Dropping the network policy will deactivate and remove the policy.
        </span>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleClose">Cancel</el-button>
          <el-button size="small" type="danger" @click="submit">Drop policy</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    deleteDialogVisible: {
      type: Boolean,
      required: true
    },
    currentRole: {
      type: String,
      required: true
    },
    policyName: {
      type: String,
      required: true
    }
  },
  methods: {
    submit () {
      this.$emit('dropPolicy')
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style scoped>
  .dialogTitle {
    font-size: 16px;
    fill: rgb(44, 47, 52);
    color: rgb(44, 47, 52);
    font-weight: 700;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
  }
  .iconTitle {
    margin-top: -28px;
    font-weight: 400;
    display: inline-flex;
    fill: rgb(139, 141, 145);
    stroke: rgb(139, 141, 145);
    font-size: 12px;
    white-space: nowrap;
    color: rgb(139, 141, 145);
    -webkit-box-pack: center;
    justify-content: center;
    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
  }
  /deep/ .el-dialog {
    border-radius: 8px;
  }
  /deep/ .el-dialog--center .el-dialog__body {
    padding: 0px 30px;
  }
  .descClass {
    fill: rgb(101, 103, 108);
    stroke: rgb(101, 103, 108);
    color: rgb(101, 103, 108);
    font-size: 14px;
  }

</style>
