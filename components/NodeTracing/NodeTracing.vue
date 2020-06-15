<template>
  <div class="node-tracing" :class="spacing ? 'node-tracing_spacing' : null">
    <div v-if="showChain" class="node-tracing__full">
      <h3>{{ $t('relayedData') }}</h3>
      <Button type="button" theme="ghost" @click.native="toggleChain">
        <span v-if="fullChain">{{ $t('overview') }}</span>
        <span v-else>{{ $t('showChain') }}</span>
      </Button>
    </div>
    <div class="node-tracing__item node-tracing__item_type_send">
      <div class="node-tracing__header">
        <div class="node-tracing__title">
          <Client class="node-tracing__icon" />
          <span class="node-tracing__heading">{{ $t('client') }}</span>
        </div>
        <div class="node-tracing__label">{{ $t('sentData') }}</div>
      </div>
      <div class="node-tracing__pk">{{ tx.payload.sigchain.srcPubkey }}</div>
    </div>
    <div v-if="!fullChain" class="node-tracing__item node-tracing__item_type_relay">
      <div class="node-tracing__header">
        <div class="node-tracing__title">
          <Relay class="node-tracing__icon" />
          <span class="node-tracing__heading">{{ $t('relayNodes') }}</span>
        </div>
        <div class="node-tracing__label">{{ miners.length }} {{ $t('relayingData') }}</div>
      </div>
    </div>
    <template v-else>
      <div
        v-for="miner in miners"
        :key="miner.signature"
        class="node-tracing__item node-tracing__item_type_relay"
      >
        <div class="node-tracing__header">
          <div class="node-tracing__title">
            <Relay class="node-tracing__icon" />
            <div class="node-tracing__heading">
              {{ $t('node') }}
              <CountryFlag
                v-if="miner.country_code2 != null"
                class="node-tracing__flag"
                :country="miner.country_code2"
                size="normal"
              />
            </div>
          </div>

          <div class="node-tracing__labels">
            <div
              v-if="winner === miner.pubkey"
              class="node-tracing__label node-tracing__label_winner"
            >+{{ (reward / 100000000).toFixed(2) }} NKN</div>
            <div class="node-tracing__label">{{ $t('relayData') }}</div>
          </div>
        </div>
        <div class="node-tracing__addr">{{ $t('nodePublicKey') }}: {{ miner.pubkey }}</div>
        <div class="node-tracing__addr">
          {{ $t('nodeWalletAddress') }}:
          <nuxt-link
            class="node-tracing__addr text_link"
            :to="
              localePath({ name: 'addresses-id', params: { id: miner.wallet } })
            "
          >{{ miner.wallet }}</nuxt-link>
        </div>
      </div>
    </template>
    <div class="node-tracing__item node-tracing__item_type_recieve">
      <div class="node-tracing__header">
        <div class="node-tracing__title">
          <Client class="node-tracing__icon" />
          <span class="node-tracing__heading">{{ $t('client') }}</span>
        </div>
        <div class="node-tracing__label">{{ $t('recievedData') }}</div>
      </div>
      <div class="node-tracing__pk">{{ tx.payload.sigchain.destPubkey }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@import './NodeTracing.scss';
</style>

<script>
import CountryFlag from 'vue-country-flag'

import Client from '@/assets/icons/client.svg'
import Relay from '@/assets/icons/relay.svg'
import Button from '~/components/Button/Button'

export default {
  components: {
    Client,
    Relay,
    Button,
    CountryFlag
  },
  props: {
    tx: {
      type: Object,
      default: () => {}
    },
    spacing: {
      type: Boolean,
      default: false
    },
    showChain: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      miners: 0,
      fullChain: false,
      senderWallet: '',
      recieverWallet: '',
      winner: null,
      reward: null
    }
  },
  mounted () {
    this.getMiners()
    this.getWinner()
  },
  methods: {
    getMiners () {
      const { sigchain } = this.tx.payload
      const sigchainElemns = sigchain.sigchain_elems

      this.senderWallet = sigchain.srcPubkey
      this.recieverWallet = sigchain.destPubkey
      this.miners = sigchainElemns.filter(i => i.mining !== false)

      this.getGeo(sigchainElemns)
    },
    toggleChain () {
      this.fullChain = !this.fullChain
    },
    getWinner () {
      const nextBlock = this.tx.block_height + 1
      this.$axios.$get(`/blocks/${nextBlock}`).then((resp) => {
        this.winner = resp.header ? resp.header.signerPk : null
        this.reward = resp.header ? resp.header.reward : null
      })
    },
    getGeo (elems) {
      const pks = elems.map(i => i.pubkey).join(',')
      this.$axios
        .$post('https://api.nknx.org/nodes/geolocate', { pks })
        .then((resp) => {
          this.miners.forEach((i) => {
            const match = resp.filter(x => x.pk === i.pubkey)
            i.country_code2 = match.length ? match[0].country_code2 : null
          })
        })
    }
  }
}
</script>
