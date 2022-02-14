<template>
  <p>{{ this.showDatabaseNameLabel }}</p>
</template>

<script>

// /**/
export default {
  name: 'VShowRouterLabel',
  mounted: function () {
    console.log('mounted() $route.params:=' + JSON.stringify(this.$route.params))
    this.initparams()
  },
  methods: {
    initparams () {
      this.showDatabaseNameLabel = this.$route.params.label
    }
  },
  data () {
    return {
      showDatabaseNameLabel: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/

</style>
