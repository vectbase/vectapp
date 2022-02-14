<template>
  <div class="wrapper bgimg">
    <div class="auth-content">
      <div class="card">
        <div class="card-body text-center">
          <div class="mb-4">
            <img class="brand"  src="../../assets/image/LOGO1.png" alt="bootstraper logo">
          </div>
          <h6 class="mb-4 text-muted">Reset Password</h6>
          <p class="text-muted text-start">Enter your email address and your new password will be emailed to you.</p>
          <form action="" method="">
            <div class="mb-3 text-start">
              <label for="email" class="form-label">Email adress</label>
              <input type="email" class="form-control" placeholder="Enter Email" required>
            </div>
            <button class="btn btn-primary shadow-2 mb-4">Send me new password</button>
          </form>
          <p class="mb-0 text-muted">Don’t have an account?
            <router-link :to="{name:'signup'}">
              <a>Signup</a>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<script src="assets/vendor/jquery/jquery.min.js"></script>-->
<!--<script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>-->

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'

export default {
  name: 'ForgotPassword',
  beforeCreate () {
    // 设置body margin ，Vue 默认值为 8
    document.querySelector('body').setAttribute('style', 'margin:0 0 0 0;')
  },
  data () {
    return {
      msg: 'Login'
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

</style>
