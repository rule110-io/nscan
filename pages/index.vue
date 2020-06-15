<template>
  <section class="section section_white">
    <div class="main-header">
      <h1 class="main-header__title text_color_white">{{$t('welcomeToNscan')}}</h1>
      <i18n path="searchFor" tag="div" class="main-header__description">
        <nuxt-link class="text_link" :to="localePath('blocks')">{{$t('block')}}</nuxt-link>
        <nuxt-link class="text_link" :to="localePath('transactions')">{{$t('transaction')}}</nuxt-link>
        <nuxt-link class="text_link" :to="localePath('addresses')">{{$t('address')}}</nuxt-link>
      </i18n>
      <div class="main-header__search-bar">
        <Search
          ref="searchField"
          class="main-header__search"
          :error="error"
          :text="$t('singleSearch')"
          @sent="search()"
          @change="removeError"
        />
        <Button
          class="main-header__search-button"
          theme="primary"
          type="button"
          :full="true"
          @clicked="search()"
          @click.native="clearSearch"
        >{{$t('singleSearch')}}</Button>
      </div>
      <MarketStats class="main-header__market-stats" />
    </div>
    <NetworkStats class="main-header__network-stats" />
    <div class="latest__grid">
      <Latest :title="$t('blocks')" link="blocks" type="blocks" />
      <Latest :title="$t('transactions')" link="transactions" type="transactions" />
    </div>
    <NetworkNodes />
  </section>
</template>

<script>
import Search from '~/components/Search/Search'
import Button from '~/components/Button/Button'
import MarketStats from '~/components/MarketStats/MarketStats'
import NetworkStats from '~/components/NetworkStats/NetworkStats'
import Latest from '~/components/Latest/Latest'
import NetworkNodes from '~/components/NetworkNodes/NetworkNodes'

export default {
  components: {
    Search,
    Button,
    MarketStats,
    NetworkStats,
    Latest,
    NetworkNodes
  },
  data: () => {
    return {
      error: ''
    }
  },
  methods: {
    removeError () {
      this.error = ''
    },
    clearSearch () {
      this.$refs.searchField.clearSearch()
    },
    search () {
      const searchContext = this.$refs.searchField.searchContext
      const self = this
      if (searchContext.startsWith('NKN') && searchContext.length === 36) {
        self.$router.push(
          self.localePath({
            name: 'addresses-id',
            params: { id: searchContext }
          })
        )
      } else if (searchContext.length === 64) {
        this.$axios
          .$get(`transactions/${searchContext}`)
          .then(function (response) {
            if (!Object.entries(response).length) {
              self.$axios
                .$get(`blocks/${searchContext}`)
                .then(function (response) {
                  if (!Object.entries(response).length) {
                    self.error = self.$t('blockOrTransactionNotFound')
                  } else {
                    self.$router.push(
                      self.localePath({
                        name: 'blocks-id',
                        params: { id: searchContext }
                      })
                    )
                  }
                })
            } else {
              self.$router.push(
                self.localePath({
                  name: 'transactions-id',
                  params: { id: searchContext }
                })
              )
            }
          })
      } else if (!isNaN(searchContext) && searchContext.length) {
        this.$axios.$get(`blocks/${searchContext}`).then(function (response) {
          if (!Object.entries(response).length) {
            self.error = self.$t('blockHeightNotFound')
          } else {
            self.$router.push(
              self.localePath({
                name: 'blocks-id',
                params: { id: searchContext }
              })
            )
          }
        })
      } else {
        this.$axios
          .$get(`address-book/name/${searchContext}`)
          .then(function (response) {
            if (!Object.entries(response).length) {
              self.error = self.$t('invalidData')
            } else {
              self.$router.push(
                self.localePath({
                  name: 'addresses-id',
                  params: { id: response.address }
                })
              )
            }
          })
      }
    }
  }
}
</script>
