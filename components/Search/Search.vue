<template>
  <div class="search" :class="[`search_type_${type}`, error.length > 0 ? 'search_error' : null]">
    <input
      v-model="searchContext"
      type="text"
      class="search__control"
      :placeholder="error.length > 0  ? error :text"
      @keyup.enter="onEnterPressed"
      @keyup="removeError"
    >
    <span class="search__icon fe fe-search" @click="onEnterPressed"></span>
  </div>
</template>

<style lang="scss">
@import './Search';
</style>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return { searchContext: '' }
  },
  mounted () {},
  methods: {
    onEnterPressed () {
      this.$emit('sent', '')
      this.clearSearch()
    },
    removeError () {
      this.$emit('change', '')
    },
    clearSearch () {
      this.searchContext = ''
    }
  }
}
</script>
