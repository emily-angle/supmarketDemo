<template>
  <div id="cart">
    <cart-nav-bar :cart-count="cartLength"/>
    <scroll class="content">
      <cart-list :cart-list="cartList"></cart-list>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartNavBar from "./childcomps/CartNavBar";
  import CartList from "./childcomps/CartList";
  import CartBottomBar from "./childcomps/CartBottomBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {Scroll, CartNavBar, CartList,CartBottomBar},
    computed: {
      ...mapGetters([
        'cartLength', 'cartList'
      ])
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .content {
    height: calc(100% - 137px);
  }
</style>
