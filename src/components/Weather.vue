<template>
  <div class="weather is-centered ">
    
    <div v-show="type == 'weather' && loaded">
      
      <div class="todays-weather">
        <div class="weather-display">
          <div class="weather-display__temp">
            <WeatherIcon :icon="weatherData.currently.summary"></WeatherIcon>
            {{ Math.floor( weatherData.currently.temperature ) }}°F
          </div>
        </div>
    
        <div class="weather-overview">
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <td><strong>Summary:</strong></td>
                <td>{{ weatherData.currently.summary }}</td>
              </tr>
              <tr>
                <td><strong>Wind Speed:</strong></td>
                <td>{{ Math.floor( weatherData.currently.windSpeed ) }} mph</td>
              </tr>
              <tr>
                <td><strong>Humidity:</strong></td>
                <td>{{ weatherData.currently.humidity | percentage }}</td>
              </tr>
              <tr>
                <td><strong>Cloud cover:</strong></td>
                <td>{{ weatherData.currently.cloudCover | percentage }}</td>
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
  data() {
    return {
      weatherData: []
    }
  },
  methods: {
    updateWeather() {
      this.weatherData = this.cityWeather;
    }
  },
  created() {
    this.updateWeather();
  },
  watch: {
    cityWeather: function() {
      this.weatherData = this.cityWeather;
    }
  },
  filters: {
    percentage(value, decimals) {
      if (!value) value = 0;
      if (!decimals) decimals = 0;

      value = value * 100;
      return (
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + "%"
      );
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
  border-radius: 8px;
}
.weather-display {
  font-size: 3em;
  border: 1px solid black;
  margin-right: 1em;
  padding: 1em;
  border-radius: 8px;
}
</style>
