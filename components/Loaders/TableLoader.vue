<template>
  <div style="padding-top: 1px;">
    <ContentLoader
      v-for="i in count"
      :key="i"
      class="card_width_full"
      style="margin-top: 8px"
      primary-color="#fff"
      secondary-color="#BDBDBD"
      :speed="1"
      :height="62"
      :width="1200"
    >
      <rect x="67" y="31" rx="3" ry="3" width="85" height="6"/>
      <rect x="0" y="80" rx="3" ry="3" width="350" height="6"/>
      <rect x="0" y="100" rx="3" ry="3" width="380" height="6"/>
      <rect x="0" y="120" rx="3" ry="3" width="201" height="6"/>
      <circle cx="30.2" cy="32.2" r="25.2"/>
      <rect x="177" y="31" rx="3" ry="3" width="85" height="6"/>
      <rect x="288" y="31" rx="3" ry="3" width="528.7" height="6"/>
      <rect x="866" y="31" rx="3" ry="3" width="85" height="6"/>
      <rect x="1039" y="31" rx="3" ry="3" width="85" height="6"/>
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { ContentLoader },
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
