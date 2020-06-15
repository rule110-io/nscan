export const state = () => ({
  latestBlocks: false
})

export const mutations = {
  setLatestBlocks (state, blocksObj) {
    state.latestBlocks = blocksObj
  },
  addBlock (state, blockObj) {
    state.latestBlocks.pop()
    state.latestBlocks.unshift(blockObj)
  }
}

export const getters = {
  getLatestBlocks (state) {
    return state.latestBlocks
  }
}

export const actions = {
  async updateLatestBlocks ({ commit }) {
    // Getting first batch of blocks from API
    const data = await this.$axios.$get('blocks')
    commit('setLatestBlocks', data.blocks.data.slice(0, 5))

    // Connecting to WS
    const channel = this._vm.$pusher.subscribe('block-updates')
    channel.bind('block', ({ block }) => {
      const { transactions_count: txCount } = block
      commit('addBlock', block)
      commit('network/increaseNetworkCounts', txCount, { root: true })
    })
  }
}
