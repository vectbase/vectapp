<template>
  <div>
    <div id="page-top">
      <el-row>
        <el-col :span="6">
          <el-button size="mini"
                     icon="el-icon-arrow-left"
                     class="button-icon-left"
                     @click="back">
          </el-button>
          <span class="details-name" style="margin-left: 10px">{{ warehouseDetail.name }}</span>
        </el-col>
        <el-col :span="1" :offset="17">
          <el-dropdown trigger="click" :hide-on-click="true">
            <el-button size="mini"
                       icon="el-icon-more"
                       class="button-icon-right">
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="handleEditDialog(warehouseDetail)">Edit</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="handleResumeDialog(warehouseDetail)">Resume</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="handleDropDialog(warehouseDetail)">Drop</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="handleOwnershipDialog(warehouseDetail)">Transfer Ownership</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-tag type="info" color="#FAFAFA" class="el-tag-class">
            <el-tooltip content="A cluster of compute resources in Vectbase"
                        placement="top"
                        popper-class="tooltip-style"
                        :open-delay="600">
              <span style="margin-right: 15px"><i class="el-icon-c-scale-to-original"></i> Warehouse</span>
            </el-tooltip>

            <el-tooltip :content="`Owner by ${warehouseDetail.role}`"
                        placement="top"
                        popper-class="tooltip-style"
                        :open-delay="600">
              <span style="margin-right: 15px"><i class="el-icon-user"></i> {{ warehouseDetail.role }}</span>
            </el-tooltip>

            <el-tooltip :content="warehouseDetail.created"
                        placement="top"
                        popper-class="tooltip-style"
                        :open-delay="600">
              <span v-show="warehouseDetail.created"><i class="el-icon-time"></i> {{ warehouseDetail.created | changeTime }}</span>
            </el-tooltip>
          </el-tag>
        </el-col>
      </el-row>
    </div>

    <!--dialog弹框-->
    <VWarehouseEdit :title="title"
                    :confirmButtonText="confirmButtonText"
                    :advanceActive="advanceActive"
                    :formDataRow="warehouseDetailCopy"
                    :dialogFormVisible="dialogFormVisible"
                    :warehouseSizeObjs="warehouseSizeObjs"
                    :requestWarehouseId="this.requestWarehouseId"
                    :isCreate="isCreate"
                    :isRowEdit="false"
                    :isDetailEdit="true"
                    @updateDialogFormVisible="updateDialogFormVisible"
                    @updateAdvanceActive="updateAdvanceActive"
                    @updateDetailData="updateDetailData">
    </VWarehouseEdit>
    <VWarehouseResume :dialogResumeVisible="dialogResumeVisible"
                      :formDataRow="warehouseDetailCopy"
                      :warehouseSizeObjs="warehouseSizeObjs"
                      :requestWarehouseId="this.requestWarehouseId"
                      :isRowEdit="false"
                      :isDetailEdit="true"
                      @updateDialogResumeVisible="updateDialogResumeVisible"
                      @updateDetailData="updateDetailData">
    </VWarehouseResume>
    <VWarehouseDrop :dialogDropVisible="dialogDropVisible"
                    :formDataRow="warehouseDetailCopy"
                    :requestWarehouseId="this.requestWarehouseId"
                    :isRowEdit="false"
                    :isDetailEdit="true"
                    @updateDialogDropVisible="updateDialogDropVisible">
    </VWarehouseDrop>
    <VWarehouseOwnership :dialogOwnershipVisible="dialogOwnershipVisible"
                         :formDataRow="warehouseDetailCopy"
                         :requestWarehouseId="this.requestWarehouseId"
                         :isRowEdit="false"
                         :isDetailEdit="true"
                         @updateDialogOwnershipVisible="updateDialogOwnershipVisible"
                         @updateDetailData="updateDetailData">
    </VWarehouseOwnership>

    <el-container :style="{height: containerHeight + 'px'}">
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card card-gutter" style="margin-bottom: 30px">
              <VWarehouseActivity :warehouseId="warehouseDetail.id"></VWarehouseActivity>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card card-gutter" style="margin-bottom: 30px">
              <el-row>
                <el-col :span="24">
                  <div class="details-name">Details</div>
                </el-col>
              </el-row>
              <div class="details-item-row">
                <el-row>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Status</div>
                    <!--v-if解决控制台渲染报错问题-->
                    <div class="details-item-cell-bottom" v-if="warehouseDetail.status">{{ getStatusName(warehouseDetail.status) }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Size</div>
                    <!--v-if解决控制台渲染报错问题-->
                    <div class="details-item-cell-bottom" v-if="warehouseDetail.size">{{ getSizeName(warehouseDetail.size) }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Max Clusters</div>
                    <div class="details-item-cell-bottom">{{ warehouseDetail.maxClusters }}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="details-item-row">
                <el-row>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Min Clusters</div>
                    <div class="details-item-cell-bottom">{{ warehouseDetail.minClusters }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Scaling Policy</div>
                    <div class="details-item-cell-bottom" v-show="warehouseDetail.scalingPolicy === 0">Standard</div>
                    <div class="details-item-cell-bottom" v-show="warehouseDetail.scalingPolicy === 1">Economy</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Running</div>
                    <div class="details-item-cell-bottom">{{ warehouseDetail.runningCount }}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="details-item-row">
                <el-row>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Queued</div>
                    <div class="details-item-cell-bottom">{{ warehouseDetail.queuedCount }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Auto Suspend</div>
                    <div class="details-item-cell-bottom">{{ warehouseDetail.suspendAfter * 60 }} seconds</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="details-item-cell-top">Auto Resume</div>
                    <div class="details-item-cell-bottom" v-show="warehouseDetail.autoResume">Enabled</div>
                    <div class="details-item-cell-bottom" v-show="!warehouseDetail.autoResume">Disabled</div>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="8">
                  <div class="details-item-cell-top">Resumed On</div>
                  <div class="details-item-cell-bottom">
                    {{ warehouseDetail.resumedOn | changeTime }}
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card card-gutter">
              <VPrivilegesPanel :paramId="warehouseDetail.id"
                                :type="1"
                                :priData="warehouseDetail.byPrivilege"
                                :roleData="warehouseDetail.byRole">
                <template slot="subhead"><i class="el-icon-c-scale-to-original"></i> {{warehouseDetail.name}}</template>
              </VPrivilegesPanel>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import VWarehouseEdit from './VWarehouseEdit'
import VWarehouseResume from './VWarehouseResume'
import VWarehouseDrop from './VWarehouseDrop'
import VWarehouseOwnership from './VWarehouseOwnership'
import VPrivilegesPanel from '../../data/common/VPrivilegesPanel'
import VWarehouseActivity from './VWarehouseActivity'

export default {
  name: 'VWarehouseDetail',
  components: { VWarehouseActivity, VPrivilegesPanel, VWarehouseEdit, VWarehouseResume, VWarehouseDrop, VWarehouseOwnership },
  data () {
    return {
      containerHeight: 0,
      title: 'Edit Warehouse',
      confirmButtonText: 'Save Warehouse',
      isCreate: false,
      advanceActive: false,
      dialogFormVisible: false,
      dialogResumeVisible: false,
      dialogDropVisible: false,
      dialogOwnershipVisible: false,
      warehouseDetail: {
        // name: 'COMPUTE_WH',
        // role: 'SYSADMIN',
        // created: '2021-10-10 10:10:10',
        // status: 2,
        // size: 1,
        // maxClusters: 1,
        // minClusters: 1,
        // scalingPolicy: 0,
        // running: 0,
        // queued: 1,
        // suspendAfter: 10,
        // autoResume: true,
        // resumedOn: new Date()
      },
      warehouseDetailCopy: {},
      warehouseStatusObjs: [
        {id: 1, statusName: 'Suspended'},
        {id: 2, statusName: 'Started'},
        {id: 3, statusName: 'Resuming'},
        {id: 4, statusName: 'Resizing'},
        {id: 5, statusName: 'Suspending'}
      ],
      warehouseSizeObjs: [
        {id: 1, sizeName: 'X-Small', desc: '1 credit/hour'},
        {id: 2, sizeName: 'Small', desc: '2 credits/hour'},
        {id: 3, sizeName: 'Medium', desc: '4 credits/hour'},
        {id: 4, sizeName: 'Large', desc: '8 credits/hour'},
        {id: 5, sizeName: 'X-Large', desc: '16 credits/hour'},
        {id: 6, sizeName: '2X-Large', desc: '32 credits/hour'},
        {id: 7, sizeName: '3X-Large', desc: '64 credits/hour'},
        {id: 8, sizeName: '4X-Large', desc: '128 credits/hour'}
      ],
      requestWarehouseId: 0,
      byPrivilege: [],
      byRole: []
    }
  },
  async created () {
    await window.addEventListener('setItem', () => {
      console.log('Warehouse detail change...')
      this.initData()
    })
  },
  async mounted () {
    this.$bus.$on('updateWarehouseDetail', this.updateWarehouseDetail)
    await this.initData()
    this.containerHeight = document.documentElement.clientHeight - 50 - 5 - document.getElementById('page-top').clientHeight - 10 - 40
  },
  beforeDestroy () {
    this.$bus.$off('updateWarehouseDetail')
  },
  methods: {
    async initData () {
      this.requestWarehouseId = this.$route.params.id
      let responseData = await this.services.warehouseService.warehouseDetail(this.requestWarehouseId)
      this.warehouseDetail = responseData.data
      console.log('=====================', this.warehouseDetail)
      // this.byPrivilege = responseData.data.privileges.byPrivilege
      // this.byRole = responseData.data.privileges.byRole

      // 获取当前用户所有角色的对象列表
      // let responseRoleData = await this.services.warehouseService.roleList()
      // this.roleList = responseRoleData.data.roleList
      // 获取当前用户所有权限的对象列表
      // let responsePrivilegeData = await this.services.warehouseService.getPrivilegeListByRoleId()
      // this.privilegeList = responsePrivilegeData.data
    },
    back () {
      this.$router.back()
    },
    getStatusName (id) {
      return this.warehouseStatusObjs.filter(statusObj => {
        return statusObj.id === id
      }).pop().statusName
    },
    getSizeName (id) {
      return this.warehouseSizeObjs.filter(sizeObj => {
        return sizeObj.id === id
      }).pop().sizeName
    },
    handleEditDialog (data) {
      console.log('data======', data)
      this.title = 'Edit Warehouse'
      this.confirmButtonText = 'Save Warehouse'
      this.isCreate = false
      this.advanceActive = true
      this.dialogFormVisible = true
      this.warehouseDetailCopy = data
    },
    handleResumeDialog (data) {
      this.dialogResumeVisible = true
      this.warehouseDetailCopy = data
    },
    handleDropDialog (data) {
      this.dialogDropVisible = true
      this.warehouseDetailCopy = data
    },
    handleOwnershipDialog (data) {
      this.dialogOwnershipVisible = true
      this.warehouseDetailCopy = data
    },
    updateDialogFormVisible (data) {
      this.dialogFormVisible = data
    },
    updateDialogResumeVisible (data) {
      this.dialogResumeVisible = data
    },
    updateDialogDropVisible (data) {
      this.dialogDropVisible = data
    },
    updateDialogOwnershipVisible (data) {
      this.dialogOwnershipVisible = data
    },
    updateAdvanceActive (data) {
      this.advanceActive = data
    },
    updateDetailData (data) {
      console.log('=========返回的detail=========', data)
      this.warehouseDetail = data
    },
    async updateWarehouseDetail () {
      let responseData = await this.services.warehouseService.warehouseDetail(this.requestWarehouseId)
      this.warehouseDetail = responseData.data
    }
  },
  computed: {
    ...mapState([ 'services' ])
  }
}
</script>

<style scoped>
/*#div-main {
  background-color: #ffffff;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 80px;
}*/

#page-top {
  margin-bottom: 10px;
}
.button-icon-left {
  border-radius: 6px;
  background-color: #F7F7F7;
}

.button-icon-right {
  border-radius: 6px;
  background-color: #ffffff;
}

.el-tag-class {
  margin-top: 25px;
  border-radius: 8px;
}

.details-name {
  font-weight: 700;
  font-size: 20px;
  color: #2c2f34;
  /*margin-left: 10px;*/
  margin-bottom: 25px;
}

.card-gutter {
  /*margin-bottom: 30px;*/
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 20px;
  margin-left: -40px;
  margin-right: -40px;
}

.details-item-cell-top {
  font-size: 14px;
  color: #65676c;
  margin-bottom: 10px;
}

.details-item-cell-bottom {
  font-size: 14px;
  color: #2c2f34;
}

.details-item-row {
  margin-bottom: 25px;
}
</style>
