<template>
  <div>
    <h1>Fuel Mix for UK by percentage</h1>
    <google-chart :fuelMix="fuelMix" :fromTime="fromTime"></google-chart>
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
          console.log(data.data);
          this.fromTime = data.data.from;
          this.toTime = data.data.to;
          // this.fuelMix = data.data.generationmix;
          const fuelArray = [["Fuel", "Percentage"]];
          data.data.generationmix.forEach((mix) => {
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