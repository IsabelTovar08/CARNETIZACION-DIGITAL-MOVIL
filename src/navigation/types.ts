// Tipos de stacks separados para público y privado

export type PublicStackParamList = {
  Landing: undefined;
  Login: undefined;
};

export type PrivateStackParamList = {
  Inicio: { name?: string } | undefined;
  Details: { name?: string } | undefined;
  Ajustes: undefined;
  Notificaciones: undefined;
  Perfil: undefined;

};

// (Opcional) Si quieres tipar el Tab Navigator:
export type AppTabParamList = {
  HomeTab: undefined;  // contiene el stack privado (Home/Details)
  // Perfil: undefined; // agrega más tabs si las necesitas
  SettingsTab: undefined;
  Settings: undefined;
  DetailsTab: undefined;
  NotificationsTab: undefined;
  PerfilTab: undefined;
};
