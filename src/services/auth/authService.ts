import { ENV } from '../../config/env';
import { Tokens } from '../../types/auth';
import { ApiResponse } from '../api';
import { request } from '../http/request';
import { httpWrapper } from '../HttpServiceWrapper';
import { tokenStorage } from './tokenStorage';

export type VerifyPayload = { transactionId: string; code: string };
export type VerifyResponse = { accessToken: string; refreshToken: string; user?: { id: number; name: string; email: string } };


export const authService = {
  login: (email: string, password: string) =>
   httpWrapper.handleRequest( request<ApiResponse<any>>('/auth/login', {
      method: 'POST',
      body: { email, password },
      skipAuth: true,

    })),

  async verifyCode(userId: number | undefined, code: string ) {
    const data = await request<VerifyResponse>('/auth/verify-code', {
      method: 'POST',
      body: {userId, code },
      skipAuth: true,
    });
    const tokens: Tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
    await tokenStorage.saveTokens(tokens);
    return data;
  },

  async logout() {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (refreshToken) {
        await request('/auth/revoke', { method: 'POST', body: { refreshToken } });
      }
    } finally {
      await tokenStorage.clearTokens();
    }
  },
};
