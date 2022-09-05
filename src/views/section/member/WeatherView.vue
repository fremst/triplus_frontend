<template>
  <div id="app">
    <h3>도시명 : {{ city }}</h3>
    <h3>날짜 : {{ today }}</h3>
    <h3>날씨 : {{ weather }}, 기온 {{ temperature }}도</h3>
    <Button label="뒤로가기" @click="$router.back()" />
  </div>
</template>

<script>
//import { defaultOptions } from "@/constant/axios.js";
import axios from "axios";

export default {
  data() {
    return {
      country: "",
      city: "",
      weather: "",
      today: "",
      temperature: ""
    };
  },
  computed: {
    hasResult: function () {
      return this.posts.length > 0;
    }
  },
  mounted() {
    this.searchWeather();
    this.getToday();
  },
  methods: {
    getToday() {
      this.day = new Date();
      this.today = this.day.getFullYear() + "/" + (this.day.getMonth() + 1) + "/" + this.day.getDate();
    },
    searchWeather() {
      const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${
        process.env.VUE_APP_WEATHER_API_KEY || ""
      }`;

      axios.get(`${BASE_URL}`).then(result => {
        this.country = result.data.sys.country;
        this.city = result.data.name;
        this.weather = result.data.weather[0].main;
        this.temperature = Math.ceil(result.data.main.temp - 273.15);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
