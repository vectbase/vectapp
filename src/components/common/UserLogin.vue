<template>
  <div class="wrapper bgimg">
    <div class="auth-content">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-4">
            <img class="brand" src="../../assets/image/LOGO1.png" alt="bootstraper logo">
          </div>
<!--          <h4 class="mb-4 text-muted">Sign in to VectBase to continue to the Preview App</h4>-->
          <el-form :model="formData" ref="formData" status-icon>
            <el-form-item prop="loginName"
                          label="Username"
                          style="width:100%"
                          >
              <el-input @input="checkStatus" autofocus clearable v-model.trim="formData.loginName"></el-input>
            </el-form-item>
            <el-form-item prop="password"
                          label="Password"
                          style="width:100%"
                          >
              <el-input @input="checkStatus"
                        type="password"
                        show-password
                        v-model.trim="formData.password"
                        autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn btn-primary shadow-2 mb-8 m-4" @click="gotoSignIn" :disabled="signInStatus">Sign in
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'UserLogin',
  computed: mapState(['services']),
  // mounted: async function () {
  //   let {code, data} = await this.services.loginService.active()
  //   if (code === 200) {
  //     this.checkActive = data
  //   }
  // },
  beforeCreate () {
    // 设置body margin ，Vue 默认值为 8
    document.querySelector('body').setAttribute('style', 'margin:0 0 0 0;')
  },
  data () {
    return {
      msg: 'Login',
      signInStatus: true,
      // checkActive: false,
      formData: {
        loginName: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations({setHost: 'SET_HOST'}),
    async gotoSignIn () {
      let domainName = window.location.href.replace(window.location.origin, '')
      let start = domainName.indexOf('/')
      if (start === -1 || domainName.length === 1) {
        domainName = window.location.hostname
      } else {
        let end = domainName.indexOf('/', start + 1)
        if (end === -1) {
          domainName = domainName.substring(start + 1)
        } else {
          domainName = domainName.substring(start + 1, end)
        }
      }
      let {code, msg} = await this.services.loginService.login({domainName, ...this.formData})
      if (code !== 200) {
        this.$message({
          message: msg,
          center: true,
          offset: 40,
          duration: 0,
          type: 'error'
        })
        this.signInStatus = true
      } else {
        this.setHost(window.location.href.split('#')[0])
        this.$router.push({
          name: 'appindex'
        })
      }
    },
    checkStatus () {
      this.signInStatus = !(this.formData.loginName && this.formData.password)
      if (this.$message) {
        this.$message.closeAll()
      }
    }
  }
}
</script>

<style scoped>
  @import "../../assets/assetsbootstrap/vendor/bootstrap/css/bootstrap.min.css";
  @import "../../assets/assetsbootstrap/css/auth.css";

  .el-form-item__error {
    left: 50px
  }
  #body{
    margin:0 0 0 0 ;
  }
</style>
