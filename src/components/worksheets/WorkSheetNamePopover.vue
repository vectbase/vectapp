<template>
  <div class="wsn-box">
    <div class="input-wapper">
      <input v-model="title" />
    </div>
    <div class="wsn-box-item">
      <!--     Import SQL from File-->
      <el-upload
        class="upload-demo"
        action="http://localhost:18282/worksheets/wsql/uploadSqlTxt"
        :on-preview="handlePreview"
        :show-file-list="false"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="upSuccess"
        >
        <div>Import SQL from File</div>
      </el-upload>
    </div>
    <div class="wsn-box-item" @click="duplWs">Duplicate</div>
    <div class="wsn-box-item" @click="deleteWs">Delete WorkSheet</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'WorkSheetNamePopover',
  data () {
    return {
      title: this.curWs.title
    }
  },
  props: {
    upCallBack: Function,
    curWs: Object,
    tit: String
  },
  computed: {
    ...mapState(['services'])
  },
  watch: {
    title () {
      this.$emit('changeWsName', this.title)
    }
  },
  methods: {
    freshTitle: function (t) {
      this.title = t
    },
    deleteWs () {
      this.services.workSheetService.deletelWs(this.curWs.id).then(res => {
        console.info('createres', res)
        if (res.code === '1') {
          this.$router.push({path: '/worksheets'})
        }
      })
    },
    duplWs () {
      this.services.workSheetService.duplWs(this.curWs.id).then(res => {
        console.info('createres', res)
        if (res.code === '1') {
          this.$router.push({path: '/sqlCode', query: res.data})
        }
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'text/plain'
      console.info('jsjpg', file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传文件格式只能是txt格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件不能超过2MB!')
      }
      return isJPG && isLt2M
    },
    upSuccess (response, file, fileList) {
      if (file.response && file.response.code === '1') {
        this.$emit('upCallBack', file.response.data)
      }
    },
    handleExceed: function () {
      // no impl
    },
    handlePreview: function () {
    },
    handleRemove: function () {
    },
    beforeRemove: function () {
    }
  }
}
</script>

<style>
.wsn-box{
  width: 300px;
  margin: 5px 0;
}
.wsn-box-item{
  height: 35px;
  line-height: 35px;
  width: 95%;
  padding-left: 15px;
  cursor: pointer;
}
.wsn-box-item:hover{
  background-color: #EEEEEE;
  /*font-size: 16px;*/
}
.el-popover{
  padding: 0!important;
}
.input-wapper{
  border-radius: 5px;
  border: 2px solid #409EFF;
  height: 35px;
  margin: 5px 15px;
  padding-left: 2px;
}
.input-wapper input{
  width: 90%;border: none;font-size: 14px;
  height: 32px;
}
.input-wapper input:focus{
  outline: none;
}
</style>
