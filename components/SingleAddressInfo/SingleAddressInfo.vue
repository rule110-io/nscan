<template>
  <CardContainer>
    <Card class="single-address-info__balance">
      <div class="card__title">{{$t('balance')}}</div>
      <div class="card__text">{{address.balance | nknValue | commaNumber}} NKN</div>
      <Logo class="single-address-info__logo" />
    </Card>
    <Card>
      <div class="card__title">{{$t('firstTransaction')}}</div>
      <div class="card__text">
        <span v-if="address.first_transaction !=null">{{address.first_transaction}}</span>
        <span v-else>{{$t('never')}}</span>
      </div>
    </Card>
    <Card>
      <div class="card__title">{{$t('latestTransaction')}}</div>
      <div class="card__text">
        <span v-if="address.last_transaction !=null">{{address.last_transaction}}</span>
        <span v-else>{{$t('never')}}</span>
      </div>
    </Card>
    <Card>
      <div class="card__title">{{$t('totalTransactions')}}</div>
      <div class="card__text">{{address.count_transactions | commaNumber}}</div>
    </Card>
  </CardContainer>
</template>

<style lang="scss">
@import './SingleAddressInfo.scss';
</style>

<script>
import Logo from '@/assets/icons/logo.svg'
import Card from '~/components/Card/Card'
import CardContainer from '~/components/CardContainer/CardContainer'

export default {
  components: { Card, CardContainer, Logo },
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
