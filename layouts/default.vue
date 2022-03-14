<template>
  <div
    v-if="
      market &&
        currentPrice &&
        latestBlocks &&
        latestTransactions &&
        dailyHistoryPrice &&
        networkCounts
    "
  >
    <template>
      <Header />
      <nuxt />
      <Footer />
    </template>
  </div>
  <Preloader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Preloader from '~/components/Preloader/Preloader'

export default {
  components: {
    Header,
    Footer,
    Preloader
  },
  computed: mapGetters({
    market: 'price/getMarketStats',
    currentPrice: 'price/getCurrentPrice',
    latestBlocks: 'latestBlocks/getLatestBlocks',
    latestTransactions: 'latestTransactions/getLatestTransactions',
    dailyHistoryPrice: 'price/getDailyHistoryPrice',
    networkCities: 'network/getNetworkCities',
    networkCountries: 'network/getNetworkCountries',
    networkStats: 'network/getNetworkStats',
    networkCounts: 'network/getNetworkCounts',
    isMobileMenuOpen: 'mobileMenu/get'
  }),
  destroyed () {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalDailyHistoryPrice)
    clearInterval(this.intervalNetworkCities)
    clearInterval(this.intervalNetworkCountries)
    clearInterval(this.intervalNetworkStats)
    clearInterval(this.intervalNetworkCounts)
  },
  mounted () {
    this.updatePrice()
    this.updateBlocks()
    this.updateTransactions()
    this.updateDailyHistoryPrice()
    this.updateNetworkCountries()
    this.updateNetworkCities()
    this.updateNetworkStats()
    this.updateNetworkCounts()

    this.intervalPrice = setInterval(this.updatePrice, 300000)
    this.intervalNetworkStats = setInterval(this.updateNetworkStats, 60000)
    this.intervalDailyHistoryPrice = setInterval(
      this.updateDailyHistoryPrice,
      300000
    )
    this.intervalNetworkCities = setInterval(this.updateNetworkCities, 60000)
    this.intervalNetworkCountries = setInterval(
      this.updateNetworkCountries,
      60000
    )
    this.intervalNetworkCounts = setInterval(this.updateNetworkCounts, 60000)
  },
  methods: {
    updatePrice () {
      this.$store.dispatch('price/updateCurrentPrice')
    },
    updateBlocks () {
      this.$store.dispatch('latestBlocks/updateLatestBlocks')
    },
    updateTransactions () {
      this.$store.dispatch('latestTransactions/updateLatestTransactions')
    },
    updateDailyHistoryPrice () {
      this.$store.dispatch('price/updateDailyHistoryPrice')
    },
    updateNetworkCities () {
      this.$store.dispatch('network/updateNetworkCities')
    },
    updateNetworkCountries () {
      this.$store.dispatch('network/updateNetworkCountries')
    },
    updateNetworkStats () {
      this.$store.dispatch('network/updateNetworkStats')
    },
    updateNetworkCounts () {
      this.$store.dispatch('network/updateNetworkCounts')
    }
  }
}
</script>
