const state = () => ({
  modalType: "",
  showModal: false,
});

const getters = {};

const actions = {
  showModal({ commit }, payload) {
    commit("SHOW_MODAL", payload);
  },
  hideModal({ commit }) {
    commit("HIDE_MODAL");
  },
};

const mutations = {
  SHOW_MODAL(state, modalType) {
    state.modalType = modalType;
    state.showModal = true;
  },
  HIDE_MODAL(state) {
    state.showModal = false;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
