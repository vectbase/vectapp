<template>
  <el-dialog :visible.sync="dialogFormVisible"
             :show-close="false"
             center
             width="40%"
             @close="handleClickCancel">
    <div slot="title">
      <span class="dialog-title">{{ title }}</span>
      <div v-if="isCreate" class="dialog-sub-title">Creating as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>
      <div v-if="!isCreate" class="dialog-sub-title"><i class="el-icon-c-scale-to-original"></i> {{ formDataOrigin.name }} as <i class="el-icon-user-solid"></i> {{ currentRole }}</div>
    </div>
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formDataOrigin" label-position="left">
        <el-row>
          <el-col :span="11">
            <el-form-item>
              <span slot="label">Name</span>
              <el-input size="medium" v-model="formDataOrigin.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item>
              <span slot="label">Size</span>
              <el-tooltip effect="dark" content="Larger warehouses are faster but cost more" placement="right">
                <i class="el-icon-warning-outline" style="margin-left: -8px"></i>
              </el-tooltip>
              <el-select size="medium" v-model="formDataOrigin.size" style="width: 100%">
                <el-option v-for="(sizeObj, index) in showWarehouseSize" :label="sizeObj.sizeName + sizeObj.desc"
                           :value="sizeObj.id" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item>
              <span slot="label">Comment</span>
              <span slot="label" style="color: #aeb0b3"> (optional)</span>
              <el-input size="medium" v-model="formDataOrigin.comment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
              <span>
                Data Store Isolate
                <div class="dialog-row-label-desc-span">
                  Choosing isolation will create another physically isolated<br/>
                  environment and computing environment separately
                </div>
              </span>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-switch
                v-model="formDataOrigin.isolated"
                active-color="#1a6ce7"
                inactive-color="#cccdd0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="formDataOrigin.isolated">
          <el-col :span="17" class="dialog-row-label-span">
              <span>
                Mode
              </span>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.mode" style="width: 100%">
                <el-option v-for="(modeName, index) in modeArr" :label="modeName"
                           :value="index" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="formDataOrigin.mode === 0 && formDataOrigin.isolated">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Min Cluster
              </span>
          </el-col>
          <el-col :span="3" :offset="2">
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.minClusters" style="width: 100%">
                <el-option v-for="(clustersNumber, index) in clustersNumberArr" :label="clustersNumber"
                           :value="clustersNumber" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formDataOrigin.mode === 0 && formDataOrigin.isolated">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Max Cluster
              </span>
          </el-col>
          <el-col :span="3" :offset="2">
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.maxClusters" style="width: 100%">
                <el-option v-for="(clustersNumber, index) in clustersNumberArr" :label="clustersNumber"
                           :value="clustersNumber" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="formDataOrigin.mode === 0 && formDataOrigin.isolated">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Scaling Policy
              </span>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.scalingPolicy" style="width: 100%">
                <el-option v-for="(scalingPolicy, index) in scalingPolicyArr" :label="scalingPolicy"
                           :value="index" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="formDataOrigin.mode === 1 && formDataOrigin.isolated">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Clusters
              </span>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-select size="medium" v-model="formDataOrigin.clusters" style="width: 100%">
                <el-option v-for="(maxClustersNumber, index) in maxClustersNumberArr" :label="maxClustersNumber"
                           :value="maxClustersNumber" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom: 15px; margin-top: 15px">
            <span class="icon-style" @click="showAdvanceOptions">Advanced Warehouse Options</span>
            <i class="el-icon-arrow-down"
               style="font-weight: bold; color: #aeb0b3"
               v-if="!advanceActiveOrigin"
               @click="showAdvanceOptions">
            </i>
            <i class="el-icon-arrow-up"
               style="font-weight: bold; color: #aeb0b3"
               v-if="advanceActiveOrigin"
               @click="showAdvanceOptions">
            </i>
          </el-col>
        </el-row>
        <el-row v-show="advanceActiveOrigin">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Auto Resume
              </span>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-switch
                v-model="formDataOrigin.autoResume"
                active-color="#1a6ce7"
                inactive-color="#cccdd0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="advanceActiveOrigin">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Auto Suspend
              </span>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-switch
                v-model="formDataOrigin.autoSuspend"
                active-color="#1a6ce7"
                inactive-color="#cccdd0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="advanceActiveOrigin">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Suspend After (min)
              </span>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-input size="medium" v-model.number="formDataOrigin.suspendAfter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="advanceActiveOrigin">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                Data Size
              </span>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-input size="medium" v-model.number="formDataOrigin.dataSize"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="advanceActiveOrigin">
          <el-col :span="18" class="dialog-row-label-span">
              <span>
                QPS
              </span>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-input size="medium" v-model.number="formDataOrigin.qps"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="12" :offset="11">
          <el-button size="small"
                     v-show="this.formDataOrigin.name !== ''"
                     @click="handleClickOk"
                     class="query-filters-button-right">
            {{ this.confirmButtonText }}
          </el-button>
          <el-button size="small"
                     v-show="this.formDataOrigin.name === ''"
                     disabled
                     class="query-filters-button-right-disabled">
            {{ this.confirmButtonText }}
          </el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Cancel</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'VWarehouseEdit',
  props: ['title', 'confirmButtonText', 'advanceActive', 'formDataRow', 'dialogFormVisible', 'warehouseSizeObjs', 'requestFilterData', 'requestWarehouseId', 'isCreate', 'isRowEdit', 'isDetailEdit'],
  data () {
    return {
      advanceActiveOrigin: false,
      dialogFormVisibleOrigin: false,
      formDataOrigin: {},
      formDataOriginCopy: {},
      scalingPolicyArr: [
        'Standard',
        'Economy'
      ],
      clustersNumberArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      maxClustersNumberArr: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      modeArr: [
        'Auto-scale',
        'Maximized'
      ]
    }
  },
  mounted () {
    // this.advanceActiveOrigin = this.advanceActive
    // this.dialogFormVisibleOrigin = this.dialogFormVisible
    // this.formDataOrigin = JSON.parse(JSON.stringify(this.formDataRow))
    // // 字段说明：点击edit，修改后没提交就关闭了，再点击显示formDataOriginCopy（原始值）
    // this.formDataOriginCopy = JSON.parse(JSON.stringify(this.formDataRow))
    // console.log('==================', this.formDataRow)
  },
  methods: {
    showAdvanceOptions () {
      this.advanceActiveOrigin = !this.advanceActiveOrigin
    },
    async handleClickOk () {
      this.dialogFormVisibleOrigin = false
      this.advanceActiveOrigin = false
      this.$emit('updateDialogFormVisible', this.dialogFormVisibleOrigin)
      this.$emit('updateAdvanceActive', this.advanceActiveOrigin)

      let result = await this.services.warehouseService.saveWarehouse(this.formDataOrigin)
      console.log('========addWarehouse result========', JSON.stringify(result))

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
      this.dialogFormVisibleOrigin = false
      this.advanceActiveOrigin = false
      this.$emit('updateDialogFormVisible', this.dialogFormVisibleOrigin)
      this.$emit('updateAdvanceActive', this.advanceActiveOrigin)
      this.formDataOrigin = JSON.parse(JSON.stringify(this.formDataOriginCopy))
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
      console.log('========传过来的formDataRow========', val)
      // 字段说明：点击edit，修改后没提交就关闭了，再点击显示formDataOriginCopy（原始值）
      this.formDataOrigin = JSON.parse(JSON.stringify(val))
      this.formDataOriginCopy = JSON.parse(JSON.stringify(val))
    },
    advanceActive (val) {
      console.log('========传过来的advanceActive========', val)
      this.advanceActiveOrigin = val
    },
    dialogFormVisible (val) {
      console.log('========传过来的dialogFormVisible========', val)
      this.dialogFormVisibleOrigin = val
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

.dialog-row-label-desc-span {
  color: #65676c;
  font-size: 12px;
}

.dialog-row-label-span {
  margin-top: 10px;
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

.query-filters-button-right-disabled {
  font-size: 14px;
  color: #ffffff;
  border-radius: 8px;
  background-color: #bbd6fe;
  float: right;
}
</style>

<style>
.el-dialog {
  border-radius: 8px;
}

.el-dialog--center .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.el-input__inner {
  border-radius: 8px;
}
</style>
