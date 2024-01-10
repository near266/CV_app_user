import { AxiosResponse } from 'axios';

import { httpClient } from '@/core';

class AuthService {
  async currentUser() {
    const res = await httpClient.get('auth/me');
    return res.data;
  }

  async updateMeInfo(params) {
    const res: AxiosResponse = await httpClient.put('auth/update-info', params);
    return res.data;
  }

  async changePassword(params) {
    const res: AxiosResponse = await httpClient.put('auth/change-password', params);
    return res.data;
  }

  async refreshToken() {
    const res = await httpClient.post('auth/refresh-token', null, {
      withCredentials: true,
    });
    return res.data;
  }

  async logout() {
    const res = await httpClient.post('auth/logout', null, { withCredentials: true });
    return res.data;
  }
}

export const authService = new AuthService();
