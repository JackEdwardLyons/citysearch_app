<template>
  <div class="cafes is-centered ">
    <div v-show="type == 'cafes'">
      <ul v-for="(cafe, key) in cafes">
        <li class="m-1">
          <article class="columns">
            <figure class="column">
                <img class="img-responsive--fitted" :src="cafe.image_url">
            </figure>
            <div class="media-content column">
              <div class="content">
                  <h3 class="m-t-0">
                    <a :href="cafe.url" target="_blank">
                      <strong>{{ key + 1 }}. {{ cafe.name }}</strong><br>
                      <small>
                        {{ cafe.location["address1"] }}, {{ cafe.location.city }}, {{ cafe.location.zip_code }}
                      </small>
                    </a>
                  </h3>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th><strong>Reviews</strong></th>
                        <td>{{ cafe.review_count }}</td>
                      </tr>
                      <tr>
                        <th><strong>Rating</strong></th>
                        <td>{{ cafe.rating }} / 5</td>
                      </tr>
                      <tr>
                        <th><strong>Price</strong></th>
                        <td>{{ cafe.price }}</td>
                      </tr>
                      <tr>
                        <th><strong>Open Now</strong></th>
                        <td>{{ cafe.isClosed === false ? "NO" : "YES" }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </article>
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
  props: [ 'type', 'city', 'cafes', 'loaded' ]
}
</script>

<style>
.border-10 {
  border-radius: 10%;
}
</style>
