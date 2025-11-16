// src/navigation/index.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Contextos
import { useAuth } from '../services/auth/AuthContext';
import { useUser } from '../services/context/UserContext';

// Tipos de stacks
import { PublicStackParamList, PrivateStackParamList, AppTabParamList } from './types';

// Público
import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import VerifyPasswordScreen from '../screens/VerifyPassword';
import VerifyResultScreen from '../screens/VerifyResult';
import ResetPasswordScreen from '../screens/ResetPassword';

// Privado
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import NotificationsScreen from '../screens/Profile/Notifications/NotificationsScreen';

// Extras
import PastEventsScreen from '../screens/PastEvents';
import QrReaderScreen from '../screens/QrReader';
import ChangePasswordScreen from '../screens/ChangePassword';
import CarnetsScreen from '../screens/Carnets';
import RequestChangeScreen from '../screens/Profile/RequestChange/RequestChangeScreen';

// UI Components
import MyTabBar from './TabBarIcon';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import colors from '../theme/colors';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import MyRequestsScreen from '../screens/Profile/RequestChange/MyRequestsScreen';
import EventAttendanceScreen from '../screens/Attendance/EventAttendanceScreen';

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

/// Icono de notificaciones
const NotificationIcon = ({ navigation }: any) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Notificaciones')}
    style={{ marginRight: 16 }}
  >
    <Ionicons name="notifications-outline" size={24} color={colors.text} />
  </TouchableOpacity>
);

/// <summary>
/// Contenedor para mostrar el icono de notificaciones y el del perfil juntos
/// </summary>
const HeaderRightIcons = ({ navigation }: any) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <NotificationIcon navigation={navigation} />
    <ProfileHeader compact={true} />
  </View>
);

/// <summary>
/// Navegación para usuarios no autenticados.
/// </summary>
function PublicNavigator() {
  return (
    <PublicStack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <PublicStack.Screen name="Landing" component={LandingScreen} />
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="VerifyPassword" component={VerifyPasswordScreen} />
      <PublicStack.Screen name="VerifyResult" component={VerifyResultScreen} />
      <PublicStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </PublicStack.Navigator>
  );
}

/// <summary>
/// Stack principal de inicio.
/// </summary>
function HomePrivateStack() {
  return (
    <PrivateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
      })}
    >
      <PrivateStack.Screen name="Inicio" component={HomeScreen} />
      <PrivateStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Detalles' }}
      />
      <PrivateStack.Screen
        name="PastEvents"
        component={PastEventsScreen}
        options={{ headerShown: true, title: 'Eventos Pasados' }}
      />
      <PrivateStack.Screen
        name="QrReader"
        component={QrReaderScreen}
        options={{ headerShown: false }}
      />
      <PrivateStack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{ title: 'Notificaciones' }}
      />
      <PrivateStack.Screen
        name="Asistencias"
        component={AttendanceScreen}
        options={{ title: 'Asistencias', headerShown: true }}
      />
      <PrivateStack.Screen
        name="EventAttendance"
        component={EventAttendanceScreen}
        options={{ headerShown: false }}
      />

    </PrivateStack.Navigator>
  );
}



function AttendancePrivateStack() {
  return (
    <PrivateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
      })}
    >
      <PrivateStack.Screen
        name="Asistencias"
        component={AttendanceScreen}
        options={{ title: 'Asistencias', headerShown: true }}
      />
      <PrivateStack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{ title: 'Notificaciones' }}
      />
    </PrivateStack.Navigator>
  );
}

/// <summary>
/// Stack de carnetización.
/// </summary>
function DetailsPrivateStack() {
  const { hasRole } = useUser();
  if (!hasRole('Supervisor') && !hasRole('SuperAdmin')) return null;

  return (
    <PrivateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
      })}
    >
      <PrivateStack.Screen
        name="Details"
        component={CarnetsScreen}
        options={{
          title: 'Tus Carnets'
        }}
      />
      <PrivateStack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{ title: 'Notificaciones' }}
      />
    </PrivateStack.Navigator>
  );
}

/// <summary>
/// Stack de perfil del usuario.
/// </summary>
function PeoplePrivateStack() {
  return (
    <PrivateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
      })}
    >
      <PrivateStack.Screen name="Perfil" component={ProfileScreen} />
      <PrivateStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <PrivateStack.Screen
        name="RequestChange"
        component={RequestChangeScreen}
        options={{ title: 'Solicitud de cambio', headerShown: true }}
      />
      <PrivateStack.Screen
        name="MyRequests"
        component={MyRequestsScreen}
        options={{ title: 'Mis solicitudes', headerShown: true }}
      />
      <PrivateStack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{ title: 'Notificaciones' }}
      />
    </PrivateStack.Navigator>
  );
}

/// <summary>
/// Stack de configuración.
/// </summary>
function SettingsPrivateStack() {
  const { hasRole } = useUser();
  if (!hasRole('SuperAdmin')) return null;

  return (
    <PrivateStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerRight: () => <HeaderRightIcons navigation={navigation} />,
      })}
    >
      <PrivateStack.Screen name="Inicio" component={SettingsScreen} />
      <PrivateStack.Screen
        name="Notificaciones"
        component={NotificationsScreen}
        options={{ title: 'Notificaciones' }}
      />
    </PrivateStack.Navigator>
  );
}

/// <summary>
/// Tabs principales.
/// </summary>
function AppTabs() {
  const { hasRole } = useUser();
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen name="HomeTab" component={HomePrivateStack} />
      {hasRole('Supervisor') && (
        <Tab.Screen name="EventsTab" component={AttendancePrivateStack} />
      )}
      <Tab.Screen name="CardTab" component={DetailsPrivateStack} />
      <Tab.Screen name="PerfilTab" component={PeoplePrivateStack} />
    </Tab.Navigator>
  );
}

/// <summary>
/// Root principal.
/// </summary>
export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppTabs /> : <PublicNavigator />;
}
