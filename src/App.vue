<template>
  <!-- Main Vue instance -->
  <div id="app">
  
    <Navbar :show_mobile_menu="show_mobile_menu" 
            :show_modal="show_modal"
            @login="login">
    </Navbar>

    <main>
      <div class="columns">
        <div class="column has-text-centered">
          <h2 class="bold">Search a City</h2>
          <div class="searchbar">
              <SearchBar @addResults="addResults" 
                         @searchFilterClicked="searchFilterClicked" 
                         @filteredCities="filteredCities">
              </SearchBar>
              <ResultsFilter :searchFilters="showSearchFilter"></ResultsFilter>
          </div>
        </div>
      </div>
      
      <CityList @addResults="addResults" 
                      :results="results" 
                      @showModal="showModal" 
                      :cityItems="cityItems">
      </CityList>

      <Modal v-if="show_modal" 
              :city="city"
              :type="modal_type"
              @close_modal="closeModal">
      </Modal> 

    </main>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

// Components
import Navbar        from './components/Navbar'
import ResultsFilter from './components/ResultsFilter'
import SearchBar     from './components/SearchBar'
import Modal         from './components/Modal.vue'
import CityList      from './components/CityList'

export default {
  name: 'app',
  components: {
    Modal, 
    Navbar, 
    CityList,
    ResultsFilter,
    SearchBar
  },
  data() {
    return {
      input: '',
      city:  '',
      cities:    [],
      results:   [],
      cafes:     [],
      cityItems: [],
      showSearchFilter: false,
      show_modal: false,
      show_mobile_menu: false,
      modal_type: ''
    }
  },
  methods: {
    filteredCities(input) {
      this.results = [];
      this.input   = input;

      if ( this.input.length > 2 ) {
        this.results = _.filter(this.cities, obj => {
          return _.lowerCase(obj.city).includes(_.lowerCase(this.input));
        })
      }
    },
    addResults() {
      this.cityItems = this.results;
      
      if (this.cityItems.length < this.results.length) {
        // append additional results 5 at a time
        const append   = this.results.slice(this.cityItems.length, this.cityItems.length + 5);
        this.cityItems = this.cityItems.concat(append);

        return this.cityItems;
      }
    },
    showModal(city, modal) {
      this.city = city;
      this.modal_type = modal;
      this.show_modal = true;
    },
    showCafes(city) {
      this.city = city;
      this.modal_type = 'cafes';
      this.show_modal = true;
    },
    login() {
      this.modal_type = 'login';
      this.show_modal = true;
    },
    closeModal() {
      this.show_modal = false;
    },
    searchFilterClicked() {
      this.showSearchFilter = !this.showSearchFilter;
    },
    getCities() {
      const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';  
      axios.get(url)
      .then(res => {
        this.cities = res.data;
      });
    }
  },
  created() {
    this.getCities();
  }
}
</script>

<style src="./assets/style.scss"></style>

