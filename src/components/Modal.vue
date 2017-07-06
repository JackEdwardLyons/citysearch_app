<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card" :class="type == 'city-todos' && 'large-modal'">
  
      <!-- Modal Header 
      *********************-->
      <header class="modal-card-head">
        <p class="modal-card-title"
            v-if="type == 'map'">View {{ city }} On Map</p>
        <p class="modal-card-title"
            v-if="type == 'login'">Login</p>
        <p class="modal-card-title"
            v-if="type == 'cafes'">View the Top 10 Cafes in {{ city }}</p>
        <p class="modal-card-title"
            v-if="type == 'city-todos'">View the Top Places of Interest in {{ city }}</p>
        <button class="delete" @click="closeModal"></button>
      </header>

      <!-- Modal Types 
      *********************-->
      <section class="modal-card-body">
      
        <!-- Map -->  
        <div class="map" v-if="type == 'map'">
          <GoogleMap :city="city" :mapUrl="mapUrl"
                     :type="type" :loaded="loaded">
          </GoogleMap>
        </div><!-- end Map -->

        <!-- Login -->
        <div class="columns" v-if="type == 'login'">          
          <Login></Login>         
        </div><!-- End Login -->

        <!-- Cafes -->
        <div class="columns" v-if="type == 'cafes'">
          <Cafes :city="city" 
                 :type="type" 
                 :cafes="cafes" 
                 :loaded="loaded">
          </Cafes>
        </div><!-- end Cafes -->

         <!-- Things to do -->
        <div class="columns" v-if="type == 'city-todos'">
          <CityTodos :city="city" 
                 :type="type" 
                 :cityTodos="cityTodos" 
                 :loaded="loaded"
                 :cityLat="cityLat"
                 :cityLng="cityLng">
          </CityTodos>
        </div><!-- end Cafes -->

      </section><!-- end Modal Types -->

      <!-- Modal Footer 
      *********************-->
      <footer class="modal-card-foot" v-if="type == 'login'">
        <a class="button is-success" @click="login">Login</a>
        <a class="button" @click="closeModal">Cancel</a>
      </footer>
    </div><!-- end Modal Card -->
  </div><!-- end active Modal -->
</template>

<script>
// components
import Login       from './Login'
import GoogleMap   from './GoogleMap'
import Cafes       from './Cafes'
import CityTodos   from './CityTodos'

// utils
import axios        from 'axios'
import GooglePlaces from 'node-googleplaces'

export default {
  props: [ 'city', 'type' ],
  components: { 
    Login, 
    GoogleMap,
    Cafes,
    CityTodos
  },
  data() {
    return {
      loaded: false,
      mapUrl: '',
      cafes: [],
      cityTodos: [],
      cityCoOrds: '',
      cityLat: '',
      cityLng: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showMap() {
      const iframe = document.getElementById('iframe'),
            url = `https://www.google.com/maps/embed/v1/place?q=${this.city},United+States&key=AIzaSyBh0g0ArtnfdANIyo-xH8v61n2bxrhMdME`,
            // .onload will only work with es5 as of right now, so we need this
            self = this;
    
      this.mapUrl = url;
      iframe.onload = function() {
        self.loaded = true;
      }
    },
    showCafes(city = this.city) {
      if (city.length) {
        axios.get(`/cafes/${city}`).then(res => {
          this.cafes = res.data.jsonBody
            .businesses
            .sort((a, b) => {
              return b.rating - a.rating; // return highest ranking cafes
            })
            .slice(0, 10);
          this.loaded = true;
        }).catch(e => {
          console.log(e);
        });
      }
		},
    showCityTodos(city = this.city) {
      if (city.length) {

        const KEY = `AIzaSyAUsRiPmw2fmYzfaK6G7W0xxcTzVJxj-kw`;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${KEY}`)
          .then(res => {
            const lat = res.data.results[0].geometry.location.lat,
                  lng = res.data.results[0].geometry.location.lng;
            this.cityLat = lat;
            this.cityLng = lng;
            this.cityCoOrds = `${lat},${lng}`;
            this.loaded = true;
          })
          .then(res => axios.get(`/places/${this.cityCoOrds}`)
          .then(res => {
            console.log(res.data.results);
            this.cityTodos = res.data.results;
          })
          .catch(e => console.log(e)) 
        )
      }
    },
    login() {
      // handle auth
      console.log(this.user);
    },
    closeModal() {
      this.loaded = false;
      this.$emit('close_modal');
    }
  },
  mounted() {
    switch (this.type) {
      case 'map':
        this.showMap();
        break;
      case 'cafes': 
        this.showCafes();
        break;
      case 'city-todos':
        this.showCityTodos();
        break;
      default:
        console.log('hello');
        break;
    }
  }
}
</script>

<style>
.large-modal {
  width: 90% !important;
}
</style>
