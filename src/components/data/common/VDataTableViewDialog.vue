<template>
  <div class="print">
    <el-dialog width="90%" title=""
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4"><div class='cancelCol' @click="cancleDialog">Cancel</div></el-col>
        <el-col :span="16"><div class='titleCol'>Create Securable Object in: <i class="el-icon-coin"></i> {{ dataObj.name }}</div></el-col>
        <el-col :span="4"><div class='openCol' @click="openWorksheet">Open in Worksheets</div></el-col>
      </el-row>
      <el-divider></el-divider>
      <iframe class="iframeClass" :src="wsUrl" width="100%" height="500"></iframe>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import { mapState } from 'vuex'

export default {
  name: 'VDataTableViewDialog',
  computed: mapState(['services', 'host']),
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
    },
    createType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: this.isShow,
      dialogTitle: this.title,
      infoDesc: this.info,
      dataObj: this.dataObject,
      wsUrl: ''
    }
  },
  watch: {
    isShow () {
      this.dialogVisible = this.isShow
      console.log('**** isShow:' + this.dialogVisible)
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
    },
    createType () {
      this.createType = this.createType
      this.wsUrl = this.host + '/#/sqlCode?type=' + this.createType
    }
  },
  mounted () {
    this.wsUrl = this.host + '/#/sqlCode?type=' + this.createType
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
        id: this.dataObj.id
      }
      let dataRes = await this.services.databaseService.drop(dataForm)
      this.$emit('sureDialogFather', JSON.stringify(dataRes))
    },
    cancleDialog () {
      this.dialogVisible = false
      this.$emit('closeDialogFather', this.dialogVisible)
    },
    openWorksheet () {
      let routePath = this.$router.resolve({path: '/sqlCode'})
      window.open(routePath.href, '_blank')
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
.el-dialog {
  height: 78vh;
  /*overflow: auto;*/
}
.el-dialog__body {
  /* text-align: initial; */
  padding: 5px 0px 5px;
}
.iframeClass {
  border-width: 0px;
}
.cancelCol {
  float: left;
  color: #409EFF;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
}
.cancelCol:hover {
  color:#409EFF;
  background: #d7d5d5;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
}
.titleCol {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #000000
}
.openCol {
  float: right;
  color: #409EFF;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
}
.openCol:hover {
  color:#409EFF;
  background: #d7d5d5;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
}
</style>
