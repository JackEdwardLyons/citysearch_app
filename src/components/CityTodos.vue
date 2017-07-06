<template>
  <div class="city-todos">
    <!-- Google Map with Markers -->
    <gmap-map :center="center" :zoom="15" style="width: 100%; height: 500px">
      <gmap-info-window :options="infoOptions" 
                        :position="infoWindowPos" 
                        :opened="infoWinOpen" 
                        :content="infoContent" 
                        @closeclick="infoWinOpen=false">
      </gmap-info-window>
      <gmap-marker :key="i" v-for="(m,i) in markers" 
                              :position="m.position" 
                              :clickable="true" 
                              @click="toggleInfoWindow(m,i)">
      </gmap-marker>
    </gmap-map>

    
    <div v-show="type == 'city-todos'">
      <ul>
        <li v-for="(todo, inx) in cityTodos" style="text-align: left;">
          <strong>{{ inx + 1 }}: </strong>{{ todo.geometry.location }}</li>
      </ul>
    </div> 

    <div class="modal-card-body--load-wrap has-text-centered"
          v-if="!loaded && type == 'city-todos'" style="text-align: center; margin: 0 auto;">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </div>

  </div>
</template>

<script>
export default {
  props: [ 'type', 'city', 'cityTodos', 'loaded', 'cityLat', 'cityLng' ],
  data() {
    return {
      center: {
        lat: Number(this.cityLat),
        lng: Number(this.cityLng)
      },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: this.cityTodos.map(item => {
        return {
          position: {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng
          },
          infoText: item.name
        }
      })
    }
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;

      }
    }
  }
}
</script>

<style>
.border-10 {
  border-radius: 10%;
}
.vue-map {
  overflow: visible !important;
}
.city-todos {
  width: 100%;
}
</style>
