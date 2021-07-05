<template>
  <header class="modal-card-head">
    <p class="modal-card-title" v-if="modalType == 'map'">
      View {{ city }} On Map
    </p>
    <p class="modal-card-title" v-if="modalType == 'login'">
      About My Roadtrip App
    </p>
    <p class="modal-card-title" v-if="modalType == 'cafes'">
      View the Top 10 Cafes in {{ city }}
    </p>
    <p class="modal-card-title" v-if="modalType == 'city-todos'">
      View the Top Recreation Areas in {{ city }}
    </p>
    <p class="modal-card-title" v-if="modalType == 'weather'">
      View the weather in {{ city }}
    </p>
    <button class="delete" @click="$store.dispatch('modal/hideModal')" />
  </header>
</template>

<script>
export default {
  props: {
    modalType: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
