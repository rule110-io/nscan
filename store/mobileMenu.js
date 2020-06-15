export const state = () => ({
  isMobileMenuOpen: false
})

export const mutations = {
  set (state) {
    state.isMobileMenuOpen = !state.isMobileMenuOpen
  }
}

export const getters = {
  get (state) {
    return state.isMobileMenuOpen
  }
}

export const actions = {
  toggleMobileMenu ({ commit }) {
    commit('set')
  }
}
