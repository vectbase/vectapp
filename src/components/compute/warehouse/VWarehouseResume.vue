<template>
  <el-dialog :visible.sync="dialogResumeVisible"
             :show-close="false"
             center
             width="30%"
             @close="handleClickCancel">
    <div slot="title">
      <span class="dialog-title">Resume Warehouse</span>
      <div class="dialog-sub-title"><i class="el-icon-c-scale-to-original"></i> {{ formDataOrigin.name }} as <i class="el-icon-user-solid icon-style"></i> {{ currentRole }}</div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formDataOrigin">
        <el-row>
          <el-col :span="23">
            <div style="margin-bottom: 10px">Name</div>
            <el-form-item>
              <el-input size="medium" v-model="formDataOrigin.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <div style="margin-bottom: 10px">Size</div>
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.size">
                <el-option v-for="(sizeObj, index) in showWarehouseSize" :label="sizeObj.sizeName + sizeObj.desc"
                           :value="sizeObj.id" :key="index">
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
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Resume</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'VWarehouseResume',
  props: ['dialogResumeVisible', 'formDataRow', 'warehouseSizeObjs', 'requestFilterData', 'requestWarehouseId', 'isRowEdit', 'isDetailEdit'],
  data () {
    return {
      dialogResumeVisibleOrigin: false,
      formDataOrigin: {},
      formDataOriginCopy: {}
    }
  },
  methods: {
    async handleClickOk () {
      this.dialogResumeVisibleOrigin = false
      this.$emit('updateDialogResumeVisible', this.dialogResumeVisibleOrigin)

      let result = await this.services.warehouseService.saveWarehouse(this.formDataOrigin)
      console.log('========updateResume result========', JSON.stringify(result))
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
      this.formDataOrigin = JSON.parse(JSON.stringify(this.formDataOriginCopy))
      this.dialogResumeVisibleOrigin = false
      this.$emit('updateDialogResumeVisible', this.dialogResumeVisibleOrigin)
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({currentRole: 'getCurrentRole'}),

    showWarehouseSize () {
      console.log('this.warehouseSizeObjs======', this.warehouseSizeObjs)
      return this.warehouseSizeObjs.filter(sizeObj => {
        return sizeObj.id !== 0
      })
    }
  },
  watch: {
    formDataRow (val) {
      console.log('==========Resume接收到的formDataRow==========', val)
      this.formDataOrigin = JSON.parse(JSON.stringify(val))
      this.formDataOriginCopy = JSON.parse(JSON.stringify(val))
    },
    dialogResumeVisible (val) {
      console.log('==========Resume接收到的dialogResumeVisible==========', val)
      this.dialogResumeVisibleOrigin = val
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
