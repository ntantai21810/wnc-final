import axios from "axios";
import { openNotification } from "../redux/notificationSlice";
import { store } from "../redux/store";

const axiosClient = axios.create({
  baseURL: "https://bankmaia.herokuapp.com/api/" || "http:/localhost:3000/",
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const authState = store.getState().auth;
    // const accessToken = authState.accessToken;

    // if (config.headers && accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(
      openNotification({
        type: "error",
        message: error.response?.data?.Message || error.message || "",
      })
    );
    return Promise.reject(error);
  }
);

export { axiosClient };
