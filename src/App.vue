<template>
  <div id="app">
  <!-- Main Vue instance -->
    <!-- Navigation  -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
          </a>
          <a class="nav-item is-tab is-hidden-mobile">Features</a>
          <a class="nav-item is-tab is-hidden-mobile">Pricing</a>
          <a class="nav-item is-tab is-hidden-mobile">About</a>
        </div>
        <span class="nav-toggle" @click="show_mobile_menu = !show_mobile_menu"
          :class="{'is-active': show_mobile_menu}">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu"
             :class="{'is-active': show_mobile_menu}">
          <a class="nav-item is-tab" @click="login()">Log In</a>
        </div>
      </div>
    </nav>
    <!-- End Navigtion -->

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
      
      <!-- Displayed Cities -->
      <section>
        <article class="results" v-for="obj in results">
            <!-- City stats -->
            <div class="columns" >
              <div class="column">
                <div class="city--stats">
                  <p><strong>City: </strong> {{ obj.city }} </p>
                  <p><strong>State: </strong> {{ obj.state }} </p>
                </div>
              </div>

              <div class="column">
                <div class="city--stats">
                  <p><strong>Rank: </strong> {{ obj.rank }} </p>
                  <p><strong>Population: </strong> {{ formattedNumber( obj.population ) }} </p>
                </div>
              </div>
            </div> <!-- end City stats -->

            <div class="columns">
              <!-- Things to do -->
              <div class="column">
                <h4>Top 10 Things to do in {{ obj.city }}</h4>
                <img class="city--icon " src="./assets/Wallet.png">
              </div>

              <div class="column">
                <h4>Top 10 Restaurants in {{ obj.city }}</h4>
                <img class="city--icon " src="./assets/bowl-food-icon.png">
              </div>

              <div class="column">
                <h4>Top 10 Bars in {{ obj.city }}</h4>
                <a @click="showRestaurants(obj.city)">
                  <img class="city--icon " src="./assets/beer.png">
                </a>
              </div>

              <div class="column">
                <h4>Find {{ obj.city }} on a map</h4>
                <a @click="showMap(obj.city)">
                   <img class="city--icon " src="./assets/map-512.png">
                </a>
              </div>
            </div><!-- end Things to do -->
          </article>
        </section><!-- end Displayed Cities -->
      
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
import Modal from './components/Modal.vue'

export default {
  name: 'app',
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
  components: {
    Modal
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
    },
    
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
    }
  },
  
  created() {
    this.getCities();
  }
}
</script>

<style src="./assets/style.scss"></style>
</style>
