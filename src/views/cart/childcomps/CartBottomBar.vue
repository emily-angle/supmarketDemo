<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :value="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{totalCount}})</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CheckButton from './CheckButton'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['cartList', 'cartListChecked']),
      totalPrice() {
        //所有选中的商品
        let price = this.cartListChecked.reduce((preVal, nowVal) => {
          return preVal + nowVal.count * nowVal.price
        }, 0).toFixed(2)
        return price;
      }, isSelectAll() {
        return this.cartList.length === this.cartListChecked.length;
      },
      totalCount() {
        return this.cartListChecked.reduce((preVal, nowVal) => {
          return preVal + nowVal.count
        }, 0)
      }
    },
    methods: {
      checkBtnClick() {
        this.$store.dispatch('changeCheckedAllCart', !this.isSelectAll)
      }
    }

  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
