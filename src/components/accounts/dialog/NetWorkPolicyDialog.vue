<template>
  <div v-if="dialogVisible">
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div slot="title" class="header-title">
        <span class="dialogTitle"> New network policy </span><br />
        <span class="iconTitle">Creating as <i class="el-icon-user"></i>{{currentRole}}</span>
      </div>
      <div>
        <span class="descClass">
          Enter a valid IPv4 address and optional CIDR or multiple addresses in a comma-separated list.
        </span>
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="Policy Name" prop="policyName">
            <el-input v-model="form.policyName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Allowed IP Addresses" prop="allowedIpAddresses">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="1.1.1.1, 2.2.2.2/3..."
                      v-model="form.allowedIpAddresses"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Blocked IP Addresses (optional)" prop="bolckedIpAddresses">
            <el-input type="textarea"
                       :rows="2"
                       placeholder="1.1.1.1, 2.2.2.2/3..."
                       v-model="form.bolckedIpAddresses"
                       autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Comment (optional)">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">Cancel</el-button>
        <el-button size="small" type="primary" @click="submit">Create network policy</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogVisible',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    currentRole: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  methods: {
    submit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.$emit('handleClose')
    }
  },
  data () {
    return {
      msg: 'ResouceMonitorsPanel'
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
  /deep/ .el-dialog .el-dialog__body {
    padding: 0px 30px;
  }
  .descClass {
    fill: rgb(101, 103, 108);
    stroke: rgb(101, 103, 108);
    color: rgb(101, 103, 108);
    font-size: 14px;
  }

</style>
