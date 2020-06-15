<template>
  <div
    class="burger"
    :class="isMobileMenuOpen ? 'burger_active' : null"
    @click="toggleMobileMenu()"
  >
    <div class="burger__inner"></div>
  </div>
</template>

<style lang="scss">
@import './Burger';
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    isMobileMenuOpen: 'mobileMenu/get'
  }),
  methods: {
    toggleMobileMenu () {
      this.$store.dispatch('mobileMenu/toggleMobileMenu')
    }
  }
}
</script>
