<template>
  <div>
    <GChart id="fuel-mix-chart" type="ColumnChart" :data="fuelMix" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "google-chart",
  components: {
    GChart,
  },
  computed: {
    chartOptions: function () {
      return {
        title: `UK Fuel Mix from ${this.fromTime} until ${this.fromTime}`,
      };
    },
  },
  props: ["fuelMix", "fromTime", "toTime"],
};
</script>

<style>
body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
#fuel-mix-chart {
  height: 500px;
}
</style>
