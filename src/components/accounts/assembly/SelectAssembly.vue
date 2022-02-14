<template>
  <el-dropdown trigger="click" :hide-on-click="false" v-bind:id="labelKey">
    <div>
      <el-button v-if="selectObjects[0].checked" size="mini" class="filtrate-button"
                 style="color:#8b8d91;">
        {{labelKey}}
        <span style="color: #3f4246;"
              class="icon-style"
              v-show="selectObjects[0].checked">
                      {{ showCheckedSelectName }}
                    </span>
      </el-button>
      <el-button-group v-if="!selectObjects[0].checked">
        <el-button size="mini" class="filtrate-button"
                   style="color:#8b8d91;">
          {{labelKey}}
          <span style="color: #085bd7;"
                class="icon-style"
                v-show="!selectObjects[0].checked">
                      {{ showCheckedSelectName }}
                      </span>
          <span style="color: #8b8d91" v-show="showCheckedSelectExtend"> +{{ showCheckedSelectCount - 1 }}</span>
        </el-button>
        <el-button size="mini"
                   icon="el-icon-close"
                   @click.prevent.stop="handleSelectClose(labelKey)"
                   class="filtrate-button"
                   style="margin-left: -5px; padding: 7px">
        </el-button>
      </el-button-group>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="selectObj in selectObjects" :key="selectObj.id + labelKey">
        <div v-show="showSelectChecked(selectObj)" class="checkedActiveClass" @click="handleSelectChecked(selectObj)">
          <i class="el-icon-check" style="margin-right: 10px"></i>
          {{ selectObj.name }}
        </div>
        <div v-show="!showSelectChecked(selectObj)" @click="handleSelectChecked(selectObj)">
          <i class="el-icon-check" style="margin-right: 10px; color: #ffffff"></i>
          {{ selectObj.name }}
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SelectAssembly',
  props: {
    selectObjects: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      required: true
    }
  },
  methods: {
    handleSelectClose (labelKey) {
      this.$emit('handleSelectClose', labelKey)
    },
    showSelectChecked (selectObj) {
      if (selectObj.id === 0) {
        return selectObj.checked
      } else {
        return !this.selectObjects[0].checked && selectObj.checked
      }
    },
    handleSelectChecked (selectObj) {
      this.$emit('handleSelectChecked', selectObj, this.labelKey)
    }
  },
  computed: {
    showCheckedSelectName () {
      const statusFilters = this.selectObjects.filter(selectObj => {
        return selectObj.checked === true
      })
      if (statusFilters === undefined || statusFilters.length <= 0) {
        return
      }
      const labelName = statusFilters[0].name.length > 4 ? statusFilters[0].name.substring(0, 4) + '...' : statusFilters[0].name
      return labelName
    },
    showCheckedSelectExtend () {
      return this.showCheckedSelectCount - 1 > 0 && this.selectObjects[0].checked === false
    },
    showCheckedSelectCount () {
      const statusFilters = this.selectObjects.filter(statusObj => {
        return statusObj.checked === true
      })
      return statusFilters.length
    }
  }
}
</script>

<style scoped>
  .filtrate-button {
    border-radius: 8px;
    color: #3f4246;
    font-weight: 550;
    margin-right: 4px;
    margin-left: 4px;
    font-size: 12px;
  }
  .icon-style {
    margin-right: 4px;
  }
  .checkedActiveClass {
    color: #085bd7
  }
</style>
