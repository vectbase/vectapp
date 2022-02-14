<template>
  <div v-if="dialogObjectFormVisible">
    <el-dialog :title="dialogObject.title" :visible.sync="dialogObjectFormVisible" width="40%" center :before-close="handleClose">
      <div class="relationContainer">
        <span>{{dialogObject.description}}<i class="el-icon-user"></i> {{currentRole}} </span>
      </div>
      <el-form :model="dialogObject.form" ref="dialogObject.form" label-width="200px" class="demo-ruleForm">
        <el-form-item :label="item.label" v-for="(item, index) in dialogObject.data" v-bind:key="index">
          <el-input :disabled="item.disabled" :prop="item.key" size="mini" @input="$forceUpdate()" v-if="item.type === 'input'" v-model="dialogObject.form[item.key]"></el-input>
          <el-select :disabled="item.disabled" style="width: 100%" :prop="item.key" size="mini" @change="$forceUpdate()" v-if="item.type === 'select'" v-model="dialogObject.form[item.key]" placeholder="select">
            <el-option
              v-for="it in item.options"
              :key="it.entityId"
              :label="it.name"
              :value="it.entityId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">cancel</el-button>
        <el-button size="mini" type="primary" @click="grantRole">submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GrantRevokeDialog',
  props: {
    dialogObjectFormVisible: {
      type: Boolean,
      required: true
    },
    currentRole: {
      type: String,
      required: true
    },
    dialogObject: {
      type: Object,
      required: true
    }
  },
  methods: {
    grantRole () {
      this.$emit('grantRole')
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style scoped>
  .relationContainer {
    display: flex;
    justify-content: center; /*主轴上居中*/
    align-items: center; /*侧轴上居中*/
    font-size: 12px;
    color: #65676c;
    margin-top: -5px;
    margin-bottom: 10px;
    height: 20px;
  }
</style>
