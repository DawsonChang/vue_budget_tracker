<template>
  <v-container class="action" id="App">
    <v-row>
      <v-col>
        <h1 class="display-3 font-weight-bold">{{ event.event.title }}</h1>
        <div class="block">
          <h2>Category</h2>
          <v-divider inset></v-divider>
          <h2 class="title font-weight-black">
            <v-icon large>{{ getIcon(event.event.category) }}</v-icon>
            {{ event.event.category }}
          </h2>
        </div>

        <div class="block">
          <h2>Amount</h2>
          <v-divider inset></v-divider>
          <h2 class="title font-weight-black">
            <v-icon large>{{ mdiCashMultiple }}</v-icon>
            ${{ event.event.amount }}
          </h2>
        </div>

        <div class="block">
          <h2>{{ `Date & Time` }}</h2>
          <v-divider inset></v-divider>
          <h2 class="title font-weight-black">
            <v-icon large>{{ mdiClockOutline }}</v-icon>
            <span>{{ event.event.time }} on {{ event.event.date }}</span>
          </h2>
        </div>

        <div class="block">
          <h2>Location</h2>
          <h2 class="title font-weight-black">
            <v-divider inset></v-divider>
            <v-icon large>{{ mdiMapMarker }}</v-icon>
            <span>{{ event.event.location }}</span>
          </h2>
        </div>

        <div class="block">
          <h2>Description</h2>
          <v-divider inset></v-divider>
          <h2 class="title font-weight-black">
            <v-icon large>{{ mdiMessageProcessingOutline }}</v-icon>
            <span>{{ event.event.description }}</span>
          </h2>
        </div>

        <button class="title">
          <router-link
            :to="{ name: 'event-list', query: { page: getPage }, params:{ isNext: true }}"
            rel="back"
          >Back</router-link>
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import { mdiCashMultiple } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import { mdiMessageProcessingOutline } from "@mdi/js";

export default {
  props: ["id", "page"],
  data() {
    return {
      categories: this.$store.state.categories,
      mdiCashMultiple,
      mdiClockOutline,
      mdiMapMarker,
      mdiMessageProcessingOutline
    };
  },
  methods: {
    getIcon(category) {
      const curr = this.categories.find(cat => cat.name === category);
      return curr.icon;
    }
  },
  computed: {
    ...mapState(["event"]),
    getPage() {
      const lastPage = parseInt(this.$store.state.event.eventsTotal / 3) + 1;
      return this.page ? this.page : lastPage;
    }
  }
};
</script>
<style scoped>
html,
body,
#App {
  height: 130%;
}

.action {
  width: 40%;
  align-items: center;
  justify-content: center;
  height: 120vh;
}
.block {
  margin: 40px 0px;
}
</style>
