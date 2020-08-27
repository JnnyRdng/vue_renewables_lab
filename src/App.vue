<template>
  <div>
    <h1>Fuel Mix for UK by percentage</h1>
    <form v-on:submit.prevent="fetchTimePeriod">
      <input type="datetime-local" v-model="fromTime" />
      <input type="datetime-local" v-model="toTime" />
      <input type="submit" value="Find my Data" />
    </form>
    <google-chart :fuelMix="fuelMix" :fromTime="fromTime" :toTime="toTime"></google-chart>
  </div>
</template>

<script>
import GoogleChart from "./components/GoogleChart.vue";

export default {
  name: "App",
  data() {
    return {
      fromTime: "",
      toTime: "",
      fuelMix: [],
    };
  },
  components: {
    "google-chart": GoogleChart,
  },
  methods: {
    fetchData: function () {
      fetch("https://api.carbonintensity.org.uk/generation")
        .then((response) => response.json())
        .then((data) => {
          this.toTime = data.data.to.substr(0, data.data.to.length - 1);
          this.fromTime = data.data.from.substr(0, data.data.from.length - 1);
          this.fuelMix = this.convertToArrays(data.data.generationmix);
        });
    },
    fetchTimePeriod: function () {
      fetch(
        `https://api.carbonintensity.org.uk/generation/${this.fromTime}Z/${this.toTime}Z`
      )
        .then((response) => response.json())
        .then((data) => {
          const average = this.combineIntoAverage(data.data);
          this.fuelMix = this.convertToArrays(average);
        });
    },
    convertToArrays: function (data) {
      const fuelArray = [["Fuel", "Percentage"]];
      data.forEach((mix) => {
        const newFuel = [mix.fuel, mix.perc];
        fuelArray.push(newFuel);
      });
      return fuelArray;
    },
    combineIntoAverage: function (data) {
      let averageData = [];
      if (data.length > 0) {
        const mixes = data[0].generationmix;

        for (let i = 0; i < mixes.length; i++) {
          const fuel = data.reduce(
            (total, timePeriod) => total + timePeriod.generationmix[i].perc,
            0
          );
          const mix = {
            fuel: data[0].generationmix[i].fuel,
            perc: fuel / data.length,
          };
          averageData.push(mix);
        }
        return averageData;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
body {
  background-color: #hotpink;
}
</style>