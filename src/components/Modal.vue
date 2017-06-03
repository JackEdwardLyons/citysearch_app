<template>
  <!-- Modal Template -->
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card" :class="{small: type == 'login'}">
  
      <header class="modal-card-head">
        <p class="modal-card-title"
            v-if="type == 'map'">View {{ city }} On Map</p>
        <p class="modal-card-title"
            v-if="type == 'login'">Login</p>
        <p class="modal-card-title"
            v-if="type == 'restaurants'">View Top Restaurants in {{ city }}</p>
        <button class="delete" @click="closeModal"></button>
      </header>
      
      <section class="modal-card-body">
        <!-- Map -->  
        <div class="map">
          <GoogleMap :city="city" :mapUrl="mapUrl"
                     :type="type" :loaded="loaded">
          </GoogleMap>
        </div>
        <!-- end Map -->

        <!-- Login -->
        <div class="columns" v-if="type == 'login'">          
          <Login></Login>         
        </div><!-- End Login -->
      </section>

      <footer class="modal-card-foot" v-if="type == 'login'">
        <a class="button is-success" @click="login">Login</a>
        <a class="button" @click="closeModal">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
import Login     from './Login'
import GoogleMap from './GoogleMap'

export default {
  props: ['city', 'type'],
  components: { Login, GoogleMap },
  data() {
    return {
      loaded: false,
      mapUrl: '',
      cafes: [],
      thingsToDo: [],
      restaurants: [],
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    getRestaurants() {
      // Some Nodejs magic needs to be done here...
      const reformattedCityName = this.city.replace(' ', '-').toLowerCase();
      const baseUrl = `https://api.yelp.com/v3/businesses/search?rating=5&location=${reformattedCityName}`;
    },

    getBestBars() {
      const barUrl = '';
    },

    getTop10() {
      
    },

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
    
    login() {
      // handle auth
      console.log(this.user);
    },
    
    closeModal() {
      this.$emit('close_modal');
    }
  },
  mounted() {
    this.showMap();
  }
}
</script>

<style>

</style>