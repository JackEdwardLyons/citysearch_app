import axios from "axios";

export default {
  async getWeather(coords) {
    if (!coords) return "Please enter coordinates";

    return axios
      .get(`/weather/${coords}`)
      .then((res) => {
        console.log({ res });
        return res.data;
      })
      .catch((error) => error);
  },
};
