import type { App } from "vue";
import http from "@/utils/http";
import type { AxiosResponse, AxiosError } from "axios";

export default {
  
  install: (app: App): void => {
    app.config.globalProperties.$http = http;
    const $http = app.config.globalProperties.$http;

    const handleError = (err: AxiosError) => {
      app.config.globalProperties.$toast.add({
        severity: 'error',
        summary: `Error ${err.response?.status}`,
        detail: `${err}`,
        life: 113000,
      });
      return Promise.reject(err);
    };

    $http.interceptors.response.use((response: AxiosResponse) => response,handleError);
  },
};