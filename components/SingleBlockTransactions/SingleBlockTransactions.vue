<template>
  <div>
    <CardLoader v-if="loading" :count="5" />
    <CardContainer else>
      <SingleBlockTxCard v-for="tx in transactions" :key="tx.id" :tx="tx" />
    </CardContainer>
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
@import './SingleBlockTransactions.scss';
</style>

<script>
import CardContainer from '~/components/CardContainer/CardContainer'
import SingleBlockTxCard from '~/components/SingleBlockTxCard/SingleBlockTxCard'
import CardLoader from '~/components/Loaders/CardLoader'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { CardContainer, SingleBlockTxCard, CardLoader, Pagination },
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
