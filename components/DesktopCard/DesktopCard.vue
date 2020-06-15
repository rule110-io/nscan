<template>
  <div class="desktop-card" :class="[width ? `desktop-card_width_${width}` : null]">
    <slot/>
  </div>
</template>

<style lang="scss">
@import './DesktopCard.scss';
</style>

<script>
export default {
  components: {},
  props: {
    width: {
      type: String,
      default: 'full'
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
