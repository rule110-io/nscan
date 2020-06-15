<template>
  <CardContainer>
    <Card width="half">
      <div class="card__title">{{$t('height')}}</div>
      <div class="card__text">{{block.header.height | commaNumber}}</div>
    </Card>
    <Card width="half">
      <div class="card__title">{{$t('transactions')}}</div>
      <div class="card__text">{{block.transactions_count}}</div>
    </Card>
    <Card>
      <div class="card__title">{{$t('size')}}</div>
      <div class="card__text">{{block.size}} {{$t('bytes')}}</div>
    </Card>
    <Card>
      <div class="card__title">{{$t('timestamp')}}</div>
      <div class="card__text">{{block.header.timestamp}}</div>
    </Card>
    <Card>
      <div class="card__title">{{$t('signer')}}</div>
      <div class="card__text">{{block.header.signerPk}}</div>
    </Card>
    <Card>
      <div class="card__title">{{$t('rewardedAddress')}}</div>
      <nuxt-link
        v-if="block.header.benificiaryWallet != null"
        class="card__link"
        :to="localePath({ name: 'addresses-id', params: { id: block.header.benificiaryWallet} })"
      >{{block.header.benificiaryWallet}}</nuxt-link>
      <nuxt-link
        v-else
        class="card__link"
        :to="localePath({ name: 'addresses-id', params: { id: block.header.wallet} })"
      >{{block.header.wallet}}</nuxt-link>
    </Card>
    <Card>
      <div class="card__title">{{$t('hash')}}</div>
      <div class="card__text">{{block.hash}}</div>
    </Card>
    <Card>
      <div class="card__title">{{$t('transactionRoot')}}</div>
      <div class="card__text">{{block.header.transactionsRoot}}</div>
    </Card>
  </CardContainer>
</template>

<style lang="scss">
@import './SingleBlockInfo.scss';
</style>

<script>
import Card from '~/components/Card/Card'
import CardContainer from '~/components/CardContainer/CardContainer'

export default {
  components: { Card, CardContainer },
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
