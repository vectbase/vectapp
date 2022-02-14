<template>
  <div class="print">
    <el-dialog width="30%" customClass="customWidth" :title="dialogTitle"
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <div class="relationContainer">
        <span>Creating as&nbsp;&nbsp;<i class="el-icon-user"></i>SysAdmin</span>
      </div>
      <el-row>{{infoDesc}}</el-row>
      <el-form :model="dataObj" label-position="top" >
        <el-form-item label="Name">
          <el-input v-model="dataObj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Command(optinal)">
          <el-input v-model="dataObj.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="sureDialog">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import { mapState } from 'vuex'

export default {
  name: 'VDataCloneDialog',
  computed: mapState(['services']),
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    dataObject: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: this.isShow,
      dialogTitle: this.title,
      infoDesc: this.info,
      dataObj: this.dataObject
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
    },
    info () {
      this.infoDesc = this.info
      console.log('***333' + this.infoDesc)
    },
    dataObject () {
      this.dataObj = this.dataObject
    }
  },
  mounted () {
  },

  methods: {
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closeDialogFather', this.dialogVisible)
    },
    async sureDialog () {
      let dataForm = {
        databaseId: this.dataObj.databaseId,
        type: this.dataObj.type,
        id: this.dataObj.id,
        name: this.dataObj.name,
        comment: this.dataObj.comment
      }
      let dataRes = await this.services.databaseService.clone(dataForm)
      this.$emit('sureDialogFather', JSON.stringify(dataRes))
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
