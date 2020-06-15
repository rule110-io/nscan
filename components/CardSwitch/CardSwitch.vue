<template>
  <button class="card-switch" :class="active ? 'card-switch_active' : null">
    <slot/>
  </button>
</template>

<style lang="scss">
@import './CardSwitch';
</style>

<script>
export default {
  components: {},
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
