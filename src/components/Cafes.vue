<template>
  <div class="cafes">
  
    <div v-show="type == 'cafes' ">
      <ul v-for="(cafe, key) in cafes">
        <li>
          <p>{{ cafe }}</p>
          <p>{{ cafe.name }}</p>
          <p>{{ cafe.location["address1"] }}, {{ cafe.location.city }}, {{ cafe.location.zip_code }}</p>
          <img width="200" :src="cafe.image_url" >
          <p>Rating: {{ cafe.rating }}</p>
          <p>Reviews: {{ cafe.review_count }}</p>
          <p>Price: {{ cafe.price }}</p>
          <p>Open Now: {{ cafe.isClosed === false ? "NO" : "YES" }}</p>
          <p><a :href="cafe.url" target="_blank">Link</a></p>
          <div class="categories">
            <h4>Cafe Type</h4>
            <ul v-for="category in cafe.categories">
              <li>{{ category.alias }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <div class="modal-card-body--load-wrap has-text-centered"
          v-if="!loaded && type == 'cafes'" style="text-align: center; margin: 0 auto;">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </div>

  </div>
</template>

<script>


export default {
  props: [ 'type', 'city', 'cafes', 'loaded' ],
  computed: {
    titles: function() {
      var titles = [];
      for (var i = 0; i < this.cafes.length; i++) {
        for (var k = 0; k < this.cafes[i].length; k++) {
          titles.push(this.cafes[i][k].categories);
        }
      }
      return titles;
    }
  }
}
</script>
