<template>
    <div v-if="editDialogVisible">
      <el-dialog
        :visible.sync="editDialogVisible"
        width="60%"
        center
        :before-close="handleClose"
      >
        <div slot="title" class="header-title">
          <span class="dialogTitle"> Edit network policy </span><br />
          <span class="iconTitle">{{policyName}} as <i class="el-icon-user"></i>{{currentRole}}</span>
        </div>
        <div class="descClass">
          Enter a valid IPv4 address and optional CIDR or multiple addresses in a comma-separated list.
        </div>
        <el-form :model="form" ref="ruleForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <div class="titleItem" slot="label">
                  <span>{{allowCount}}</span> allowed IP addresses
                </div>
                <el-input @input="searchEditIps(0)" @keyup.enter.native="addNewAllowIp" v-model="form.addAllowed" placeholder="Add additional addresses" autocomplete="off"></el-input>
              </el-form-item>
              <div v-if="allowCount === 0" style="text-align: center">
                <el-card class="box-card">
                  No allowed addresses<br/>
                  Add addresses that will be allowed to access your Snowflake account
                </el-card>
              </div>
              <div v-else>
                <el-row class="ipStyleClass" v-for="allowedIp in allowed" :key="allowedIp + 'allowed'">
                  <el-col :span="12">
                    {{allowedIp}}
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <i class="el-icon-close" style="cursor: pointer;" @click="deleteTag(allowedIp, 1)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div class="titleItem" slot="label">
                  <span>{{blockCount}}</span> blocked IP addresses
                </div>
                <el-input @input="searchEditIps(1)" @keyup.enter.native="addNewBlockedIp" v-model="form.addBlocked" placeholder="Add additional addresses" autocomplete="off"></el-input>
              </el-form-item>
              <div v-if="blockCount === 0" style="text-align: center">
                <el-card class="box-card">
                  No blocked addresses<br/>
                  Add addresses that will be blocked from accessing your Snowflake account
                </el-card>
              </div>
              <div v-else>
                <el-row class="ipStyleClass" v-for="blockedIp in blocked" :key="blockedIp + 'blocked'">
                  <el-col :span="12">
                    {{blockedIp}}
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <i class="el-icon-close" style="cursor: pointer;" @click="deleteTag(blockedIp, 0)"></i>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <el-form-item label="Comment (optional)">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button size="small" @click="handleClose">Cancel</el-button>
          <el-button size="small" type="primary" @click="submit">Save changes</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'PolicyEditDialog',
  props: {
    editDialogVisible: {
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
    },
    form: {
      type: Object,
      required: true
    },
    allowCount: {
      type: Number,
      required: true
    },
    blockCount: {
      type: Number,
      required: true
    },
    allowed: {
      type: Array,
      required: true
    },
    blocked: {
      type: Array,
      required: true
    }
  },
  methods: {
    submit () {
      this.$emit('editPolicy')
      this.change()
    },
    handleClose () {
      this.$emit('handleClose')
      this.change()
    },
    deleteTag (ip, label) {
      this.$emit('deleteTag', ip, label)
      this.change()
    },
    searchEditIps (label) {
      this.$emit('searchEditIps', label)
      this.change()
    },
    change () {
      this.$forceUpdate()
    },
    addNewAllowIp () {
      this.$emit('addNewIp', 0)
    },
    addNewBlockedIp () {
      this.$emit('addNewIp', 1)
    }
  }
}
</script>

<style scoped>
  .box-card {
    border-radius: 8px;
    font-family: Inter;
    font-style: normal;
    box-shadow: none;
    padding-top: 16px;
    padding-bottom: 16px;
    border-left-color: rgb(226, 227, 229);
    border-top-color: rgb(226, 227, 229);
    border-bottom-color: rgb(226, 227, 229);
    border-left-width: 1px;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-left-style: solid;
    border-bottom-style: solid;
    border-top-style: solid;
    margin-top: 16px;
    background-color: rgb(242, 242, 242);
    padding-left: 24px;
    box-sizing: border-box;
    border-right-style: solid;
    border-right-color: rgb(226, 227, 229);
    border-right-width: 1px;
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
    margin: 20px 0px;
  }
  .titleItem {
    fill: rgb(44, 47, 52);
    stroke: rgb(44, 47, 52);
    color: rgb(44, 47, 52);
    font-size: 14px;
  }
  .ipStyleClass {
    padding: 12px 16px;
    border-bottom-color: rgb(226, 227, 229);
    border-bottom-style: solid;
    padding-left: 16px;
    background-color: rgb(242, 242, 242);
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-color: rgb(226, 227, 229);
    border-bottom-color: rgb(226, 227, 229);
    overflow-y: scroll;
    border-radius: 8px;
  }
</style>
