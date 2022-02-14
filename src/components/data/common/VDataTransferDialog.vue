<template>
  <div class="print">
    <el-dialog width="30%" customClass="customWidth" title="Transfer Ownership"
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <div class="relationContainer">
        <span>Creating as&nbsp;&nbsp;<i class="el-icon-user"></i>{{getCurrentRole}}</span>
      </div>
      <el-form :model="dataObj" label-position="top">
        <el-form-item label="Current owner">
          <el-input autocomplete="off" :disabled="true" :placeholder="dataObj.owner"></el-input>
        </el-form-item>
        <el-form-item label="Transfer to">
          <el-select v-model="dataObj.transferToRole" placeholder="Select privileges" style="width:100%" @change="roleChange">
            <el-option v-for="(roleObj, index) in getRoleList" :label="roleObj.name"
                       :value="roleObj.entityId" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="sureDialog">Transfer</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'VDataTransferDialog',
  computed: {...mapState(['services', 'userRoles']), ...mapGetters(['getRoleList', 'getCurrentRole'])},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    dataObject: {
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: this.isShow,
      dataObj: this.dataObject
    }
  },
  watch: {
    isShow () {
      this.dialogVisible = this.isShow
      console.log(this.dialogVisible)
    },
    dataObject () {
      this.dataObj = this.dataObject
    }
  },
  mounted () {
  },

  methods: {
    roleChange (val) {
      console.log('***roleChange:' + val)
      this.dataObj.transferToRole = val
    },
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closeDialogFather', this.dialogVisible)
    },
    async sureDialog () {
      let dataForm = {
        databaseId: this.dataObj.databaseId,
        type: this.dataObj.type,
        id: this.dataObj.id,
        roleId: this.dataObj.transferToRole
      }
      let dataRes = await this.services.databaseService.transfer(dataForm)
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
  height: 20px;
}
</style>
