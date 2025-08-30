// src/navigation/types.ts
export type PublicStackParamList = {
  Landing: undefined;
  Login: undefined;
  VerifyPassword: { email: string };
  VerifyResult: { email: string };
  ResetPassword: { email: string };
};

export type PrivateStackParamList = {
  Inicio: undefined | { name?: string };
  Details: undefined | { name?: string };
  Perfil: undefined;
  Notificaciones: undefined;
};

export type AppTabParamList = {
  HomeTab: undefined;
  DetailsTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
};
