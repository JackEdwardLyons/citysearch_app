<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card" :class="{small: type == 'login'}">
  
      <!-- Modal Header 
      *********************-->
      <header class="modal-card-head">
        <p class="modal-card-title"
            v-if="type == 'map'">View {{ city }} On Map</p>
        <p class="modal-card-title"
            v-if="type == 'login'">Login</p>
        <p class="modal-card-title"
            v-if="type == 'cafes'">View Top Cafes in {{ city }}</p>
        <button class="delete" @click="closeModal"></button>
      </header>
      

      <!-- Modal Types 
      *********************-->
      <section class="modal-card-body">
        
        <!-- Map -->  
        <div class="map">
          <GoogleMap :city="city" :mapUrl="mapUrl"
                     :type="type" :loaded="loaded">
          </GoogleMap>
        </div><!-- end Map -->

        <!-- Login -->
        <div class="columns" v-if="type == 'login'">          
          <Login></Login>         
        </div><!-- End Login -->


        <!-- Cafes -->
        <div class="columns" v-id="type='cafes'">
          <h1>Cafes go here</h1>
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
import Login     from './Login'
import GoogleMap from './GoogleMap'

export default {
  props: ['city', 'type'],
  components: { 
    Login, 
    GoogleMap 
  },
  data() {
    return {
      loaded: false,
      mapUrl: '',
      cafes: [],
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
