<template>
  <div class="network-nodes">
    <div class="network-nodes__wrapper">
      <h2 class="network-nodes__title">{{ $t('networkMap') }}</h2>
      <p class="network-nodes__subtitle">
        {{ $t('updateTime') }}:
        {{ $moment(networkStats.updatedTime + 'Z').fromNow() }}
      </p>
      <div class="network-nodes__data">
        <div class="network-nodes__data-item">
          <h6 class="network-nodes__data-title">{{ $t('consensusNodes') }}</h6>
          <div class="network-nodes__data-value">
            {{ networkStats.totalNodes | commaNumber }}
          </div>
        </div>
        <div class="network-nodes__data-item">
          <h6 class="network-nodes__data-title">{{ $t('countries') }}</h6>
          <div class="network-nodes__data-value">
            {{ networkStats.totalCountries | commaNumber }}
          </div>
        </div>
        <div class="network-nodes__data-item">
          <h6 class="network-nodes__data-title">{{ $t('provider') }}</h6>
          <div class="network-nodes__data-value">
            {{ networkStats.totalProviders | commaNumber }}
          </div>
        </div>
      </div>
      <NetworkMapChart class="network-nodes__map" />
      <NetworkCountries />
    </div>
  </div>
</template>

<style lang="scss">
@import './NetworkNodes';
</style>

<script>
import { mapGetters } from 'vuex'
import NetworkMapChart from '~/components/Charts/NetworkMapChart'
import NetworkCountries from '~/components/NetworkCountries/NetworkCountries'

export default {
  components: { NetworkMapChart, NetworkCountries },
  data: () => {
    return {}
  },
  computed: mapGetters({
    networkStats: 'network/getNetworkStats'
  }),
  mounted () {},
  methods: {}
}
</script>
