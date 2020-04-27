<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <h3>Budget Name</h3>
      <div class="field">
        <label>Title</label>
        <input v-model="newEvent.title" type="text" placeholder="Add an event title" />
      </div>

      <label>Select a category</label>
      <select v-model="newEvent.category">
        <option v-for="cat in categories" :key="cat">
          <v-icon>{{ cat.icon }}</v-icon>
          {{ cat.name }}
        </option>
      </select>

      <h3>Amount</h3>
      <div class="field">
        <label>Amount</label>
        <input v-model="newEvent.amount" type="number" placeholder="Add a number" />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="newEvent.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="newEvent.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <h3>Where you comsume?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="newEvent.location" type="text" placeholder="Add a location" />
      </div>

      <div class="field">
        <label>Description</label>
        <input v-model="newEvent.description" type="text" placeholder="Add a description" />
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    Datepicker
  },
  created() {
    // clean up the event object
    this.newEvent = this.createFreshEventObject();
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      newEvent: this.createFreshEventObject()
      // currPage: parseInt(this.$store.state.event.eventsTotal / 3) + 1
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.newEvent)
        .then(() => {
          // redirect to event-show page
          this.$router.push({
            name: "event-show",
            params: { id: this.newEvent.id }
          });
        })
        .catch(() => {
          NProgress.done();
        });
    },
    createFreshEventObject() {
      const id = Math.floor(Math.random() * 100000);
      const user = this.$store.state.user.user;

      return {
        id: id,
        user: user,
        title: "",
        category: "",
        amount: 0,
        date: "",
        time: "",
        location: "",
        description: ""
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
