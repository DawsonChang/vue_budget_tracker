<template>
    <v-navigation-drawer
      v-model="drawerCopy"
      class="primary accent-4"
      dark
      absolute
      temporary
      app
      style="position:fixed; top:0; left:0;"
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="listFunction(item)"
          :disabled="item.dis"
        >
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
          <v-btn color="error" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>

<script>
import { mdiClose } from "@mdi/js";
import { mdiViewDashboard } from "@mdi/js";
import { mdiAccountBox } from "@mdi/js";
import { mdiGavel } from "@mdi/js";
import { mdiPalette } from "@mdi/js";

// 這一頁邏輯較複雜，先放一個 drawer 的複製 drawerCopy，將其跟 v-navigation-drawer
// 的 v-model 綁定。有兩種方法可以關閉 drawer：

// 一種是按 Close 按鈕，這個比較單純，直接呼叫 toggleDrawer 就好，跟 v-model 無關
// 另一種方法是按 drawer 以外的灰色區塊，這種情形下會讓 v-model 的值變成 false
// (為何不將 v-model 改成 :value? 因這樣就算按灰色區塊 :value 的值也不會改變，繼續停留在 true，造成卡死的狀態，)
// 這種情況不能直接用 props 的 drawer 綁定 v-model，因為props 是 not mutable

// 解決方法是新增一個變數 drawerCopy 綁定 v-model，在 watch 用 props 的 drawer 更新他的值
// 然後在 beforeUpdate 或是 updated 檢查 drawerCopy 與 drawer 是否相等
// 因為如果 drawer 被關掉，drawerCopy 會等於 false，而 drawer 還是 true
// 這時候再呼叫 toggleDrawer 就能讓 drawer 變成 false 了

export default {
    props: ["drawer", "toggleDrawer", "toggleTheme"],
    data: () => ({
    drawerCopy: false,
    items: [
      { title: "Close", icon: mdiClose, dis: false },
      { title: "Dashboard", icon: mdiViewDashboard, dis: false },
      { title: "Theme", icon: mdiPalette, dis: false },
      { title: "Account", icon: mdiAccountBox, dis: true },
      { title: "Admin", icon: mdiGavel, dis: true }
    ]
  }),
  beforeUpdate() {
      if (this.drawerCopy !== this.drawer) {
          this.toggleDrawer();
      }
  },
  methods: {
    listFunction(item) {
      switch (item.title) {
        case "Close":
          this.toggleDrawer();
          break;
        case "Dashboard":
          this.$router.push({
            name: "dash-board"
          });
          break;
        case "Theme":
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
          break;
        default:
          //console.log(item.title);
      }
    }
  },
  watch: {
        drawer(newVal) {
            this.drawerCopy = newVal;
        }
    }
}

</script>

<style lang="scss" scoped>

</style>