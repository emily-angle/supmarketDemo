import {ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED_CART,SET_CHECKED_CART} from './mutation-types'

export default {
  addCart({state, commit}, payload) {
    return new Promise((resolve) => {
      let hasProduct = state.cartList.find(item => item.iid === payload.iid)
      if (!hasProduct) {
        commit(ADD_TO_CART, payload)
      } else {
        commit(ADD_COUNTER, hasProduct)
      }
      resolve('添加购物车成功')
    })
  },
  changeCheckedCart({state, commit}, payload) {
    let product = state.cartList.find(item => item.iid === payload.iid)
    commit(CHANGE_CHECKED_CART, product)
  },
  changeCheckedAllCart({state, commit}, payload) {
    state.cartList.forEach(item => {
      commit(SET_CHECKED_CART, {cart:item,checked:payload})
    })
  }
}
