<template>
  <Card class="latest-card" :border="true">
    <nuxt-link :to="localePath({ name: 'blocks-id', params: { id: block.hash } })">
      <div class="latest-card__mobile">
        <div class="latest-card__header">
          <nuxt-link
            class="latest-card__title text_link text_weight_bold"
            :to="localePath({ name: 'blocks-id', params: { id: block.hash } })"
          >
            <Block class="latest-card__icon" />
            {{ block.header.height | commaNumber }}
          </nuxt-link>
          <div class="text_size_xs text_color_grey-light">{{ created }}</div>
        </div>
        <nuxt-link
          v-if="block.header.benificiaryWallet"
          class="latest-card__address text_link text_size_sm text_wrap_none"
          :to="
            localePath({
              name: 'addresses-id',
              params: { id: block.header.benificiaryWallet }
            })
          "
        >{{ block.header.benificiaryWallet }}</nuxt-link>
        <nuxt-link
          v-else
          class="latest-card__address text_link text_size_sm text_wrap_none"
          :to="
            localePath({
              name: 'addresses-id',
              params: { id: block.header.wallet }
            })
          "
        >{{ block.header.wallet }}</nuxt-link>
        <div class="latest-card__bottom">
          <div class="text_size_md">{{ block.transactions_count }} {{ $t('transactions') }}</div>
          <div
            class="latest-card__size text_size_md text_color_grey-light"
          >{{ block.size }} {{ $t('bytes') }}</div>
        </div>
      </div>
      <div class="latest-card__desktop">
        <div class="block-card__header">
          <nuxt-link
            class="block-card__height text_color_primary text_weight_bold"
            :to="localePath({ name: 'blocks-id', params: { id: block.hash } })"
          >
            <Block class="block-card__icon" />
            {{ block.header.height | commaNumber }}
          </nuxt-link>
          <div class="block-card__timestamp text_size_sm text_color_grey-light">{{ created }}</div>
          <div
            class="block-card__size text_size_sm text_color_grey-light"
          >{{ block.size }} {{ $t('bytes') }}</div>
        </div>
        <div
          class="block-card__txs text_size_sm"
        >{{ $t('transactions') }}: {{ block.transactions_count }}</div>
        <div class="block-card__miner text_size_sm">
          {{ $t('rewardedAddress') }}:
          <nuxt-link
            v-if="block.header.benificiaryWallet"
            class="block-card__address text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: block.header.benificiaryWallet }
              })
            "
          >&nbsp;{{ block.header.benificiaryWallet }}</nuxt-link>
          <nuxt-link
            v-else
            class="block-card__address text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: block.header.wallet }
              })
            "
          >&nbsp;{{ block.header.wallet }}</nuxt-link>
        </div>
      </div>
    </nuxt-link>
  </Card>
</template>

<style lang="scss">
@import './LatestBlockCard';
</style>

<script>
import { mapGetters } from 'vuex'

import Block from '@/assets/icons/block.svg'
import Card from '~/components/Card/Card'

export default {
  components: { Card, Block },
  props: {
    block: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return { created: '' }
  },
  computed: mapGetters({
    latestBlocks: 'latestBlocks/getLatestBlocks'
  }),
  watch: {
    latestBlocks () {
      this.created = this.getCreatedTime()
    }
  },
  created () {
    this.created = this.getCreatedTime()
  },
  mounted () {
    this.intervalBlocks = setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime () {
      this.created = this.getCreatedTime()
    },
    getCreatedTime () {
      return this.$moment(this.block.header.created_at + 'Z').fromNow()
    }
  }
}
</script>
