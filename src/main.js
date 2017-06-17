// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue           from 'vue'
import axios         from 'axios'
import scrollMonitor from 'scrollMonitor'
import App           from './App'

Vue.config.productionTip = false
const bus = new Vue();

Object.defineProperty(Vue.prototype, '$bus', {
  get() { return this.$root.bus }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App },
  data: { bus },
  methods: {},
  mounted() {
    // const elem  = document.getElementById('results-bottom');
    // let watcher = scrollMonitor.create(elem);
    // // watcher.enterViewport();
  }
});



