<template>
  <div class="mobile-menu" :class="isMobileMenuOpen ? 'mobile-menu_open' : null">
    <Search
      ref="searchField"
      :text="$t('search')"
      :error="error"
      @sent="search()"
      @change="removeError"
    />
    <div class="mobile-menu__nav">
      <nuxt-link
        :to="localePath('index')"
        class="mobile-menu__nav-item"
        :exact="'index' == 'index' ? true : false"
        @click.native="toggleMobileMenu()"
      >
        <component :is="'Home'" class="mobile-menu__nav-icon"></component>
        {{ $t('home') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath('blocks')"
        class="mobile-menu__nav-item"
        :exact="'blocks' == 'index' ? true : false"
        @click.native="toggleMobileMenu()"
      >
        <component :is="'Block'" class="mobile-menu__nav-icon"></component>
        {{ $t('blocks') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath('transactions')"
        class="mobile-menu__nav-item"
        :exact="'transactions' == 'index' ? true : false"
        @click.native="toggleMobileMenu()"
      >
        <component :is="'Transaction'" class="mobile-menu__nav-icon"></component>
        {{ $t('transactions') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath('addresses')"
        class="mobile-menu__nav-item"
        :exact="'addresses' == 'index' ? true : false"
        @click.native="toggleMobileMenu()"
      >
        <component :is="'Address'" class="mobile-menu__nav-icon"></component>
        {{ $t('addresses') }}
      </nuxt-link>
      <a
        class="mobile-menu__nav-item"
        href="https://openapi.nkn.org/docs/index.html"
        target="_blank"
      >
        <Book class="mobile-menu__nav-icon" />
        {{ $t('API') }}
      </a>
    </div>
    <h3 class="mobile-menu__title">{{ $t('about') }}</h3>
    <p class="mobile-menu__descr">{{ $t('nknDescription') }}</p>
    <div class="mobile-menu__stats">
      <div
        class="mobile-menu__stats-item"
      >{{ networkStats.totalNodes | commaNumber }} {{ $t('nodes') }}</div>
      <div class="mobile-menu__stats-item">
        {{ networkStats.totalCountries | commaNumber }}
        {{ $t('differentCountries') }}
      </div>
      <div
        class="mobile-menu__stats-item"
      >{{ networkStats.totalProviders | commaNumber }} {{ $t('providers') }}</div>
    </div>
    <Button
      theme="primary"
      url="https://forum.nkn.org/c/testnet-mining"
      type="link"
    >{{ $t('joinTheNetwork') }}</Button>
  </div>
</template>

<style lang="scss">
@import './MobileMenu';
</style>

<script>
import { mapGetters } from 'vuex'

import Home from '@/assets/icons/home.svg'
import Block from '@/assets/icons/block.svg'
import Transaction from '@/assets/icons/transaction.svg'
import Address from '@/assets/icons/address.svg'
import Book from '@/assets/icons/book.svg'
import Button from '~/components/Button/Button'
import Search from '~/components/Search/Search'

export default {
  components: {
    Search,
    Home,
    Block,
    Transaction,
    Address,
    Button,
    Book
  },
  data: () => {
    return {
      routes: [
        {
          path: 'index',
          icon: 'Home',
          title: 'home'
        },
        {
          path: 'blocks',
          icon: 'Block',
          title: 'blocks'
        },
        {
          path: 'transactions',
          icon: 'Transaction',
          title: 'transactions'
        },
        {
          path: 'addresses',
          icon: 'Address',
          title: 'addresses'
        }
      ],
      error: ''
    }
  },
  computed: mapGetters({
    isMobileMenuOpen: 'mobileMenu/get',
    networkStats: 'network/getNetworkStats'
  }),
  mounted () {},
  methods: {
    toggleMobileMenu () {
      this.$store.dispatch('mobileMenu/toggleMobileMenu')
    },
    removeError () {
      this.error = ''
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
        this.$store.dispatch('mobileMenu/toggleMobileMenu')
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
                    self.$store.dispatch('mobileMenu/toggleMobileMenu')
                  }
                })
            } else {
              self.$router.push(
                self.localePath({
                  name: 'transactions-id',
                  params: { id: searchContext }
                })
              )
              self.$store.dispatch('mobileMenu/toggleMobileMenu')
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
            self.$store.dispatch('mobileMenu/toggleMobileMenu')
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
              self.$store.dispatch('mobileMenu/toggleMobileMenu')
            }
          })
      }
    }
  }
}
</script>
