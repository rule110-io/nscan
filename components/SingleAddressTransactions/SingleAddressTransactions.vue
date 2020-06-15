<template>
  <div>
    <CardLoader v-if="loading" :count="10" />
    <CardContainer v-else>
      <SingleBlockTxCard v-for="tx in transactions" :key="tx.id" :tx="tx" />
    </CardContainer>
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

<script>
import CardContainer from '~/components/CardContainer/CardContainer'
import SingleBlockTxCard from '~/components/SingleBlockTxCard/SingleBlockTxCard'
import CardLoader from '~/components/Loaders/CardLoader'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { CardContainer, SingleBlockTxCard, CardLoader, Pagination },
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
