<template>
  <div>
    <input
      class="input control city-search"
      type="text"
      placeholder="San Francisco"
      v-model="input"
      @keyup="updateFilteredCities"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("city", {
      filteredCities: (state) => state.filteredCities,
      cities: (state) => state.cities,
    }),
    input: {
      get() {
        return this.$store.state.city.input;
      },
      set(value) {
        this.$store.dispatch("city/updateCityInput", value);
      },
    },
  },

  methods: {
    updateFilteredCities() {
      if (this.input.length > 2) {
        this.$store.dispatch("city/updateCityInput", this.input);

        const newFilteredCities = _.filter(this.cities, (obj) => {
          const lowerCaseInput = _.lowerCase(this.input);
          const cityMatch = _.lowerCase(obj.city).includes(lowerCaseInput);
          const stateMatch = _.lowerCase(obj.state).includes(lowerCaseInput);
          return cityMatch || stateMatch;
        });

        this.$store.dispatch("city/updateFilteredCities", newFilteredCities);
      }
    },
  },
};
</script>
