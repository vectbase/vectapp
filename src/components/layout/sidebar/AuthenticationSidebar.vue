<template>
  <li>
    <a href="#authmenuAuthentication" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle no-caret-down">
      <i class="fas fa-user-shield"></i>
      Authentication
    </a>
    <ul class="collapse list-unstyled" id="authmenuAuthentication">
      <router-link :to="{name:'login'}" tag="li">
        <a>
          <i class="fas fa-lock"></i>
          Login
        </a>
      </router-link>

      <router-link :to="{name:'signup'}" tag="li">
        <a>
          <i class="fas fa-user-plus"></i>
          Signup
        </a>
      </router-link>

      <router-link :to="{name:'forgotPassword'}" tag="li">
        <a>
          <i class="fas fa-user-lock"></i>
          Forgot password
        </a>
      </router-link>

    </ul>
  </li>
</template>

<script>

export default {
  name: 'AuthenticationSidebar'

}
</script>

<style>

</style>
