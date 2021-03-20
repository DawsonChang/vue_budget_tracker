<template>
  <v-container fluid class="mx-auto pb-0">
    <ul class="titleLine" align="center">
      <li>
        <h1 class="newFont">Budget for: {{ user.user.name }}</h1>
      </li>
      <li>
        <v-btn class="create" fab small dark color="primary" :to="{ name: 'event-create' }">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </li>
    </ul>

    <!-- 向右滑的動畫 -->
    <transition-group name="slide-right" tag="div" appear v-if="isMoveRight">
      <EventCard v-for="event in event.events" :key="event.id" :event="event" :page="page" />
    </transition-group>

    <!-- 向左滑的動畫 -->
    <transition-group name="slide-left" tag="div" appear v-else>
      <EventCard v-for="event in event.events" :key="event.id" :event="event" :page="page" />
    </transition-group>

    <v-card width="400" class="mx-auto mt-0">
      <div class="pageBlock newFont">
        <div class="prevPage">
          <!-- 如果不是第一頁才有往前一頁的按鈕 -->
          <template v-if="page != 1">
            <router-link
              class="routerLink"
              :to="{ name: 'event-list', query: { page: page - 1 }, params:{ isMoveRight: false } }"
              rel="prev"
            >{{ prevPage }}</router-link>
          </template>
        </div>

        <div class="nextPage">
          <!-- 如果不是最後一頁才有往後一頁的按鈕 -->
          <template v-if="hasNextPage">
            <router-link
              class="routerLink"
              :to="{ name: 'event-list', query: { page: page + 1 }, params:{ isMoveRight: true } }"
              rel="next"
            >{{ nextPage }}</router-link>
          </template>
        </div>
      </div>
    </v-card>
  </v-container>
  
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/store";

function getPageEvents(routeTo, next) {
  // 第一次進入此頁 routeTo.query.page 會是 undefined，這時就給他值為 1
  const currentPage = parseInt(routeTo.query.page) || 1;
  store.dispatch("event/fetchEvents", {
      page: currentPage
  }).then(() => {
    routeTo.params.page = currentPage;
    next();
  }).catch(() => {
    next({ name: "network-issue" });
  });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    isMoveRight: {
      type: Boolean
    }
  },

  components: {
    EventCard
  },
  // 第一次進入此頁時會 call this function
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  // 如果 router 有任何變化會 call this function
  // 例如按頁面中的 Prev Page 或 Next Page
  // 然後因為呼叫此函數後 store 的內容會更新
  // html render 的部分也會隨之更新
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    prevPage() {
      return "<<Prev Page";
    },
    nextPage() {
      return "Next Page>>";
    },
    ...mapState(["event", "user"])
  }
};
</script>

<style scoped>
.newFont {
  font-family: "Kalam", cursive;
}

.titleLine {
  text-align: center;
}
.titleLine li {
  padding-left: 20px;
  padding-right: 20px;
  display: inline-block;
}
.create {
  opacity: 1;
}
.create:hover {
  transform: scale(1.1);
}
.pageBlock {
  margin-bottom: 10px;
}
.prevPage {
  float: left;
}
.nextPage {
  float: right;
}
.routerLink {
  text-decoration: none;
}
.routerLink:hover {
  text-decoration: underline;
}

.slide-right-enter {
  transform: translateX(200px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 1s ease;
}

.slide-left-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 1s ease;
}
</style>
