export const state = () => ({
  currentPrice: false,
  marketStats: false,
  dailyHistoryPrice: false
})

export const mutations = {
  setCurrentPrice (state, priceObj) {
    state.currentPrice = priceObj.usd
    state.marketStats = priceObj
  },
  setDailyHistoryPrice (state, priceObj) {
    state.dailyHistoryPrice = priceObj
  }
}

export const getters = {
  getCurrentPrice (state) {
    return state.currentPrice
  },
  getMarketStats (state) {
    return state.marketStats
  },
  getDailyHistoryPrice (state) {
    return state.dailyHistoryPrice
  }
}

export const actions = {
  async updateCurrentPrice ({ commit }) {
    const data = await this.$axios.$get(
      'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x5cf04716ba20127f1e2297addcf4b5035000c9eb&vs_currencies=usd%2Ceth&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false'
    )
    console.log(data['0x5cf04716ba20127f1e2297addcf4b5035000c9eb'])
    commit('setCurrentPrice', data['0x5cf04716ba20127f1e2297addcf4b5035000c9eb'])
  },
  async updateDailyHistoryPrice ({ commit }) {
    const data = await this.$axios.$get(
      'https://api.coingecko.com/api/v3/coins/nkn/market_chart?vs_currency=usd&days=30&interval=daily'
    )
    commit('setDailyHistoryPrice', data.prices)
  }
}
