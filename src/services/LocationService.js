import axios from "axios";
import envs from "../../build/envs";

export default {
  async getCoordinates(city = "") {
    if (!city) return "Please enter a city";
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode`;

    return axios
      .get(`${baseUrl}/json?address=${city}&key=${envs.GOOGLE_PLACES_TOKEN}`)
      .then((res) => {
        if (res.data.results) {
          const { lat, lng } = res.data.results[0].geometry.location;
          console.log({ lat, lng });
          return {
            lat,
            lng,
          };
        }
      })
      .catch((error) => error);
  },

  async getPlaces(coords) {
    if (!coords) return "Please enter coordinates";

    return axios
      .get(`/places/${coords}`)
      .then((res) => res.data.results)
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};
