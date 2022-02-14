<template>
  <div class="wrapper bgimg">
    <div class="auth-content">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-4">
            <img class="brand"   src="../../assets/image/LOGO1.png" alt="bootstraper logo">
          </div>
          <h6 class="mb-4 text-muted">Enter your account name or account URL</h6>
          <el-form :model="formData" ref="formData">
            <el-form-item prop="domainName"
                          :rules="[
                            { validator: checkValueNameIfExist, trigger: 'change'}
                          ]">
              <el-input autofocus clearable v-model="formData.domainName" placeholder="Account Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn btn-primary shadow-2 mb-4" @click="gotoSignUp">Sign up</el-button>
              <el-button class="btn btn-primary shadow-2 mb-4" @click="gotoSignIn" :disabled="signInStatus">Sign in</el-button>
            </el-form-item>
          </el-form>
          <div class="text-lg-start">Where to find your account name</div>
          <el-input
            type="textarea"
            :value="tips"
            readonly
            :rows="1">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'
import {mapState} from 'vuex'

export default {
  name: 'AccountLogin',
  computed: mapState(['services']),
  beforeCreate () {
    // 设置body margin ，Vue 默认值为 8
    document.querySelector('body').setAttribute('style', 'margin:0 0 0 0;')
  },
  data () {
    return {
      signInStatus: true,
      tips: 'https://app.vectbase.com/<account_name>',
      formData: {
        domainName: ''
      }
    }
  },
  methods: {
    gotoSignIn () {
      window.location = window.location.origin + '/' + this.formData.domainName + '/#/signIn'
    },
    gotoSignUp () {
      this.$router.replace('/signUp')
    },
    reset () {
      this.$refs['formData'].resetFields()
      this.signInStatus = true
    },
    async checkValueNameIfExist (rule, value, callback) {
      if (!value) {
        this.reset()
        this.signInStatus = true
      } else if (value.length === 8 && /^[A-Za-z]{3}\d{5}$/.test(value)) {
        let result = await this.services.loginService.checkDomain(this.formData)
        if (!result.data) {
          callback(new Error('Invalid account name'))
        } else {
          this.signInStatus = false
        }
      } else {
        this.signInStatus = true
        callback(new Error('Invalid account name'))
      }
    }
  }
}
</script>

<style scoped>
  @import "../../assets/assetsbootstrap/vendor/bootstrap/css/bootstrap.min.css";
  @import "../../assets/assetsbootstrap/css/auth.css";

</style>
