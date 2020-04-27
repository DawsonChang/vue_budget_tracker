<template>
  <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
    <v-card width="400" class="mx-auto mt-5 event-card -shadow" :elevation="hover ? 10 : 4">
      <div class @mouseover="active = true" @mouseleave="active = false">
        <v-icon
          large
          v-show="active"
          class="delete icon-close-box"
          @click="dialog = true"
        >{{ mdiCloseBox }}</v-icon>
        <v-dialog v-model="dialog" max-width="400">
          <!-- @dialogClose is the params from child component -->
          <DeleteDialog :event="event" @dialogClose="dialog = false" />
        </v-dialog>

        <router-link
          class="event-link"
          :to="{ name: 'event-show', params: { id: event.id, page: page } }"
        >
          <v-card-title class="headline font-weight-bold pa-1 pl-3">{{ event.title }}</v-card-title>

          <v-card-text class="subtitle-1 ma-0 pa-1 pl-3">
            <span class="font-weight-medium">
              <v-icon>{{ mdiCashMultiple }}</v-icon>
              ${{ event.amount }}
            </span>
            <span class="cat">
              <v-icon>{{ getIcon(event.category) }}</v-icon>
              {{ event.category }}
            </span>
          </v-card-text>

          <v-card-text class="font-italic subtitle-1 ma-0 pa-1 pl-3 pa-1 pl-3">
            <v-icon>{{ mdiClockOutline }}</v-icon>
            {{ getDate() }} at {{ event.time }}
          </v-card-text>
        </router-link>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import DeleteDialog from "./DeleteDialog.vue";
import { mdiCloseBox } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import { mdiCashMultiple } from "@mdi/js";
export default {
  props: {
    event: Object,
    page: Number
  },
  components: {
    DeleteDialog
  },
  data: function() {
    return {
      active: false,
      dialog: false,
      mdiCloseBox,
      mdiClockOutline,
      mdiCashMultiple,
      categories: this.$store.state.categories
    };
  },
  methods: {
    getDate() {
      const newDate = this.event.date.toString();
      return newDate.substring(0, 10);
    },
    getIcon(category) {
      const curr = this.categories.find(cat => cat.name === category);
      return curr.icon;
    }
  }
};
</script>

<style scoped>
.delete {
  padding-top: 1px;
  padding-right: 1px;
  float: right;
}
.icon-close-box {
  opacity: 0.2;
}
.icon-close-box:hover {
  transform: scale(1.1);
  opacity: 1;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}

.event-card {
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.cat {
  position: relative;
  left: 15px;
  margin: auto;
}
</style>
