<template>
  <div class="card">
    <div class="card-body">
      <table class="table table-hover" width="100%">
        <thead>
        <tr>
          <th>Name</th>
          <th>STATUS </th>
          <th>SIZE</th>
          <th>RUNNING </th>
          <th>QUEUED </th>
          <th>OWNER </th>
          <th>CREATE </th>

        </tr>
        </thead>
        <tbody>
        <tr @click="gotoDashboardDetailPages()">
          <td> nameem001 </td>
          <td>ok </td>
          <td>x-small </td>
          <td>2  </td>
          <td>0 </td>
          <td> admin</td>
          <td>4 days ages    m </td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>

</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
export default {
  name: 'WarehousesTable',
  methods: {
    gotoDashboardDetailPages: function () {
      // this.$router.push({name: 'DashboardDetail'})
    }
  },
  data () {
    return {
      msg: 'RecentTabTable'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
