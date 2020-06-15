<template>
  <div class="header" :class="isMobileMenuOpen ? 'header_open' : null">
    <Menu/>
  </div>
</template>

<style lang="scss">
@import './Header';
</style>

<script>
import { mapGetters } from 'vuex'
import Menu from '~/components/Menu/Menu'

export default {
  components: {
    Menu
  },
  computed: mapGetters({
    isMobileMenuOpen: 'mobileMenu/get'
  })
}
</script>
