<template>
  <div :class="`text_wrap_none card__tx card__tx_type_${className}`">
    {{ $t(title) }}
  </div>
</template>

<style lang="scss">
@import './TransactionTypeTitle.scss';
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      title: '',
      className: ''
    }
  },
  mounted () {
    const type = this.type

    switch (type) {
      case 'all':
        this.title = 'allTransactions'
        this.className = 'all'
        break
      case 'COINBASE_TYPE':
        this.title = 'miningReward'
        this.className = 'reward'
        break
      case 'TRANSFER_ASSET_TYPE':
        this.title = 'transfer'
        this.className = 'transfer'
        break
      case 'SIG_CHAIN_TXN_TYPE':
        this.title = 'signatureChain'
        this.className = 'sigchain'
        break
      case 'SUBSCRIBE_TYPE':
        this.title = 'subscription'
        this.className = 'subscription'
        break
      case 'UNSUBSCRIBE_TYPE':
        this.title = 'unsubscription'
        this.className = 'unsubscription'
        break
      case 'REGISTER_NAME_TYPE':
        this.title = 'walletNameRegistration'
        this.className = 'wallet-name-registration'
        break
      case 'TRANSFER_NAME_TYPE':
        this.title = 'walletNameTransfer'
        this.className = 'wallet-name-transfer'
        break
      case 'DELETE_NAME_TYPE':
        this.title = 'walletNameDeletion'
        this.className = 'wallet-name-deletion'
        break
      case 'NANO_PAY_TYPE':
        this.title = 'nanopay'
        this.className = 'nanopay'
        break
      case 'GENERATE_ID_TYPE':
        this.title = 'generateId'
        this.className = 'generate-id'
        break
      default:
        return false
    }
  },
  methods: {}
}
</script>
