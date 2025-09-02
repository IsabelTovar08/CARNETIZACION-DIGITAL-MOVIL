// src/navigation/types.ts

export type PublicStackParamList = {
  Landing: undefined;
  Login: undefined;
  VerifyPassword: { email: string };
  VerifyResult: { email: string };
  ResetPassword: { email: string };
  PastEvents: undefined;               // (puedes dejarlo también en público si lo usas desde allí)
};

export type PrivateStackParamList = {
  Inicio: undefined | { name?: string };
  Details: undefined | { name?: string };
  Perfil: undefined;
  Notificaciones: undefined;
  PastEvents: undefined;               // ⬅️ AÑADIDO: para poder navegar desde Home/privado
};

export type AppTabParamList = {
  HomeTab: undefined;
  DetailsTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
};
