<template>
  <nuxt-link :to="localePath(route)" class="get-back">
    <Back class="get-back__icon"/>
    {{text}}
  </nuxt-link>
</template>

<style lang="scss">
@import './GetBack';
</style>

<script>
import Back from '@/assets/icons/back.svg'

export default {
  components: { Back },
  props: {
    text: {
      type: String,
      default: 'Back'
    },
    route: {
      type: String,
      default: 'index'
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
