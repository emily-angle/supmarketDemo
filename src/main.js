import {createApp} from "vue"
import App from './App.vue'
import router from './router'
import store from './store'


var Emitter = require('tiny-emitter');
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'development') {
//   mockXHR()
// }

const app = createApp(App);
app.use(store).use(router).mount('#app')
//事件总线
app.config.globalProperties.$emitter=new Emitter();

