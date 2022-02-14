<template>
  <li>
    <a href="#pagesCompute" data-bs-toggle="collapse" aria-expanded="false"
       class="dropdown-toggle no-caret-down">
      <i class="fas fa-copy"></i>
      Compute &nbsp; &nbsp;
    </a>
    <ul class="collapse list-unstyled" id="pagesCompute">

      <li>
        <router-link :to="{name:'QueryHistoryTable'}" tag="a">
          <i class="fas fa-file"></i>
          Query History
        </router-link>

        <router-link :to="{name:'WarehousesTable'}" tag="a">
          <i class="fas fa-info-circle"></i>
          Warehouses
        </router-link>

      </li>
      <li>

        <router-link :to="{name:'ResouceMonitorsPanel'}" tag="a">
          <i class="fas fa-info-circle"></i>
          Resource Monitors
        </router-link>

      </li>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'ComputeSidebar'

}
</script>

<style>

</style>
