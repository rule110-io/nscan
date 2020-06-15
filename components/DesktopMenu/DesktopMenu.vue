<template>
  <div class="desktop-menu">
    <nuxt-link
      :to="localePath('index')"
      :exact="'index' == 'index' ? true : false"
      class="desktop-menu__item"
    >{{ $t('home') }}</nuxt-link>
    <nuxt-link
      :to="localePath('blocks')"
      :exact="'blocks' == 'index' ? true : false"
      class="desktop-menu__item"
    >{{ $t('blocks') }}</nuxt-link>
    <nuxt-link
      :to="localePath('transactions')"
      :exact="'transactions' == 'index' ? true : false"
      class="desktop-menu__item"
    >{{ $t('transactions') }}</nuxt-link>
    <nuxt-link
      :to="localePath('addresses')"
      :exact="'addresses' == 'index' ? true : false"
      class="desktop-menu__item"
    >{{ $t('addresses') }}</nuxt-link>
    <a
      class="desktop-menu__item"
      href="https://openapi.nkn.org/docs/index.html"
      target="_blank"
    >{{ $t('API') }}</a>
  </div>
</template>

<style lang="scss">
@import './DesktopMenu';
</style>

<script>
export default {
  components: {},
  data: () => {
    return {}
  },

  mounted () {},
  methods: {}
}
</script>
