<template>
  <div>
    <!-- Mining Reward -->
    <CardContainer v-if="tx.txType === 'COINBASE_TYPE'">
      <Card>
        <div class="card__title">{{ $t('miner') }}</div>
        <nuxt-link
          class="card__link"
          :to="
            localePath({
              name: 'addresses-id',
              params: { id: tx.payload.recipientWallet }
            })
          "
          >{{ tx.payload.recipientWallet }}</nuxt-link
        >
      </Card>
      <Card>
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="card__text">
          + {{ tx.payload.amount | nknValue | commaNumber }} NKN
        </div>
        <div
          class="card__text card__subitem text_size_xs text_color_grey-light"
        >
          ${{
            (
              this.$options.filters.nknValue(tx.payload.amount) * currentPrice
            ).toFixed(2) | commaNumber
          }}
        </div>
      </Card>
    </CardContainer>

    <!-- Transfer -->
    <CardContainer v-if="tx.txType === 'TRANSFER_ASSET_TYPE'">
      <Card>
        <div class="card__title">{{ $t('from') }}</div>
        <nuxt-link
          class="card__link"
          :to="
            localePath({
              name: 'addresses-id',
              params: { id: tx.payload.senderWallet }
            })
          "
          >{{ tx.payload.senderWallet }}</nuxt-link
        >
      </Card>
      <Card>
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="card__text text_size_md">
          {{ tx.payload.amount | nknValue | commaNumber }} NKN
        </div>
        <div
          class="card__text card__subitem text_size_xs text_color_grey-light"
        >
          ${{
            (
              this.$options.filters.nknValue(tx.payload.amount) * currentPrice
            ).toFixed(2) | commaNumber
          }}
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('to_send') }}</div>
        <nuxt-link
          class="card__link text_size_md"
          :to="
            localePath({
              name: 'addresses-id',
              params: { id: tx.payload.recipientWallet }
            })
          "
          >{{ tx.payload.recipientWallet }}</nuxt-link
        >
      </Card>
    </CardContainer>

    <!-- Sigchain -->
    <template v-if="tx.txType === 'SIG_CHAIN_TXN_TYPE'">
      <CardContainer>
        <Card>
          <div class="card__title">{{ $t('dataSize') }}</div>
          <div class="card__text">
            {{ tx.payload.sigchain.dataSize }} {{ $t('bytes') }}
          </div>
        </Card>
        <Card>
          <div class="card__title">{{ $t('dataHash') }}</div>
          <div class="card__text">{{ tx.payload.sigchain.dataHash }}</div>
        </Card>
      </CardContainer>
      <NodeTracing :tx="tx" :spacing="true" :show-chain="true" />
    </template>

    <!-- Subscription -->
    <CardContainer v-if="tx.txType === 'SUBSCRIBE_TYPE'">
      <Card>
        <div class="card__title">{{ $t('subscriber') }}</div>
        <div class="card__text text_size_md">{{ tx.payload.subscriber }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('identifier') }}</div>
        <div class="card__text text_size_md">
          {{ tx.payload.identifier  }}
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('topic') }}</div>
        <div class="card__text text_size_md">
          {{ tx.payload.topic  }}
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('bucket') }}</div>
        <div class="card__text text_size_md">{{ tx.payload.bucket }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('duration') }}</div>
        <div class="card__text text_size_md">
          {{ tx.payload.duration }} {{ $t('blocks') }}
        </div>
      </Card>
      <Card v-if="tx.payload.meta.length > 0">
        <div class="card__title">{{ $t('meta') }}</div>
        <div class="card__text text_size_md">{{ tx.payload.meta }}</div>
      </Card>
    </CardContainer>

    <!-- Name Registration -->
    <CardContainer v-if="tx.txType === 'REGISTER_NAME_TYPE'">
      <Card>
        <div class="card__title">{{ $t('registeredName') }}</div>
        <div class="card__text">{{ tx.payload.name  }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="card__text text_wrap_none">
          <nuxt-link
            class="text_link"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.registrantWallet }
              })
            "
            >{{ tx.payload.registrantWallet }}</nuxt-link
          >
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('registrationFee') }}</div>
        <div class="card__text">
          {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
        </div>
      </Card>
    </CardContainer>

    <!-- Name Transfer -->
    <CardContainer v-if="tx.txType === 'TRANSFER_NAME_TYPE'">
      <Card>
        <div class="card__title">{{ $t('transferedName') }}</div>
        <div class="card__text">{{ tx.payload.name  }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="card__text">
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
      </Card>
      <Card>
        <div class="card__title">{{ $t('recipient') }}</div>
        <div class="card__text text_wrap_none">
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
      </Card>
    </CardContainer>

    <!-- Name Deletion -->
    <CardContainer v-if="tx.txType === 'DELETE_NAME_TYPE'">
      <Card>
        <div class="card__title">{{ $t('deletedName') }}</div>
        <div class="card__text">{{ tx.payload.name  }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('registrant') }}</div>
        <div class="card__text text_wrap_none">
          <nuxt-link
            class="text_link"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.registrantWallet }
              })
            "
            >{{ tx.payload.registrantWallet }}</nuxt-link
          >
        </div>
      </Card>
    </CardContainer>

    <!-- Nanopay -->
    <CardContainer v-if="tx.txType === 'NANO_PAY_TYPE'">
      <Card>
        <div class="card__title">{{ $t('sender') }}</div>
        <div class="card__text text_wrap_none">
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
      </Card>
      <Card>
        <div class="card__title">{{ $t('recipient') }}</div>
        <div class="card__text text_wrap_none">
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
      </Card>
      <Card>
        <div class="card__title">{{ $t('txnExpiration') }}</div>
        <div class="card__text">
          {{ $t('block') }} #{{ tx.payload.txn_expiration }}
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('nanoPayExpiration') }}</div>
        <div class="card__text">
          {{ $t('block') }} #{{ tx.payload.nano_pay_expiration }}
        </div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('amount') }}</div>
        <div class="card__text">
          {{ tx.payload.amount | nknValue | commaNumber }} NKN
        </div>
      </Card>
    </CardContainer>

    <!-- Generate ID -->
    <CardContainer v-if="tx.txType === 'GENERATE_ID_TYPE'">
      <Card>
        <div class="card__title">{{ $t('publicKey') }}</div>
        <div class="card__text">{{ tx.payload.public_key }}</div>
      </Card>
      <Card>
        <div class="card__title">{{ $t('registrationFee') }}</div>
        <div class="card__text">
          {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
        </div>
      </Card>
      <Card>
          <div class="card__title">{{ $t('sender') }}</div>
          <div class="card__text">
          {{ tx.payload.sender}}
          </div>
      </Card>
      <Card>
          <div class="card__title">{{ $t('senderWallet') }}</div>
          <div class="card__text">
          {{ tx.payload.senderWallet  }}
          </div>
      </Card>
      <Card v-show="tx.payload.version ">
          <div class="card__title">{{ $t('version') }}</div>
          <div class="card__text">
          {{ tx.payload.version }}
          </div>
      </Card>
    </CardContainer>
  </div>
</template>

<style lang="scss">
@import './SingleTransactionPayload.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card/Card'
import CardContainer from '~/components/CardContainer/CardContainer'
import NodeTracing from '~/components/NodeTracing/NodeTracing'

export default {
  components: { Card, CardContainer, NodeTracing },
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
