<template>
  <section v-if="filteredCities.length">
    <p class="is-centered">{{ filteredCities.length }} results</p>
    <article
      class="results"
      v-for="obj in filteredCitiesWithLimit"
      :key="obj.rank"
    >
      <div class="columns">
        <div class="column">
          <div class="city--stats">
            <p><strong>City: </strong> {{ obj.city }}</p>
            <p><strong>State: </strong> {{ obj.state }}</p>
          </div>
        </div>

        <div class="column">
          <div class="city--stats">
            <p><strong>Rank: </strong> {{ obj.rank }}</p>
            <p>
              <strong>Population: </strong>
              {{ obj.population | formattedNumber }}
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <h4>Check the weather in {{ obj.city }}</h4>
          <a @click="showModal(obj.city, 'weather')">
            <img class="city--icon" src="../assets/weather-circle-icon.png" />
          </a>
        </div>

        <div class="column">
          <h4>Top Recreation Areas in {{ obj.city }}</h4>
          <a @click="showModal(obj.city, 'city-todos')">
            <img class="city--icon" src="../assets/bowl-food-icon.png" />
          </a>
        </div>

        <div class="column">
          <h4>Top 10 Cafes in {{ obj.city }}</h4>
          <a @click="showModal(obj.city, 'cafes')">
            <img class="city--icon" src="../assets/beer.png" />
          </a>
        </div>

        <div class="column">
          <h4>Find {{ obj.city }} on Google Maps</h4>
          <a @click="showModal(obj.city, 'map')">
            <img class="city--icon" src="../assets/map-512.png" />
          </a>
        </div>
      </div>
    </article>
    <!-- end cities -->

    <div id="results-bottom" class="p-2 is-centered">
      <a
        class="button is-primary"
        @click="addResults"
        v-show="moreCitiesThanLimit"
        v-text="'SHOW MORE'"
      />
    </div>
  </section>

  <section v-else-if="!filteredCities.length && input.length > 3">
    <article class="results">
      <h3 class="is-centered">
        Sorry there are no US cities that match
        <span class="error-input" v-text="input" />
      </h3>
    </article>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("city", {
      input: (state) => state.input,
      filteredCities: (state) => state.filteredCities,
      cities: (state) => state.cities,
      page: (state) => state.page,
      maxCitiesToShow: (state) => state.maxCitiesToShow,
    }),
    ...mapGetters("city", ["filteredCitiesWithLimit", "moreCitiesThanLimit"]),
  },
  methods: {
    async showModal(city, type) {
      await this.$store.dispatch("city/updateSelectedCity", city);
      await this.$store.dispatch("modal/showModal", type);
    },
    addResults() {
      this.$store.dispatch(
        "city/updatePaginationPage",
        this.page + this.maxCitiesToShow
      );
    },
  },
  filters: {
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    },
  },
};
</script>
