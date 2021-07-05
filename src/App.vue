<template>
  <!-- Main Vue instance -->
  <div id="app">
    <!-- Navigation
      ***************-->
    <Navbar />

    <!-- Main Container
      *********************-->
    <main>
      <div class="columns">
        <div class="column has-text-centered">
          <div class="search-wrapper">
            <h2 class="bold">Search the USA</h2>
            <div class="searchbar">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <!-- City List Component
      *************************-->
      <CityList />

      <!-- Modal Component
      **********************-->
      <Modal
        v-if="showModal"
        :city="selectedCity"
        :type="modalType"
        @close_modal="closeModal"
      >
      </Modal>
    </main>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import ResultsFilter from "./components/ResultsFilter";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal.vue";
import CityList from "./components/CityList";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Modal,
    Navbar,
    CityList,
    ResultsFilter,
    SearchBar,
  },
  data() {
    return {
      cafes: [],
      restaurants: [],
    };
  },
  computed: {
    ...mapState("city", {
      input: (state) => state.input,
      filteredCities: (state) => state.filteredCities,
      cities: (state) => state.cities,
      selectedCity: (state) => state.selectedCity,
    }),
    ...mapState("modal", {
      showModal: (state) => state.showModal,
      modalType: (state) => state.modalType,
    }),
  },
  methods: {
    closeModal() {
      this.$store.dispatch("modal/hideModal");
    },

    getCities() {
      const url =
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
      axios.get(url).then((res) => {
        this.$store.dispatch("city/updateCities", res.data);
      });
    },
  },
  created() {
    this.getCities();
  },
};
</script>

<style src="./assets/style.scss"></style>
