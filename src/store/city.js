const state = () => ({
  input: "",
  filteredCities: [],
  cities: [],
  selectedCity: "",
});

const mutations = {
  UPDATE_CITY_INPUT(state, payload) {
    state.input = payload;
  },
  UPDATE_FILTERED_CITIES(state, payload) {
    state.filteredCities = payload;
  },
  UPDATE_CITIES(state, payload) {
    state.cities = payload;
  },
  UPDATE_SELECTED_CITY(state, payload = "") {
    state.selectedCity = payload;
  },
};

const actions = {
  updateCityInput({ commit }, payload = "") {
    commit("UPDATE_CITY_INPUT", payload);
  },
  updateFilteredCities({ commit }, payload) {
    commit("UPDATE_FILTERED_CITIES", payload);
  },
  updateCities({ commit }, payload) {
    commit("UPDATE_CITIES", payload);
  },
  updateSelectedCity({ commit }, payload = "") {
    commit("UPDATE_SELECTED_CITY", payload);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
