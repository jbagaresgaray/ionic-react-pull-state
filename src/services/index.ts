import axios, { AxiosRequestConfig } from "axios";
import { get } from "lodash-es";

// export const baseUrl = process.env.REACT_APP_API_URL;
export const baseURL = "https://jsonplaceholder.typicode.com";
console.log("baseUrl: ", baseURL);

export const getAPIBase = (route: string = ""): string => {
  return `${baseURL}/${route}`;
};


const commonStateHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const API = axios.create({
  baseURL,
});

API.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  async (error) => {
    if (error) {
      const err = error.response;
      if (err && err.status === 401) {
        // await store.dispatch("user/clearTokens");
      }
    }
    return Promise.reject(get(error, "response.data", {}));
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GET: (route: string) => {
    const url = getAPIBase(route);
    const options: AxiosRequestConfig = { headers: commonStateHeaders() };
    return API.get(url, options);
  },
  GET_PARAMS: (route: string, params: any) => {
    const url = getAPIBase(route);
    const options: AxiosRequestConfig = {
      headers: commonStateHeaders(),
      params,
    };
    return API.get(url, options);
  },

  POST: (route: string, object?: any) => {
    const url = getAPIBase(route);
    return API.post(url, object, {
      headers: commonStateHeaders(),
    });
  },

  POST_TO_PARAMS: (route: string, params: any) => {
    return API.post(
      getAPIBase(route),
      {},
      { headers: commonStateHeaders(), params }
    );
  },

  UPLOAD: (route: string, data: any, onUploadProgress: any) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };

    return API.post(getAPIBase(route), data, {
      headers,
      onUploadProgress,
    });
  },

  DELETE: (route: string, object?: any) => {
    return API.delete(getAPIBase(route), {
      headers: commonStateHeaders(),
      ...object,
    });
  },

  PUT: (route: string, data: any) => {
    return API.put(getAPIBase(route), data, {
      headers: commonStateHeaders(),
    });
  },

  PATCH: (route: string, data: any) => {
    return API.patch(getAPIBase(route), data, {
      headers: commonStateHeaders(),
    });
  },
};
