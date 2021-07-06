const state = () => ({
  input: "",
  filteredCities: [],
  cities: [],
  selectedCity: "",
  maxCitiesToShow: 3,
  page: 0,
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
  UPDATE_PAGINATION_PAGE(state, payload = 0) {
    state.page = payload;
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
  updatePaginationPage({ commit }, payload = 0) {
    commit("UPDATE_PAGINATION_PAGE", payload);
  },
};

const getters = {
  moreCitiesThanLimit(state) {
    const limit =
      state.filteredCities.length > state.maxCitiesToShow + state.page;
    return limit;
  },

  filteredCitiesWithLimit(state, getters) {
    if (getters.moreCitiesThanLimit) {
      const { page, maxCitiesToShow, filteredCities } = state;
      const newAmount = maxCitiesToShow + page;

      return filteredCities.slice(0, newAmount);
    }

    return state.filteredCities;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
