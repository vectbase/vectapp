<template>
  <div class="wrapper">
    <div class="page vertical-align text-center">
      <div class="page-content vertical-align-middle">
        <header>
          <h1 class="animation-slide-top">404</h1>
          <p>Page Not Found !</p>
        </header>
        <p class="error-advise">The page you were looking for could not be found.</p>
        <a class="btn btn-primary btn-round mb-5" href="dashboard.html">GO TO HOME PAGE</a>
        <footer class="page-copyright">
          <p>© 2021. All RIGHT RESERVED.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/assetsbootstrap/vendor/jquery/jquery.min.js'
import '../../assets/assetsbootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js'
export default {
  name: 'NotFind404',
  data () {
    return {
      msg: 'demo'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<link href="assets/css/error.css" rel="stylesheet">-->

<style scoped>
  @import "../../assets/assetsbootstrap/css/error.css";

</style>
