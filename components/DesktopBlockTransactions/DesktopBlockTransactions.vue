<template>
  <div class="desktop-block-transactions">
    <h2 class="desktop-heading">{{ $t('transactions') }}</h2>
    <TableLoader v-if="loading" :count="10" />
    <table v-else class="table">
      <thead class="table__head">
        <tr class="table__head-row">
          <th class="table__title text_align_left">{{ $t('type') }}</th>
          <th class="table__title text_align_left">{{ $t('created') }}</th>
          <th class="table__title text_align_left">{{ $t('hash') }}</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <DesktopTx v-for="tx in transactions" :key="tx.id" :tx="tx" />
      </tbody>
    </table>
    <div v-if="transactions.length > 0" class="page-navigation">
      <div class="page-navigation__info">
        {{ $t('showing') }} {{ from }} {{ $t('to') }} {{ to }} {{ $t('of') }}
        {{ txCount | commaNumber }}
      </div>
      <div class="page-navigation__pagination">
        <Pagination :page="prevPage" type="prev" @click.native="getBlockTransactions(prevPage)" />
        <Pagination :page="nextPage" type="next" @click.native="getBlockTransactions(nextPage)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DesktopBlockTransactions.scss';
</style>

<script>
import DesktopTx from '~/components/DesktopTx/DesktopTx'
import TableLoader from '~/components/Loaders/TableLoader'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { TableLoader, DesktopTx, Pagination },
  props: {
    height: {
      type: Number,
      default: 0
    },
    txCount: {
      type: Number,
      default: 0
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
    this.getBlockTransactions(this.currentPage)
  },
  methods: {
    getBlockTransactions (page) {
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
        .$get(`blocks/${this.height}/transactions?page=${page}`)
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
