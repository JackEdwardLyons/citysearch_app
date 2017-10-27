<template>
  <div class="weather is-centered ">
    <div v-show="type == 'weather' && loaded">

      <div class="todays-weather">

        <div class="weather-display">
          <div class="weather-display__temp">
            <WeatherIcon :icon="cityWeather.currently.summary"></WeatherIcon>
            {{ Math.floor( cityWeather.currently.temperature ) }}°F
          </div>
        </div>

    
        <div class="weather-overview">
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <td><strong>Summary:</strong></td>
                <td>{{ cityWeather.currently.summary }}</td>
              </tr>
              <tr>
                <td><strong>Wind Speed:</strong></td>
                <td>{{ cityWeather.currently.windSpeed }}</td>
              </tr>
              <tr>
                <td><strong>Humidity:</strong></td>
                <td>{{ cityWeather.currently.humidity | percentage }}</td>
              </tr>
              <tr>
                <td><strong>Cloud cover:</strong></td>
                <td>{{ cityWeather.currently.cloudCover | percentage }}</td>
              </tr>
            </tbody>
          </table>
        </div><!-- end .weather-overview -->
      </div><!-- end .todays-weather -->

    </div>

    <div class="modal-card-body--load-wrap has-text-centered"
          v-if="!loaded && type == 'weather'" style="text-align: center; margin: 0 auto;">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      LOADING...
    </div>

  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon';

export default {
  props: ["type", "city", "loaded", "cityWeather"],
  components: {
    WeatherIcon
  },
  filters: {
    percentage(value, decimals) {
      if (!value) value = 0;
      if (!decimals) decimals = 0;

      value = value * 100;
      return (
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + "%"
      );
    },

    // weather icons not coming through....
    watch: {
      cityWeather: function() {
        this.cityWeather = this.cityWeather;
      }
    }
  }
};
</script>

<style>
.border-10 {
  border-radius: 10%;
}
.todays-weather {
  border: 1px solid #e5e5e5;
  width: 100%;
  padding: 20px;
  margin: 1em auto;
  display: flex;
}
.weather-display {
  font-size: 3em;
  border: 1px solid black;
  margin-right: 1em;
  padding: 1em;
}
</style>
