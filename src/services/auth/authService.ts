import { ENV } from '../../config/env';
import { Tokens } from '../../types/auth';
import { ApiResponse } from '../api';
import { request } from '../http/request';
import { httpWrapper } from '../HttpServiceWrapper';
import { tokenStorage } from './tokenStorage';

export type VerifyPayload = { transactionId: string; code: string };
export type VerifyResponse = { accessToken: string; refreshToken: string; user?: { id: number; name: string; email: string } };


export const authService = {
  login: async (email: string, password: string) => {
    const res = await httpWrapper.handleRequest(
      request<ApiResponse<any>>('/auth/login', {
        method: 'POST',
        body: { email, password },
        skipAuth: true,
      })
    );

    const data = res.data;
    console.log("TOKENS" + data)

    // Caso 1: NO tiene 2FA → vienen tokens
    if (data?.accessToken && data?.refreshToken) {
      console.log("TOKENS" + data.accessToken)
      console.log("TOKENS" + data.refreshToken)

      const tokens: Tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
      await tokenStorage.saveTokens(tokens);

      return {
        requiresTwoFactor: false,
        tokens
      };
    }

    // Caso 2: SÍ tiene 2FA → viene userId
    if (data?.userId) {
      return {
        requiresTwoFactor: true,
        userId: data.userId,
        email,
      };
    }

    throw new Error("Respuesta inesperada del servidor");
  },


  async verifyCode(userId: number | undefined, code: string) {
    const data = await request<VerifyResponse>('/auth/verify-code', {
      method: 'POST',
      body: { userId, code },
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

  // ============================================================
  //  FORGOT PASSWORD (POST /auth/forgot-password)
  // ============================================================
  async forgotPassword(email: string) {
    return await httpWrapper.handleRequest(
      request<ApiResponse<any>>('/auth/forgot-password', {
        method: 'POST',
        body: { email },
        skipAuth: true,
      })
    );
  },

  // ============================================================
  //  RESET PASSWORD (POST /auth/reset-password)
  // ============================================================
  async resetPassword(email: string, token: string, newPassword: string) {
    return await httpWrapper.handleRequest(
      request<ApiResponse<any>>('/auth/reset-password', {
        method: 'POST',
        body: { email, token, newPassword },
        skipAuth: true,
      })
    );
  },

  // ============================================================
  //  CHANGE PASSWORD (PATCH /auth/change-password)
  // ============================================================
  async changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    return await httpWrapper.handleRequest(
      request<ApiResponse<any>>('/auth/change-password', {
        method: 'PATCH',
        body: { currentPassword, newPassword, confirmNewPassword },
      })
    );
  },

  async toggleTwoFactor() {
    return await request('/User/two-factor/toggle', {
      method: 'POST',
    });
  }

};
