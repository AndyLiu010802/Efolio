<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <main v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  const apikey = "e3e1440b3db98ff0853f8b80140ee6ce";
  
  export default {
    name: "WeatherApp",
    data() {
      return {
        city: "", 
        weatherData: null, 
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async searchByCity() {
        if (!this.city) {
          alert("Please enter a city name");
          return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      },

    
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },

      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data; 
        } catch (error) {
          console.error("Error fetching weather data:", error);
          alert("Could not retrieve weather data. Please try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 50px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    width: 200px;
  }
  
  .search-button {
    padding: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  
  main {
    margin-top: 20px;
  }
  
  img {
    width: 100px;
  }
  </style>
  