<template>

  <div class="card">
    <div class="card-body">
      <table class="table table-hover" width="100%">
        <thead>
        <tr>
          <th>SQL TEXT</th>
          <th>STATUS </th>
          <th>STARTED</th>
          <th>TOTAL </th>
          <th>USER </th>
          <th>WAREHOSE </th>
          <th>SESSION </th>

        </tr>
        </thead>
        <tbody>
        <tr @click="gotoDashboardDetailPages()">
          <td>select * from test </td>
          <td>ok </td>
          <td>1day ages </td>
          <td>83 m </td>
          <td>user 1  m </td>
          <td>ware1  m </td>
          <td>session001   m </td>
        </tr>
        <tr @click="gotoDashboardDetailPages()">
          <td>select * from test </td>
          <td>ok </td>
          <td>1day ages </td>
          <td>83 m </td>
          <td>user 1  m </td>
          <td>ware1  m </td>
          <td>session001   m </td>
        </tr>
        <tr @click="gotoDashboardDetailPages()">
          <td>select * from test </td>
          <td>ok </td>
          <td>1day ages </td>
          <td>83 m </td>
          <td>user 1  m </td>
          <td>ware1  m </td>
          <td>session001   m </td>
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
  name: 'QueryHistoryTable',
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
