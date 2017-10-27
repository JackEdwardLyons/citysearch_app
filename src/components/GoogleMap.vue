<template>
  <div class="map">
    <iframe id="iframe"
            width="100%"
            height="400px"
            :src="mapUrl"
            frameborder="0"               
            v-show="loaded && type == 'map'">
    </iframe>

    <div class="modal-card-body--load-wrap has-text-centered"
          v-if="!loaded && type == 'map'">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      LOADING...
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'type', 'city', 'mapUrl', 'loaded' ]
}
</script>
