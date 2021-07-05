import Vue from "vue";
import Vuex from "vuex";
import modal from "./modal";
import city from "./city";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    modal,
    city,
  },
});

export default store;
