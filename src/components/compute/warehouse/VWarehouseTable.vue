<template>
  <div>
    <div id="page-filter">
      <el-row>
        <el-col :span="24">
          <div class="page-top">
            <div class="page-title-left">
              Warehouses
            </div>
            <div>
              <el-button type="medium" class="page-title-button" @click="handleAddWarehouse">
                <i class="el-icon-plus icon-style"></i> Warehouse
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="page-header">
            <div class="page-header-left">
              {{ warehousesFilter.length }} Warehouses
            </div>
            <div>
              <el-button
                size="mini"
                class="filtrate-button"
                style="color:#8b8d91"
                v-if="!searchInputVisible && !searchInputFixed"
                @mouseover.native="handleSearchClick">
                <i class="el-icon-search"></i>
                <span style="color: #3f4246" >Search</span>
              </el-button>
              <el-input size="mini"
                        placeholder="Search Name"
                        prefix-icon="el-icon-search"
                        ref="searchInputRef"
                        v-if="searchInputVisible || searchInputFixed"
                        v-model="requestFilterData.searchName"
                        class="search-input border-radius-class"
                        @mouseout.native="handleMouseout"
                        @click.native="handleInputClick"
                        @blur="handleInputBlur"
                        @input="initData()">
              </el-input>

              <el-dropdown trigger="click" :hide-on-click="false">
                <div>
                  <el-button v-if="warehouseStatusObjs[0].checked" size="mini" class="filtrate-button" style="color:#8b8d91">
                    Status
                    <span style="color: #3f4246"
                          class="icon-style"
                          v-show="warehouseStatusObjs[0].checked">
                      {{ showCheckedStatusName }}
                    </span>
                  </el-button>
                  <el-button-group v-if="!warehouseStatusObjs[0].checked">
                    <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                      Status
                      <span style="color: #085bd7"
                            class="icon-style"
                            v-show="!warehouseStatusObjs[0].checked">
                      {{ showCheckedStatusName }}
                      </span>
                      <span style="color: #8b8d91" v-show="showCheckedStatusExtend"> +{{ showCheckedStatusCount - 1 }}</span>
                    </el-button>
                    <el-button size="mini"
                               icon="el-icon-close"
                               @click.prevent.stop="handleStatusClose"
                               class="filtrate-button"
                               style="margin-left: -5px; padding: 7px">
                    </el-button>
                  </el-button-group>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="statusObj in warehouseStatusObjs" :key="statusObj.id">
                    <div v-show="showStatusChecked(statusObj)" class="checkedActiveClass" @click="handleStatusChecked(statusObj)">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ statusObj.statusName }}
                    </div>
                    <div v-show="!showStatusChecked(statusObj)" @click="handleStatusChecked(statusObj)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ statusObj.statusName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click" :hide-on-click="false">
                <div>
                  <el-button v-if="warehouseSizeObjs[0].checked" size="mini" class="filtrate-button" style="color:#8b8d91">
                    Size
                    <span style="color: #3f4246"
                          class="icon-style"
                          v-show="warehouseSizeObjs[0].checked">
                      {{ showCheckedSizeName }}
                    </span>
                  </el-button>
                  <el-button-group v-if="!warehouseSizeObjs[0].checked">
                    <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                      Size
                      <span style="color: #085bd7"
                            class="icon-style"
                            v-show="!warehouseSizeObjs[0].checked">
                      {{ showCheckedSizeName }}
                      </span>
                      <span style="color: #8b8d91" v-show="showCheckedSizeExtend"> +{{ showCheckedSizeCount - 1 }}</span>
                    </el-button>
                    <el-button size="mini"
                               icon="el-icon-close"
                               @click.prevent.stop="handleSizeClose"
                               class="filtrate-button"
                               style="margin-left: -5px; padding: 7px">
                    </el-button>
                  </el-button-group>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="sizeObj in warehouseSizeObjs" :key="sizeObj.id">
                    <div v-show="showSizeChecked(sizeObj)" class="checkedActiveClass" @click="handleSizeChecked(sizeObj)">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ sizeObj.sizeName }}
                    </div>
                    <div v-show="!showSizeChecked(sizeObj)" @click="handleSizeChecked(sizeObj)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ sizeObj.sizeName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button size="mini" class="filtrate-button" @click="refresh">
                <i class="el-icon-refresh-right"></i>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="warehousesFilter"
          style="width: 100%"
          :header-row-style="{height: 48 + 'px'}"
          :header-cell-style="{padding: 0 + 'px'}"
          :row-style="{height: 48 + 'px'}"
          :cell-style="{padding: 0 + 'px'}"
          :height="tableHeight"
          v-if="warehousesFilter.length !== 0"
          @row-click="getWarehouseDetail">
          <el-table-column
            prop="name"
            label="NAME"
            sortable>
          </el-table-column>
          <el-table-column
            prop="status"
            label="STATUS"
            sortable>
            <template slot-scope="scope">
              <span v-show="scope.row.status === 1">Suspended</span>
              <span v-show="scope.row.status === 2">Started</span>
              <span v-show="scope.row.status === 3">Resuming</span>
              <span v-show="scope.row.status === 4">Resizing</span>
              <span v-show="scope.row.status === 5">Suspending</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="SIZE"
            sortable>
            <template slot-scope="scope">
              <span v-show="scope.row.size === 1">X-Small</span>
              <span v-show="scope.row.size === 2">Small</span>
              <span v-show="scope.row.size === 3">Medium</span>
              <span v-show="scope.row.size === 4">Large</span>
              <span v-show="scope.row.size === 5">X-Large</span>
              <span v-show="scope.row.size === 6">2X-Large</span>
              <span v-show="scope.row.size === 7">3X-Large</span>
              <span v-show="scope.row.size === 8">4X-Large</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="runningCount"
            label="RUNNING"
            sortable>
          </el-table-column>
          <el-table-column
            prop="queuedCount"
            label="QUEUED"
            sortable>
          </el-table-column>
          <el-table-column
            prop="role"
            label="OWNER"
            sortable>
          </el-table-column>
          <el-table-column
            prop="created"
            label="CREATED"
            sortable>
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.created"
                          placement="top"
                          popper-class="tooltip-style"
                          :open-delay="600">
                <span v-show="scope.row.created">{{ scope.row.created | changeTime }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label=""
            width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" :hide-on-click="true">
                <el-button size="small"
                           icon="el-icon-more"
                           style="border: #ffffff"
                           @click.native.stop="">
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="handleEditDialog(scope.row)">Edit</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleResumeDialog(scope.row)">Resume</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleDropDialog(scope.row)">Drop</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="handleOwnershipDialog(scope.row)">Transfer Ownership</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <el-empty id="empty" v-loading="loading" v-if="this.warehousesFilter.length === 0" :style="{paddingTop: tableHeight / 2 - emptyHeight / 2 + 'px'}">
          <div style="font-size: 16px; font-weight: 800; color: #65676c">No Warehouses</div>
          <div style="color: #65676c; margin-top: 10px">
            There are no warehouses associated with this<br/>
            role. Switch roles to view warehouses available<br/>
            to that role.
          </div>
        </el-empty>
      </el-col>
    </el-row>

    <!--dialog弹框-->
    <VWarehouseEdit :title="title"
                    :confirmButtonText="confirmButtonText"
                    :advanceActive="advanceActive"
                    :formDataRow="formDataCopy"
                    :dialogFormVisible="dialogFormVisible"
                    :warehouseSizeObjs="warehouseSizeObjs"
                    :requestFilterData="this.requestFilterData"
                    :isCreate="isCreate"
                    :isRowEdit="true"
                    :isDetailEdit="false"
                    @updateDialogFormVisible="updateDialogFormVisible"
                    @updateAdvanceActive="updateAdvanceActive"
                    @updateTableData="updateTableData">
    </VWarehouseEdit>
    <VWarehouseResume :dialogResumeVisible="dialogResumeVisible"
                      :formDataRow="formDataCopy"
                      :warehouseSizeObjs="warehouseSizeObjs"
                      :requestFilterData="this.requestFilterData"
                      :isRowEdit="true"
                      :isDetailEdit="false"
                      @updateDialogResumeVisible="updateDialogResumeVisible"
                      @updateTableData="updateTableData">
    </VWarehouseResume>
    <VWarehouseDrop :dialogDropVisible="dialogDropVisible"
                    :formDataRow="formDataCopy"
                    :requestFilterData="this.requestFilterData"
                    :isRowEdit="true"
                    :isDetailEdit="false"
                    @updateDialogDropVisible="updateDialogDropVisible"
                    @updateTableData="updateTableData">
    </VWarehouseDrop>
    <VWarehouseOwnership :dialogOwnershipVisible="dialogOwnershipVisible"
                         :formDataRow="formDataCopy"
                         :requestFilterData="this.requestFilterData"
                         :isRowEdit="true"
                         :isDetailEdit="false"
                         @updateDialogOwnershipVisible="updateDialogOwnershipVisible"
                         @updateTableData="updateTableData">
    </VWarehouseOwnership>
  </div>

</template>

<script>

import { mapState } from 'vuex'
import VWarehouseEdit from './VWarehouseEdit'
import VWarehouseResume from './VWarehouseResume'
import VWarehouseDrop from './VWarehouseDrop'
import VWarehouseOwnership from './VWarehouseOwnership'
export default {
  name: 'VWarehouseTable',
  components: {VWarehouseResume, VWarehouseEdit, VWarehouseDrop, VWarehouseOwnership},
  data () {
    return {
      tableHeight: 0,
      emptyHeight: 0,
      loading: false,
      isCreate: false,
      // warehouseList: [],
      warehousesFilter: [],
      dialogFormVisible: false,
      dialogResumeVisible: false,
      dialogDropVisible: false,
      dialogOwnershipVisible: false,
      searchInputVisible: false,
      searchInputFixed: false,
      warehouseStatusObjs: [
        {id: 0, statusName: 'All', checked: true},
        {id: 1, statusName: 'Suspended', checked: true},
        {id: 2, statusName: 'Started', checked: true},
        {id: 3, statusName: 'Resuming', checked: true},
        {id: 4, statusName: 'Resizing', checked: true},
        {id: 5, statusName: 'Suspending', checked: true}
      ],
      warehouseSizeObjs: [
        {id: 0, sizeName: 'All', desc: '', checked: true},
        {id: 1, sizeName: 'X-Small', desc: '1 credit/hour', checked: true},
        {id: 2, sizeName: 'Small', desc: '2 credits/hour', checked: true},
        {id: 3, sizeName: 'Medium', desc: '4 credits/hour', checked: true},
        {id: 4, sizeName: 'Large', desc: '8 credits/hour', checked: true},
        {id: 5, sizeName: 'X-Large', desc: '16 credits/hour', checked: true},
        {id: 6, sizeName: '2X-Large', desc: '32 credits/hour', checked: true},
        {id: 7, sizeName: '3X-Large', desc: '64 credits/hour', checked: true},
        {id: 8, sizeName: '4X-Large', desc: '128 credits/hour', checked: true}
      ],
      title: 'New Warehouse',
      confirmButtonText: 'Create Warehouse',
      advanceActive: false,
      formData: {
        name: '',
        size: 5,
        comment: '',
        isolated: false,
        mode: 0,
        minClusters: 1,
        maxClusters: 1,
        clusters: 2,
        scalingPolicy: 0,
        autoResume: true,
        autoSuspend: true,
        suspendAfter: 10,
        dataSize: 0,
        qps: 0
      },
      formDataCopy: {},
      statusIdList: [],
      sizeIdList: [],
      requestFilterData: {
        searchName: '',
        statusIds: '',
        sizeIds: ''
      }
    }
  },
  async created () {
    await window.addEventListener('setItem', () => {
      console.log('Warehouse change...')
      this.initData()
    })
  },
  async mounted () {
    console.log('筛选div的高度：', document.getElementById('page-filter').clientHeight)
    this.tableHeight = document.documentElement.clientHeight - 50 - 5 - document.getElementById('page-filter').clientHeight - 40
    if (document.getElementById('empty') != null) {
      this.emptyHeight = document.getElementById('empty').clientHeight
    }

    await this.initData()
  },
  methods: {
    async initData () {
      this.loading = true
      let responseData = await this.services.warehouseService.warehouseList(this.requestFilterData)
      if (responseData.code) {
        this.loading = false
      }
      this.warehousesFilter = responseData.data
      console.log('initData() warehouseList: ' + JSON.stringify(this.warehousesFilter))
    },
    updateTableData (data) {
      this.warehousesFilter = data
    },
    showStatusChecked (statusObj) {
      if (statusObj.id === 0) {
        return statusObj.checked
      } else {
        return !this.warehouseStatusObjs[0].checked && statusObj.checked
      }
    },
    showSizeChecked (sizeObj) {
      if (sizeObj.id === 0) {
        return sizeObj.checked
      } else {
        return !this.warehouseSizeObjs[0].checked && sizeObj.checked
      }
    },
    async handleStatusClose () {
      this.warehouseStatusObjs.forEach(status => {
        status.checked = true
      })
      this.requestFilterData.statusIds = ''
      await this.initData()
    },
    async handleStatusChecked (statusObj) {
      if (statusObj.id === 0) {
        // statusObj.checked = true
        this.warehouseStatusObjs.forEach(status => {
          status.checked = true
        })
        this.statusIdList = this.warehouseStatusObjs.filter(status => {
          return status.id !== 0
        }).map(status => {
          return status.id
        })
      } else {
        if (this.isStatusSelectedAll()) {
          this.warehouseStatusObjs.forEach(status => {
            status.checked = false
          })
          statusObj.checked = true
          this.statusIdList = []
          this.statusIdList = this.statusIdList.concat(statusObj.id)
        } else {
          statusObj.checked = !statusObj.checked
          if (statusObj.checked) {
            this.statusIdList = this.statusIdList.concat(statusObj.id)
          } else {
            this.statusIdList = this.statusIdList.filter(statusId => {
              return statusId !== statusObj.id
            })
          }
          if (this.isStatusSelectedAll() || this.isStatusSelectedNone()) {
            this.warehouseStatusObjs.forEach(status => {
              status.checked = true
            })
            this.statusIdList = this.warehouseStatusObjs.filter(status => {
              return status.id !== 0
            }).map(status => {
              return status.id
            })
          }
        }
      }
      console.log('===========this.statusIdList===========', JSON.stringify(this.statusIdList))
      this.requestFilterData.statusIds = this.statusIdList.join(',')
      console.log('===========this.requestFilterData.statusIds===========', this.requestFilterData.statusIds)
      await this.initData()
    },
    isStatusSelectedAll () {
      return this.warehouseStatusObjs.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === this.warehouseStatusObjs.length - 1
    },
    isStatusSelectedNone () {
      return this.warehouseStatusObjs.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === 0
    },
    async handleSizeClose () {
      this.warehouseSizeObjs.forEach(size => {
        size.checked = true
      })
      this.requestFilterData.sizeIds = ''
      await this.initData()
    },
    async handleSizeChecked (sizeObj) {
      if (sizeObj.id === 0) {
        // sizeObj.checked = true
        this.warehouseSizeObjs.forEach(size => {
          size.checked = true
        })
        this.sizeIdList = this.warehouseSizeObjs.filter(size => {
          return size.id !== 0
        }).map(size => {
          return size.id
        })
      } else {
        if (this.isSizeSelectedAll()) {
          this.warehouseSizeObjs.forEach(size => {
            size.checked = false
          })
          sizeObj.checked = true
          this.sizeIdList = []
          this.sizeIdList = this.sizeIdList.concat(sizeObj.id)
        } else {
          sizeObj.checked = !sizeObj.checked
          if (sizeObj.checked) {
            this.sizeIdList = this.sizeIdList.concat(sizeObj.id)
          } else {
            this.sizeIdList = this.sizeIdList.filter(sizeId => {
              return sizeId !== sizeObj.id
            })
          }
          if (this.isSizeSelectedAll() || this.isSizeSelectedNone()) {
            this.warehouseSizeObjs.forEach(size => {
              size.checked = true
            })
            this.sizeIdList = this.warehouseSizeObjs.filter(size => {
              return size.id !== 0
            }).map(size => {
              return size.id
            })
          }
        }
      }
      console.log('===========this.sizeIdList===========', JSON.stringify(this.sizeIdList))
      this.requestFilterData.sizeIds = this.sizeIdList.join(',')
      console.log('===========this.requestFilterData.sizeIds===========', this.requestFilterData.sizeIds)
      await this.initData()
    },
    isSizeSelectedAll () {
      return this.warehouseSizeObjs.filter(size => {
        return size.id !== 0
      }).filter(size => {
        return size.checked
      }).length === this.warehouseSizeObjs.length - 1
    },
    isSizeSelectedNone () {
      return this.warehouseSizeObjs.filter(size => {
        return size.id !== 0
      }).filter(size => {
        return size.checked
      }).length === 0
    },
    handleSearchClick () {
      this.searchInputVisible = true
      this.$nextTick(function () {
        this.$refs.searchInputRef.focus()
      })
    },
    handleInputBlur () {
      if (!this.requestFilterData.searchName) {
        this.searchInputVisible = false
        this.searchInputFixed = false
      }
    },
    handleMouseout () {
      this.searchInputVisible = false
    },
    handleInputClick () {
      this.searchInputFixed = true
    },
    async refresh () {
      // this.$router.go(0)
      await this.getTableData()
    },
    handleAddWarehouse () {
      this.title = 'New Warehouse'
      this.confirmButtonText = 'Create Warehouse'
      this.isCreate = true
      this.advanceActive = false
      this.dialogFormVisible = true

      console.log('=========this.formData=========', this.formData)
      this.formDataCopy = this.formData
    },
    getWarehouseDetail (row) {
      this.$router.push({
        name: 'VWarehouseDetail',
        params: {
          name: row.name,
          id: row.id
        }
      })
      // this.$nextTick(function () {
      //   this.$bus.$emit('receiveDetails', this.warehouseStatusObjs, this.warehouseSizeObjs)
      // })
    },
    handleEditDialog (row) {
      this.title = 'Edit Warehouse'
      this.confirmButtonText = 'Save Warehouse'
      this.isCreate = false
      this.advanceActive = true
      this.dialogFormVisible = true
      this.formDataCopy = row
      console.log('this.formData======', this.formData)
    },
    handleResumeDialog (row) {
      this.dialogResumeVisible = true
      this.formDataCopy = row
    },
    handleDropDialog (row) {
      this.dialogDropVisible = true
      this.formDataCopy = row
    },
    handleOwnershipDialog (row) {
      this.dialogOwnershipVisible = true
      this.formDataCopy = row
    },
    updateDialogFormVisible (data) {
      console.log('data======', data)
      this.dialogFormVisible = data
    },
    updateDialogResumeVisible (data) {
      console.log('data======', data)
      this.dialogResumeVisible = data
    },
    updateAdvanceActive (data) {
      this.advanceActive = data
    },
    updateDialogDropVisible (data) {
      console.log('data======', data)
      this.dialogDropVisible = data
    },
    updateDialogOwnershipVisible (data) {
      console.log('data======', data)
      this.dialogOwnershipVisible = data
    }
  },
  computed: {
    ...mapState([ 'services' ]),

    showCheckedStatusName () {
      const statusFilters = this.warehouseStatusObjs.filter(statusObj => {
        return statusObj.checked === true
      })
      return statusFilters[0].statusName
    },
    showCheckedStatusCount () {
      const statusFilters = this.warehouseStatusObjs.filter(statusObj => {
        return statusObj.checked === true
      })
      return statusFilters.length
    },
    showCheckedSizeName () {
      const sizeFilters = this.warehouseSizeObjs.filter(sizeObj => {
        return sizeObj.checked === true
      })
      return sizeFilters[0].sizeName
    },
    showCheckedSizeCount () {
      const sizeFilters = this.warehouseSizeObjs.filter(sizeObj => {
        return sizeObj.checked === true
      })
      return sizeFilters.length
    },
    showCheckedStatusExtend () {
      return this.showCheckedStatusCount - 1 > 0 && this.warehouseStatusObjs[0].checked === false
    },
    showCheckedSizeExtend () {
      return this.showCheckedSizeCount - 1 > 0 && this.warehouseSizeObjs[0].checked === false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-top {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-left: 10px;
  /*margin-top: 20px;*/
  margin-bottom: 20px;
}

.page-title-left {
  font-weight: 700;
  font-size: 20px;
  color: #2c2f34;
}

.page-title-right {
  /*margin-top: 15px;*/
}

.page-title-button {
  border-radius: 8px;
  background-color: #1a6ce7;
  font-weight: 500;
  color: #ffffff;
}

.page-header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-left: 10px;
  margin-bottom: 10px;
}

.page-header-left {
  font-weight: 700;
  font-size: 16px;
  color: #2c2f34;
}

.page-header-right {
  /*margin-bottom: 20px;*/
}

.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 550;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}

.icon-style {
  margin-right: 4px;
}

.checkedActiveClass {
  color: #085bd7
}

.search-input {
  width: 150px;
  margin-right: 4px;
}
</style>

<style>
.border-radius-class .el-input__inner {
  border-radius: 8px;
}

.el-empty__description {
  display: none;
}
</style>
