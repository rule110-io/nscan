<template>
  <div class="latest">
    <div class="latest__header">
      <h2 v-if="type=='transactions'">{{$t('latestTransactions')}}</h2>
      <h2 v-else>{{$t('latestBlocks')}}</h2>
      <nuxt-link class="latest__all text_link" :to="localePath(link)">{{$t('viewAll')}}</nuxt-link>
    </div>
    <div class="latest__wrapper">
      <template v-if="type ==='blocks'">
        <LatestBlockCard v-for="block in latestBlocks" :key="block.id" :block="block"/>
      </template>
      <template v-if="type ==='transactions'">
        <LatestTransactionCard v-for="tx in latestTransactions" :key="tx.id" :tx="tx"/>
      </template>
    </div>
    <div class="latest__nav">
      <Button
        class="latest__button"
        type="router"
        :url="type==='blocks' ? 'blocks' : 'transactions'"
        theme="ghost"
      >{{$t('viewAll')}}</Button>
    </div>
  </div>
</template>

<style lang="scss">
@import './Latest';
</style>

<script>
import { mapGetters } from 'vuex'

import LatestBlockCard from '~/components/LatestBlockCard/LatestBlockCard'
import LatestTransactionCard from '~/components/LatestTransactionCard/LatestTransactionCard'
import Button from '~/components/Button/Button'

export default {
  components: { LatestBlockCard, LatestTransactionCard, Button },
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {}
  },
  computed: mapGetters({
    latestBlocks: 'latestBlocks/getLatestBlocks',
    latestTransactions: 'latestTransactions/getLatestTransactions'
  })
}
</script>
