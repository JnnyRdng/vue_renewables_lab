<template>
  <div>
    <h1>Fuel Mix for UK by percentage</h1>
    <form v-on:submit.prevent="fetchData">
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
      fromTime: "2020-08-20T00:00",
      toTime: "2020-08-27T15:00",
      fuelMix: [],
    };
  },
  components: {
    "google-chart": GoogleChart,
  },
  methods: {
    fetchData: function () {
      // YYYY-MM-DDThh:mmZ e.g. 2017-08-25T12:35Z
      fetch(
        `https://api.carbonintensity.org.uk/generation/${this.fromTime}Z/${this.toTime}Z`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // loop through data.data
          // const biomass = data.data.reduce(
          //   (total, timePeriod) => total + timePeriod.generationmix[0].perc,
          //   0
          // );
          // console.log(biomass / data.data.length);
          let averageData = [];
          if (data.data.length > 0) {
            const mixes = data.data[0].generationmix;

            for (let i = 0; i < mixes.length; i++) {
              const fuel = data.data.reduce(
                (total, timePeriod) => total + timePeriod.generationmix[i].perc,
                0
              );
              const mix = {
                fuel: data.data[0].generationmix[i].fuel,
                perc: fuel / data.data.length,
              };
              averageData.push(mix);
            }
          }

          // console.log(data.data);
          // this.fromTime = data.data.from;
          // this.toTime = data.data.to;
          // this.fuelMix = data.data.generationmix;
          const fuelArray = [["Fuel", "Percentage"]];
          // data.data[0].generationmix.forEach((mix) => {
          averageData.forEach((mix) => {
            const newFuel = [mix.fuel, mix.perc];
            fuelArray.push(newFuel);
          });
          this.fuelMix = fuelArray;

          /*
          [
            ["Fuel", "Percentage"],
            ["hydro", "4"],
            ["gas", "20"],
            ["nuclear", 30],
            ["coal", 10]
          ]
          */
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>