<template>
  <v-card width="600" class="mx-auto mt-5" elevation="0">
    <v-icon x-large>{{ mdiGoogleDownasaur }}</v-icon>
    <h1>Uh-Oh!</h1>
    <h3>It looks you're experiencing some network issue, please click the back button and try again.</h3>
    <div class="goBack">
      <router-link class="routerLink" :to="{ name: 'event-list' }">Or go back to the event list</router-link>
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