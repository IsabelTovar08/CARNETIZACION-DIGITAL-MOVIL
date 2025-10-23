// src/navigation/types.ts

export type PublicStackParamList = {
  Landing: undefined;
  Login: undefined;
  VerifyPassword: { email: string, userId?: number };
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
  QrReader: undefined;
  ChangePassword: undefined; // nueva ruta para actualizar contraseña
};

export type AppTabParamList = {
  HomeTab: undefined;
  DetailsTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
};
