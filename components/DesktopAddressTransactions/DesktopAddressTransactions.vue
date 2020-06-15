<template>
  <div class="desktop-block-transactions">
    <h2 class="desktop-heading">{{$t('transactions')}}</h2>
    <TableLoader v-if="loading" :count="10" />
    <table v-else class="table">
      <thead class="table__head">
        <tr class="table__head-row">
          <th class="table__title text_align_left">{{$t('type')}}</th>
          <th class="table__title text_align_left">{{$t('created')}}</th>
          <th class="table__title text_align_left">{{$t('hash')}}</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <DesktopTx v-for="tx in transactions" :key="tx.id" :tx="tx" />
      </tbody>
    </table>
    <div v-if="transactions.length > 0" class="page-navigation">
      <div
        class="page-navigation__info"
      >{{$t('showing')}} {{from}} {{$t('to')}} {{to}} {{$t('of')}} {{address.count_transactions | commaNumber}}</div>
      <div class="page-navigation__pagination">
        <Pagination :page="prevPage" type="prev" @click.native="getAddressTransactions(prevPage)" />
        <Pagination :page="nextPage" type="next" @click.native="getAddressTransactions(nextPage)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DesktopAddressTransactions.scss';
</style>

<script>
import DesktopTx from '~/components/DesktopTx/DesktopTx'
import Pagination from '~/components/Pagination/Pagination'
import TableLoader from '~/components/Loaders/TableLoader'

export default {
  components: { TableLoader, DesktopTx, Pagination },
  props: {
    address: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => {
    return {
      transactions: [],
      loading: true,
      nextPage: null,
      prevPage: null,
      currentPage: 1,
      from: 0,
      to: 0
    }
  },
  mounted () {
    this.getAddressTransactions(this.currentPage)
  },
  methods: {
    getAddressTransactions (page) {
      // Checking if page exists
      if (page === null) {
        return false
      }

      this.loading = true

      // Disabling pagination untill data fetched
      this.nextPage = null
      this.prevPage = null

      // Fetcing data
      this.$axios
        .$get(`addresses/${this.address.address}/transactions?page=${page}`)
        .then((response) => {
          const {
            data,
            current_page: currentPage,
            prev_page_url: prevPageUrl,
            next_page_url: nextPageUrl,
            from,
            to
          } = response

          this.transactions = data

          this.from = from
          this.to = to
          this.currentPage = currentPage
          this.prevPage = prevPageUrl != null ? this.currentPage - 1 : null
          this.nextPage = nextPageUrl != null ? this.currentPage + 1 : null

          this.loading = false
        })
    }
  }
}
</script>
