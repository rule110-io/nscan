<template>
  <div class="desktop-filter">
    <div
      class="desktop-filter__toggle"
      :class="[open ? 'desktop-filter__toggle_active' : null, activeFilter ? `desktop-filter__toggle_type_${activeFilter.title}` : null]"
      @click="toggleFilter()"
    >
      <FilterIcon class="desktop-filter__icon"/>
    </div>

    <div class="desktop-filter__wrapper filter__wrapper">
      <ul class="desktop-filter__list filter__list" :class="open ? 'filter__list_open' : null">
        <li
          v-for="filter in filters"
          :key="filter.title"
          class="filter__item"
          :class="activeFilter ? `filter__item_type_${activeFilter.title}` : null"
          @click="setFilter(filter),toggleFilter()"
        >
          <TransactionTypeTitle :type="filter.value"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import './DesktopTransactionFilter.scss';
</style>

<script>
import FilterIcon from '@/assets/icons/filter.svg'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: { FilterIcon, TransactionTypeTitle },
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
