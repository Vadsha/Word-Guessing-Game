import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

class ApiService {
  private static instance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!ApiService.instance) {
      ApiService.instance = axios.create({
        baseURL: "https://api.ooak.jp/api/prepaid/",
        timeout: 30000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Request interceptor
      ApiService.instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      // Response interceptor
      ApiService.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          // Handle global errors (e.g., unauthorized, server errors)
          if (error.response?.status === 401) {
            // Handle unauthorized access
            // e.g., redirect to login page or refresh token
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        },
      );
    }
    return ApiService.instance;
  }

  static async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    const response = await this.getInstance().get<T>(url, config);
    return response;
  }

  static async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    const response = await this.getInstance().post<T>(url, data, config);
    return response;
  }

  static async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.getInstance().put<T>(url, data, config);
    return response.data;
  }

  static async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.getInstance().patch<T>(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.getInstance().delete<T>(url, config);
    return response.data;
  }
}

export default ApiService;
