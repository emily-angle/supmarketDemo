import {createApp} from "vue"
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast/Toast.vue'
import FastClick from 'fastclick'
import VueLazyloadNext from 'vue-lazyload-next'


var Emitter = require('tiny-emitter');
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'development') {
//   mockXHR()
// }
/*减少点击延迟*/
FastClick.attach(document.body);
const app = createApp(App);
app.use(store).component('Toast',Toast).use(VueLazyloadNext,{
loading:require('assets/img/common/placeholder.png')
}).use(router).mount('#app')
//事件总线
app.config.globalProperties.$emitter=new Emitter();


