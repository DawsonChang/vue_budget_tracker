<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" class="primary accent-4" dark absolute temporary app>
      <v-list>
        <v-list-item link @click="drawer = false">
          <v-list-item-icon>
            <v-icon>{{ mdiArrowLeft }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Back</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="success" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark clipped-left app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>BudgetTracker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded>Login</v-btn>
    </v-app-bar>

    <v-content class="pb-0">
      <v-container fluid class="ma-0 pa-0">
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "nprogress/nprogress.css";
import { mdiArrowLeft } from "@mdi/js";
import { mdiViewDashboard } from "@mdi/js";
import { mdiAccountBox } from "@mdi/js";
import { mdiGavel } from "@mdi/js";
export default {
  data: () => ({
    drawer: false,
    mdiArrowLeft,
    items: [
      { title: "Dashboard", icon: mdiViewDashboard },
      { title: "Account", icon: mdiAccountBox },
      { title: "Admin", icon: mdiGavel }
    ]
  })
};
</script>

<style scoped>
</style>
