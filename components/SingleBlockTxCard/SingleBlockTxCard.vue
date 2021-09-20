<template>
  <Card>
    <div class="single-block-tx-card__header" @click="toggle()">
      <TransactionTypeTitle :type="tx.txType" />
      <span
        class="single-block-tx-card__toggle fe fe-chevron-down"
        :class="isOpen ? 'single-block-tx-card__toggle_active' : null"
      />
    </div>
    <nuxt-link
      v-if="!isOpen"
      class="card__link text_size_xs text_wrap_none"
      :to="localePath({ name: 'transactions-id', params: { id: tx.hash } })"
    >
      <span class="text_color_default">{{ $t('hash') }}:</span>
      {{ tx.hash }}
    </nuxt-link>
    <div
      class="single-block-tx-card__body"
      :class="isOpen ? 'single-block-tx-card__body_open' : null"
    >
      <!-- Mining Reward -->
      <template v-if="tx.txType === 'COINBASE_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('miner') }}</div>
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
          <div class="card__text card__subitem">
            + {{ tx.payload.amount | nknValue | commaNumber }} NKN
          </div>
        </div>
      </template>

      <!-- Transfer -->
      <template v-if="tx.txType === 'TRANSFER_ASSET_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('from') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({
                name: 'addresses-id',
                params: { id: tx.payload.senderWallet }
              })
            "
            >{{ tx.payload.senderWallet }}</nuxt-link
          >
        </div>
        <div class="card__item">
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
        </div>
        <div class="card__item">
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
        </div>
      </template>

      <!-- Sigchain -->
      <template v-if="tx.txType === 'SIG_CHAIN_TXN_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('dataSize') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.sigchain.dataSize }} {{ $t('bytes') }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('dataHash') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.sigchain.dataHash }}
          </div>
        </div>
        <div class="card__item">
          <NodeTracing :tx="tx" />
        </div>
      </template>

      <!-- Subscription -->
      <template v-if="tx.txType === 'SUBSCRIBE_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('subscriber') }}</div>
          <div class="card__text text_size_md">{{ tx.payload.subscriber }}</div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('identifier') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.identifier  }}
          </div>
        </div>

        <div class="card__item">
          <div class="card__title">{{ $t('topic') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.topic  }}
          </div>
        </div>

        <div class="card__item">
          <div class="card__title">{{ $t('bucket') }}</div>
          <div class="card__text text_size_md">{{ tx.payload.bucket }}</div>
        </div>

        <div class="card__item">
          <div class="card__title">{{ $t('duration') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.duration }} {{ $t('blocks') }}
          </div>
        </div>

        <div v-if="tx.payload.meta.length > 0" class="card__item">
          <div class="card__title">{{ $t('meta') }}</div>
          <div class="card__text text_size_md">{{ tx.payload.meta }}</div>
        </div>
      </template>

      <!-- Unsubscription -->
      <template v-if="tx.txType === 'UNSUBSCRIBE_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('subscriber') }}</div>
          <div class="card__text text_size_md">{{ tx.payload.subscriber }}</div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('identifier') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.identifier  }}
          </div>
        </div>

        <div class="card__item">
          <div class="card__title">{{ $t('topic') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.topic  }}
          </div>
        </div>
      </template>

      <!-- Name Registration -->
      <template v-if="tx.txType === 'REGISTER_NAME_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('registeredName') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.name  }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('registrant') }}</div>
          <div class="card__text text_size_md">
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
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('registrationFee') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
          </div>
        </div>
      </template>

      <!-- Name Transfer -->
      <template v-if="tx.txType === 'TRANSFER_NAME_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('transferedName') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.name  }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('registrant') }}</div>
          <div class="card__text text_size_md">
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
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('recipient') }}</div>
          <div class="card__text text_size_md">
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
        </div>
      </template>

      <!-- Name Deletion -->
      <template v-if="tx.txType === 'DELETE_NAME_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('deletedName') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.name  }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('registrant') }}</div>
          <div class="card__text text_size_md">
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
        </div>
      </template>

      <!-- Nanopay -->
      <template v-if="tx.txType === 'NANO_PAY_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('sender') }}</div>
          <div class="card__text text_size_md">
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
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('recipient') }}</div>
          <div class="card__text text_size_md">
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
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('txnExpiration') }}</div>
          <div class="card__text text_size_md">
            {{ $t('block') }} #{{ tx.payload.txn_expiration }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('nanoPayExpiration') }}</div>
          <div class="card__text text_size_md">
            {{ $t('block') }} #{{ tx.payload.nano_pay_expiration }}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('amount') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.amount | nknValue | commaNumber }} NKN
          </div>
        </div>
      </template>

      <!-- Generate ID -->
      <template v-if="tx.txType === 'GENERATE_ID_TYPE' && tx.payload">
        <div class="card__item">
          <div class="card__title">{{ $t('hash') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'transactions-id', params: { id: tx.hash } })
            "
            >{{ tx.hash }}</nuxt-link
          >
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('block') }}</div>
          <nuxt-link
            class="card__link text_size_md"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
        <div class="card__divider"></div>
        <div class="card__item">
          <div class="card__title">{{ $t('publicKey') }}</div>
          <div class="card__text text_size_md">{{ tx.payload.public_key }}</div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('registrationFee') }}</div>
          <div class="card__text text_size_md">
            {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('sender') }}</div>
          <div class="card__text text_size_md">
          {{ tx.payload.sender}}
          </div>
        </div>
        <div class="card__item">
          <div class="card__title">{{ $t('senderWallet') }}</div>
          <div class="card__text text_size_md">
          {{ tx.payload.senderWallet  }}
          </div>
        </div>
        <div v-show="tx.payload.version" class="card__item">
          <div class="card__title">{{ $t('version') }}</div>
          <div class="card__text text_size_md">
          {{ tx.payload.version }}
          </div>
        </div>
      </template>
    </div>
  </Card>
</template>

<style lang="scss">
@import './SingleBlockTxCard.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card/Card'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'
import NodeTracing from '~/components/NodeTracing/NodeTracing'

export default {
  components: { Card, TransactionTypeTitle, NodeTracing },
  props: {
    tx: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => {
    return {
      isOpen: false
    }
  },
  computed: mapGetters({
    currentPrice: 'price/getCurrentPrice'
  }),
  mounted () {
  },
  methods: {
    toggle () {
      if (this.tx.payload === null) {
        this.gettx.payload()
      }
      this.isOpen = !this.isOpen
    }
  }
}
</script>
