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
  RequestChange: undefined; // nueva ruta para solicitar cambio de datos
  Events: undefined;
  Asistencias: undefined;
  MyRequests: undefined;
  EventAttendance: { event: any};
};

export type AppTabParamList = {
  HomeTab: undefined;
  CardTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
  EventsTab: undefined;
};
