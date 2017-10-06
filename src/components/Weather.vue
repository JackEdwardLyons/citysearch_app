<template>
  <div class="weather is-centered ">
    <div v-show="type == 'weather'">
      Hello world
    </div>

    <div class="modal-card-body--load-wrap has-text-centered"
          v-if="!loaded && type == 'weather'" style="text-align: center; margin: 0 auto;">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </div>

  </div>
</template>

<script>
export default {
  props: [ 'type', 'city', 'cityLat', 'cityLng', 'loaded' ]
}
</script>

<style>
.border-10 {
  border-radius: 10%;
}
</style>
