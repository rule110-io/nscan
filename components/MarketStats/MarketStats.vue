<template>
  <div class="market-stats">
    <div class="market-stats__wrapper">
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">New Kind of Network (NKN)</div>
          <div class="market-stats__rank">#{{market.cmc_rank}}</div>
        </div>
        <div class="market-stats__number">
          ${{currentPrice.toFixed(6)}}
          <span
            class="market-stats__change"
            :class="market.prices[0].percent_change_24h > 0 ? 'market-stats__change_positive' : 'market-stats__change_negative'"
          >
            <span v-if="market.prices[0].percent_change_24h > 0">+</span>
            {{market.prices[0].percent_change_24h.toFixed(2)}}%
          </span>
        </div>
      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('marketCap')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        >${{market.prices[0].market_cap.toFixed(0) | commaNumber}}</div>
      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('volume')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        >${{market.prices[0].volume_24h.toFixed(0) | commaNumber}}</div>
      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('circulatingSupply')}}</div>
        </div>
        <div
          class="market-stats__number market-stats__number_small"
        >{{market.circulating_supply | commaNumber}} NKN</div>
      </div>
      <div class="market-stats__item">
        <div class="market-stats__header">
          <div class="market-stats__title">{{$t('rank')}}</div>
        </div>
        <div class="market-stats__number market-stats__number_small">{{market.cmc_rank}}</div>
      </div>
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
  mounted () {},
  methods: {}
}
</script>
