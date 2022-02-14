<template>
  <div class="print">
    <el-dialog width="30%" customClass="customWidth" :title="dialogTitle"
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <div class="relationContainer">
        <span>Creating as&nbsp;&nbsp;<i class="el-icon-user"></i>SysAdmin</span>
      </div>
      <el-row>{{infoDesc}}</el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="danger" @click="sureDialog">Drop</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import { mapState } from 'vuex'

export default {
  name: 'VDataDropDialog',
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
      console.log(this.dialogVisible)
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
        type: this.dataObj.vtype,
        id: this.dataObj.id
      }
      // if (this.dataObj.vtype === 'pipe') {
      //   let pipeType = this.dataObj.type
      //   this.
      //   let dataRes = await this.services.databaseService.dropPipe(dataForm)
      //   this.$emit('sureDialogFather', JSON.stringify(dataRes))
      // } else {
      let dataRes = await this.services.databaseService.drop(dataForm)
      this.$emit('sureDialogFather', JSON.stringify(dataRes))
      // }
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
