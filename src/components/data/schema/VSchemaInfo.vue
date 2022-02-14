<template>
  <div>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
      <v-schema-obj-breadcrumb :db-info="{label:$route.params.dbLabel}"/>
    </el-row>
    <el-row style2="height: 50px;margin: 2px;background: #0a53be">
      <el-col :span="18">
        <div>
          <v-show-router-label/>
        </div>
      </el-col>
      <el-col :span="2">
        <el-dropdown size="small" type="info" click="dropClick">
          <el-button size="small"><span class="el-dropdown-link">...</span></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editDetail()">Edit</el-dropdown-item>
            <el-dropdown-item @click.native="cloneDetail()">Clone</el-dropdown-item>
            <el-dropdown-item @click.native="dropDetail()">Drop</el-dropdown-item>
            <el-dropdown-item @click.native="transferDetail()">Transfer Ownership</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <div class="block">
          <el-button size="small" type="primary" icon="el-icon-plus"  @click="dialogDataBaseCreateVisible = true">Created</el-button>
        </div>
      </el-col>
      <v-data-edit-dialog :isShow="dialogDataBaseEditVisible" :title="dialogEditTitle" :info="dialogEditInfo" @closeDialogFather="getSonCancelEdit"  @sureDialogFather="getSonSureEdit"></v-data-edit-dialog>
      <v-data-clone-dialog :isShow="dialogDataBaseCloneVisible" :title="dialogCloneTitle" :info="dialogCloneInfo" @closeDialogFather="getSonCancelClone"  @sureDialogFather="getSonSureClone"></v-data-clone-dialog>
      <v-data-drop-dialog :isShow="dialogDataBaseDropVisible" :title="dialogDropTitle" :info="dialogDropInfo" @closeDialogFather="getSonCancelDrop"  @sureDialogFather="getSonSureDrop"></v-data-drop-dialog>
      <v-data-transfer-dialog :isShow="dialogDataBaseTransferVisible" @closeDialogFather="getSonCancelTransfer"  @sureDialogFather="getSonSureTransfer"></v-data-transfer-dialog>
 </el-row>
    <el-row>
        <el-col :span="24"><el-tag type="info"><i class="el-icon-coin"></i> Schema&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-user"></i>SysAdmin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-time"></i> 1 month ago&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-files"></i> Demo Database&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-tag></el-col>
    </el-row>
    <el-row :span="24">&nbsp;</el-row>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTabName"  @tab-click="handleClick">
          <el-tab-pane label="Schemas Details" name="Schemas_Details">
            <el-card class="box-card">
              <el-row align="middle">
                <el-col :span="16"><span style="font-size: 18px;font-weight: bold">Privileges</span></el-col>
                <el-col :span="5">
                  <div class="relationContainer">
                    <!--                  <el-button size="mini" type="info" icon="el-icon-plus">Privileges</el-button>-->
                    <el-dropdown trigger="click" :hide-on-click="true">
                      <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
                        <span style="color: #3f4246" class="icon-style">Group by Role&nbsp;&nbsp;<i class="el-icon-arrow-down"></i></span>
                      </el-button>
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
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="relationContainer"><el-button size="mini" icon="el-icon-plus" @click="dialogFormPrivilegeVisible = true">Privileges</el-button>
                  </div>
                  <el-dialog customClass="customWidth" title="Grant new privileges on"  :visible.sync="dialogFormPrivilegeVisible" center>
                    <div class="relationContainer"><el-tag type="info"><i class="el-icon-coin"></i> Database&nbsp;&nbsp;as&nbsp;&nbsp;<i class="el-icon-user"></i>SysAdmin</el-tag></div>
                    <el-form :model="formPrivilege" label-position="top" label-width="80px">
                      <el-form-item label="Role" >
                        <el-select v-model="formPrivilege.role" placeholder="Select role" style="width:100%">
                          <el-option label="ACCOUNTADMIN" value="ACCOUNTADMIN"></el-option>
                          <el-option label="PUBLIC" value="PUBLIC"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Privileges">
                        <el-select v-model="formPrivilege.privileges" placeholder="Select privileges" style="width:100%">
                          <el-option label="MODIFY" value="MODIFY"></el-option>
                          <el-option label="MONITOR" value="MONITOR"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox-group v-model="formPrivilege.type">
                          <el-checkbox label="Managed access" name="type"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormPrivilegeVisible = false">Cancel</el-button>
                      <el-button type="primary" @click="dialogFormPrivilegeVisible = false">Grant Privileges</el-button>
                    </div>
                  </el-dialog>
                </el-col>
              </el-row>
              <el-table
                :data="tableData1"
                style="width: 100%;font-size:10px"
                :show-header=false>
                <el-table-column
                  label=""
                  width="300">
                  <template slot-scope="scope">
                    <i class="el-icon-user"></i>
                    <span style="margin-left: 10px">{{ scope.row.privilege }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label=""
                  width="600">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" :type="scope.row.tags == 'OWNERSHIP'?'':'info'"><i v-if="scope.row.tags == 'OWNERSHIP'" class="el-icon-key"></i>{{ scope.row.tags }}</el-tag>
                    </div>
                  </template>
                </el-table-column>

              </el-table>
            </el-card>

          </el-tab-pane>
          <el-tab-pane label="Tables" name="Tables">

            <v-table-list></v-table-list>

          </el-tab-pane>
          <el-tab-pane label="Views" name="Views">
            <VViewList/>
          </el-tab-pane>
<!--          <el-tab-pane label="Stages" name="Stages">-->
<!--           <VStagesList></VStagesList>-->
<!--          </el-tab-pane>-->
          <el-tab-pane label="Data Pipelines" name="Data_Pipelines">
            <VDataPipelinesList></VDataPipelinesList>
          </el-tab-pane>
<!--          <el-tab-pane label="Functions" name="Functions">-->
<!--          <VFunctionsList></VFunctionsList>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="Procedures" name="Procedures">-->
<!--           <VProceduresList></VProceduresList>-->
<!--          </el-tab-pane>-->

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>

// /**/
import VTableList from './VTableList'
import VViewList from './VViewList'
import VStagesList from './VStagesList'
import VProceduresList from './VProceduresList'
import VFunctionsList from './VFunctionsList'
import VPipeList from './VPipeList'
import VSchemaObjBreadcrumb from '../common/VSchemaObjBreadcrumb'
import VShowRouterLabel from '../common/VShowRouterLabel'
import VDataEditDialog from '../common/VDataEditDialog'
import VDataCloneDialog from '../common/VDataCloneDialog'
import VDataDropDialog from '../common/VDataDropDialog'
import VDataTransferDialog from '../common/VDataTransferDialog'

export default {
  name: 'VSchemaInfo',
  components: {VDataEditDialog, VDataCloneDialog, VDataDropDialog, VDataTransferDialog, VShowRouterLabel, VTableList, VViewList, VStagesList, VProceduresList, VFunctionsList, VPipeList, VSchemaObjBreadcrumb},
  mounted: function () {
  },
  methods: {
    handleClick () {},
    editDetail () {
      console.log('editDetail !!! ')
      this.dialogDataBaseEditVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseEditVisible)
    },
    cloneDetail () {
      console.log('cloneDetail !!! ')
      this.dialogDataBaseCloneVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseCloneVisible)
    },
    dropDetail () {
      console.log('dropDetail !!! ')
      this.dialogDataBaseDropVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseDropVisible)
    },
    transferDetail () {
      console.log('transferDetail !!! ')
      this.dialogDataBaseTransferVisible = true
      console.log('dialogDataBaseEditVisible !!! ' + this.dialogDataBaseTransferVisible)
    },
    getSonCancelEdit (val) {
      this.dialogDataBaseEditVisible = val
    },
    getSonSureEdit () {
      this.dialogDataBaseEditVisible = false
    },
    getSonCancelClone (val) {
      this.dialogDataBaseCloneVisible = val
    },
    getSonSureClone () {
      this.dialogDataBaseCloneVisible = false
    },
    getSonCancelDrop (val) {
      this.dialogDataBaseDropVisible = val
    },
    getSonSureDrop () {
      this.dialogDataBaseDropVisible = false
    },
    getSonCancelTransfer (val) {
      this.dialogDataBaseTransferVisible = val
    },
    getSonSureTransfer () {
      this.dialogDataBaseTransferVisible = false
    }
  },
  data () {
    return {
      dialogFormPrivilegeVisible: false,
      dialogDataBaseEditVisible: false,
      dialogDataBaseCloneVisible: false,
      dialogDataBaseDropVisible: false,
      dialogDataBaseTransferVisible: false,
      dialogEditTitle: 'Edit Schema',
      dialogEditInfo: 'Renaming will require you to update objects that reference this schema.',
      dialogCloneTitle: 'Clone Schema',
      dialogCloneInfo: 'Create a copy of this schema in the system. All contents except for external tables and internal stages will be copied.',
      dialogDropTitle: 'Drop Schema',
      dialogDropInfo: 'Remove the schema INFORMATION_SCHEMA from the system. A version will be retained in Time Travel for a specified amount of time.',
      tableData: {},
      activeTabName: 'Schemas_Details',
      formQeryInline: {},
      value: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      tableData1: [{
        privilege: 'SYSADMIN',
        tags: 'OWNERSHIP'
      }, {
        privilege: 'ACCOUNTADMIN',
        tags: 'CREATE SCHEMA'
      }, {
        privilege: 'PUBLIC',
        tags: 'CREATE SCHEMA'
      }, {
        privilege: 'TEST',
        tags: 'USAGE'
      }],
      queryStatusObjs: [
        {id: 0, statusName: 'Group by Role', checked: true},
        {id: 1, statusName: 'Group by Privilege', checked: false}
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formPrivilege: {
        role: '',
        privileges: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
