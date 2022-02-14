<template>
  <div style="height: 250px;">
    <div style="width: 423px;">
      <div class="dbss-top">
        <div class="dbss-search">
          <div style="font-size: 16px;display: inline-block;width: 5%;margin-left: 10px;"><a-icon type="search"></a-icon></div>
          <div style="display: inline-block;font-size: 14px;width: 90%;">
            <input placeholder="Databases" style="width: 100%;border: none;font-size: 16px;" v-model="dbValue"/>
          </div>
        </div>
        <div class="dbss-con-div" style="width: 424px;">
          <template v-for="(site) in dbData.filter(data => !dbValue || data.name.toLowerCase().includes(dbValue.toLowerCase()))" :site="site" >
            <div v-if="site.id === dbselected" class="dbss-con-div-item font-color-blue" :key="site.id"  :tid="site.id" @click="dbChange(site.id)">
              {{ site.name }}
              <div class="iselectd" style="width: 18%;display: inline-block;text-align: center;float: right" :key="site.id" :tid="site.id">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
            <div v-else class="dbss-con-div-item" :key="site.id"  @click="dbChange(site.id)">
              {{ site.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Icon } from 'ant-design-vue'
import { mapState } from 'vuex'
export default {
  name: 'DbSchemaSel',
  computed: mapState(['services']),
  components: {
    'a-icon': Icon
  },
  mounted: function () {
    // 初始化的时候，默认显示第一个db、schema
    // let databaseList = this.services.databaseService.queryList()
    // console.info('databaseList:', databaseList)
  },
  data () {
    return {
      dbValue: '',
      schValue: '',
      oriArr: this.schData,
      dbselected: this.initDbId,
      schselected: '',
      schArr: []
    }
  },
  methods: {
    changeInitDbId: function (dbId) {
      this.dbselected = dbId
    },
    dbChange (target) {
      this.dbselected = target
      this.$emit('changeContxt', target)
    },
    itemClick (e, type) {
      var $this = $(e.currentTarget)
      var dbId = $this.attr('tid')
      if (type === 'db') {
        this.schArr = this.oriArr.filter(data => Number(data.pId) === Number(dbId))
        console.log('filteeeeeed', this.schArr)
        this.dbselected = $this.html()
        // schema重置
        $('.dis-right .list-item').each(function () {
          $(this).removeClass('iselectd')
        })
        this.schselected = ''
      } else {
        this.schselected = $this.html()
      }
      $this.siblings().each(function () {
        $(this).removeClass('iselectd')
      })
      $this.addClass('iselectd')
      this.$emit('changeContxt', this.dbselected + (this.schselected === '' ? '' : '.' + this.schselected))
      console.log('更新后', this.schArr)
      this.isEmit = true
    }
  },
  props: ['dbData', 'schData', 'initDbName', 'initScId', 'initDbId'],
  beforeMount () {
    console.info('db select initdbid:', this.initDbId, this.dbData)
    // 处理初始化选中
    // this.dbselected = this.initDbId
    // console.info('ziizii', this.initDbId)
    //
    // console.log('before mount')
    // var pId = this.dbData[0].id
    // if (this.initDbId) {
    //   var intDb = this.dbData.filter(data => Number(this.initDbId) === Number(data.id))
    //   console.log('wwwwww', intDb)
    //   this.dbselected = intDb[0].name
    //   pId = intDb[0].id
    // } else {
    //   // 默认取第一个
    //   this.dbselected = this.dbData.length === 0 ? '' : this.dbData[0].name
    // }
    // console.log('执行了before')
    // this.schArr = this.oriArr.filter(data => Number(data.pId) === Number(pId))
    // // schema
    // if (this.initScId) {
    //   var initSch = this.schArr.filter(data => Number(this.initScId) === Number(data.id))
    //   this.schselected = initSch.name
    // }
  },
  beforeUpdate () {
    console.log('before update:', this.schArr)
  }
}
</script>

<style scoped>
.el-popover{
  padding: 0px;
}
</style>
<style>
.dbss-top{
  height: 250px;display: inline-block;width: 100%;
}
.dbss-search{
  height: 50px;text-align: left;
  /*position: absolute;*/
  top: 0;width: 400px;padding-top: 10px;
}
.dbss-bot{
  height:250px;width: 38%;display:inline-block;padding-left: 1%
}
.dbss-con-div{
  height: 200px;
  /*position: absolute;*/
  top: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.dbss-con-div-item{
  padding-top: 8px; padding-bottom: 8px;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  padding-left: 12px;
}
.db-list div{
  padding: 12px 16px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
}
.db-list div:hover{
  background-color: #eee;
}
.iselectd{
  color: #409EFF;
}
.s-input:focus{
  outline: none;
}
.s-input{
  border: none;
  margin-bottom: 10px;
}
.dbss-search input:focus{
  outline: none;
}
.list-item-db{
  width: 80%;display: inline-block
}
.list-item-sch{
  width: 80%;display: inline-block
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #c8c5c5;
}
.font-color-blue{
  color: #1d75b3;
  background-color: #EEEEEE;
}
.dbss-con-div-item:hover{
  background-color: #EEEEEE;
}
.el-popover{
  padding: 0!important;
}
</style>
