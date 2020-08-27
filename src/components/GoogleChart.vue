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
        title: `UK Fuel Mix from ${this.displayDate(
          this.fromTime
        )} until ${this.displayDate(this.toTime)}`,
      };
    },
  },
  props: ["fuelMix", "fromTime", "toTime"],
  methods: {
    displayDate: function (dateString) {
      const split = dateString.split("T");
      const date = split[0].split("-");
      const orderedDate = `${date[2]}/${date[1]}/${date[0]}`;
      return `${split[1]}, ${orderedDate}`;
    },
  },
};
</script>

<style>
body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
#fuel-mix-chart {
  height: 500px;
  margin: 20px;
}
</style>
