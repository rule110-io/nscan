<template>
  <div class="menu">
    <Burger />
    <div class="menu__left">
      <nuxt-link :to="localePath('index')" class="menu__logo">
        <Logo />
        <span class="menu__title">NSCAN.IO</span>
      </nuxt-link>
      <DesktopMenu />
    </div>
    <div class="menu__right">
      <Search
        ref="searchField"
        class="menu__search"
        :text="$t('search')"
        :error="error"
        type="ghost"
        @sent="search()"
        @change="removeError"
      />
      <LanguageSelect />
    </div>
    <MobileMenu />
  </div>
</template>

<style lang="scss">
@import './Menu';
</style>

<script>
import Logo from '@/assets/icons/logo.svg'
import MobileMenu from '~/components/MobileMenu/MobileMenu'
import LanguageSelect from '~/components/LanguageSelect/LanguageSelect'
import Burger from '~/components/Burger/Burger'
import DesktopMenu from '~/components/DesktopMenu/DesktopMenu'
import Search from '~/components/Search/Search'

export default {
  components: {
    MobileMenu,
    LanguageSelect,
    Logo,
    Burger,
    DesktopMenu,
    Search
  },
  data: () => {
    return {
      error: ''
    }
  },
  mounted () {},
  methods: {
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
