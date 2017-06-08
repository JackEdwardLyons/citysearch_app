<template>
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
              <p><strong>Population: </strong> {{ obj.population | formattedNumber }} </p>
            </div>
          </div>
        </div> <!-- end City stats -->

        <div class="columns">
          <!-- Things to do -->
          <div class="column">
            <h4>Top 10 Things to do in {{ obj.city }}</h4>
            <img class="city--icon " src="../assets/Wallet.png">
          </div>

          <div class="column">
            <h4>Top 10 Restaurants in {{ obj.city }}</h4>
            <img class="city--icon " src="../assets/bowl-food-icon.png">
          </div>

          <div class="column">
            <h4>Top 10 Bars in {{ obj.city }}</h4>
            <a @click="showRestaurants(obj.city)">
              <img class="city--icon " src="../assets/beer.png">
            </a>
          </div>

          <div class="column">
            <h4>Find {{ obj.city }} on a map</h4>
            <a @click="showMap(obj.city)">
                <img class="city--icon " src="../assets/map-512.png">
            </a>
          </div>
        </div><!-- end Things to do -->
      </article>
    </section>
</template>
<script> 

export default {
	props: [ 'results', 'input', 'city' ],
	methods: {
		showMap(city) {
			this.$emit('showMap', city);
		},

		showRestaurants(city) {
			this.city = city;
			this.modal_type = 'restaurants';
			this.show_modal = true;
		}
  },
  filters: {
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
    }
  }
}
</script>