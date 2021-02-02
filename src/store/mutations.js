import {ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED_CART, SET_CHECKED_CART} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED_CART](state, payload) {
    payload.checked = !payload.checked
  },
  [SET_CHECKED_CART](state, payload) {
    payload.cart.checked = payload.checked;
  },
}
