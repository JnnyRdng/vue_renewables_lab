import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'
import App from './App.vue'
Vue.use(VueGoogleCharts);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
