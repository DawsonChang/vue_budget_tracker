<template>
  <v-card width="500" class="mx-auto mt-5" elevation="0">
    <v-icon x-large>{{ mdiGoogleDownasaur }}</v-icon>
    <h1>Oops!</h1>
    <h3>The page you're looking for is not here.</h3>
    <div class="goBack">
      <router-link class="routerLink" :to="{ name: 'event-list' }">Back to the home page</router-link>
    </div>
  </v-card>
</template>

<script>
import { mdiGoogleDownasaur } from "@mdi/js";
export default {
  data() {
    return {
      mdiGoogleDownasaur
    };
  }
};
</script>

<style scoped>
.goBack {
  padding-top: 20px;
}
.routerLink {
  text-decoration: none;
}
.routerLink:hover {
  text-decoration: underline;
}
</style>