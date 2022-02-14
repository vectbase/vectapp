<template>
  <el-dropdown trigger="click" :hide-on-click="false">
    <el-button size="mini" class="filtrate-button" style="color:#8b8d91">
              <span style="color: #3f4246"
                    class="icon-style"
                    v-show="querySourceObjs[0].checked">
                    {{ showCheckedStatusName }}
                </span>
      <span style="color: #085bd7"
            class="icon-style"
            v-show="!querySourceObjs[0].checked">
                    {{ showCheckedStatusName }}
                </span>
      <span style="color: #8b8d91" v-show="showCheckedSourceExtend"> +{{ showCheckedSourceCount - 1 }}</span>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="sourceObj in querySourceObjs" :key="sourceObj.id">
        <div v-show="showSourceChecked(sourceObj)" class="checkedActiveClass" @click="handleSourceChecked(sourceObj)">
          <i class="el-icon-check" style="margin-right: 10px"></i>
          {{ sourceObj.sourceName }}
        </div>
        <div v-show="!showSourceChecked(sourceObj)" @click="handleSourceChecked(sourceObj)">
          <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
          {{ sourceObj.sourceName }}
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

// /**/

export default {
  name: 'VDropdownSelect',
  props: {
    selectObjs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      querySourceObjs: [],
      sourceList: []
    }
  },
  created () {
    this.querySourceObjs = this.selectObjs
  },
  computed: {
    showCheckedSourceName () {
      return this.querySourceObjs.filter(querySourceObj => {
        return querySourceObj.checked === true
      })[0].sourceName
    },
    showCheckedSourceCount () {
      const sourceFilters = this.querySourceObjs.filter(sourceObj => {
        return sourceObj.checked === true
      })
      return sourceFilters.length
    },
    showCheckedStatusName () {
      const sourceFilters = this.querySourceObjs.filter(statusObj => {
        return statusObj.checked === true
      })
      return sourceFilters[0].sourceName
    },
    showCheckedSourceExtend () {
      return this.showCheckedSourceCount - 1 > 0 && this.querySourceObjs[0].checked === false
    }
  },
  mounted () {
  },
  methods: {
    showSourceChecked (sourceObj) {
      if (sourceObj.id === 0) {
        return sourceObj.checked
      } else {
        return !this.querySourceObjs[0].checked && sourceObj.checked
      }
    },
    handleSourceChecked (sourceObj) {
      if (sourceObj.id === 0) {
        this.querySourceObjs.forEach(status => {
          status.checked = true
        })
        this.sourceList = []
      } else {
        if (this.isStatusSelectedAll()) {
          this.querySourceObjs.forEach(status => {
            status.checked = false
          })
          sourceObj.checked = true
          this.sourceList = this.sourceList.concat(sourceObj.sourceName)
        } else {
          sourceObj.checked = !sourceObj.checked
          if (sourceObj.checked) {
            this.sourceList = this.sourceList.concat(sourceObj.sourceName)
          } else {
            this.sourceList = this.sourceList.filter(sourceId => {
              return sourceId !== sourceObj.sourceName
            })
          }
          if (this.isStatusSelectedAll() || this.isStatusSelectedNone()) {
            this.querySourceObjs.forEach(status => {
              status.checked = true
            })
            this.sourceIds = []
          }
        }
      }
      this.$emit('dataToFather', this.sourceList)
    },
    isStatusSelectedAll () {
      return this.querySourceObjs.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === this.querySourceObjs.length - 1
    },
    isStatusSelectedNone () {
      return this.querySourceObjs.filter(status => {
        return status.id !== 0
      }).filter(status => {
        return status.checked
      }).length === 0
    }
  }
}
</script>

<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 550;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}
.checkedActiveClass {
  color: #085bd7
}
.icon-style {
  margin-right: 4px;
}
</style>
