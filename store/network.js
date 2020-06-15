export const state = () => ({
  networkCounts: false,
  networkStats: false,
  networkCities: false,
  networkCountries: false
})

export const mutations = {
  setNetworkCounts (state, networkCountsObj) {
    if (!state.networkCounts) {
      state.networkCounts = networkCountsObj
    }
  },
  setNetworkStats (state, networkStatsObj) {
    state.networkStats = networkStatsObj
  },
  increaseNetworkCounts (state, txCount) {
    state.networkCounts.blockCount += 1
    state.networkCounts.txCount += txCount
  },
  setNetworkCities (state, citiesObj) {
    state.networkCities = citiesObj
  },
  setNetworkCountries (state, countriesObj) {
    state.networkCountries = countriesObj
  }
}

export const getters = {
  getNetworkCounts (state) {
    return state.networkCounts
  },
  getNetworkStats (state) {
    return state.networkStats
  },
  getNetworkCities (state) {
    return state.networkCities
  },
  getNetworkCountries (state) {
    return state.networkCountries
  }
}

export const actions = {
  async updateNetworkCounts ({ commit }) {
    const data = await this.$axios.$get('statistics/counts')
    commit('setNetworkCounts', data)
  },
  async updateNetworkStats ({ commit }) {
    const data = await this.$axios.$get('https://api.nknx.org/network/stats')
    commit('setNetworkStats', data)
  },
  async updateNetworkCities ({ commit }) {
    const data = await this.$axios.$get('https://api.nknx.org/network/cities')
    commit('setNetworkCities', data)
  },
  async updateNetworkCountries ({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/network/countries'
    )
    commit('setNetworkCountries', data)
  }
}
