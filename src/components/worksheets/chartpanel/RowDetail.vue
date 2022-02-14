<template>
  <div class="row-detail" style="width: 100%;margin-top: 5px;">
    <div style="padding-left: 5px;margin-top:5px;font-size: 14px;">
      Row <span>{{row.cur}}/{{len}}</span>
      <span class="showAll" @click="toShowAll" style="float: right;cursor: pointer;font-size: 16px;color: #b3afaf;">x</span>
    </div>
    <div v-for="(item,i) in row" :key="i" style="margin-bottom: 5px;font-size:11px;padding: 5px 10px;" v-if="i !== 'cur'">
      <div style="color: rgb(101, 103, 108);font-size: 14px;margin-bottom: 3px;">{{i}}</div>
      <div style="color: rgb(44, 47, 52);font-size: 14px;margin-bottom: 5px;height: 20px;line-height: 20px;padding-left: 5px;">{{item}}</div>
      <div style="border-bottom: 1px solid rgb(229 225 225)"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'RowDetail',
  props: ['row', 'len'],
  mounted () {
    $('.showAll').hide()
    // mouse in out
    $('.row-detail').on('mouseover', function () {
      $('.showAll').show()
    })
    $('.row-detail').on('mouseout', function () {
      $('.showAll').hide()
    })
  },
  methods: {
    // m
    toShowAll: function () {
      this.$emit('showTableInfo', '')
    }
  }
}
</script>

<style scoped>

</style>
