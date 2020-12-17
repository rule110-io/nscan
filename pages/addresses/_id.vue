<template>
  <section class="section">
    <div class="single-page-header">
      <div class="single-page-header__wrapper">
        <GetBack :text="$t('allAddresses')" route="addresses" />
        <div class="single-page-header__left">
          <Wallet class="single-page-header__icon" />
          <div class="single-page-header__info">
            <h1 class="single-page-header__title">{{ $t('addressDetails') }}</h1>
            <div
              v-clipboard:copy="$route.params.id"
              class="single-page-header__address single-page-header__address_label"
            >
              <div
                v-if="$route.params.id == 'NKNFCrUMFPkSeDRMG2ME21hD6wBCA2poc347'"
                class="single-page-header__label"
              >{{ $t('initialIssueAddress') }}</div>
              <div
                v-if="$route.params.id == 'NKNFPiSzGFZyTFKYFC3aJPRd3A79S697essL'"
                class="single-page-header__label"
              >{{ $t('genesisWalletAddress') }}</div>
              <span class="single-page-header__address-title" :class="copied ? 'single-page-header__address-title_active' : null" :data-label="$t('copied')" @click="toggleCopied">
                {{ $route.params.id }}
                <Copy class="single-page-header__address-copy"/>
              </span>
            </div>
            <div
              v-if="address.name && address.name.length"
              class="single-page-header__address"
            >{{ $t('registeredNames') }}: {{ address.name.join(', ') }}</div>
          </div>
        </div>
        <div v-if="address.balance" class="single-page-header__right">
          <div
            class="single-page-header__tx-number"
          >{{ address.balance | nknValue | commaNumber }} NKN</div>
          <div
            class="single-page-header__tx-price"
          >${{ ((address.balance / 100000000) * currentPrice).toFixed(2) | commaNumber }}</div>
        </div>
        <mq-layout mq="lg">
          <DesktopTransactionFilter
            style="position: absolute; right: 130px; bottom: 36px;"
            :filters="filters"
            :active-filter="activeFilter"
            @update="updateFilters"
          />
        </mq-layout>
        <div class="single-page-header__switches">
          <CardSwitch
            :active="activeGeneral"
            @click.native="toggleSwitch('activeGeneral')"
          >{{ $t('generalInfo') }}</CardSwitch>
          <CardSwitch
            :active="activeTx"
            @click.native="toggleSwitch('activeTx')"
          >{{ $t('transactions') }}</CardSwitch>
        </div>
      </div>
    </div>

    <mq-layout :mq="['sm', 'md']">
      <template v-if="!loading">
        <SingleAddressInfo v-if="activeGeneral" :address="address" />
        <SingleAddressTransactions v-if="activeTx" :address="address" />
      </template>
      <CardLoader v-else :count="5" />
    </mq-layout>

    <mq-layout mq="lg">
      <DesktopWrapper>
        <TableLoader v-if="loading" :count="5" />
        <DesktopAddressInfo v-if="!loading" :address="address" />
        <DesktopAddressTransactions v-if="!loading" :address="address" :filter="activeFilter.value"/>
      </DesktopWrapper>
    </mq-layout>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Copy from '@/assets/icons/copy.svg'
import Wallet from '@/assets/icons/wallet.svg'
import GetBack from '~/components/GetBack/GetBack'
import SingleAddressInfo from '~/components/SingleAddressInfo/SingleAddressInfo'
import SingleAddressTransactions from '~/components/SingleAddressTransactions/SingleAddressTransactions'
import CardSwitch from '~/components/CardSwitch/CardSwitch'
import CardLoader from '~/components/Loaders/CardLoader'
import TableLoader from '~/components/Loaders/TableLoader'

import DesktopWrapper from '~/components/DesktopWrapper/DesktopWrapper'
import DesktopAddressInfo from '~/components/DesktopAddressInfo/DesktopAddressInfo'
import DesktopAddressTransactions from '~/components/DesktopAddressTransactions/DesktopAddressTransactions'
import DesktopTransactionFilter from '~/components/DesktopTransactionFilter/DesktopTransactionFilter'

export default {
  components: {
    GetBack,
    SingleAddressInfo,
    CardSwitch,
    SingleAddressTransactions,
    Copy,
    Wallet,
    CardLoader,
    TableLoader,
    DesktopWrapper,
    DesktopAddressInfo,
    DesktopAddressTransactions,
    DesktopTransactionFilter
  },
  data: () => {
    return {
      address: {},
      loading: true,
      activeGeneral: true,
      activeTx: false,
      copied: false,
      filters: [
        {
          title: 'allTransactions',
          value: 'all'
        },
        {
          title: 'miningReward',
          value: 'COINBASE_TYPE'
        },
        {
          title: 'transfer',
          value: 'TRANSFER_ASSET_TYPE'
        },
        {
          title: 'signatureChain',
          value: 'SIG_CHAIN_TXN_TYPE'
        },
        {
          title: 'subscription',
          value: 'SUBSCRIBE_TYPE'
        },
        {
          title: 'generateId',
          value: 'GENERATE_ID_TYPE'
        },
        {
          title: 'nanopay',
          value: 'NANO_PAY_TYPE'
        },
        {
          title: 'walletNameRegistration',
          value: 'REGISTER_NAME_TYPE'
        },
        {
          title: 'walletNameTransfer',
          value: 'TRANSFER_NAME_TYPE'
        },
        {
          title: 'walletNameDeletion',
          value: 'DELETE_NAME_TYPE'
        }
      ],
      activeFilter: {
        title: 'allTransactions',
        value: 'all'
      }
    }
  },
  computed: mapGetters({
    currentPrice: 'price/getCurrentPrice'
  }),
  mounted () {
    this.getAddress()
  },
  methods: {
    updateFilters (filter) {
      this.activeFilter = filter
    },
    toggleCopied () {
      this.copied = true
      setTimeout(() => { this.copied = false }, 1000)
    },
    toggleSwitch (name) {
      switch (name) {
        case 'activeGeneral':
          this.activeGeneral = true
          this.activeTx = false
          break
        case 'activeTx':
          this.activeTx = true
          this.activeGeneral = false
          break
        default:
      }
    },
    getAddress () {
      const walletAddress = this.$route.params.id
      this.$axios.$get(`addresses/${walletAddress}`).then((response) => {
        this.address = response
        this.loading = false
      })
    }
  },
  head () {
    return {
      title: this.$t('addressDetails')
    }
  },
  transition: 'expand'

}
</script>
