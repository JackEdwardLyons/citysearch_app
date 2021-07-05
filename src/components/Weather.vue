<template>
  <div class="weather is-centered">
    <div v-if="weatherData.length > 0">
      <div class="todays-weather">
        <div class="weather-display">
          <div class="weather-display__temp">
            <WeatherIcon :icon="weatherData.currently.summary" />
            {{ Math.floor(weatherData.currently.temperature) }}°F
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
                <td>{{ Math.floor(weatherData.currently.windSpeed) }} mph</td>
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
        </div>
        <!-- end .weather-overview -->
      </div>
      <!-- end .todays-weather -->
    </div>

    <div
      class="modal-card-body--load-wrap has-text-centered"
      v-if="isLoading"
      style="text-align: center; margin: 0 auto"
    >
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      LOADING...
    </div>
  </div>
</template>

<script>
import WeatherIcon from "./WeatherIcon";
import WeatherService from "../services/WeatherService";
import LocationService from "../services/LocationService";

export default {
  components: {
    WeatherIcon,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      weatherData: [],
      status: "idle",
      cityCoOrds: "",
    };
  },
  computed: {
    isLoading() {
      return this.status === "loading";
    },
  },
  methods: {
    async showWeather() {
      this.status = "loading";

      try {
        const { lat, lng } = await LocationService.getCoordinates(this.city);
        const weatherData = await WeatherService.getWeather(`${lat},${lng}`);
        this.weatherData = weatherData;
        this.status = "success";
      } catch (error) {
        console.log({ error });
        this.status = "failure";
      }
    },
  },
  async mounted() {
    await this.showWeather();
  },
  filters: {
    percentage(value, decimals) {
      if (!value) value = 0;
      if (!decimals) decimals = 0;

      value = value * 100;
      return (
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) +
        "%"
      );
    },
  },
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
