<template>
  <div class="wrapper bgimg">
    <div class="auth-content">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-2">
            <img class="brand" src="../../assets/image/LOGO1.png" alt="bootstraper logo">
          </div>
          <h6 class="mb-2 text-muted">Create new account</h6>
          <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="userName" label="User Name">
              <el-input clearable v-model="form.userName" placeholder="User Name*"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input autocomplete="off"
                        v-model.trim="form.password"
                        type="password"
                        show-password
                        placeholder="Password*"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email" style="margin-top: 18px">
              <el-input clearable v-model.trim="form.email" placeholder="Email*"></el-input>
            </el-form-item>
            <el-form-item prop="company" label="Company">
              <el-input clearable v-model="form.company" placeholder="Company*"></el-input>
            </el-form-item>
            <el-collapse>
              <el-collapse-item title="Advanced User Options" names="1">
                <el-form-item prop="firstName" label="First Name">
                  <el-input autofocus clearable v-model="form.firstName" placeholder="First Name"></el-input>
                </el-form-item>
                <el-form-item prop="lastName" label="Last Name">
                  <el-input clearable v-model="form.lastName" placeholder="Last Name"></el-input>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
            <div style="margin-top: 10px"></div>
          </el-form>
          <el-button style="" class="btn btn-primary shadow-2" @click="sign" :disabled="signUpStatus">Sign Up
          </el-button>
          <p class="mb-0 text-muted">Already have an account?
            <router-link :to="{name:'accountLogin'}">
              <a>Log in</a>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<!--
By clicking the button below you understand that Snowflake will process your personal information in accordance with its Privacy Notice
or sign in to an existing account
-->
<!--<script src="assets/vendor/jquery/jquery.min.js"></script>-->
<!--<script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>-->

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'
import {JSEncrypt} from 'jsencrypt'
import {mapState} from 'vuex'

export default {
  name: 'SignUp',
  computed: mapState(['services']),
  beforeCreate () {
    // 设置body margin ，Vue 默认值为 8
    document.querySelector('body').setAttribute('style', 'margin:0 0 0 0;')
  },
  data () {
    let status = {
      'userName': false,
      'email': false,
      'company': false,
      'password': false
    }
    let checkPassword = (rule, value, callback) => {
      const passReg = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{8,}$/
      if (!passReg.test(value)) {
        callback(new Error('Your password must be at least 8 characters long and contain a number, uppercase, and lowercase letters.'))
        data.signUpStatus = true
        status[rule.field] = false
      } else {
        status[rule.field] = true
        callback()
      }
    }
    let checkSignUpStatus = (rule, value, callback) => {
      if (!value) {
        data.signUpStatus = true
        status[rule.field] = false
        callback(new Error(rule.field + ' is required'))
      } else {
        if (Object.values(status).find(t => !t) === undefined) {
          data.signUpStatus = false
        }
        status[rule.field] = true
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      const emailReg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailReg.test(value)) {
        data.signUpStatus = true
        status[rule.field] = false
        callback(new Error('email is not valid email'))
      } else {
        status[rule.field] = true
        callback()
      }
    }
    let data = {
      signUpStatus: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
        userName: ''
      },
      rules: {
        email: [
          {validator: checkSignUpStatus, trigger: ['blur', 'change']},
          {validator: checkEmail, trigger: ['blur', 'change']}
        ],
        password: [
          {validator: checkSignUpStatus, trigger: ['blur', 'change']},
          {validator: checkPassword, trigger: ['blur', 'change']}
        ],
        company: [
          {validator: checkSignUpStatus, trigger: ['blur', 'change']}
        ],
        userName: [
          {validator: checkSignUpStatus, trigger: ['blur', 'change']}
        ]
      }
    }
    return data
  },
  methods: {
    async sign () {
      let {...formData} = {...this.form}
      formData.loginName = formData.userName
      formData.displayName = (formData.firstName + formData.lastName) || formData.loginName
      const loading = this.$loading({
        lock: true,
        target: document.body
      })
      let {code, data} = await this.services.loginService.password()
      if (code === 200 && data) {
        let [[time, pubKey]] = Object.entries(data)
        console.log(pubKey)
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(pubKey)
        formData.password = encrypt.encrypt(time + formData.password)
        formData.time = time
        let {msg, data: {domainName} = {}} = await this.services.loginService.register(formData)
        loading.close()
        if (!domainName) {
          this.$message({
            message: msg,
            center: true,
            offset: 40,
            type: 'error'
          })
        } else {
          window.location = window.location.origin + '/' + domainName + '/#/signIn'
        }
      } else {
        loading.close()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">-->
<!--<link href="assets/css/auth.css" rel="stylesheet">-->

<style scoped>
  @import "../../assets/assetsbootstrap/vendor/bootstrap/css/bootstrap.min.css";
  @import "../../assets/assetsbootstrap/css/auth.css";

  .el-form-item {
    margin-bottom: 12px;
  }

  .el-form-item.is-error {
    text-align: left !important;
  }

</style>
