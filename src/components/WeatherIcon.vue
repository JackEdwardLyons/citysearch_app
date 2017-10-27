<template>
  <div>
    <WeatherIconClearDay          v-if="icon === 'clear-day'"></WeatherIconClearDay>
    <WeatherIconClearNight        v-if="icon === 'clear-night'"></WeatherIconClearNight>
    <WeatherIconCloudy            v-if="icon === 'cloudy'"></WeatherIconCloudy>
    <WeatherIconPartlyCloudyDay   v-if="icon === 'partly-cloudy-day'"></WeatherIconPartlyCloudyDay>
    <WeatherIconPartlyCloudyNight v-if="icon === 'partly-cloudy-night'"></WeatherIconPartlyCloudyNight>
    <WeatherIconRain              v-if="icon === 'rain'"></WeatherIconRain>
    <WeatherIconSleet             v-if="icon === 'sleet'"></WeatherIconSleet>
    <WeatherIconSnow              v-if="icon === 'snow'"></WeatherIconSnow>
    <WeatherIconWind              v-if="icon === 'wind'"></WeatherIconWind>
  </div>
</template>

<script>
import WeatherIconClearDay          from "../assets/weather-icons/clear_day.svg";
import WeatherIconClearNight        from "../assets/weather-icons/clear_night.svg";
import WeatherIconCloudy            from "../assets/weather-icons/cloudy.svg";
import WeatherIconPartlyCloudyDay   from "../assets/weather-icons/partly_cloudy_day.svg";
import WeatherIconPartlyCloudyNight from "../assets/weather-icons/partly_cloudy_night.svg";
import WeatherIconRain              from "../assets/weather-icons/rain.svg";
import WeatherIconSleet             from "../assets/weather-icons/sleet.svg";
import WeatherIconSnow              from "../assets/weather-icons/snow.svg";
import WeatherIconWind              from "../assets/weather-icons/wind.svg";

export default {
  name: "weatherIcon",
  props: ["icon"],
  components: {
    WeatherIconClearDay,
    WeatherIconClearNight,
    WeatherIconCloudy,
    WeatherIconPartlyCloudyDay,
    WeatherIconPartlyCloudyNight,
    WeatherIconRain,
    WeatherIconSleet,
    WeatherIconSnow,
    WeatherIconWind
  }
};
</script>
