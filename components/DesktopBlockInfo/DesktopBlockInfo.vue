<template>
  <div>
    <h2 class="desktop-heading">{{$t('generalInfo')}}</h2>
    <DesktopCardContainer>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('height')}}</div>
        <div class="desktop-card__item">{{block.header.height | commaNumber}}</div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('transactions')}}</div>
        <div class="desktop-card__item">{{block.transactions_count}}</div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('size')}}</div>
        <div class="desktop-card__item">{{block.size}} {{$t('bytes')}}</div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('timestamp')}}</div>
        <div class="desktop-card__item">{{block.header.created_at}}</div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{$t('rewardedAddress')}}</div>
        <div class="desktop-card__item">
          <nuxt-link
            v-if="block.header.benificiaryWallet != null"
            class="text_link"
            :to="localePath({ name: 'addresses-id', params: { id: block.header.benificiaryWallet} })"
          >{{block.header.benificiaryWallet}}</nuxt-link>
          <nuxt-link
            v-else
            class="text_link"
            :to="localePath({ name: 'addresses-id', params: { id: block.header.wallet} })"
          >{{block.header.wallet}}</nuxt-link>
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{$t('signer')}}</div>
        <div class="desktop-card__item">{{block.header.signerPk}}</div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{$t('hash')}}</div>
        <div class="desktop-card__item">{{block.hash}}</div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{$t('transactionRoot')}}</div>
        <div class="desktop-card__item">{{block.header.transactionsRoot}}</div>
      </DesktopCard>
    </DesktopCardContainer>
  </div>
</template>

<style lang="scss">
@import './DesktopBlockInfo.scss';
</style>

<script>
import DesktopCard from '~/components/DesktopCard/DesktopCard'
import DesktopCardContainer from '~/components/DesktopCardContainer/DesktopCardContainer'

export default {
  components: { DesktopCard, DesktopCardContainer },
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
