<template>
  <section>
    <article class="results" v-for="obj in cityItems">
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
      </div> 

      <div class="columns">
        <div class="column">
          <h4>Top 10 Things to do in {{ obj.city }}</h4>
          <img class="city--icon " src="../assets/Wallet.png">
        </div>

        <div class="column">
          <h4>Top 10 Restaurants in {{ obj.city }}</h4>
          <img class="city--icon " src="../assets/bowl-food-icon.png">
        </div>

        <div class="column">
          <h4>Top 10 Cafes in {{ obj.city }}</h4>
          <a @click="showCafes(obj.city)">
            <img class="city--icon " src="../assets/beer.png">
          </a>
        </div>

        <div class="column">
          <h4>Find {{ obj.city }} on a map</h4>
          <a @click="showMap(obj.city)">
              <img class="city--icon " src="../assets/map-512.png">
          </a>
        </div>
      </div>
    </article>
    
    <div id="results-bottom" class="is-centered">
      <a class="button is-primary" @click="addResults" v-show="showMore()">SHOW MORE</a>
    </div>

  </section>
</template>
<script> 
import axios from 'axios';

export default {
	props: [ 'results', 'input', 'city', 'cityItems' ],
  data() {
    return {}
  },
	methods: {
		showMap(city) {
			this.$emit('showMap', city);
		},
    addResults() {
      this.$emit('addResults');
    },
		showCafes(city = this.city) {
			// this.modal_type = 'restaurants';
			// this.show_modal = true;
      if (city.length) {
        // ajax get request with vue-resource
        axios.get(`/cafes/${city}`).then(res => {
          this.cafes = res.data.jsonBody.businesses;
          console.log("cafe data: ", this.cafes);
        }).catch(e => {
          console.log(e, "error");
        });
      }
		},
    showMore() {
      return this.cityItems.length < this.results.length && this.cityItems.length;
    }
  },
  filters: {
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
    }
  }
}
</script>