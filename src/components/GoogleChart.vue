<template>
  <div>
    <GChart type="ColumnChart" :data="fuelMix" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "google-chart",
  components: {
    GChart,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          title: "UK Fuel Mix",
          subtitle: this.from,
        },
      },
    };
  },
  computed: {},
  props: ["fuelMix", "fromTime"],
};
</script>

<style>
</style>