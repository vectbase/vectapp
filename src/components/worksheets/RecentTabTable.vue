<template>
  <table class="table table-hover" v-bind:id="tableId" width="100%">
    <thead>
    <tr>
      <th>title</th>
      <th>view</th>
      <th>update</th>
      <th>Role</th>
    </tr>
    </thead>
    <tbody>
    <tr @click="gotoWorksheetSqlCode()">
      <td>test</td>
      <td>7 minutes age </td>
      <td>1day ages </td>
      <td>User admin</td>
    </tr>

    </tbody>
  </table>
</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
// import '../../assets/assetsbootstrap/vendor/datatables/datatables.min.js'

export default {
  name: 'RecentTabTable',
  props: ['tableId'],
  methods: {
    gotoWorksheetSqlCode: function () {
      this.$router.push({name: 'WorksheetSqlCode'})
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
