<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </div>
</template>

<script>

  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components: {CartListItem},
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
    },mounted(){

    },
    activated() {
      console.log(this.cartList)
    }
  }
</script>

<style scoped>

</style>
