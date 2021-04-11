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
    const timeout = (ms) => {
      // 方法1 --- ok
      return new Promise(resolve => setTimeout(resolve, ms));
      // 方法2 --- 不 ok
      // return Promise.resolve(setTimeout(() => {}, ms));
    }
    await timeout(500);
    // -------------------------------------------------
    // 這裡有個問題，為何方法1可以過，但方法2不行
    // 因為方法1會等到 resolve 在 callback function 中被呼叫才會回傳，而 resolve
    // 要等 setTimeout 倒數完成才會被呼叫，並回傳 fulfilled
    // 而方法2 Promise.resolve() 就直接呼叫 resolve 了，並回傳 fulfilled
    // 而 await timeout(1000) 在 fulfilled 後就會繼續執行下去

    // 用純 Promise 改寫
    // const res = () => timeout(1000).then(() => {
    //   loadingInstance.close();
    //   return response;
    // })
    // return res();

    // 0.5秒後才取消 loading 的畫面 - async await 方法
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
