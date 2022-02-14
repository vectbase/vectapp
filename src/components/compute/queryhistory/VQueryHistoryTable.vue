<template>
  <div>
    <div id="page-filter">
      <el-row>
        <el-col :span="6" class="page-title">
          Query History
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="page-header">
            <div class="page-header-left">
              {{ queryHistoryFilter.length }} Queries
            </div>
            <div>
              <el-dropdown trigger="click" :hide-on-click="true">
                <div>
                  <el-button size="mini"
                             class="filtrate-button"
                             style="color:#8b8d91"
                             v-if="queryStatusObjs[0].checked">
                    Status
                    <span style="color: #3f4246"
                          class="icon-style">
                        {{ showCheckedStatusName }}
                    </span>
                  </el-button>
                  <el-button-group v-if="!queryStatusObjs[0].checked">
                    <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                      Status
                      <span style="color: #085bd7"
                            class="icon-style">
                        {{ showCheckedStatusName }}
                      </span>
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
                  <el-dropdown-item v-for="queryStatusObj in queryStatusObjs" :key="queryStatusObj.id">
                    <div v-show="queryStatusObj.checked" class="columnActiveClass">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ queryStatusObj.statusName }}
                    </div>
                    <div v-show="!queryStatusObj.checked" @click="handleStatusChecked(queryStatusObj)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ queryStatusObj.statusName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click" :hide-on-click="true">
                <div>
                  <el-button v-if="userObjs[0].checked"
                             size="mini"
                             class="filtrate-button"
                             style="color:#8b8d91">
                    User
                    <span style="color: #3f4246"
                          class="icon-style">
                      {{ showCheckedUser }}
                    </span>
                  </el-button>
                  <el-button-group v-if="!userObjs[0].checked">
                    <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                      User
                      <span style="color: #085bd7"
                            class="icon-style"
                            v-show="!userObjs[0].checked">
                        {{ showCheckedUser }}
                      </span>
                    </el-button>
                    <el-button size="mini"
                               icon="el-icon-close"
                               @click.prevent.stop="handleUserClose"
                               class="filtrate-button"
                               style="margin-left: -5px; padding: 7px">
                    </el-button>
                  </el-button-group>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(user, index) in userObjs" :key="index">
                    <div v-show="user.checked" class="columnActiveClass">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ user.userName }}
                    </div>
                    <div v-show="!user.checked" @click="handleUserChecked(user)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ user.userName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-popover
                placement="bottom"
                trigger="click"
                v-model="popoverVisible"
                @hide="handleQueryClearAll">
                <div class="query-filters-row" v-for="queryFilterObj in queryFiltersObjs" :key="queryFilterObj.id">
                  <div style="float: left">
                    {{ queryFilterObj.filterName }}
                    <el-tooltip v-if="queryFilterObj.filterName === 'Warehouse'" effect="dark" content="Queries that don't require a warehouse to execute will also be displayed" placement="top">
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </div>
                  <div class="div-switch">
                    <el-switch
                      v-model="queryFilterObj.switchOn"
                      active-color="#1a6ce7"
                      inactive-color="#cccdd0">
                    </el-switch>
                  </div>
                  <br/>
                  <el-input
                    class="query-filters-input"
                    :placeholder="queryFilterObj.placeholder"
                    v-model="queryFilterObj.queryContent"
                    v-if="queryFilterObj.hasOwnProperty('placeholder') && queryFilterObj.switchOn === true">
                  </el-input>
                  <div class="query-filters-input" v-if="queryFilterObj.hasOwnProperty('durationOptions') && queryFilterObj.switchOn === true">
                    <span class="query-filters-font">Greater than</span> <el-input style="width: 60px" v-model.number="queryFilterObj.queryContent"></el-input>
                    <el-select style="width: 110px" v-model="selectedDurationValue" placeholder="" prevent>
                      <el-option
                        v-for="duration in queryFilterObj.durationOptions"
                        :key="duration.id"
                        :label="duration.durationUnit"
                        :value="duration.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <el-divider></el-divider>
                <div class="query-filters-row">
                  <el-button size="small" class="query-filters-button-left" @click="handleQueryClearAll">Clear all</el-button>
                  <el-button size="small" class="query-filters-button-right" @click="handleQueryFilters">Apply Filters</el-button>
                </div>
                <el-button size="mini" class="filtrate-button" slot="reference">
                  <i class="el-icon-s-operation icon-style"></i>
                  Filters
                  <span style="color: #085bd7"
                        class="icon-style"
                        v-show="showFiltersIcon">
                    {{ showFiltersCount }}
                  </span>
                </el-button>
              </el-popover>

              <!--<span style="color: #E2E3E5; font-weight: 1">|</span>-->
              <el-divider direction="vertical"></el-divider>
              <el-dropdown trigger="click" :hide-on-click="false">
                <el-button size="mini" class="filtrate-button">
                  <i class="el-icon-view icon-style"></i>
                  Columns
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div v-show="showColumnAll" class="columnActiveClass" @click="handleColumnAllChecked()">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ columnAllObj.columnName }}
                    </div>
                    <div v-show="!showColumnAll" @click="handleColumnAllChecked()">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ columnAllObj.columnName }}
                    </div>
                  </el-dropdown-item>

                  <el-dropdown-item v-for="columnNameObj in columnNameObjs" :key="columnNameObj.id">
                    <div v-show="columnNameObj.checked && !columnAllObj.checked" class="columnActiveClass" @click="handleColumnChecked(columnNameObj)">
                      <i class="el-icon-check" style="margin-right: 10px"></i>
                      {{ columnNameObj.columnName }}
                    </div>
                    <div v-show="!columnNameObj.checked || columnAllObj.checked" @click="handleColumnChecked(columnNameObj)">
                      <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
                      {{ columnNameObj.columnName }}
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

    <VViewResults :dialogVisible="dialogVisible" @updateDialogVisible="updateDialogVisible"></VViewResults>

    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="queryHistoryFilter"
          style="width: 100%"
          :header-row-style="{height: 48 + 'px'}"
          :header-cell-style="{padding: 0 + 'px'}"
          :row-style="{height: 48 + 'px'}"
          :cell-style="{padding: 0 + 'px'}"
          :height="tableHeight"
          v-if="queryHistoryFilter.length !== 0">
          <el-table-column
            fixed
            prop="sqlText"
            label="SQL TEXT"
            min-width="320"
            sortable
            v-if="columnNameObjs[0].checked">
            <!--show-overflow-tooltip-->
            <template slot-scope="scope">
              <el-popover trigger="hover" :open-delay="600" placement="bottom-start" :visible-arrow="false" width="520">
                <div class="popover-top-left">
                  <p class="popover-title">SQL Text</p>
                  <p>
                    <span style="margin-right: 4px">Query ID: {{ scope.row.queryId }}</span>
                    <span v-clipboard:copy="scope.row.queryId" v-clipboard:success="onCopy">
                      <span style="cursor: pointer"><i class="el-icon-document-copy"></i></span>
                    </span>
                  </p>
                </div>
                <div class="popover-top-right">
                  <el-button size="mini" class="filtrate-button" @click="dialogVisible = true">View Results</el-button>
                </div>
                <el-card class="popover-card-body">
                  <p v-highlight><code class="sql">{{ scope.row.sqlText }}</code></p>
                  <div class="popover-card-bottom">
                    <el-button size="mini" class="button-fillet" @click="handleOpenInWorkSheets(scope.row.sqlText)"><i class="el-icon-thumb icon-style"></i>Open in WorkSheets</el-button>
                    <span v-clipboard:copy="scope.row.sqlText" v-clipboard:success="onCopy">
                      <el-button size="mini" class="button-fillet"><i class="el-icon-document-copy icon-style"></i>Copy</el-button>
                    </span>
                  </div>
                </el-card>
                <span slot="reference" class="sql-class">{{ scope.row.sqlText }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="queryId"
            label="QUERY ID"
            min-width="320"
            sortable
            v-if="columnNameObjs[1].checked">
          </el-table-column>
          <el-table-column
            prop="status"
            label="STATUS"
            min-width="168"
            sortable
            v-if="columnNameObjs[2].checked">
            <template slot-scope="scope">
              <el-tag class="status-tag" size="small" type="primary" effect="dark" v-show="scope.row.status === 1">Queued</el-tag>
              <el-tag class="status-tag" size="small" type="info" effect="dark" v-show="scope.row.status === 2">Blocked</el-tag>
              <el-tag class="status-tag" size="small" type="warning" effect="dark" v-show="scope.row.status === 3">Running</el-tag>
              <el-tag class="status-tag" size="small" type="danger" effect="dark" v-show="scope.row.status === 4">Failed</el-tag>
              <el-tag class="status-tag" size="small" type="success" effect="dark" v-show="scope.row.status === 5">Successful</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="user"
            label="USER"
            min-width="168"
            sortable
            v-if="columnNameObjs[3].checked">
          </el-table-column>
          <el-table-column
            prop="warehouse"
            label="WAREHOUSE"
            min-width="168"
            sortable
            v-if="columnNameObjs[4].checked">
          </el-table-column>
          <el-table-column
            prop="duration.totalDuration"
            label="DURATION"
            min-width="200"
            sortable
            v-if="columnNameObjs[5].checked">
            <template slot-scope="scope">
              <el-popover trigger="hover" :open-delay="600" placement="left">
                <div class="duration-popover-main">
                  <!--title-->
                  <div class="duration-popover-title">Query Duration</div>

                  <!--Compilation-->
                  <span v-show="scope.row.duration.compilationTime !== 0">
                    <div class="progress-desc-container">
                      <div>Compilation</div>
                      <div> {{ scope.row.duration.compilationTime | durationFilter }}</div>
                    </div>
                    <el-progress :percentage="handlePercent(scope.row.duration.compilationTime, scope.row.duration.totalDuration)"
                                 :show-text="false"
                                 class="duration-popover-body">
                    </el-progress>
                  </span>

                  <!--Queued provisioning-->
                  <span v-show="scope.row.duration.queuedResumeTime !== 0">
                    <div class="progress-desc-container">
                      <div>Queued provisioning</div>
                      <div> {{ scope.row.duration.queuedResumeTime | durationFilter}}</div>
                    </div>
                    <el-progress :percentage="handlePercent(scope.row.duration.queuedResumeTime, scope.row.duration.totalDuration)"
                                 :show-text="false"
                                 status="success"
                                 class="duration-popover-body">
                    </el-progress>
                  </span>

                  <!--List external files-->
                  <span v-show="scope.row.duration.externalFilesTime !== 0">
                    <div class="progress-desc-container">
                      <div>List external files</div>
                      <div> {{ scope.row.duration.externalFilesTime | durationFilter}}</div>
                    </div>
                    <el-progress :percentage="handlePercent(scope.row.duration.externalFilesTime, scope.row.duration.totalDuration)"
                                 :show-text="false"
                                 status="warning"
                                 class="duration-popover-body">
                    </el-progress>
                  </span>

                  <!--Execution-->
                  <span v-show="scope.row.duration.xpExecTime !== 0">
                    <div class="progress-desc-container">
                      <div>Execution</div>
                      <div> {{ scope.row.duration.xpExecTime | durationFilter }}</div>
                    </div>
                    <el-progress :percentage="handlePercent(scope.row.duration.xpExecTime, scope.row.duration.totalDuration)"
                                 :show-text="false"
                                 status="exception"
                                 class="duration-popover-body">
                    </el-progress>
                  </span>

                  <!--Total-->
                  <div class="progress-desc-container">
                    <div style="color: #3f4246;">Total</div>
                    <div>{{ scope.row.duration.totalDuration | durationFilter }}</div>
                  </div>
                </div>

                <div slot="reference" class="duration-container">
                  <el-progress :percentage="100"
                               :show-text="false"
                               v-show="scope.row.duration.compilationTime !== 0"
                               :style="'margin-top:9px; width: ' + handleWidth(scope.row.duration.compilationTime) + '%'">
                  </el-progress>
                  <el-progress :percentage="100"
                               :show-text="false"
                               status="success"
                               v-show="scope.row.duration.queuedResumeTime !== 0"
                               :style="'margin-top: 9px; width: ' + handleWidth(scope.row.duration.queuedResumeTime) + '%'">
                  </el-progress>
                  <el-progress :percentage="100"
                               :show-text="false"
                               status="warning"
                               v-show="scope.row.duration.externalFilesTime !== 0"
                               :style="'margin-top: 9px; width: ' + handleWidth(scope.row.duration.externalFilesTime) + '%'">
                  </el-progress>
                  <el-progress :percentage="100"
                               :show-text="false"
                               status="exception"
                               v-show="scope.row.duration.xpExecTime !== 0"
                               :style="'margin-top: 9px; width: ' + handleWidth(scope.row.duration.xpExecTime) + '%'">
                  </el-progress>

                  <div style="margin-left: 6px">
                    {{ scope.row.duration.totalDuration | durationFilter }}
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="started"
            label="STARTED"
            min-width="128"
            sortable
            v-if="columnNameObjs[6].checked">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.started"
                          placement="top"
                          popper-class="tooltip-style"
                          :open-delay="600">
                <span>{{ scope.row.started | changeTime }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="END TIME"
            min-width="132"
            sortable
            v-if="columnNameObjs[7].checked">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.endTime"
                          placement="top"
                          popper-class="tooltip-style"
                          :open-delay="600">
                <span>{{ scope.row.endTime | changeTime }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="sessionId"
            label="SESSION ID"
            min-width="168"
            sortable
            v-if="columnNameObjs[8].checked">
          </el-table-column>
          <el-table-column
            prop="clientInfo"
            label="CLIENT INFO"
            min-width="168"
            sortable
            v-if="columnNameObjs[9].checked">
          </el-table-column>
          <el-table-column
            prop="bytesScanned"
            label="BYTES SCANNED"
            min-width="170"
            sortable
            v-if="columnNameObjs[10].checked">
          </el-table-column>
          <el-table-column
            prop="clusterNumber"
            label="CLUSTER NUMBER"
            min-width="180"
            sortable
            v-if="columnNameObjs[11].checked">
          </el-table-column>
          <el-table-column
            prop="queryRows"
            label="ROWS"
            min-width="132"
            sortable
            v-if="columnNameObjs[12].checked">
          </el-table-column>
          <el-table-column
            prop="queryTag"
            label="QUERY TAG"
            min-width="152"
            sortable
            v-if="columnNameObjs[13].checked">
          </el-table-column>
        </el-table>
        <el-empty id="empty" v-loading="loading" v-show="this.queryHistoryFilter.length === 0" :style="{paddingTop: tableHeight / 2 - emptyHeight / 2 + 'px'}">
          <div style="font-size: 16px; font-weight: 800; color: #65676c">No Queries</div>
          <div style="color: #65676c; margin-top: 10px">
            There are no queries associated with this<br/>
            role. Switch roles to view queries available<br/>
            to that role.
          </div>
        </el-empty>
        <!--使loading状态显示在屏幕中间-->
        <!--<div v-loading="loading"
             v-if="this.queryHistoryFilter.length === 0 && loading"
             :style="{marginTop: tableHeight / 2 + 'px'}">
        </div>-->
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { nanoid } from 'nanoid'
import { mapState } from 'vuex'
import VViewResults from './VViewResults'

export default {
  name: 'VQueryHistoryTable',
  components: {VViewResults},
  data () {
    return {
      tableHeight: 0,
      emptyHeight: 0,
      loading: false,
      dialogVisible: false,
      // queryHistoryList: [],
      queryHistoryFilter: [],
      columnAllObj: {id: nanoid(), columnName: 'All', checked: false},
      columnNameObjs: [
        // {id: nanoid(), columnName: 'All', checked: false},
        {id: nanoid(), columnName: 'SQL Text', checked: true},
        {id: nanoid(), columnName: 'Query ID', checked: true},
        {id: nanoid(), columnName: 'Status', checked: true},
        {id: nanoid(), columnName: 'User', checked: true},
        {id: nanoid(), columnName: 'Warehouse', checked: true},
        {id: nanoid(), columnName: 'Duration', checked: true},
        {id: nanoid(), columnName: 'Started', checked: true},
        {id: nanoid(), columnName: 'End Time', checked: false},
        {id: nanoid(), columnName: 'Session ID', checked: false},
        {id: nanoid(), columnName: 'Client Info', checked: false},
        {id: nanoid(), columnName: 'Bytes Scanned', checked: false},
        {id: nanoid(), columnName: 'Cluster Number', checked: false},
        {id: nanoid(), columnName: 'Rows', checked: false},
        {id: nanoid(), columnName: 'Query Tag', checked: false}
      ],
      queryStatusObjs: [
        {id: 0, statusName: 'All', checked: true},
        {id: 1, statusName: 'Queued', checked: false},
        {id: 2, statusName: 'Blocked', checked: false},
        {id: 3, statusName: 'Running', checked: false},
        {id: 4, statusName: 'Failed', checked: false},
        {id: 5, statusName: 'Successful', checked: false}
      ],
      userObjs: [
        {entityId: '', userName: 'All', checked: true}
      ],
      queryFiltersObjs: [
        {id: nanoid(), filterName: 'Query ID', switchOn: false, queryContent: '', placeholder: 'Enter Query ID'},
        {id: nanoid(), filterName: 'Warehouse', switchOn: false, queryContent: '', placeholder: 'Select warehouse'},
        {id: nanoid(),
          filterName: 'Duration',
          switchOn: false,
          queryContent: '',
          durationOptions: [
            {id: 1, durationUnit: 'Seconds', desc: 's'},
            {id: 2, durationUnit: 'Minutes', desc: 'min'},
            {id: 3, durationUnit: 'Hours', desc: 'h'}
          ]
        },
        {id: nanoid(), filterName: 'Session ID', switchOn: false, queryContent: '', placeholder: 'Session ID'},
        {id: nanoid(), filterName: 'Client generated statements', switchOn: false},
        {id: nanoid(), filterName: 'Queries executed by user tasks', switchOn: false}
      ],
      /* queryFiltersObjs1: [
        {'queryIdObj': {id: nanoid(), filterName: 'Query ID', switchOn: false, queryContent: '', placeholder: 'Enter Query ID'}},
        {'warehouseObj': {id: nanoid(), filterName: 'Warehouse', switchOn: false, queryContent: '', placeholder: 'Select warehouse'}},
        {'durationObj': {id: nanoid(), filterName: 'Duration', switchOn: false, queryContent: ''}},
        {'sessionIdObj': {id: nanoid(), filterName: 'Session ID', switchOn: false, queryContent: '', placeholder: 'Session ID'}},
        {'clientGeneratedObj': {id: nanoid(), filterName: 'Client generated statements', switchOn: false, queryContent: ''}},
        {'userTasksObj': {id: nanoid(), filterName: 'Queries executed by user tasks', switchOn: false, queryContent: ''}}
      ], */
      selectedDurationValue: 1,
      popoverVisible: false,
      durationUnitObjs: [
        {id: 0, durationUnit: 'Millisecond', desc: 'ms'},
        {id: 1, durationUnit: 'Seconds', desc: 's'},
        {id: 2, durationUnit: 'Minutes', desc: 'min'},
        {id: 3, durationUnit: 'Hours', desc: 'h'}
      ],
      isConfirmClick: false,
      requestData: {
        status: 0,
        user: '',
        queryId: '',
        warehouse: '',
        totalDuration: 0,
        durationUnit: 1,
        sessionId: '',
        clientGeneratedStatements: false,
        queriesExecutedByUserTasks: false
      }
    }
  },
  async created () {
    await window.addEventListener('setItem', () => {
      console.log('Query history change...')
      this.initData()
    })
  },
  async mounted () {
    console.log('筛选div的高度：', document.getElementById('page-filter').clientHeight)
    this.tableHeight = document.documentElement.clientHeight - 60 - document.getElementById('page-filter').clientHeight - 40
    if (document.getElementById('empty') != null) {
      this.emptyHeight = document.getElementById('empty').clientHeight
    }

    // init data
    await this.initData()
    await this.getUsers()

    /* this.$set(
      this.queryFiltersObjs[2],
      'durationOptions',
      this.durationUnitObjs.filter(durationUnit => {
        return durationUnit.id > 0
      })
    ) */
  },
  methods: {
    async initData () {
      this.loading = true
      console.log('~~~~~~~~~~~~~~~~', this.requestData)
      let responseData = await this.services.queryHistoryService.queryHistoryList(this.requestData)
      if (responseData.code) {
        this.loading = false
      }
      this.queryHistoryFilter = responseData.data
      console.log('initData() queryHistoryList: ' + JSON.stringify(this.queryHistoryFilter))
    },
    async getUsers () {
      let responseData = await this.services.queryHistoryService.queryUserList()
      this.userObjs = this.userObjs.concat(responseData.data)
      this.userObjs.forEach(user => {
        if (!user.hasOwnProperty('checked')) {
          this.$set(user, 'checked', false)
        }
      })
      console.log('==================users finish==================', this.userObjs)
    },
    updateDialogVisible (val) {
      console.log('===========updateDialogVisible===========', val)
      this.dialogVisible = val
    },
    handleColumnChecked (columnNameObj) {
      if (this.columnCheckedCount === this.columnNameObjs.length) {
        this.columnNameObjs.forEach(columnName => {
          columnName.checked = false
        })
        this.columnAllObj.checked = false
        columnNameObj.checked = true
      } else {
        columnNameObj.checked = !columnNameObj.checked
        if (this.columnCheckedCount === 0 || this.columnCheckedCount === this.columnNameObjs.length) {
          this.columnAllObj.checked = true
        }
      }
    },
    handleColumnAllChecked () {
      this.columnNameObjs.forEach(column => {
        column.checked = true
      })
      this.columnAllObj.checked = true
    },
    async handleStatusChecked (queryStatusObj) {
      this.queryStatusObjs.forEach(queryStatusObj => {
        queryStatusObj.checked = false
      })
      queryStatusObj.checked = true
      // 前端控制
      /* if (queryStatusObj.id === 0) {
        this.queryHistoryFilter = this.queryHistoryList
      } else {
        this.queryHistoryFilter = this.queryHistoryList.filter(queryHistory => {
          return queryHistory.status === queryStatusObj.id
        })
      } */
      // 请求接口
      this.requestData.status = queryStatusObj.id
      await this.initData()
    },
    async handleStatusClose () {
      this.queryStatusObjs.forEach(queryStatusObj => {
        queryStatusObj.checked = false
      })
      this.$set(this.queryStatusObjs[0], 'checked', true)
      this.requestData.status = 0
      await this.initData()
    },
    async handleUserChecked (user) {
      this.userObjs.forEach(user => {
        user.checked = false
      })
      user.checked = true
      // 请求接口
      this.requestData.user = user.entityId
      await this.initData()
    },
    async handleUserClose () {
      this.userObjs.forEach(user => {
        user.checked = false
      })
      this.$set(this.userObjs[0], 'checked', true)
      // 请求接口
      this.requestData.user = ''
      await this.initData()
    },
    async refresh () {
      await this.initData()
    },
    async handleOpenInWorkSheets (sql) {
      let sqlInfoRes = await this.services.workSheetService.createNewWs(sql)
      console.log('***** sqlInfoRes: ' + JSON.stringify(sqlInfoRes))
      if (sqlInfoRes.code === '1') {
        let workSheetId = sqlInfoRes.data.id
        let workSheetTitle = sqlInfoRes.data.title
        let workSheetSql = sqlInfoRes.data.sqlCon
        let routePath = this.$router.resolve({path: '/sqlCode', query: {id: workSheetId, title: workSheetTitle, sqlCon: workSheetSql}})
        window.open(routePath.href, '_blank')
      } else {
        this.$message.error('create new worksheet fail')
      }
    },
    onCopy () {
      this.$message.success('Copied')
    },
    async handleQueryClearAll () {
      this.popoverVisible = false // 关闭popover
      if (!this.isConfirmClick) { // 点空白处和点击Clear all关闭才重置，点击Apply Filters关闭不重置
        this.queryFiltersObjs.forEach(queryFiltersObj => {
          queryFiltersObj.switchOn = false
          queryFiltersObj.queryContent = ''
          if (queryFiltersObj.hasOwnProperty('durationOptions')) { // 还原select
            this.selectedDurationValue = 1
          }
        })
        // this.requestData.queryId = ''
        // this.requestData.warehouse = ''
        // this.requestData.totalDuration = 0
        // this.requestData.sessionId = ''
        // this.requestData.clientGeneratedStatements = false
        // this.requestData.queriesExecutedByUserTasks = false
        //
        // console.log('==========After clear all==========', this.requestData)
        // await this.initData()
      } else {
        this.isConfirmClick = false
        if (this.queryFiltersObjs[0].switchOn && this.queryFiltersObjs[0].queryContent === '') {
          this.$set(this.queryFiltersObjs[0], 'switchOn', false)
        }
        if (this.queryFiltersObjs[1].switchOn && this.queryFiltersObjs[1].queryContent === '') {
          this.$set(this.queryFiltersObjs[1], 'switchOn', false)
        }
        if (this.queryFiltersObjs[2].switchOn && this.queryFiltersObjs[2].queryContent === '') {
          this.$set(this.queryFiltersObjs[2], 'switchOn', false)
          this.selectedDurationValue = 1
        }
        if (this.queryFiltersObjs[3].switchOn && this.queryFiltersObjs[3].queryContent === '') {
          this.$set(this.queryFiltersObjs[3], 'switchOn', false)
        }
      }
    },
    async handleQueryFilters () {
      this.isConfirmClick = true
      this.popoverVisible = false // 关闭popover
      console.log(this.queryFiltersObjs)
      console.log(this.selectedDurationValue)
      /* this.queryHistoryFilter = this.queryHistoryList.filter(queryHistory => {
        return (this.queryFiltersObjs[0].queryContent !== '' ? this.queryFiltersObjs[0].queryContent === queryHistory.queryId : true) &&
          (this.queryFiltersObjs[1].queryContent !== '' ? this.queryFiltersObjs[1].queryContent === queryHistory.warehouse : true) &&
          (this.queryFiltersObjs[3].queryContent !== '' ? this.queryFiltersObjs[3].queryContent === queryHistory.sessionId : true)
      }) */
      this.queryFiltersObjs[0].switchOn ? this.requestData.queryId = this.queryFiltersObjs[0].queryContent : this.requestData.queryId = ''
      this.queryFiltersObjs[1].switchOn ? this.requestData.warehouse = this.queryFiltersObjs[1].queryContent : this.requestData.warehouse = ''
      this.queryFiltersObjs[2].switchOn ? this.requestData.totalDuration = (this.queryFiltersObjs[2].queryContent === '' ? 0 : this.queryFiltersObjs[2].queryContent) : this.requestData.totalDuration = 0
      this.requestData.durationUnit = this.selectedDurationValue
      this.queryFiltersObjs[3].switchOn ? this.requestData.sessionId = this.queryFiltersObjs[3].queryContent : this.requestData.sessionId = ''
      this.queryFiltersObjs[4].switchOn ? this.requestData.clientGeneratedStatements = this.queryFiltersObjs[4].switchOn : this.requestData.clientGeneratedStatements = false
      this.queryFiltersObjs[5].switchOn ? this.requestData.queriesExecutedByUserTasks = this.queryFiltersObjs[5].switchOn : this.requestData.queriesExecutedByUserTasks = false

      await this.initData()
    },
    handlePercent (time, totalTime) {
      if (totalTime === 0) {
        return 0
      }
      return time / totalTime * 100
    },
    handleWidth (time) {
      let maxTotalDuration = this.queryHistoryFilter.map(item => {
        return item.duration.totalDuration
      }).sort((o1, o2) => o2 - o1)[0]

      console.log('=========maxTotalDuration=========' + maxTotalDuration)
      if (maxTotalDuration === 0) {
        return 0
      }
      console.log('=========width=========' + time / maxTotalDuration * 100 + '%')
      return time / maxTotalDuration * 100 * 0.6
    }
  },
  computed: {
    ...mapState([ 'services' ]),
    columnCheckedCount () {
      let count = 0
      this.columnNameObjs.forEach(column => {
        if (column.checked) {
          count++
        }
      })
      return count
    },
    showColumnAll () {
      return this.columnCheckedCount === this.columnNameObjs.length
    },
    showCheckedStatusName () {
      return this.queryStatusObjs.filter(queryStatusObj => {
        return queryStatusObj.checked === true
      })[0].statusName
    },
    showCheckedUser () {
      return this.userObjs.filter(user => {
        return user.checked === true
      })[0].userName
    },
    showFiltersIcon () {
      return this.queryFiltersObjs[0].switchOn ||
        this.queryFiltersObjs[1].switchOn ||
        this.queryFiltersObjs[2].switchOn ||
        this.queryFiltersObjs[3].switchOn ||
        this.queryFiltersObjs[4].switchOn ||
        this.queryFiltersObjs[5].switchOn
    },
    showFiltersCount () {
      let objs = this.queryFiltersObjs.filter(queryFiltersObj => {
        return queryFiltersObj.switchOn
      })
      if (objs.length !== 0) {
        return objs.length
      }
    }
  },
  filters: {
    durationFilter (value) {
      if (value >= 1000) {
        if (value / 1000 / 60 / 60 >= 1) {
          return Number(value / 1000 / 60 / 60).toFixed(1) + 'h'
        } else if (value / 1000 / 60 >= 1) {
          return Number(value / 1000 / 60).toFixed(1) + 'm'
        } else if (value / 1000 >= 1) {
          return Number(value / 1000).toFixed(1) + 's'
        }
      } else {
        return value + 'ms'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-title {
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: #2c2f34;
  margin-left: 10px;
  /*margin-top: 20px;*/
  margin-bottom: 20px;
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

.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 550;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}

.status-tag {
  padding-left: 6px;
  padding-right: 6px;
}

.icon-style {
  margin-right: 4px;
}

.button-fillet {
  border-radius: 8px;
}

.sql-class {
  font-family: 'apercu-mono-regular';
}

.columnActiveClass {
  color: #085bd7
}

.popover-top-left {
  margin-left: 10px;
  margin-bottom: 10px;
  float: left;
}

.popover-top-right {
  float: right;
  margin-top: 20px;
  margin-right: 10px;
}

.popover-card-body {
  width: 500px;
  margin-left: 10px;
  /*margin-right: 10px;*/
  margin-bottom: 10px;
  float: left;
}

.popover-card-bottom {
  margin-top: 20px;
  margin-bottom: 10px;
  float: right
}

.popover-title {
  font-weight: 700;
  font-size: 16px;
  color: #2c2f34;
}

.div-switch {
  float: right;
  padding-left: 20px;
}

.query-filters-button-left {
  font-size: 14px;
  border-radius: 8px;
  float: left;
}

.query-filters-button-right {
  font-size: 14px;
  color: #ffffff;
  border-radius: 8px;
  background-color: #1a6ce7;
  float: right;
}

.query-filters-input {
  margin-top: 15px;
}

.query-filters-row {
  margin: 10px 10px 25px;
}

.query-filters-font {
  color: #9c9c9c;
  font-weight: 15;
}

.duration-popover-title {
  color: #3f4246;
  margin-bottom: 15px;
}

.duration-popover-main {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.duration-popover-body {
  margin-bottom: 15px;
  width: 250px
}

.duration-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
}

.progress-desc-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 8px;
}
</style>

<style>
/*隐藏hover样式，在<style scoped>中添加不生效*/
/*.el-tooltip__popper {
  opacity: 0; !*背景色透明度*!
}

.tooltip-style {
  opacity: 100;
}*/

.el-table .cell {
  white-space: nowrap;
}

.el-card {
  border-radius: 15px;
}

.el-dropdown-menu {
  border-radius: 8px;
}

.el-popover {
  border-radius: 8px;
}

.el-progress-bar__inner {
  border-radius: 0;
}

.el-progress-bar__outer {
  border-radius: 0;
}

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

.el-empty__description {
  display: none;
}
</style>
