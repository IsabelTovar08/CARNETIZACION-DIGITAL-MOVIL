// src/navigation/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../services/auth/AuthContext';
import { PublicStackParamList, PrivateStackParamList, AppTabParamList } from './types';

// ===== Público =====
import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import VerifyPasswordScreen from '../screens/VerifyPassword';
import VerifyResultScreen from '../screens/VerifyResult';
import ResetPasswordScreen from '../screens/ResetPassword';

// ===== Privado =====
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import NotificationsScreen from '../screens/Profile/Notifications/NotificationsScreen';

// Pantalla nueva: Eventos Pasados
import PastEventsScreen from '../screens/PastEvents';

// Tab bar custom
import MyTabBar from './TabBarIcon';

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function PublicNavigator() {
  return (
    <PublicStack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Landing" component={LandingScreen} />
      <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="VerifyPassword" component={VerifyPasswordScreen} />
      <PublicStack.Screen name="VerifyResult" component={VerifyResultScreen} />
      <PublicStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      {/* Si también quieres abrir PastEvents desde pantallas públicas, puedes habilitarla aquí: */}
      {/* <PublicStack.Screen name="PastEvents" component={PastEventsScreen} /> */}
    </PublicStack.Navigator>
  );
}

// ===== Stacks privados por tab =====
function HomePrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen name="Inicio" component={HomeScreen} />
      <PrivateStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalles' }} />
      {/* REGISTRO aquí para que "Ver más" desde Home pueda navegar */}
      <PrivateStack.Screen name="PastEvents" component={PastEventsScreen} options={{ headerShown: false }} />
    </PrivateStack.Navigator>
  );
}

function DetailsPrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen name="Details" component={DetailsScreen} />
    </PrivateStack.Navigator>
  );
}

function PeoplePrivateStack() {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }} />
    </PrivateStack.Navigator>
  );
}

function NotificationsPrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen name="Notificaciones" component={NotificationsScreen} />
    </PrivateStack.Navigator>
  );
}

function SettingsPrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen name="Inicio" component={SettingsScreen} />
    </PrivateStack.Navigator>
  );
}

// ===== Tabs privadas =====
function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen name="HomeTab" component={HomePrivateStack} />
      <Tab.Screen name="DetailsTab" component={DetailsPrivateStack} />
      <Tab.Screen name="NotificationsTab" component={NotificationsPrivateStack} />
      <Tab.Screen name="PerfilTab" component={PeoplePrivateStack} />
    </Tab.Navigator>
  );
}

// ===== Root =====
export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppTabs /> : <PublicNavigator />;
}
