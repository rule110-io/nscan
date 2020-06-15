export const state = () => ({
  latestTransactions: false,
  latestSigchain: false
})

export const mutations = {
  setLatestTransactions (state, txObj) {
    state.latestTransactions = txObj
  },
  addTx (state, txObj) {
    state.latestTransactions.pop()
    state.latestTransactions.unshift(txObj)
  },
  setLatestSigchain (state, sigchainObj) {
    state.latestSigchain = sigchainObj
  }
}

export const getters = {
  getLatestTransactions (state) {
    return state.latestTransactions
  },
  getLatestSigchain (state) {
    return state.latestSigchain
  }
}

export const actions = {
  async updateLatestSigchain ({ commit }, tx) {
    const pks = tx.payload.sigchain.sigchain_elems
      .map(i => i.pubkey)
      .join(',')

    const geoData = await this.$axios.$post(
      'https://api.nknx.org/nodes/geolocate',
      { pks }
    )

    commit('setLatestSigchain', geoData)
  },
  async updateLatestTransactions ({ commit, dispatch }) {
    const data = await this.$axios.$get('transactions')
    const latestTxs = data.transactions.data.slice(0, 5)
    const latestSigchain = latestTxs.find(tx => tx.txType === 'SIG_CHAIN_TXN_TYPE')
    dispatch('updateLatestSigchain', latestSigchain)

    commit('setLatestTransactions', latestTxs)

    // Connecting to WS
    const channel = this._vm.$pusher.subscribe('tx-updates')
    channel.bind('coinbase-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('delete-name-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('generate-id-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('issue-asset-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('nano-pay-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('register-name-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('sig-chain-tx', ({ transaction }) => {
      commit('addTx', transaction)
      dispatch('updateLatestSigchain', transaction)
    })

    channel.bind('subscribe-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('transfer-asset-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('transfer-name-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })

    channel.bind('unsubscribe-tx', ({ transaction }) => {
      commit('addTx', transaction)
    })
  }
}
