<template>
  <div>
    <el-dialog width="50%" customClass="customWidth" :title="dialogTitle"
               :visible.sync="dialogVisible" center :show-close="false" :close-on-click-modal="false">
      <div class="print">
        <el-form :model="form" label-position="left" :rules="rules" ref="form">
          <el-row>
            <el-col :span="11">
              <el-form-item prop="taskName">
                <span slot="label">Name</span>
                <el-input v-model="form.taskName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="warehouseId">
                <span slot="label">Warehouse</span>
                <el-tooltip effect="dark" content="Larger warehouses are faster but cost more" placement="right">
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
                  <el-select size="medium" v-model="form.warehouseId" style="width: 100%" placeholder="please select" @click.native="clickWarehouse">
                  <el-option v-for="(obj, index) in warehouseList" :label="obj.name"
                             :value="obj.id" :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="databaseId">
                <span slot="label">Database</span>
                <el-tooltip effect="dark" content="Larger warehouses are faster but cost more" placement="right">
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
                <el-select size="medium" v-model="form.databaseId" style="width: 100%" placeholder="please select" @click.native="clickDatabase">
                  <el-option v-for="(obj, index) in databaseList" :label="obj.name"
                             :value="obj.id" :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="tableId">
                <span slot="label">Table</span>
                <el-tooltip effect="dark" content="Larger warehouses are faster but cost more" placement="right">
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
                <el-select size="medium" v-model="form.tableId" style="width: 100%" placeholder="please select" @click.native="clickTable">
                  <el-option v-for="(obj, index) in tableList" :label="obj.name"
                             :value="obj.id" :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="Comment">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-bottom: 15px;margin-top: 15px">
            <span class="expandStyle" @click="clickSourceFiles">Source Files</span>
            <i class="el-icon-arrow-down"
               style="font-weight: bold; color: #aeb0b3"
               v-if="!showSourceFiles"
               @click="clickSourceFiles">
            </i>
            <i class="el-icon-arrow-up"
               style="font-weight: bold; color: #aeb0b3"
               v-if="showSourceFiles"
               @click="clickSourceFiles">
            </i>
            <div v-show="showSourceFiles" style="margin-left: 15px">
              <div style="color: #bbb7b7">From where you want to load Files?</div>
              <el-row>
                  <div style="margin-top: 10px">
                    <el-row align="middle" type="flex">
                      <el-col :span="3">
                        <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Type:</span>
                      </el-col>
                      <el-col :span="20">
                        <el-form-item prop="dataType" required>
                          <el-select size="medium" v-model="form.dataType" style="width: 100%"
                                     placeholder="please select" @change="typeChange">
                            <el-option v-for="(obj, index) in dataTypes" :label="obj.name"
                                       :value="obj.id" :key="index">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <div v-show="form.dataType == 1">
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span>UserName:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.hdfsUserName" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span>Password:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.hdfsPassword" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>DataDir:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.hdfsDataDir" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>DataFile:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.hdfsDataFile" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>NameNode:</span>
                        </el-col>
                        <el-col :span="20">
                          <el-form-item>
                            <el-input v-model="form.hdfsNameNode" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-show="form.dataType == 2">
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>AccessKey:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.s3AccessKey" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>SecretKey:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.s3SecretKey" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Bucket:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.s3Bucket" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Object:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.s3Object" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>EndPoint:</span>
                        </el-col>
                        <el-col :span="20">
                          <el-form-item>
                            <el-input v-model="form.s3EndPoint" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-show="form.dataType == 3">
                      <el-row align="middle" type="flex">
                        <div style="margin-top: 10px">
                          <el-form-item>
                          <el-upload
                            class="upload-demo"
                            action="#"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="success"
                            :on-change="handleChange"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :auto-upload="false">
                            <el-button size="small" type="primary">Select File</el-button>
                            <div slot="tip" class="el-upload__tip">Only can upload csv file...</div>
                          </el-upload>
                          </el-form-item>
                        </div>
                      </el-row>
                    </div>
                    <div v-show="form.dataType == 4">
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>UserName:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlUserName" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Password:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlPassword" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Database:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlDatabase" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Table:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlTable" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Host:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlHost" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Port:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.mysqlPort" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-show="form.dataType == 5">
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span>UserName:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.kafkaUserName" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span>Password:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.kafkaPassword" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Topic:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.kafkaTopic" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3" :offset="1">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Group:</span>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-input v-model="form.kafkaGroupName" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" type="flex">
                        <el-col :span="3">
                          <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Brokers:</span>
                        </el-col>
                        <el-col :span="20">
                          <el-form-item>
                            <el-input v-model="form.kafkaBrokers" autocomplete="off"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
              </el-row>
            </div>
          </el-row>
          <el-row style="margin-bottom: 15px">
            <span class="expandStyle" @click="clickFileFormat">File Format</span>
            <i class="el-icon-arrow-down"
               style="font-weight: bold; color: #aeb0b3"
               v-if="!showFileFormat"
               @click="clickFileFormat">
            </i>
            <i class="el-icon-arrow-up"
               style="font-weight: bold; color: #aeb0b3"
               v-if="showFileFormat"
               @click="clickFileFormat">
            </i>
            <div v-show="showFileFormat" style="margin-left: 15px">
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Type:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-select size="medium" v-model="form.fileType" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in fileTypesList" :label="obj.name"
                                 :value="obj.name" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Compression:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-select size="medium" v-model="form.fileCommpress" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in fileCommpressList" :label="obj.name"
                                 :value="obj.name" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Column Separator:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-select size="medium" v-model="form.fileSeparator" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in fileSeparatorList" :label="obj.name"
                                 :value="obj.value" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Header lines to skip:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-input v-model="form.fileSkipLineCount" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Null String:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-input v-model="form.fileNullString" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row>
            <span class="expandStyle" @click="clickAdvanced">Advanced Options</span>
            <i class="el-icon-arrow-down"
               style="font-weight: bold; color: #aeb0b3"
               v-if="!showAdvanced"
               @click="clickAdvanced">
            </i>
            <i class="el-icon-arrow-up"
               style="font-weight: bold; color: #aeb0b3"
               v-if="showAdvanced"
               @click="clickAdvanced">
            </i>
            <div v-show="showAdvanced" style="margin-left: 15px">
              <el-row align="middle" type="flex" v-show="form.dataType == 1 || form.dataType == 2">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Parallelism:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item prop="optionParallelism">
                    <el-input v-model="form.optionParallelism" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex" v-show="form.dataType == 1 || form.dataType == 2 ||form.dataType == 4">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Scheduling strategy:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item prop="optionSchedule">
                    <el-input v-model="form.optionSchedule" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span style="color: #F56C6C;margin-right: 4px;">*</span><span>Failure policy:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item prop="optionPolicy">
                    <el-select size="medium" v-model="form.optionPolicy" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in optionPolicyList" :label="obj.name"
                                 :value="obj.id" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span>Encryption strategy:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-select size="medium" v-model="form.optionEncrypt" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in optionEncryptList" :label="obj.name"
                                 :value="obj.id" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex">
                <el-col :span="6">
                  <span>Auto Ingest:</span>
                </el-col>
                <el-col :span="17">
                  <el-form-item>
                    <el-select size="medium" v-model="form.optionIngest" style="width: 100%" placeholder="please select">
                      <el-option v-for="(obj, index) in optionIngestList" :label="obj.name"
                                 :value="obj.id" :key="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="submitForm('form')">Create Pipe</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// /**/
import {mapState} from 'vuex'

export default {
  name: 'VCreatePipeLineDialog',
  computed: mapState(['services']),
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showSourceFiles: true,
      showFileFormat: true,
      showAdvanced: true,
      dialogVisible: this.isShow,
      dialogTitle: this.title,
      form: {
        dataType: 1
      },
      rules: {
        taskName: [
          { required: true, message: 'please input pipe name', trigger: 'blur' },
          { min: 5, max: 20, message: 'length between 5 and 20', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9_]/, message: 'Only alphanumeric underscores are allowed', trigger: 'blur' }
        ],
        warehouseId: [
          { required: true, message: 'please select warehouse', trigger: 'change' }
        ],
        databaseId: [
          { required: true, message: 'please select database', trigger: 'change' }
        ],
        tableId: [
          { required: true, message: 'please select table', trigger: 'change' }
        ],
        dataType: [
          { required: true, message: 'please select type', trigger: 'change' }
        ],
        optionPolicy: [
          { required: true, message: 'please select fail policy', trigger: 'change' }
        ]
      },
      warehouseList: [],
      databaseList: [],
      tableList: [],
      dataTypes: [
        {id: 1, name: 'HDFS'},
        {id: 2, name: 'S3'},
        {id: 3, name: 'File'},
        {id: 4, name: 'MYSQL'},
        {id: 5, name: 'Kafka'}
      ],
      fileTypesList: [
        {id: 1, name: 'CSV'}
      ],
      fileCommpressList: [
        {id: 1, name: 'gzip'}
      ],
      fileSeparatorList: [
        {id: 1, name: 'Comma', value: ','},
        {id: 2, name: 'semicolon', value: ';'}
      ],
      optionPolicyList: [
        {id: 0, name: 'Stop'},
        {id: 1, name: 'Retry 1 time'},
        {id: 2, name: 'Retry 2 time'},
        {id: 3, name: 'Retry 3 time'}
      ],
      optionEncryptList: [
        {id: 1, name: 'RSA'},
        {id: 2, name: 'DES'}
      ],
      optionIngestList: [
        {id: 1, name: 'Enable'},
        {id: 2, name: 'Disable'}
      ],
      fileList: []
    }
  },
  watch: {
    isShow () {
      this.dialogVisible = this.isShow
      console.log('***111' + this.dialogVisible)
    },
    title () {
      this.dialogTitle = this.title
      console.log('***222' + this.dialogTitle)
    }
  },
  mounted () {
  },

  methods: {
    async clickWarehouse () {
      console.log('******clickWarehouse')
      let responseData = await this.services.warehouseService.warehouseList({})
      if (responseData.code === 200) {
        this.warehouseList = responseData.data
      } else {
        this.$message.error('get warehouse list fail !!!')
      }
    },
    async clickDatabase () {
      console.log('******clickDatabase')
      let data = await this.services.databaseService.queryList({
        databaseId: '',
        schemaId: '',
        type: 'database',
        searchName: ''
      })
      if (data.code === 200) {
        console.log('&&&&&dataBaseList data: ' + data.data)
        this.databaseList = data.data.list
      } else {
        this.$message.error('get database list fail !!!')
      }
    },
    async clickTable () {
      console.log('******clickTable')
      let data = await this.services.databaseService.queryList({
        databaseId: this.form.databaseId,
        schemaId: '',
        type: 'table',
        searchName: ''
      })
      if (data.code === 200) {
        console.log('&&&&&tableList data: ' + data.data)
        this.tableList = data.data.list
      } else {
        this.$message.error('get table list fail !!!')
      }
    },
    typeChange (value) {
      console.log('typeChange' + value)
      this.form.dataType = value
    },
    clickSourceFiles () {
      this.showSourceFiles = !this.showSourceFiles
    },
    clickFileFormat () {
      this.showFileFormat = !this.showFileFormat
    },
    clickAdvanced () {
      this.showAdvanced = !this.showAdvanced
    },
    closeDialog () {
      this.dialogVisible = false
      this.$emit('closeDialogFather', this.dialogVisible)
    },
    sureDialog () {
      this.$emit('sureDialogFather')
    },
    handleChange (file, fileList) {
      this.fileList.push(file)
    },
    handleRemove (file, fileList) {
      this.fileList = []
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log('*****handlePreview' + file)
    },
    handleExceed (files, fileList) {
      this.$message.warning('only can select one file!')
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`Are you sure to remove ${file.name}？`)
    },
    success (response, file, fileList) {
      console.log('*****handlePreview' + this.fileList.length + ',' + file)
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let paramsObj = {
            TaskName: this.form.taskName,
            Warehouse: this.form.warehouseId,
            Database: this.form.databaseId,
            Table: this.form.tableId,
            Comment: this.form.desc,
            RetryTimes: parseInt(this.form.optionPolicy)
          }
          if (this.form.dataType === 1) {
            this.$set(paramsObj, 'Type', 'file')
            this.$set(paramsObj, 'Parallelism', parseInt(this.form.optionParallelism))
            this.$set(paramsObj, 'ScheduleRule', this.form.optionSchedule)
            let CommonOption = {
              FileOption: {
                FileSource: {
                  FileSource: 'hdfs',
                  FileFormat: 'ORC',
                  FileStructure: 'name String, id UInt32',
                  FileSourceParams: {
                    HdfsBaseDir: this.form.hdfsDataDir,
                    HdfsLoadDir: this.form.hdfsDataFile,
                    HdfsNamenode: this.form.hdfsNameNode
                  }
                }
              }
            }
            this.$set(paramsObj, 'CommonOption', CommonOption)
            console.log('******** hdfs: ' + JSON.stringify(paramsObj))
            let responseData = await this.services.databaseService.createPipe(paramsObj)
            console.log('********code: ' + responseData.code)
            if (responseData.code === 200) {
              this.$emit('sureDialogFather')
            } else {
              this.$message.error('create pipe fail !!!' + responseData.message)
            }
          } else if (this.form.dataType === 2) {
            this.$set(paramsObj, 'Type', 'file')
            this.$set(paramsObj, 'Parallelism', parseInt(this.form.optionParallelism))
            this.$set(paramsObj, 'ScheduleRule', this.form.optionSchedule)
            let CommonOption = {
              FileOption: {
                FileSource: {
                  FileSource: 's3',
                  FileFormat: 'ORC',
                  FileStructure: 'name String, id UInt32, dt String',
                  FileSourceParams: {
                    S3AccessKey: this.form.s3AccessKey,
                    S3SecretKey: this.form.s3SecretKey,
                    S3Endpoint: this.form.s3EndPoint,
                    S3Bucket: this.form.s3Bucket,
                    S3Object: this.form.s3Object
                  }
                }
              }
            }
            this.$set(paramsObj, 'CommonOption', CommonOption)
            let responseData = await this.services.databaseService.createPipe(paramsObj)
            console.log('********code: ' + responseData.code)
            if (responseData.code === 200) {
              this.$emit('sureDialogFather')
            } else {
              this.$message.error('create pipe fail !!!' + responseData.message)
            }
          } else if (this.form.dataType === 3) {
            this.$set(paramsObj, 'Type', 'filestream')
            let CommonOption = {
              FileStreamOption: {
                FileStreamSource: {
                  Format: this.form.fileType,
                  SkipLine: this.form.fileSkipLineCount,
                  FormatDelimiter: this.form.fileSeparator,
                  Compress: this.form.fileCommpress
                }
              }
            }
            this.$set(paramsObj, 'CommonOption', CommonOption)
            let formData = new FormData()
            formData.append('file', this.fileList[0].raw)
            console.log('********file: ' + this.fileList.length)
            formData.append('params', paramsObj)
            console.log('********params: ' + JSON.stringify(paramsObj))
            console.info('********formData: ', this.fileList)
            let responseData = await this.services.databaseService.createFileStreamPipe(formData)
            console.log('********code: ' + responseData.code)
            if (responseData.code === 200) {
              this.$emit('sureDialogFather')
            } else {
              this.$message.error('create pipe fail !!!' + responseData.message)
            }
          } else if (this.form.dataType === 4) {
            this.$set(paramsObj, 'Type', 'mysql')
            this.$set(paramsObj, 'ScheduleRule', this.form.optionSchedule)
            let CommonOption = {
              MysqlOption: {
                MysqlSource: {
                  Host: this.form.mysqlHost,
                  Port: parseInt(this.form.mysqlPort),
                  Database: this.form.mysqlDatabase,
                  Table: this.form.mysqlTable,
                  Username: this.form.mysqlUserName,
                  Password: this.form.mysqlPassword
                }
              }
            }
            this.$set(paramsObj, 'CommonOption', CommonOption)
            console.log('this.params', paramsObj)
            let responseData = await this.services.databaseService.createPipe(paramsObj)
            console.log('********code: ' + responseData.code)
            if (responseData.code === 200) {
              this.$emit('sureDialogFather')
            } else {
              this.$message.error('create pipe fail !!!' + responseData.message)
            }
          } else if (this.form.dataType === 5) {
            this.$set(paramsObj, 'Type', 'kafka')
            let CommonOption = {
              KafkaOption: {
                KafkaSource: {
                  KafkaTopics: this.form.kafkaTopic,
                  KafkaBrokers: this.form.kafkaBrokers,
                  KafkaGroupName: this.form.kafkaGroupName
                }
              }
            }
            this.$set(paramsObj, 'CommonOption', CommonOption)
            let responseData = await this.services.databaseService.createPipe(paramsObj)
            console.log('********code: ' + responseData.code)
            if (responseData.code === 200) {
              this.$emit('sureDialogFather')
            } else {
              this.$message.error('create pipe fail !!!' + responseData.message)
            }
          } else {
            this.$message.error('create pipe submit fail !!!')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  margin-bottom: 10px;
  height: 20px;
}

.print {
  font-size: 12px;
  max-height: 60vh;
  overflow: auto;
}

.expandStyle {
  /*margin-top: 30px;*/
  font-size: 14px;
}
.el-dialog {
  height: 78vh;
  overflow: auto;
}

.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 5px 25px 5px;
}

.el-form-item {
  margin-bottom: 5px;
}
</style>
<style>
</style>
