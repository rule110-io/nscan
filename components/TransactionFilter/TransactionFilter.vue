<template>
  <Card>
    <div class="filter">
      <div class="filter__title">{{$t('filterBy')}}</div>
      <div class="filter__wrapper">
        <div
          class="filter__button"
          :class="open ? 'filter__button_active' : null"
          @click="toggleFilter()"
        >
          {{$t(activeFilter.title)}}
          <span
            class="filter__icon fe fe-chevron-down"
            :class="open ? 'filter__icon_open' : null"
          />
        </div>

        <ul class="filter__list" :class="open ? 'filter__list_open' : null">
          <li
            v-for="filter in filters"
            :key="filter.title"
            class="filter__item"
            @click="setFilter(filter),toggleFilter()"
          >
            <TransactionTypeTitle :type="filter.value"/>
          </li>
        </ul>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './TransactionFilter.scss';
</style>

<script>
import Card from '~/components/Card/Card'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: { Card, TransactionTypeTitle },
  props: {
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    activeFilter: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => {
    return {
      open: false
    }
  },
  mounted () {},
  methods: {
    toggleFilter () {
      this.open = !this.open
    },
    setFilter (filter) {
      this.$emit('update', filter)
    }
  }
}
</script>
