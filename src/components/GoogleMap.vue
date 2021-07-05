<template>
  <div class="map">
    <iframe
      v-show="city"
      id="iframe"
      width="100%"
      height="400px"
      :src="mapUrl"
      frameborder="0"
    >
    </iframe>

    <div class="modal-card-body--load-wrap has-text-centered" v-if="isLoading">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      LOADING...
    </div>
  </div>
</template>

<script>
import envs from "../../build/envs";

export default {
  props: ["city"],
  data() {
    return {
      status: "idle",
    };
  },

  methods: {
    showMap() {
      this.status = "loading";
      const iframe = document.getElementById("iframe");
      const self = this;

      iframe.onload = function () {
        self.status = "success";
      };
    },
  },
  computed: {
    isLoading() {
      return this.status === "loading";
    },
    mapUrl() {
      return `https://www.google.com/maps/embed/v1/place?q=${this.city},United+States&key=${envs.GOOGLE_PLACES_TOKEN}`;
    },
  },
  mounted() {
    this.showMap();
  },
};
</script>
