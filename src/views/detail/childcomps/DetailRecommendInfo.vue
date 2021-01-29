<template>
  <div>
    <good-list :goods="recommendList"></good-list>
  </div>
</template>

<script>
  import GoodList from "components/content/goods/GoodsList";

  export default {
    name: "DetailRecommendInfo",
    components:{GoodList},
    props: {
      recommendList: {
        type: Array
      }
    }

  }
</script>

<style scoped>

</style>
