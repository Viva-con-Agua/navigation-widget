import Vue from 'vue'
import TopNavigation from './TopNavigation.vue'

Vue.config.productionTip = false
Vue.use(TopNavigation)
new Vue({
  el: '#app',
  components: { TopNavigation },
  template: '<TopNavigation />'
})
