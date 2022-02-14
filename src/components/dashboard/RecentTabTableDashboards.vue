<template>
  <table class="table table-hover i18n" v-bind:id="tableId" width="100%">
    <thead>
    <tr>
      <th>title</th>
      <th>view</th>
      <th>update</th>
      <th>Role</th>
    </tr>
    </thead>
    <tbody>
    <tr @click="gotoDashboardDetailPages()">
      <td>test - {{  $t('hello22')  }}</td>
      <td>7 minutes age {{  $t('hello2')  }} </td>
      <td>1day ages {{ $t("language.name") }} </td>
      <td>User admin</td>
    </tr>

    </tbody>
  </table>
</template>

<!--<script src="assets/vendor/datatables/datatables.min.js"></script>-->
<!--<script src="assets/js/initiate-datatables.js"></script>-->

<script>
export default {
  name: 'RecentTabTableDashboards',
  props: ['tableId'],
  methods: {
    gotoDashboardDetailPages: function () {
      this.$router.push({name: 'DashboardDetail'})
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

<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "zh": {
    "hello22": "hello22、世fff界!"
  }
}
</i18n>
