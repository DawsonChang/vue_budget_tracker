import EventService from "@/services/EventService.js";
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTSTOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  REMOVE_EVENT(state, event) {
    state.events = state.events.filter((e) => e !== event);
  },
};

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating your event: " + error.message
        );
      });
  },
  fetchEvents({ commit, state }, { page }) {
    return EventService.getEvents(state.perPage, page).then((response) => {
      commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
      commit("SET_EVENTS", response.data);
    })
    .catch(error => {
      console.log('There was a problem creating your event: ' + error.message)
    })
  },
  fetchEventsDashBoard({ commit }) {
    return EventService.getEventsDashBoard().then((response) => {
      commit("SET_EVENTS", response.data);
    });
  },
  // 在 router 呼叫此 action (event-show 的 beforeEnter 呼叫)
  // 這樣能在進去頁面前設定好 event，EventShow 就能在 ...mapState 抓到
  fetchEvent({ commit, getters }, id) {
    // 不是把此 event 的 data 直接傳進component, 而是先傳id, 再由id去搜尋對應的event
    // getters.getEventById(id) 即是在做搜尋
    const event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } 
    // 以下的 else 其實不需要，因為從前一頁進來event一定會有資料
    
    // else { // 如果沒有找到代表不是從EventCard點進去，而是直接在網址輸入id
    //          // 此時會用getEvent從資料庫中搜尋此id的event
    //   return EventService.getEvent(id).then((response) => {
    //     commit("SET_EVENT", response.data);
    //     return response.data;
    //   });
    // }
  },
  deleteEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    EventService.deleteEvent(id)
      .then(() => {
        commit("REMOVE_EVENT", event);
      })
      .catch((error) => {
        console.log(
          "There was a problem deleting your event: " + error.message
        );
      });
  },
};
export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
