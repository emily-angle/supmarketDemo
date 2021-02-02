<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartCount}})</template>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "CartNavBar",
    components: {NavBar},
    props: {
      cartCount: {
        type: Number,
        default() {
          return 0
        }
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
