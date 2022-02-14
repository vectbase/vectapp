<template>
  <el-dialog title="Profile"
             :visible.sync="visibleOrigin"
             :show-close="false"
             center
             width="38%"
             @close="handleClickCancel">
    <!--限制dialog的高度-->
    <div class="dialog-div">
      <el-form :model="formProfile" label-position="left">
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Profile photo
                <el-popover
                  placement="right"
                  title="Personalize your account with a photo"
                  width="380"
                  trigger="hover"
                  content="Make it easier to share data and collaborate with others. Only users from your account will see it.">
                  <i slot="reference" class="el-icon-question"></i>
                </el-popover>
              </div>
            </el-col>
            <el-col :span="16" :offset="1">
              <div class="alignment-horizontal-start">
                <div style="display:flex; align-items:center; margin-right: 10px">
                  <!--<el-avatar size="small" :src="formProfile.photo"></el-avatar>-->
                  <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
                </div>
                <div style="margin-right: 10px">
                  <el-upload
                    action=""
                    :on-success="handlePhotoSuccess"
                    :multiple="false"
                    :show-file-list="false">
                    <el-button size="mini" class="filtrate-button">upload</el-button>
                  </el-upload>
                </div>
                <div v-if="delPhotoBtnVisible">
                  <el-button size="mini" class="filtrate-button" style="border: none; margin-left: -10px" icon="el-icon-delete"></el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Username</div>
            </el-col>
            <el-col :span="16" :offset="1">
              {{ currentUserInfo.name }}
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>First Name</div>
            </el-col>
            <el-col :span="16" :offset="1">
              <el-input size="medium" v-model="formProfile.firstName"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Last Name</div>
            </el-col>
            <el-col :span="16" :offset="1">
              <el-input size="medium" v-model="formProfile.lastName"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Password</div>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium"
                        type="password"
                        :disabled="true"
                        v-model="formProfile.password">
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button size="medium"
                         icon="el-icon-edit"
                         class="filtrate-button"
                         style="border: none"
                         @click="handleClickEditPwd">
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Email</div>
            </el-col>
            <el-col :span="16" :offset="1">
              <el-input size="medium" v-model="formProfile.email"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row style="margin-top: -20px">
          <el-col :span="23">
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row>
            <el-col :span="6">
              <div>Language</div>
            </el-col>
            <el-col :span="16" :offset="1">
              <el-select size="medium" v-model="formProfile.language">
                <el-option
                  v-for="(item, index) in languageArr"
                  :label="item"
                  :value="index"
                  :key="index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row style="margin-top: -20px">
          <el-col :span="23">
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
              <span>
                Multi-factor authentication
                <div class="dialog-row-label-desc-span">
                  Each time you sign in to Snowflake, you’ll use your<br/>
                  password and a verification code. <a href="https://www.baidu.com" target="_blank">Learn more</a>
                </div>
              </span>
          </el-col>
          <el-col :span="3" :offset="4">
            <el-button size="mini" class="filtrate-button">Enroll</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog title="Set a new password"
               :visible.sync="visibleInner"
               :show-close="false"
               append-to-body
               center
               width="38%"
               @close="handlePasswordDialogCancel">
      <!--限制dialog的高度-->
      <div class="dialog-div">
        <el-row>
          <el-col :span="23">
            <el-form :model="changePwdReq" status-icon :rules="rules" ref="changePwdReqForm" label-position="left" label-width="160px">
              <el-form-item label="Current password" prop="currentPassword" style="margin-top: 20px">
                <el-input size="medium"
                          type="password"
                          v-model="changePwdReq.currentPassword">
                </el-input>
              </el-form-item>
              <el-form-item label="New password" prop="newPassword" style="margin-top: 30px">
                <el-input size="medium"
                          type="password"
                          v-model="changePwdReq.newPassword">
                </el-input>
              </el-form-item>
              <el-form-item label="Confirm password" prop="confirmPassword" style="margin-top: 30px">
                <el-input size="medium"
                          type="password"
                          v-model="changePwdReq.confirmPassword">
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-row>
          <el-col :span="12" :offset="11">
            <el-button size="small"
                       @click="handlePasswordDialogOk"
                       class="query-filters-button-right">
              Change password
            </el-button>
            <el-button size="small" class="query-filters-button-left" @click="handlePasswordDialogCancel()">Cancel</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <div slot="footer">
      <el-row>
        <el-col :span="12" :offset="11">
          <el-button size="small"
                     @click="handleClickOk"
                     class="query-filters-button-right">
            Save
          </el-button>
          <el-button size="small" class="query-filters-button-left" @click="handleClickCancel">Close</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState} from 'vuex'
import {JSEncrypt} from 'jsencrypt'

export default {
  name: 'VChangeUserInfo',
  props: ['profileVisible', 'currentUserInfo'],
  data () {
    const passReg = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{8,}$/
    const validateCurrentPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Enter current password'))
      } else {
        if (this.changePwdReq.newPassword !== '') {
          this.$refs.changePwdReqForm.validateField('newPassword')
        }
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Enter new password'))
      } else if (!passReg.test(value)) {
        callback(new Error('Must be at least 8 characters long, contain at least 1 digit, 1 uppercase letter and 1 lowercase letter'))
      } else if (value === this.changePwdReq.currentPassword) {
        callback(new Error('Enter a new password that is different from the current password'))
      } else {
        if (this.changePwdReq.confirmPassword !== '') {
          this.$refs.changePwdReqForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.changePwdReq.newPassword) {
        callback(new Error('Entered passwords must match!'))
      } else {
        callback()
      }
    }
    return {
      visibleOrigin: false,
      visibleInner: false,
      delPhotoBtnVisible: true,
      formProfile: {},
      formProfileCopy: {},
      changePwdReq: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        currentPassword: [
          { validator: validateCurrentPassword, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      languageArr: [
        'English'
      ]
    }
  },
  methods: {
    handlePhotoSuccess () {

    },
    handleClickEditPwd () {
      this.visibleInner = true
      this.visibleOrigin = false
    },
    handlePasswordDialogCancel () {
      this.visibleInner = false
      this.visibleOrigin = true

      this.changePwdReq.currentPassword = ''
      this.changePwdReq.newPassword = ''
      this.changePwdReq.confirmPassword = ''
    },
    async handlePasswordDialogOk () {
      let {code, data} = await this.services.loginService.password()
      if (code === 200 && data) {
        let [[time, pubKey]] = Object.entries(data)
        console.log(pubKey)
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(pubKey)
        this.changePwdReq.currentPassword = encrypt.encrypt(time + this.changePwdReq.currentPassword)
        this.changePwdReq.newPassword = encrypt.encrypt(time + this.changePwdReq.newPassword)
        this.changePwdReq.time = time
      }
      this.$delete(this.changePwdReq, 'confirmPassword')
      console.log('===========modify password===========', this.changePwdReq)
      let responseData = await this.services.loginService.changePassword(this.changePwdReq)
      if (responseData.code === 200) {
        this.$message.success('Successful')

        this.visibleInner = false
        this.visibleOrigin = true

        this.changePwdReq.currentPassword = ''
        this.changePwdReq.newPassword = ''
        this.changePwdReq.confirmPassword = ''
      } else {
        this.$message.error(responseData.msg)
      }
    },
    handleClickCancel () {
      this.visibleOrigin = false
      this.$emit('updateVisible', this.visibleOrigin)
      this.formProfile = JSON.parse(JSON.stringify(this.formProfileCopy))
    },
    async handleClickOk () {
      this.visibleOrigin = false
      this.$emit('updateVisible', this.visibleOrigin)

      // let changeUserInfoReq = {}
      // changeUserInfoReq.entityId = this.formProfile.entityId
      // changeUserInfoReq.userName = this.formProfile.userName
      // changeUserInfoReq.firstName = this.formProfile.firstName
      // changeUserInfoReq.lastName = this.formProfile.lastName
      // changeUserInfoReq.email = this.formProfile.email
      console.log('===========modify user info===========', JSON.stringify(this.formProfile))
      await this.services.loginService.changeUserInfo(this.formProfile)
    }
  },
  computed: {
    ...mapState(['services'])
  },
  watch: {
    profileVisible (val) {
      this.visibleOrigin = val
    },
    currentUserInfo (val) {
      this.formProfile = JSON.parse(JSON.stringify(val))
      this.$set(this.formProfile, 'language', 0)
      this.$set(this.formProfile, 'photo', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
      this.$set(this.formProfile, 'password', '******************')
      this.formProfileCopy = this.formProfile
    }
  }
}
</script>

<style scoped>

.dialog-div {
  max-height: 60vh;
  overflow: auto;
  margin-left: 20px;
}

.filtrate-button {
  border-radius: 6px;
  color: #3f4246;
  /*font-weight: 550;*/
  /*margin-right: 4px;*/
  /*margin-left: 4px;*/
  font-size: 14px;
}

.dialog-row-label-desc-span {
  color: #65676c;
  font-size: 12px;
}

.alignment-horizontal-start  {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
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
