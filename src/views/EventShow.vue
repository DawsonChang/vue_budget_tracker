<template>
  <div>
    <div class="event-header">
      <h2 class="title">{{ event.event.title }}</h2>
      <h5>Category: {{ event.event.category }}</h5>
      <span class="eyebrow">@{{ event.event.time }} on {{ event.event.date }}</span>
    </div>
    <button>
      <router-link
        :to="{ name: 'event-list', query: { page: getPage }, params:{ isNext: true }}"
        rel="back"
      >Back</router-link>
    </button>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['id', 'page'],
  computed: {
    ...mapState(['event']),
    getPage() {
      const lastPage = parseInt(this.$store.state.event.eventsTotal / 3) + 1
      return this.page ? this.page : lastPage
    }
  }
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
