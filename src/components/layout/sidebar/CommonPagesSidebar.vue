<template>
  <li>
    <a href="#pagesmenuCommonPagesSidebar" data-bs-toggle="collapse" aria-expanded="false"
       class="dropdown-toggle no-caret-down">
      <i class="fas fa-copy"></i>
      Common Pages &nbsp;
    </a>
    <ul class="collapse list-unstyled" id="pagesmenuCommonPagesSidebar">

      <li>

        <router-link :to="{name:'NotFind404'}" tag="a">
          <i class="fas fa-info-circle"></i>
          404   page
        </router-link>

      </li>
      <li>

        <router-link :to="{name:'Error505'}" tag="a">
          <i class="fas fa-info-circle"></i>
          500   page
        </router-link>

      </li>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'CommonPagesSidebar'

}
</script>

<style>

</style>
