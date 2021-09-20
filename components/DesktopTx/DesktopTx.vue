<template>
  <Fragment>
    <tr class="table__row desktop-tx" @click="toggle()">
      <td class="table__item">
        <TransactionTypeTitle :type="tx.txType" />
      </td>
      <td class="table__item">{{ $moment(tx.created_at + 'Z').fromNow() }}</td>
      <td class="table__item">
        <nuxt-link
          class="card__link text_wrap_none"
          :to="localePath({ name: 'transactions-id', params: { id: tx.hash } })"
          >{{ tx.hash }}</nuxt-link
        >
      </td>
      <td class="table__item">
        <span
          class="fe fe-chevron-down desktop-tx__toggle"
          :class="isOpen ? 'desktop-tx__toggle_active' : null"
        />
      </td>
    </tr>
    <tr
      class="table__row desktop-tx__body"
      :class="isOpen && tx.payload ? 'desktop-tx__body_open' : null"
    >
      <td colspan="4" class="desktop-tx__wrapper">
        <!-- Mining Reward -->
        <template v-if="tx.txType === 'COINBASE_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_right">
              <h4>+ {{ tx.payload.amount | nknValue | commaNumber }} NKN</h4>
            </div>
            <div class="desktop-tx__item text_align_center">
              <ArrowRight class="desktop-tx__icon" />
            </div>
            <div class="desktop-tx__item text_align_left">
              <nuxt-link
                class="text_link text_size_md"
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

        <!-- Transfer -->
        <template v-if="tx.txType === 'TRANSFER_ASSET_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('from') }}</div>
              <nuxt-link
                class="text_link text_size_md"
                :to="
                  localePath({
                    name: 'addresses-id',
                    params: { id: tx.payload.senderWallet }
                  })
                "
                >{{ tx.payload.senderWallet }}</nuxt-link
              >
            </div>
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">
                <ArrowRight class="desktop-tx__icon" />
              </div>
              <h4>+ {{ tx.payload.amount | nknValue | commaNumber }} NKN</h4>
              <div class="desktop-tx__price">
                ${{
                  (
                    this.$options.filters.nknValue(tx.payload.amount) *
                    currentPrice
                  ).toFixed(2) | commaNumber
                }}
              </div>
            </div>
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('to_send') }}</div>
              <nuxt-link
                class="text_link text_size_md"
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

        <!-- Sigchain -->
        <template v-if="tx.txType === 'SIG_CHAIN_TXN_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <NodeTracing
              class="desktop-tx__sigchain"
              :tx="tx"
              :show-chain="true"
            />
          </div>
        </template>

        <!-- Subscription -->
        <template v-if="tx.txType === 'SUBSCRIBE_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('identifier') }}</div>
              <div>{{ tx.payload.identifier  }}</div>
            </div>
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('topic') }}</div>
              <div>{{ tx.payload.topic  }}</div>
            </div>
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('bucket') }}</div>
              <div>{{ tx.payload.bucket }}</div>
            </div>
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('duration') }}</div>
              <div>{{ tx.payload.duration }} {{ $t('blocks') }}</div>
            </div>
            <div class="desktop-tx__item text_align_right">
              <div class="desktop-tx__title">{{ $t('subscriber') }}</div>
              <div>{{ tx.payload.subscriber }}</div>
            </div>
          </div>
        </template>

        <!-- Unsubscription -->
        <template v-if="tx.txType === 'UNSUBSCRIBE_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('identifier') }}</div>
              <div>{{ tx.payload.identifier  }}</div>
            </div>
            <div class="desktop-tx__item text_align_left">
              <div class="desktop-tx__title">{{ $t('topic') }}</div>
              <div>{{ tx.payload.topic  }}</div>
            </div>
            <div class="desktop-tx__item text_align_right">
              <div class="desktop-tx__title">{{ $t('subscriber') }}</div>
              <div>{{ tx.payload.subscriber }}</div>
            </div>
          </div>
        </template>

        <!-- Name Registration -->
        <template v-if="tx.txType === 'REGISTER_NAME_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('registrant') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('registeredName') }}</div>
              {{ tx.payload.name  }}
            </div>
          </div>
        </template>

        <!-- Name Transfer -->
        <template v-if="tx.txType === 'TRANSFER_NAME_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('registrant') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('recipient') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('transferedName') }}</div>
              {{ tx.payload.name  }}
            </div>
          </div>
        </template>

        <!-- Name Deletion -->
        <template v-if="tx.txType === 'DELETE_NAME_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('registrant') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('deletedName') }}</div>
              {{ tx.payload.name  }}
            </div>
          </div>
        </template>

        <!-- Nanopay -->
        <template v-if="tx.txType === 'NANO_PAY_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('sender') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('recipient') }}</div>
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
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('amount') }}</div>
              {{ tx.payload.amount | nknValue | commaNumber }} NKN
            </div>
          </div>
        </template>

        <!-- Generate ID -->
        <template v-if="tx.txType === 'GENERATE_ID_TYPE' && tx.payload">
          <div class="desktop-tx__content">
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('senderWallet') }}</div>
                {{ tx.payload.senderWallet}}
            </div>
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('registrationFee') }}</div>
              {{ tx.payload.registration_fee | nknValue | commaNumber }} NKN
            </div>
            <div class="desktop-tx__item text_align_center">
              <div class="desktop-tx__title">{{ $t('publicKey') }}</div>
              {{ tx.payload.public_key }}
            </div>
          </div>
        </template>
      </td>
    </tr>
  </Fragment>
</template>

<style lang="scss">
@import './DesktopTx.scss';
</style>

<script>
import { Fragment } from 'vue-fragment'
import { mapGetters } from 'vuex'
import ArrowRight from '@/assets/icons/arrow-right.svg'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'
import NodeTracing from '~/components/NodeTracing/NodeTracing'

export default {
  components: { TransactionTypeTitle, Fragment, ArrowRight, NodeTracing },
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
  mounted () {},
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
