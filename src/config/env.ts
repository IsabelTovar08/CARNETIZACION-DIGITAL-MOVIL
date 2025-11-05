export const ENV = {
  // API_BASE: 'http://172.30.3.251:8008/api', 
  API_BASE: 'http://10.3.235.164:5100/api', 

  DEBUG_HTTP: true,
  TOKEN_ENDPOINTS: {
    LOGIN: '/auth/login',
    VERIFY_CODE: '/auth/verify-code',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/revoke',
  },
};

