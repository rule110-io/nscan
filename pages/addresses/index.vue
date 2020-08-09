<template>
  <section class="section">
    <div class="page-header">
      <div class="page-header__wrapper">
        <div class="page-header__left">
          <h1 class="page-header__title text_color_white">{{$t('addresses')}}</h1>
          <div class="page-header__stats page-header__stats_justify_center">
            <div class="page-header__stats-item">
              <h6
                class="page-header__stats-title text_color_white text_transform_uppercase text_opacity_75"
              >{{$t('total')}}</h6>
              <h4 class="page-header__stats-value text_color_white">{{sumAddresses | commaNumber}}</h4>
            </div>
          </div>
        </div>
        <div class="page-header__right"></div>
      </div>
    </div>

    <mq-layout :mq="['sm','md']">
      <CardLoader v-if="loading" :count="10" />
      <CardContainer v-else class="expand-container">
        <AddressCard v-for="address in addresses" :key="address.address" :address="address" />
      </CardContainer>
    </mq-layout>

    <mq-layout mq="lg">
      <DesktopWrapper :margin="false">
        <TableLoader v-if="loading" :count="10" />
        <DesktopAddresses v-else :addresses="addresses" />
      </DesktopWrapper>
    </mq-layout>

    <div v-if="addresses.length > 0" class="page-navigation">
      <div
        class="page-navigation__info"
      >{{$t('showing')}} {{from}} {{$t('to')}} {{to}} {{$t('of')}} {{sumAddresses}}</div>
      <div class="page-navigation__pagination">
        <Pagination :page="prevPage" type="prev" @click.native="getAddresses(prevPage)" />
        <Pagination :page="nextPage" type="next" @click.native="getAddresses(nextPage)" />
      </div>
    </div>
  </section>
</template>

<script>
import AddressCard from '~/components/AddressCard/AddressCard'
import CardContainer from '~/components/CardContainer/CardContainer'
import CardLoader from '~/components/Loaders/CardLoader'
import TableLoader from '~/components/Loaders/TableLoader'
import Pagination from '~/components/Pagination/Pagination'

import DesktopWrapper from '~/components/DesktopWrapper/DesktopWrapper'
import DesktopAddresses from '~/components/DesktopAddresses/DesktopAddresses'

export default {
  components: {
    AddressCard,
    CardContainer,
    CardLoader,
    Pagination,
    DesktopAddresses,
    DesktopWrapper,
    TableLoader
  },
  data: () => {
    return {
      loading: true,
      nextPage: null,
      prevPage: null,
      currentPage: 1,
      from: 0,
      to: 0,
      sumAddresses: 0,
      addresses: []
    }
  },
  mounted () {
    this.getAddresses(this.currentPage)
  },
  methods: {
    getAddresses (page) {
      // Checking if page exists
      if (page === null) {
        return false
      }

      this.loading = true

      // Disabling pagination untill data fetched
      this.nextPage = null
      this.prevPage = null

      // Fetcing data
      this.$axios.$get(`addresses?page=${page}`).then((response) => {
        const { sumAddresses, addresses } = response
        const {
          data,
          current_page: currentPage,
          prev_page_url: prevPageUrl,
          next_page_url: nextPageUrl,
          from,
          to
        } = addresses

        this.sumAddresses = sumAddresses
        this.addresses = data

        this.from = from
        this.to = to
        this.currentPage = currentPage

        this.prevPage = prevPageUrl != null ? this.currentPage - 1 : null
        this.nextPage = nextPageUrl != null ? this.currentPage + 1 : null

        this.loading = false
      })
    }
  },
  head () {
    return {
      title: this.$t('addresses')
    }
  }
}
</script>
