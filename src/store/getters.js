export const getters = {
  cartLength: state => state.cartList.length,
  cartList: state => state.cartList,
  cartListChecked: state => {
    return state.cartList.filter(item => {
      return item.checked===true
    })
  }
}
