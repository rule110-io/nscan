<template>
  <div class="market-stats">
    <div class="market-stats__wrapper">
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">New Kind of Network (NKN)</div>
        </div>
        <div class="market-stats__number">
          ${{currentPrice.toFixed(6)}}
          <span
            class="market-stats__change"
            :class="market.usd_24h_change > 0 ? 'market-stats__change_positive' : 'market-stats__change_negative'"
          >
            <span v-if="market.usd_24h_change > 0">+</span>
            {{market.usd_24h_change.toFixed(2)}}%
          </span>
        </div>
      </div>
      <div class="market-stats__item">

      </div>
      <div class="market-stats__item">

      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('marketCap')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        >${{market.usd_market_cap.toFixed(0) | commaNumber}}</div>
      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('volume')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        >${{market.usd_24h_vol.toFixed(0) | commaNumber}}</div>
      </div>
      <!-- <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('circulatingSupply')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        ></div>
      </div> -->
      <!-- <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('rank')}}</div>
        </div>
        <div class="market-stats__number market-stats__number_small">{{market.cmc_rank}}</div>
      </div> -->
    </div>
    <MarketChart class="market-stats__chart" />
  </div>
</template>

<style lang="scss">
@import './MarketStats';
</style>

<script>
import { mapGetters } from 'vuex'
import MarketChart from '~/components/Charts/MarketChart'

export default {
  components: { MarketChart },
  data: () => {
    return {}
  },
  computed: mapGetters({
    market: 'price/getMarketStats',
    currentPrice: 'price/getCurrentPrice'
  }),
  mounted () {
    console.log(this.market)
  },
  methods: {}
}
</script>
