import axios from "axios";
import { Loading } from 'element-ui';

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// this variable put the "Loading" status
let loadingInstance;

apiClient.interceptors.request.use(
  function(config) {
    // Do something before request is sent

    loadingInstance = Loading.service({
      lock: true,
      text: "loading"
    });

    return config;
  },
  function(error) {
    // Do something with request error
    loadingInstance.close();
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  async function(response) {
    // 這段程式碼故意延遲讀取時間1秒，模仿實際 call API 的場景
    // -------------------------------------------------
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(1000);
    // -------------------------------------------------
    
    // 1秒後才取消 loading 的畫面
    loadingInstance.close();

    return response;
  },
  function(error) {
    loadingInstance.close();
    return Promise.reject(error);
  }
);

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEventsDashBoard() {
    return apiClient.get("/events");
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
  deleteEvent(id) {
    return apiClient.delete("/events/" + id);
  }
};
