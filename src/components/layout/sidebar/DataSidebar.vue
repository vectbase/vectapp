<template>
  <li>
    <a href="#uielementsmenuData" data-bs-toggle="collapse" aria-expanded="false"
       class="dropdown-toggle no-caret-down">
      <i class="fas fa-layer-group"></i>
      &nbsp;&nbsp;&nbsp;Data&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </a>
    <ul class="collapse list-unstyled" id="uielementsmenuData">

      <router-link :to="{name:'DatabasesPanel'}" tag="li">
        <a>
          <i class="fas fa-angle-right"></i>
          Databases
        </a>
      </router-link>
      <router-link :to="{name:'SharedDataPanel'}" tag="li">
        <a>
          <i class="fas fa-angle-right"></i>
          Shared Data
        </a>
      </router-link>

    </ul>
  </li>
</template>

<script>

export default {
  name: 'DataSidebar'

}
</script>

<style>

</style>
