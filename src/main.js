import Vue from 'vue'
import TopNavigation from './TopNavigation.vue'
window.Vue = Vue

Vue.config.productionTip = false
Vue.use(TopNavigation)
new Vue({
  el: '#app',
  components: { TopNavigation },
  template: '<TopNavigation />'
})
