<template>
  <Card>
    <nuxt-link :to="localePath({ name: 'blocks-id', params: { id: block.hash } })">
      <div class="block-card">
        <div class="block-card__header">
          <nuxt-link
            class="block-card__height text_color_primary text_weight_bold text_wrap_none"
            :to="localePath({ name: 'blocks-id', params: { id: block.hash } })"
          >
            <Block class="block-card__icon"/>
            {{block.header.height | commaNumber}}
          </nuxt-link>
          <div
            class="block-card__timestamp text_size_sm text_color_grey-light text_wrap_none"
          >{{ $moment(block.header.created_at +"Z").fromNow() }}</div>
          <div
            class="block-card__size text_size_sm text_color_grey-light text_wrap_none"
          >{{block.size}} {{$t('bytes')}}</div>
        </div>
        <div
          class="block-card__txs text_size_sm"
        >{{$t('transactions')}}: {{block.transactions_count}}</div>
        <div class="block-card__miner text_size_sm">
          <span>{{$t('rewardedAddress')}}:&nbsp;</span>
          <nuxt-link
            v-if="block.header.benificiaryWallet"
            class="block-card__address text_link text_wrap_none"
            :to="localePath({ name: 'addresses-id', params: { id: block.header.benificiaryWallet } })"
          >{{block.header.benificiaryWallet}}</nuxt-link>
          <nuxt-link
            v-else
            class="block-card__address text_link text_wrap_none"
            :to="localePath({ name: 'addresses-id', params: { id: block.header.wallet } })"
          >{{block.header.wallet}}</nuxt-link>
        </div>
      </div>
    </nuxt-link>
  </Card>
</template>

<style lang="scss">
@import './BlockCard';
</style>

<script>
import Block from '@/assets/icons/block.svg'
import Card from '~/components/Card/Card'

export default {
  components: { Card, Block },
  props: {
    block: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
