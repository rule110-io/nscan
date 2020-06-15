<template>
  <div class="desktop-wrapper" :class="margin != true ? 'desktop-wrapper_no-margin' : null">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import './DesktopWrapper';
</style>

<script>
export default {
  components: {},
  props: {
    margin: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
