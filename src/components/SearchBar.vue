<template>
  <div>
    <input class="input control city-search" type="text" 
           placeholder="City Name"
           v-model="input"
           @keyup="filteredCities">

    <a class="button is-primary control city-search--btn" @click="addResults">Search</a>
    <a class="button is-success" @click="searchFilterClicked">
      <i class="fa fa-sliders" aria-hidden="true"></i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    filteredCities() {
      if ( this.input.length > 2 ) {
        // add payload to the custom event
        this.$emit('filteredCities', this.input)
      }
    },
    searchFilterClicked() {
      this.$emit('searchFilterClicked');
    },
    addResults() {
      this.$emit('addResults');
    }
  }
}
</script>