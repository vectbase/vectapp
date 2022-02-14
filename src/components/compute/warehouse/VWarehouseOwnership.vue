<template>
  <el-dialog :visible.sync="dialogOwnershipVisible"
             :show-close="false"
             center
             width="30%">
    <div slot="title">
      <span class="dialog-title">Transfer Ownership</span>
      <div class="dialog-sub-title"><i class="el-icon-c-scale-to-original"></i> {{ formDataOrigin.name }} as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formDataOrigin">
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Current owner</div>
            <el-form-item>
              <el-input size="medium"
                        placeholder=" SYSADMIN"
                        :disabled="true">
                <i slot="prefix" class="el-icon-user" style="margin-left: 10px"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Transfer to</div>
            <el-form-item>
              <!--<el-select size="medium" v-model="formDataOrigin.size" style="width: 100%">
                <el-option v-for="(sizeObj, index) in showWarehouseSize" :label="sizeObj.sizeName + sizeObj.desc"
                           :value="sizeObj.id" :key="index">
                </el-option>
              </el-select>-->
              <el-select size="medium" placeholder="Select role" v-model="targetRoleId" style="width: 100%">
                <el-option v-for="(roleObj, index) in roleList" :label="roleObj.name"
                           :value="roleObj.entityId" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="12" :offset="11">
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Transfer</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'VWarehouseOwnership',
  props: ['dialogOwnershipVisible', 'formDataRow', 'requestFilterData', 'requestWarehouseId', 'isRowEdit', 'isDetailEdit'],
  data () {
    return {
      dialogOwnershipVisibleOrigin: false,
      formDataOrigin: {},
      targetRoleId: '',
      formDataOriginCopy: {}
    }
  },
  methods: {
    async handleClickOk () {
      this.dialogOwnershipVisibleOrigin = false
      this.$emit('updateDialogOwnershipVisible', this.dialogOwnershipVisibleOrigin)
      let result = this.services.warehouseService.transferOwnership(this.formDataOrigin.id, this.targetRoleId, this.formDataOrigin.roleId)
      console.log('========transferOwnership result========', JSON.stringify(result))

      this.targetRoleId = ''
      if (this.isRowEdit) {
        let responseData = await this.services.warehouseService.warehouseList(this.requestFilterData)
        this.$emit('updateTableData', responseData.data)
      }

      if (this.isDetailEdit) {
        let responseData = await this.services.warehouseService.warehouseList({})
        // 根据warehouse id查询detail，返回给父组件
        let warehouseId = responseData.data.filter(item => {
          return item.id === this.requestWarehouseId
        }).pop().id
        let responseDetail = await this.services.warehouseService.warehouseDetail(warehouseId)
        this.$emit('updateDetailData', responseDetail.data)
      }
    },
    handleClickCancel () {
      console.log('this.formDataRow======', this.formDataRow)
      console.log('this.formDataOrigin======', this.formDataOrigin)
      this.dialogOwnershipVisibleOrigin = false
      this.$emit('updateDialogOwnershipVisible', this.dialogOwnershipVisibleOrigin)
      this.formDataOrigin = JSON.parse(JSON.stringify(this.formDataOriginCopy))
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({currentRole: 'getCurrentRole', roleList: 'getRoleList'})
    /* showWarehouseSize () {
      console.log('this.warehouseSizeObjs======', this.warehouseSizeObjs)
      return this.warehouseSizeObjs.filter(sizeObj => {
        return sizeObj.id !== 0
      })
    } */
  },
  watch: {
    formDataRow (val) {
      this.formDataOrigin = JSON.parse(JSON.stringify(val))
      this.formDataOriginCopy = JSON.parse(JSON.stringify(val))
    },
    dialogOwnershipVisible (val) {
      console.log('================dialogOwnershipVisible================', val)
      this.dialogOwnershipVisibleOrigin = val
    }
  }
}
</script>

<style scoped>
.dialog-title {
  font-size: 18px;
  color: #2c2f34;
  font-weight: 700;
}

.dialog-sub-title {
  font-size: 12px;
  color: #8b8d91;
  font-weight: 400;
  margin-top: 8px;
}

.dialog-div {
  max-height: 60vh;
  overflow: auto;
  margin-left: 20px;
}

.query-filters-button-left {
  font-size: 14px;
  border-radius: 8px;
  margin-right: 10px;
  float: right;
}

.query-filters-button-right {
  font-size: 14px;
  color: #ffffff;
  border-radius: 8px;
  background-color: #1a6ce7;
  float: right;
}
</style>
