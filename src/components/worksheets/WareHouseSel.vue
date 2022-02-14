<template>
  <div style="width: 500px;height: 300px;" class="wr-wrapper">
    <div class="wr-div wr-left">
      <div style="margin: 10px 0;height: 30px;line-height: 30px;">
        <div style="font-size: 16px;display: inline-block;width: 20px;float: left;color: rgb(101, 103, 108);padding-left: 5px;padding-top: 2px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="ax cb  cd           be d3 d4 d5 cf dm" role="img" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4"></circle><path d="M9.5 9.5L13.0355 13.0355" stroke-linecap="round"></path></svg>
        </div>
        <div style="display: inline-block;font-size: 14px;width: 80%;float: left;margin-left: 6px;">
          <input placeholder="Roles" style="width: 100%;border: none;font-size: 12px;" v-model="dbValue" @click="roleSelect"/>
        </div>
      </div>
      <div>
        <template v-for="(site) in roleList.filter(item => !dbValue || item.name.toLowerCase().includes(dbValue.toLowerCase()))">
          <div v-if="site.name === roleSelected" class="role-item font-color-blue" :key="site.entityId"  @click="roleChange($event, site)">
            <span style="position: absolute;top: 2px;left: 10px;" class="role-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
            {{ site.name }}
            <div class="iselectd" style="width: 18%;display: inline-block;text-align: center;float: right" :key="site.entityId">
              <svg style="padding-top: 5px;" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
          <div v-else :key="site.id" class="role-item"  @click="roleChange($event, site)">
            <span style="position: absolute;top: 2px;left: 10px;" class="role-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
            {{ site.name }}
          </div>
        </template>
      </div>
    </div>
    <div class="wr-div wr-right">
      <div style="margin: 10px 0;height: 30px;line-height: 30px;">
        <div style="font-size: 16px;display: inline-block;width: 20px;float: left;color: rgb(101, 103, 108);padding-left: 5px;padding-top: 2px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="ax cb  cd           be d3 d4 d5 cf dm" role="img" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4"></circle><path d="M9.5 9.5L13.0355 13.0355" stroke-linecap="round"></path></svg>
        </div>
        <div style="display: inline-block;font-size: 12px;width: 80%;float: left;margin-left: 6px;">
          <input placeholder="Warehouses" style="width: 100%;border: none;font-size: 12px;" v-model="wareValue" @click="wareSelect"/>
        </div>
      </div>
      <template v-for="(site) in whArr.filter(item => !wareValue || item.name.toLowerCase().includes(wareValue.toLowerCase()))">
        <div v-if="site.name === wareselectd" class="role-item font-color-blue" :key="site.id"  @click="whChange(site)">
            <span style="position: absolute;top: 2px;left: 10px;" class="role-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
          {{ site.name }}
          <div class="iselectd" style="width: 18%;display: inline-block;text-align: center;float: right" :key="site.id">
            <svg style="padding-top: 5px;" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb cd           cp d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M4 8.5L6.5 11L12 5.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        </div>
        <div v-else :key="site.id" class="role-item"  @click="whChange(site)">
            <span style="position: absolute;top: 2px;left: 10px;" class="role-div-svg">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentcolor" xmlns="http://www.w3.org/2000/svg" class="cb  cd           ej d3 d4 d5 cf" role="img" aria-hidden="true"><path d="M7.5 0V2.5H8.5V0H7.5ZM13.0039 4.5V12.5H14.0039V4.5H13.0039ZM11.5039 14H4.50391V15H11.5039V14ZM3.00391 12.5V4.5H2.00391V12.5H3.00391ZM4.50391 14C3.67548 14 3.00391 13.3284 3.00391 12.5H2.00391C2.00391 13.8807 3.12319 15 4.50391 15V14ZM13.0039 12.5C13.0039 13.3284 12.3323 14 11.5039 14V15C12.8846 15 14.0039 13.8807 14.0039 12.5H13.0039ZM11.5039 3C12.3323 3 13.0039 3.67157 13.0039 4.5H14.0039C14.0039 3.11929 12.8846 2 11.5039 2V3ZM4.50391 2C3.12319 2 2.00391 3.11929 2.00391 4.5H3.00391C3.00391 3.67157 3.67548 3 4.50391 3V2ZM4.50391 3H8.00391V2H4.50391V3ZM8.00391 3H11.5039V2H8.00391V3Z"></path><path d="M10.3398 12.0148C10.7537 12.0148 11.0938 11.6733 10.9766 11.2764C10.7058 10.3597 9.89042 9.03125 7.98885 9.03125C6.08727 9.03125 5.29418 10.3597 5.02342 11.2764C4.90618 11.6733 5.24635 12.0148 5.66019 12.0148H10.3398Z"></path><path d="M9.51562 6.5C9.51562 7.32843 8.84405 8 8.01562 8C7.1872 8 6.51562 7.32843 6.51562 6.5C6.51562 5.67157 7.1872 5 8.01562 5C8.84405 5 9.51562 5.67157 9.51562 6.5Z"></path></svg>
            </span>
          {{ site.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import {Icon} from 'ant-design-vue'
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'WareHouseSel',
  props: ['idata'],
  components: {
    'a-icon': Icon
  },
  computed: {
    ...mapState([
      'services'
    ]),
    ...mapGetters({roleList: 'getRoleList'})
  },
  beforeMount () {
    console.info('ddddddd:', this.roleList)
    var item = this.roleList[0]
    if (this.idata.roleName && this.idata.roleName !== '') {
      let list = this.roleList.filter(val => val.name === this.idata.roleName)
      if (list && list.length > 0) {
        item = list[0]
      }
    }
    this.roleChange(undefined, item)
  },
  data () {
    return {
      dbValue: '',
      wareValue: '',
      schValue: '',
      // oriArr: this.schData,
      roleSelected: this.idata.roleName,
      wareselectd: this.idata.whName,
      whArr: [
      ]
    }
  },
  methods: {
    roleSelect: function (e) {
      e.stopPropagation()
    },
    wareSelect: function (e) {
      e.stopPropagation()
    },
    roleChange: async function (event, item) {
      this.roleSelected = item.name
      let whName = 'no warehouse selected'
      let whId = -1
      if (event) {
        event.stopPropagation()
      }
      try {
        let data = await this.services.warehouseService.warehouseListByRole({'roleId': item.entityId})
        console.info('warehouse data:', data)
        if (data && data.code === 200) {
          if (data.data && data.data.length > 0) {
            this.wareselectd = data.data[0].name
            whName = data.data[0].name
            whId = data.data[0].id
            this.whArr = data.data
            if (!event && this.idata.whName) { // 初始化处理
              let ll = data.data.filter(val => val.name === this.idata.whName)
              if (ll.length > 0) {
                whName = ll[0].name
                whId = ll[0].id
                this.wareselectd = whName
              }
            }
          } else {
            whName = 'no warehouse selected'
            whId = -1
          }
        }
        this.$emit('changeWareHouses', {'roleId': item.entityId, 'roleName': item.name, 'whName': whName, 'whId': whId})
      } catch (e) {
        console.info('roleChange request fail:', e)
      }
    },
    whChange (item) {
      this.wareselectd = item.id
      this.$emit('changeWareHouses', {'whId': item.id, 'whName': item.name})
    }
  }
}
</script>

<style scoped>

</style>

<style>
.wr-wrapper{
  /*box-shadow: rgba(0 0 0 0.15) 0px 2px 8px;*/
  box-shadow: 0px 2px 8px #888888;
  border: 1px solid rgb(226, 227, 229);
}
.wr-div{
  display: inline-block;
  /*padding: 10px 0;*/
}
.wr-left{
  width: 40%;
  /*background-color: red;*/
  height: 300px;
  float: left;
  border-right: 1px solid rgb(226, 227, 229);
  overflow-y: scroll;
}
.wr-right{
  width: 59%;
  height: 300px;
  float: left;
  /*background-color: #0d6efd;*/
  overflow-y: scroll;
}
.dbss-search{
  height: 50px;text-align: left;position: absolute;top: 0;width: 400px;padding-top: 10px;
}
.dbss-bot{
  height:250px;width: 38%;display:inline-block;padding-left: 1%
}
.dbss-con-div{
  height: 200px;position: absolute;top: 50px;
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
.role-item{
  margin-bottom: 7px;
  text-align: left;
  padding-left: 35px;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
}
.role-item:hover{
  background-color: #EEEEEE;
}
.wr-div input:focus{
  outline: none;
}
.role-div-svg{
  color: rgb(174, 176, 179);
}
</style>
