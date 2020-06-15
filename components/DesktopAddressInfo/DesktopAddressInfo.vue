<template>
  <div>
    <h2 class="desktop-heading">{{$t('generalInfo')}}</h2>
    <DesktopCardContainer>
      <DesktopCard class="single-address-info__balance" width="quarter">
        <div class="card__title">{{$t('balance')}}</div>
        <div class="desktop-card__item">{{address.balance | nknValue | commaNumber}} NKN</div>
        <Logo class="single-address-info__logo" />
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('firstTransaction')}}</div>
        <div class="desktop-card__item">
          <span v-if="address.first_transaction !=null">{{address.first_transaction}}</span>
          <span v-else>{{$t('never')}}</span>
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('latestTransaction')}}</div>
        <div class="desktop-card__item">
          <span v-if="address.last_transaction !=null">{{address.last_transaction}}</span>
          <span v-else>{{$t('never')}}</span>
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{$t('totalTransactions')}}</div>
        <div class="desktop-card__item">{{address.count_transactions | commaNumber}}</div>
      </DesktopCard>
    </DesktopCardContainer>
  </div>
</template>

<style lang="scss">
@import './DesktopAddressInfo.scss';
</style>

<script>
import Logo from '@/assets/icons/logo.svg'
import DesktopCard from '~/components/DesktopCard/DesktopCard'
import DesktopCardContainer from '~/components/DesktopCardContainer/DesktopCardContainer'

export default {
  components: { DesktopCard, DesktopCardContainer, Logo },
  props: {
    address: {
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
