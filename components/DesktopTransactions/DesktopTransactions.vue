<template>
  <div class="desktop-block">
    <table class="table">
      <thead class="table__head">
        <tr class="table__head-row">
          <th class="table__title text_align_left">{{$t('type')}}</th>
          <th class="table__title text_align_left">{{$t('created')}}</th>
          <th class="table__title text_align_left">{{$t('hash')}}</th>
          <th class="table__title text_align_right">{{$t('block')}}</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="tx in transactions" :key="tx.id" class="table__row">
          <td class="table__item">
            <TransactionTypeTitle :type="tx.txType"/>
          </td>
          <td class="table__item">{{ $moment(tx.created_at+"Z").fromNow() }}</td>
          <td class="table__item">
            <nuxt-link
              class="text_link text_wrap_none"
              :to="localePath({ name: 'transactions-id', params: { id: tx.hash} })"
            >{{tx.hash}}</nuxt-link>
          </td>
          <td class="table__item text_align_right">
            <nuxt-link
              class="text_link text_wrap_none"
              :to="localePath({ name: 'blocks-id', params: { id: tx.block_height} })"
            >{{tx.block_height | commaNumber}}</nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import './DesktopTransactions.scss';
</style>

<script>
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: { TransactionTypeTitle },
  props: {
    transactions: {
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
