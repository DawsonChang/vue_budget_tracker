<template >
  <v-app id="App" :style="{background: $vuetify.theme.themes[toggleTheme].background}">
    <Drawer :drawer="drawer" :toggleDrawer="toggleDrawer" :toggleTheme="toggleTheme"/>
    <NavBar :toggleDrawer="toggleDrawer"/>
    <v-main id="screen" class="pb-0">
      <v-container fluid class="mt-5 pa-0">
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    Drawer,
    NavBar
  },
  data: () => ({
    drawer: false
  }),
  // 將 toggleDrawer 傳至 child components，可以在 child components
  // (Drawer, NavBar)直接呼叫並改變 drawer 的值
  // 這樣寫的好處是能在父元件中管理變數，在子元件不用重新 copy 跟 emit 回傳
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  computed: {
    toggleTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>


