import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import clipboard from 'clipboard'
import storage from './utils/storage'

Vue.config.productionTip = false
Vue.prototype.clipboard = clipboard;
Vue.prototype.storage = storage;

new Vue({
  render: h => h(App),
}).$mount('#app')
