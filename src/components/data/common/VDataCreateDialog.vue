<template>
  <div class="print">
    <el-dialog width="30%" customClass="customWidth" :title="dialogTitle"
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <div class="relationContainer">
        <span>Creating as&nbsp;&nbsp;<i class="el-icon-user"></i>SysAdmin</span>
      </div>
      <el-form :model="form" label-position="top" :rules="rules" ref="form">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Command(optinal)">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="submitForm('form')">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import { mapState } from 'vuex'

export default {
  name: 'VDataCreateDialog',
  computed: mapState(['services']),
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: this.isShow,
      dialogTitle: this.title,
      form: {
        name: '',
        comment: ''
      },
      rules: {
        name: [
          {required: true, message: 'please input database name', trigger: 'blur'},
          {min: 3, max: 10, message: 'length between 3 and 10', trigger: 'blur'},
          {pattern: /^[a-zA-Z][a-zA-Z0-9_]/, message: 'Only alphanumeric underscores are allowed', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    isShow () {
      this.dialogVisible = this.isShow
      console.log('***111' + this.dialogVisible)
    },
    title () {
      this.dialogTitle = this.title
      console.log('***222' + this.dialogTitle)
    }
  },
  mounted () {
  },

  methods: {
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closeDialogFather', this.dialogVisible)
    },
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let dataForm = {
            databaseId: '',
            type: 'database',
            id: '',
            name: this.form.name,
            comment: this.form.comment
          }
          let dataRes = await this.services.databaseService.create(dataForm)
          if (dataRes.code === 200) {
            this.$emit('sureDialogFather', dataRes)
          } else {
            this.$message.error('create database fail! Message : ' + dataRes.message)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.relationContainer {
  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
  font-size: 12px;
  color: #65676c;
  margin-top: 5px;
  margin-bottom: 10px;
  height: 20px;
}
</style>
<style>
.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 5px 25px 5px;
}
</style>
