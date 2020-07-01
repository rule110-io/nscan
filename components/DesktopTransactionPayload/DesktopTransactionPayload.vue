<template>
  <div>
    <h2 class="desktop-heading">{{ $t('payload') }}</h2>

    <!-- Mining Reward -->
    <DesktopCardContainer
      v-if="tx.txType === 'COINBASE_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('rewardedAddress') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.recipientWallet }
              })
            "
            >{{ tx.payload.recipientWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="desktop-card__item desktop-card__item_flex">
          <span>+ {{ tx.payload.amount | nknValue | commaNumber }} NKN</span>
          <span class="text_color_grey-light"
            >${{
              (
                this.$options.filters.nknValue(tx.payload.amount) * currentPrice
              ).toFixed(2) | commaNumber
            }}</span
          >
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Transfer -->
    <DesktopCardContainer
      v-if="tx.txType === 'TRANSFER_ASSET_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="third">
        <div class="card__title">{{ $t('from') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.senderWallet }
              })
            "
            >{{ tx.payload.senderWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="third">
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="desktop-card__item">
          <div>{{ tx.payload.amount | nknValue | commaNumber }} NKN</div>
          <div class="text_color_grey-light text_size_md">
            ${{
              (
                this.$options.filters.nknValue(tx.payload.amount) * currentPrice
              ).toFixed(2) | commaNumber
            }}
          </div>
        </div>
      </DesktopCard>
      <DesktopCard width="third">
        <div class="card__title">{{ $t('to_send') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.recipientWallet }
              })
            "
            >{{ tx.payload.recipientWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Sigchain -->
    <template v-if="tx.txType === 'SIG_CHAIN_TXN_TYPE' && tx.payload">
      <NodeTracing
        class="desktop-transaction-payload__sigchain"
        :tx="tx"
        :show-chain="true"
        :spacing="true"
      />
    </template>

    <!-- Subscription -->
    <DesktopCardContainer
      v-if="tx.txType === 'SUBSCRIBE_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="full">
        <div class="card__title">{{ $t('subscriber') }}</div>
        <div class="desktop-card__item">{{ tx.payload.subscriber }}</div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('identifier') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.identifier  }}
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('topic') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.topic  }}
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('bucket') }}</div>
        <div class="desktop-card__item">{{ tx.payload.bucket }}</div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('duration') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.duration }} {{ $t('blocks') }}
        </div>
      </DesktopCard>
      <DesktopCard v-if="tx.payload.meta.length > 0" width="full">
        <div class="card__title">{{ $t('meta') }}</div>
        <div class="desktop-card__item">{{ tx.payload.meta }}</div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Name Registration -->
    <DesktopCardContainer
      v-if="tx.txType === 'REGISTER_NAME_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.registrantWallet }
              })
            "
            >{{ tx.payload.registrantWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('registeredName') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.name  }}
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('registrationFee') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Name Transfer -->
    <DesktopCardContainer
      v-if="tx.txType === 'TRANSFER_NAME_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.registrantWallet }
              })
            "
            >{{ tx.payload.registrantWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('recipient') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.recipientWallet }
              })
            "
            >{{ tx.payload.recipientWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('transferedName') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.name  }}
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Name Deletion -->
    <DesktopCardContainer
      v-if="tx.txType === 'DELETE_NAME_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.registrantWallet }
              })
            "
            >{{ tx.payload.registrantWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('deletedName') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.name  }}
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Generate ID -->
    <DesktopCardContainer
      v-if="tx.txType === 'GENERATE_ID_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('publicKey') }}</div>
        <div class="desktop-card__item">{{ tx.payload.public_key }}</div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('registrationFee') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
        </div>
      </DesktopCard>
    </DesktopCardContainer>

    <!-- Nanopay -->
    <DesktopCardContainer
      v-if="tx.txType === 'NANO_PAY_TYPE' && tx.payload"
      class="desktop-block-transactions"
    >
      <DesktopCard width="half">
        <div class="card__title">{{ $t('sender') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.senderWallet }
              })
            "
            >{{ tx.payload.senderWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="half">
        <div class="card__title">{{ $t('recipient') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link text_wrap_none"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.recipientWallet }
              })
            "
            >{{ tx.payload.recipientWallet }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="third">
        <div class="card__title">{{ $t('txnExpiration') }}</div>
        <div class="desktop-card__item">
          {{ $t('block') }} #{{ tx.payload.txn_expiration }}
        </div>
      </DesktopCard>
      <DesktopCard width="third">
        <div class="card__title">{{ $t('nanoPayExpiration') }}</div>
        <div class="desktop-card__item">
          {{ $t('block') }} #{{ tx.payload.nano_pay_expiration }}
        </div>
      </DesktopCard>
      <DesktopCard width="third">
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="desktop-card__item">
          {{ tx.payload.amount | nknValue | commaNumber }} NKN
        </div>
      </DesktopCard>
    </DesktopCardContainer>
  </div>
</template>

<style lang="scss">
@import './DesktopTransactionPayload.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import DesktopCard from '~/components/DesktopCard/DesktopCard'
import DesktopCardContainer from '~/components/DesktopCardContainer/DesktopCardContainer'
import NodeTracing from '~/components/NodeTracing/NodeTracing'

export default {
  components: { DesktopCard, DesktopCardContainer, NodeTracing },
  props: {
    tx: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => {
    return {}
  },
  computed: mapGetters({
    currentPrice: 'price/getCurrentPrice'
  }),
  mounted () {},
  methods: {}
}
</script>
