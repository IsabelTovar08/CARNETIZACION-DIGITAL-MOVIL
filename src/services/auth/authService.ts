import { httpWrapper } from '../HttpServiceWrapper';
import { request } from '../request';

export const authService = {
  login: (username: string, password: string) =>
   httpWrapper.handleRequest( request<{ response: any }>('/auth/login', {
      method: 'POST',
      body: { username, password },
    })),

  verifyCode: (transactionId: string, code: string) =>
    request<{ accessToken: string; refreshToken: string }>('/auth/verify', {
      method: 'POST',
      body: { transactionId, code },
    }),
};
