<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card" :class="modalType == 'city-todos' && 'large-modal'">
      <!-- Modal Header 
      *********************-->
      <ModalHeader :modalType="modalType" :city="city" />

      <!-- Modal Types 
      *********************-->
      <section class="modal-card-body">
        <!-- Map -->
        <div class="map" v-if="modalType == 'map'">
          <GoogleMap :city="city" />
        </div>
        <!-- end Map -->

        <!-- Login -->
        <div class="columns" v-if="modalType == 'login'">
          <Login />
        </div>
        <!-- End Login -->

        <!-- Cafes -->
        <div class="columns" v-if="modalType == 'cafes'">
          <Cafes :city="city" />
        </div>
        <!-- end Cafes -->

        <!-- Things to do -->
        <div class="columns" v-if="modalType == 'city-todos'">
          <CityTodos :city="city" />
        </div>
        <!-- end Cafes -->

        <!-- Weather -->
        <div class="columns" v-if="modalType == 'weather'">
          <Weather :city="city" />
        </div>
        <!-- end Cafes -->
      </section>
      <!-- end Modal Types -->
    </div>
    <!-- end Modal Card -->
  </div>
  <!-- end active Modal -->
</template>

<script>
import Login from "../Login";
import GoogleMap from "../GoogleMap";
import Cafes from "../Cafes";
import CityTodos from "../CityTodos";
import Weather from "../Weather";
import ModalHeader from "./ModalHeader.vue";
import { mapState } from "vuex";

export default {
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  components: {
    Login,
    GoogleMap,
    Cafes,
    CityTodos,
    Weather,
    ModalHeader,
  },
  computed: {
    ...mapState("modal", {
      modalType: (state) => state.modalType,
    }),
  },

  methods: {
    closeModal() {
      this.$store.dispatch("modal/hideModal");
    },
  },
};
</script>

<style>
.large-modal {
  width: 90% !important;
}
</style>
