<template>
  <div class="desktop-block">
    <table class="table">
      <thead class="table__head">
        <tr class="table__head-row">
          <th class="table__title text_align_left">{{$t('height')}}</th>
          <th class="table__title text_align_left">{{$t('created')}}</th>
          <th class="table__title text_align_left">{{$t('rewardedAddress')}}</th>
          <th class="table__title text_align_right">{{$t('transactions')}}</th>
          <th class="table__title text_align_right">{{$t('size')}}</th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="block in blocks" :key="block.id" class="table__row">
          <td class="table__item">
            <nuxt-link
              class="text_link text_weight_bold"
              :to="localePath({ name: 'blocks-id', params: { id: block.hash } })"
            >
              <Block class="table__icon"/>
              {{block.header.height | commaNumber}}
            </nuxt-link>
          </td>
          <td class="table__item">{{ $moment(block.header.created_at +"Z").fromNow() }}</td>
          <td class="table__item">
            <nuxt-link
              v-if="block.header.benificiaryWallet"
              class="text_link text_wrap_none"
              :to="localePath({ name: 'addresses-id', params: { id: block.header.benificiaryWallet } })"
            >{{block.header.benificiaryWallet}}</nuxt-link>
            <nuxt-link
              v-else
              class="text_link text_wrap_none"
              :to="localePath({ name: 'addresses-id', params: { id: block.header.wallet } })"
            >{{block.header.wallet}}</nuxt-link>
          </td>
          <td class="table__item text_align_right">{{block.transactions_count}}</td>
          <td class="table__item text_align_right">{{block.size}} {{$t('bytes')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import './DesktopBlocks';
</style>

<script>
import Block from '@/assets/icons/block.svg'

export default {
  components: { Block },
  props: {
    blocks: {
      type: Array,
      default () {
        return []
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
