import Vue from 'vue'
import TopNavigation from './TopNavigation.vue'
window.Vue = require('vue')

Vue.config.productionTip = false
Vue.use(TopNavigation)
new Vue({
  el: '#navigation-widget',
  components: { TopNavigation },
  template: '<TopNavigation />'
})
