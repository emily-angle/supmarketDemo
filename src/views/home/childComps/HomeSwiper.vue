<template>
  <swiper>
    <swiper-item v-for="item in bannners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "HomeSwiper",
    props: {
      bannners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.isLoad = true
          this.$emit('swiperImgLoad')
        }
      }
    }
  }
</script>

<style scoped>

</style>
