import Vue from 'vue'
import TopNavigation from './TopNavigation.vue'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

Vue.config.productionTip = false
Vue.customElement('navigation-widget', TopNavigation)



