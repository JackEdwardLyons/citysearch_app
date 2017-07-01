<template>
  <div class="cafes">
    <div v-show="type == 'cafes'">
      <ul v-for="(cafe, key) in cafes">
        <li>
          <article class="media box">
            <figure class="media-left is-half">
                <img class="img-responsive" :src="cafe.image_url">
            </figure>
            <div class="media-content ">
              <div class="content">
                  <p>
                    <a :href="cafe.url" target="_blank">
                      <strong>{{ cafe.name }}</strong> 
                      <small>
                        {{ cafe.location["address1"] }}, {{ cafe.location.city }}, {{ cafe.location.zip_code }}
                      </small>
                    </a>
                  </p>
                  <p><strong>Rating:</strong> {{ cafe.rating }}</p>
                  <p><strong>Reviews:</strong> {{ cafe.review_count }}</p>
                  <p><strong>Price:</strong> {{ cafe.price }}</p>
                  <p><strong>Open Now:</strong> {{ cafe.isClosed === false ? "NO" : "YES" }}</p>
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
