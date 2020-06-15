<template>
  <div class="desktop-block">
    <table class="table">
      <thead class="table__head">
        <tr class="table__head-row">
          <th class="table__title text_align_left">{{$t('address')}}</th>
          <th class="table__title text_align_left">{{$t('latestTransaction')}}</th>
          <th class="table__title text_align_right">{{$t('transactions')}}</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="address in addresses" :key="address.address" class="table__row">
          <td class="table__item">
            <Wallet class="table__icon"/>
            <nuxt-link
              class="text_link text_wrap_none"
              :to="localePath({ name: 'addresses-id', params: { id: address.address } })"
            >{{address.address}}</nuxt-link>
          </td>
          <td class="table__item">{{ $moment(address.last_transaction+"Z").fromNow() }}</td>
          <td class="table__item text_align_right">{{address.count_transactions | commaNumber}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import './DesktopAddresses.scss';
</style>

<script>
import Wallet from '@/assets/icons/wallet.svg'

export default {
  components: { Wallet },
  props: {
    addresses: {
      type: Array,
      default () {
        return []
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
