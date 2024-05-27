import axios, { AxiosError, AxiosInstance } from 'axios';

import { Cookies, authService } from '@/shared';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error: AxiosError, token = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

function rejectErrorAndClearToken(error: AxiosError) {
  Cookies.deleteAuthCookie();
  window.location.href = '/';

  return Promise.reject(error);
}

/**
 * Nếu migration sang lib khác thì cần thay đổi:
 *
 * - Sửa file API này.
 * - Sửa component search header.
 * - Update hàm downloadFileNormally ở common.
 * - Check lại các nơi dùng trực tiếp file API.
 *
 */

const cancelTokenSource = axios.CancelToken.source();

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
  cancelToken: cancelTokenSource.token,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Token-Is-Present'] = 1;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only handle when status == 401
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Clear token and throw error when retried
    if (originalRequest._retry) {
      return rejectErrorAndClearToken(error);
    }

    // If refresh token is not valid and server response status == 401
    if (originalRequest.url === 'auth/refresh-token') {
      return rejectErrorAndClearToken(error);
    }

    // Handle if token is refreshing
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Set variables
    originalRequest._retry = true;
    isRefreshing = true;

    // Call request refresh token
    const res = await authService
      .refreshToken()
      .catch((err: AxiosError) => {
        processQueue(err);
        return rejectErrorAndClearToken(err);
      })
      .finally(() => {
        isRefreshing = false;
      });

    if (res.code === 'SUCCESS') {
      processQueue(null, res.payload.access_token);
      return Promise.resolve(api(originalRequest));
    }

    return rejectErrorAndClearToken(error);
  }
);

export { api, cancelTokenSource };
