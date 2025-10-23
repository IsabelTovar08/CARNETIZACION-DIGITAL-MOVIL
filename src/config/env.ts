export const ENV = {
  API_BASE: 'http://192.168.137.1:8008/api', 
  DEBUG_HTTP: true,
  TOKEN_ENDPOINTS: {
    LOGIN: '/auth/login',
    VERIFY_CODE: '/auth/verify-code',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/revoke',
  },
};
