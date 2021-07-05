// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import store from "./store";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAUsRiPmw2fmYzfaK6G7W0xxcTzVJxj-kw",
  },
});

const bus = new Vue();

Object.defineProperty(Vue.prototype, "$bus", {
  get() {
    return this.$root.bus;
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  template: "<App></App>",
  components: { App },
  data: { bus },
  store,
  methods: {},
});
