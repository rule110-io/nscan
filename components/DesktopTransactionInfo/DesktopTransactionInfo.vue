<template>
  <div>
    <h2 class="desktop-heading">{{ $t('generalInfo') }}</h2>
    <DesktopCardContainer>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('blockHeight') }}</div>
        <div class="desktop-card__item">
          <nuxt-link
            class="text_link"
            :to="
              localePath({ name: 'blocks-id', params: { id: tx.block_height } })
            "
            >{{ tx.block_height | commaNumber }}</nuxt-link
          >
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('type') }}</div>
        <div class="desktop-card__item">
          <TransactionTypeTitle :type="tx.txType" />
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('fee') }}</div>
        <div class="desktop-card__item">
          {{ tx.fee | nknValue | commaNumber }} NKN
        </div>
      </DesktopCard>
      <DesktopCard width="quarter">
        <div class="card__title">{{ $t('nonce') }}</div>
        <div class="desktop-card__item">{{ tx.nonce }}</div>
      </DesktopCard>
      <DesktopCard>
        <div class="card__title">{{ $t('hash') }}</div>
        <div class="desktop-card__item">{{ tx.hash }}</div>
      </DesktopCard>
      <DesktopCard v-if="tx.attributes">
        <div class="card__title">{{ $t('attributes') }}</div>
        <div class="desktop-card__item">{{ tx.attributes }}</div>
      </DesktopCard>
    </DesktopCardContainer>
  </div>
</template>

<style lang="scss">
@import './DesktopTransactionInfo.scss';
</style>

<script>
import DesktopCard from '~/components/DesktopCard/DesktopCard'
import DesktopCardContainer from '~/components/DesktopCardContainer/DesktopCardContainer'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: { DesktopCard, DesktopCardContainer, TransactionTypeTitle },
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
  mounted () {},
  methods: {}
}
</script>
