<template>
  <!-- Main Vue instance -->
  <div id="app">
  
    <Navbar :show_mobile_menu="show_mobile_menu" 
            :show_modal="show_modal"
            @login="login"></Navbar>

    <!-- Main Container  -->
    <main>
      <!-- Heading and Search -->
      <div class="columns">
        <div class="column has-text-centered">

          <h2 class="bold">Search a City</h2>

          <!-- SEARCHBAR -->
          <div class="searchbar">
              <input class="input control city-search" type="text" 
                placeholder="City Name"
                v-model="input"
                @keyup="filterCities()">
              <!-- Search -->
              <a class="button is-primary control city-search--btn" 
                 @click="filterCities()">Search
              </a>
              <!-- Filter -->
              <a class="button is-success" @click="searchFilters = !searchFilters">
                <i class="fa fa-sliders" aria-hidden="true"></i>
              </a>

              <div class="results--filter columns" v-show="searchFilters">
                <div class="column">
                  <div class="filter-field">
                    <div class="control">
                        <p class="bold">Search by</p>
                        <label class="filter-label">
                          <input class="filter-label--checkbox" type="radio" name="city-state" /> 
                          City
                        </label>
                        <label class="filter-label">
                          <input class="filter-label--checkbox" type="radio" name="city-state" /> 
                          State
                        </label>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="filter-field">
                    <div class="control">
                      <p class="bold">City Population</p>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="checkbox" /> 
                        &lt; 50,000
                      </label>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="checkbox" /> 
                        &gt; 50,000 &amp; &lt; 100,000
                      </label>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="checkbox" /> 
                        &gt; 100,000 &amp; &lt; 500,000
                      </label>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="checkbox" /> 
                        &gt; 500,000 &amp; &lt; 1,000,000
                      </label>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="checkbox" /> 
                        &nbsp;&nbsp; 1,000,000+
                      </label>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="filter-field">
                    <div class="control">
                      <p class="bold">Rank</p>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
                        Ascending
                      </label>
                      <label class="filter-label">
                        <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
                        Descending
                      </label>
                    </div>
                  </div>
                </div>
              </div>

          </div><!-- end .searchbar -->
        </div>
      </div><!-- end Heading and Search -->
      
      <!-- City List -->
      <CityList :results="results" :city="city" 
                :input="input" @showMap="showMap">
      </CityList>

      <!-- Modal -->
      <Modal v-if="show_modal" 
              :city="city"
              :type="modal_type"
              @close_modal="closeModal">
      </Modal> 
      
     </main><!-- end Main Container  -->
   </div><!-- end Vue instance -->
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

// Components
import Navbar   from './components/Navbar'
import Modal    from './components/Modal.vue'
import CityList from './components/CityList'

export default {
  name: 'app',
  components: {
    Modal, 
    Navbar, 
    CityList
  },
  data() {
    return {
      input: '',
      city: '',
      cities: [],
      results: [],
      searchFilters: false,
      show_modal: false,
      show_mobile_menu: false,
      modal_type: ''
    }
  },
  methods: {
    getCities() {
      const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';  
      axios.get(url)
      .then(res => {
        this.cities = res.data;
      });
    },
    
    filterCities() {
      this.results = [];
      
      if ( this.input.length > 2 ) {
        clearTimeout(window.delay);
        window.delay = setTimeout(() => {
          this.results = _.filter(this.cities, obj => {
            return _.lowerCase(obj.city).includes(_.lowerCase(this.input));
          });
        }, 500);
      }
    },
    
    showMap(city) {
      this.city = city;
      this.modal_type = 'map';
      this.show_modal = true;
    },

    showRestaurants(city) {
      this.city = city;
      this.modal_type = 'restaurants';
      this.show_modal = true;
    },
    
    login() {
      this.modal_type = 'login';
      this.show_modal = true;
    },
    
    closeModal() {
      this.show_modal = false;
    }
  },
  
  created() {
    this.getCities();
  }
}
</script>

<style src="./assets/style.scss"></style>
</style>
