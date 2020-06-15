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
      const self = this

      // Checking if page exists
      if (page === null) {
        return false
      }

      self.loading = true

      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null

      // Fetcing data
      this.$axios
        .$get(`addresses/${this.address.address}/transactions?page=${page}`)
        .then(function (response) {
          const {
            data,
            currentPage,
            prevPageUrl,
            nextPageUrl,
            from,
            to
          } = response

          self.transactions = data

          self.from = from
          self.to = to
          self.currentPage = currentPage
          self.prevPage = prevPageUrl != null ? self.currentPage - 1 : null
          self.nextPage = nextPageUrl != null ? self.currentPage + 1 : null

          self.loading = false
        })
    }
  }
}
</script>
