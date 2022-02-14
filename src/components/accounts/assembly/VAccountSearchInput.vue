<template>
  <div style="float: right">
    <el-button
      size="mini"
      class="filtrate-button"
      style="color:#8b8d91"
      v-if="!searchInputVisible && !searchInputFixed"
      @mouseover.native="handleSearchClick">
      <i class="el-icon-search"></i>
      <span style="color: #3f4246">Search</span>
    </el-button>
    <el-input size="mini"
              :placeholder="searchPlaceholder"
              prefix-icon="el-icon-search"
              ref="searchInputRef"
              v-if="searchInputVisible || searchInputFixed"
              v-model="searchName"
              class="search-input border-radius-class"
              @mouseout.native="handleMouseout"
              @click.native="handleInputClick"
              @blur="handleInputBlur"
              @input="getSearchDataValue()">
      >
    </el-input>
  </div>
</template>
<script>

export default {
  name: 'VSearchInput',
  props: {
    searchPlaceholder: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchInputVisible: false,
      searchInputFixed: false,
      searchName: ''
    }
  },
  mounted () {
  },
  methods: {
    handleSearchClick () {
      this.searchInputVisible = true
      this.$nextTick(function () {
        this.$refs.searchInputRef.focus()
      })
    },
    handleMouseout () {
      this.searchInputVisible = false
    },
    handleInputClick () {
      this.searchInputFixed = true
    },
    handleInputBlur () {
      this.searchInputVisible = false
      this.searchInputFixed = false
    },
    getSearchDataValue () {
      this.$emit('dataToFather', this.searchName)
    }
  }
}
</script>

<style scoped>
/*import 'font-awesome/css/font-awesome.min.css'*/
.filtrate-button {
  border-radius: 8px;
  color: #3f4246;
  font-weight: 600;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 12px;
}

.search-input {
  width: 150px;
}
</style>
