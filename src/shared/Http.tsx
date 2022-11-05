import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }
  //read
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    // Omit 删除某一个属性
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "get",
    });
  }
  // create
  post<R = unknown>(
    url: string,
    data: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "data" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "post",
    });
  }
  // update
  patch<R = unknown>(
    url: string,
    data: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "data" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: "patch",
    });
  }
  // destory
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "query" | "url" | "method">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new Http("/api/v1");

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

http.instance.interceptors.response.use(
  (response) => {
    console.log(response, "response");
    return response;
  },
  (error) => {
    console.log(error, "error");
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert("你太频繁了");
      }
    }
    throw error;
  }
);
