<template>
  <v-container class="action">
    <v-row>
      <v-col>
        <h1>Create a new budget</h1>
        <v-form @submit.prevent="createEvent" id="check-form">
          <v-text-field v-model="newEvent.title" label="Title" type="text"></v-text-field>

          <v-select
            v-model="newEvent.category"
            :items="categories"
            name="category"
            label="Select a category"
            item-text="name"
            return-object
            hide-details
            single-line
          >
            <template slot="selection" slot-scope="data">
              <span>
                <v-icon>{{ data.item.icon }}</v-icon>
              </span>
              <span class="secondSpan">{{ data.item.name }}</span>
            </template>
            <template slot="item" slot-scope="data">
              <v-list-tile-avatar>
                <span>
                  <v-icon>{{ data.item.icon }}</v-icon>
                </span>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <span class="secondSpan">
                  <v-list-tile-title>{{ data.item.name }}</v-list-tile-title>
                </span>
              </v-list-tile-content>
            </template>
          </v-select>

          <v-text-field v-model="newEvent.amount" label="amount" type="number"></v-text-field>

          <v-menu
            v-model="fromDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field label="Select a date" readonly :value="fromDateDisp" v-on="on"></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="fromDateVal"
              no-title
              @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>

          <v-select v-model="newEvent.time" :items="times" label="Select a time"></v-select>

          <h3>Where you comsume?</h3>
          <v-text-field v-model="newEvent.location" label="Location" type="text"></v-text-field>

          <v-textarea
            v-model="newEvent.description"
            auto-grow
            label="Description"
            rows="4"
            row-height="30"
            shaped
          ></v-textarea>

          <v-btn type="submit" color="success" form="check-form">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    // Datepicker
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
      newEvent: this.createFreshEventObject(),
      fromDateMenu: false,
      fromDateVal: null
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.newEvent.date = this.fromDateVal;
      this.newEvent.category = this.newEvent.category.name;
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
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
    }
  },

  watch: {
    pickerDate() {
      this.notes = [
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)]
      ].filter((value, index, self) => self.indexOf(value) === index);
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.secondSpan {
  display: inline-block;
  margin-left: 8px;
}

.action {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  height: 115vh;
}
</style>
