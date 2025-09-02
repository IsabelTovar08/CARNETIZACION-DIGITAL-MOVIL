// src/navigation/types.ts

export type PublicStackParamList = {
  Landing: undefined;
  Login: undefined;
  VerifyPassword: { email: string };
  VerifyResult: { email: string };
  ResetPassword: { email: string };
  PastEvents: undefined;
};

export type PrivateStackParamList = {
  Inicio: undefined | { name?: string };
  Details: undefined | { name?: string };
  Perfil: undefined;
  Notificaciones: undefined;
  PastEvents: undefined;
  QrReader: undefined;   //  lector QR
};

export type AppTabParamList = {
  HomeTab: undefined;
  DetailsTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
};
