import axios from "axios";
import { HttpError } from "@refinedev/core";

import { BASE_API_URL } from "@configs";

const httpInstance = axios.create({
  baseURL: BASE_API_URL,
});

httpInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth");
    const accessToken = authData ? JSON.parse(authData)["token"] : null;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

console.log(BASE_API_URL);

export { httpInstance };
