<template>
  <v-card>
    <v-card-title>{{ statistic.title }}</v-card-title>
    <v-card-text
      v-if="statistic.title === 'Number of Budgets'"
      class="display-2"
      >{{ statistic.value }}</v-card-text
    >
    <v-card-text v-else class="display-2 tweenNum"
      >${{ animatedNumber }}</v-card-text
    >
  </v-card>
</template>

<script>
import gsap from "gsap";
export default {
  name: "StatisticCard",
  props: {
    statistic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweenedNumber: 0,
      number: 0,
    };
  },
  mounted: function() {
    // 在 mounted 時要啟用此動畫，並在 updated 裡更新
    this.number = this.statistic.value + 1;
    // 監測 this.$data 這個 object，目標是讓 tweenedNumber === this.number
    gsap.to(this.$data, { duration: 0.8, tweenedNumber: this.number });
  },
  updated: function() {
    this.number = this.statistic.value;
    gsap.to(this.$data, { duration: 0.8, tweenedNumber: this.number });
  },

  computed: {
    animatedNumber: function() {
      // toFixed: 轉為string && 四捨五入至整數位
      return this.tweenedNumber.toFixed(0);
    },
  },
};
</script>

<style lang="scss" scoped></style>
