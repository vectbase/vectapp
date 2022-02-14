<template>
  <el-dialog :visible.sync="dialogDropVisible"
             :show-close="false"
             center
             width="30%">
    <div slot="title">
      <span class="dialog-title">Drop Warehouse</span>
      <div class="dialog-sub-title"><i class="el-icon-c-scale-to-original"></i> {{ formDataOrigin.name }} as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formDataOrigin" label-position="top">
        <el-row>
          <el-col :span="23">
            Remove the warehouse {{ formDataOrigin.name }} from the system. Dropped warehouses cannot be recovered.
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="14" :offset="9">
          <el-button size="small" class="query-filters-button-right" @click="handleClickOk">Drop Warehouse</el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'VWarehouseDrop',
  props: ['dialogDropVisible', 'formDataRow', 'requestFilterData', 'requestWarehouseId', 'isRowEdit', 'isDetailEdit'],
  data () {
    return {
      dialogDropVisibleOrigin: false,
      formDataOrigin: {}
    }
  },
  methods: {
    async handleClickOk () {
      this.dialogDropVisibleOrigin = false
      this.$emit('updateDialogDropVisible', this.dialogDropVisibleOrigin)

      let result = await this.services.warehouseService.dropWarehouse(this.formDataOrigin.id)
      console.log('========dropWarehouse result========', JSON.stringify(result))

      if (this.isRowEdit) {
        let responseData = await this.services.warehouseService.warehouseList(this.requestFilterData)
        this.$emit('updateTableData', responseData.data)
      }

      if (this.isDetailEdit) {
        this.$router.back()
      }
    },
    handleClickCancel () {
      console.log('this.formDataRow======', this.formDataRow)
      console.log('this.formDataOrigin======', this.formDataOrigin)
      this.dialogDropVisibleOrigin = false
      this.$emit('updateDialogDropVisible', this.dialogDropVisibleOrigin)
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    ...mapGetters({currentRole: 'getCurrentRole'})
  },
  watch: {
    formDataRow (val) {
      this.formDataOrigin = JSON.parse(JSON.stringify(val))
    },
    dialogDropVisible (val) {
      this.dialogDropVisibleOrigin = val
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
  background-color: #d3132f;
  float: right;
}
</style>
