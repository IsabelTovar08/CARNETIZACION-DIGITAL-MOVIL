export type LoginStartPayload = {
  username: string;
  password: string;
};


export type VerifyCodePayload = {
  userId: string;
  code: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = Tokens;

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type VerifyCodeResponse = Tokens & {
  user?: AuthUser;
};
