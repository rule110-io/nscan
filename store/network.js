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
    const data1 = await this.$axios.$get('https://api.nkn.org/v1/geo/summary')
    let nodecounts = 0
    data1.Payload.summary.forEach((element) => {
      nodecounts = nodecounts + element.Count
    })

    const data = {
      totalNodes: nodecounts,
      totalCountries: data1.Payload.summary.length,
      totalProviders: 0
    }
    commit('setNetworkStats', data)
  },
  async updateNetworkCities ({ commit }) {
    const data1 = await this.$axios.$get('https://api.nkn.org/v1/geo/summary')
    const cities = []
    data1.Payload.summary.forEach((element) => {
      element.Cities.forEach((element2) => {
        cities.push(element2)
      })
    })
    commit('setNetworkCities', cities)
  },
  async updateNetworkCountries ({ commit }) {
    const data1 = await this.$axios.$get('https://api.nkn.org/v1/geo/summary')
    const countries = []
    data1.Payload.summary.forEach((element) => {
      countries.push(element)
    })
    commit('setNetworkCountries', countries)
  }
}
