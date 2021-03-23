<template >
  <v-app-bar color="primary" dark clipped-left app height="50">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link class="toolbarTitle" :to="{ name: 'event-list'}">BudgetTracker</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded :disabled="true">Document</v-btn>
    <v-btn text rounded :disabled="true">Search</v-btn>
    <v-btn text rounded :disabled="true">Support</v-btn>
    <v-avatar color="#F9A825" size="40">
      <span class="white--text headline">{{ getFirstLetter }}</span>
    </v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  props: ["toggleDrawer"],
  data: () => ({}),
  methods: {},
  computed: {
    getFirstLetter() {
      const { user } = this.$store.state.user;
      return user.name.substring(0, 1);
    }
  }
};
</script>


<style scoped>
.toolbarTitle {
  text-decoration: none;
  color: white;
  font-family: "Kalam", cursive;
}

#screen {
  min-height: 100%;
}
</style>
