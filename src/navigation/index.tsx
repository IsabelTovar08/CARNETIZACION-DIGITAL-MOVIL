// src/navigation/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../services/auth/AuthContext';
import { PublicStackParamList, PrivateStackParamList, AppTabParamList } from './types';

// Público
import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import VerifyPasswordScreen from '../screens/VerifyPassword';
import VerifyResultScreen from '../screens/VerifyResult';
import ResetPasswordScreen from '../screens/ResetPassword';
// arriba con los demás imports de screens
import CarnetsScreen from '../screens/Carnets';  // ⬅️ nuevo


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
    </PublicStack.Navigator>
  );
}

function HomePrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen name="Inicio" component={HomeScreen} />
      <PrivateStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalles' }} />
      <PrivateStack.Screen name="PastEvents" component={PastEventsScreen} options={{ headerShown: false }} />
      {/* ⬇️ MOVIDO AQUÍ: el lector QR debe vivir en el mismo stack desde el que navegas (Home) */}
      <PrivateStack.Screen name="QrReader" component={QrReaderScreen} options={{ headerShown: false }} />
    </PrivateStack.Navigator>
  );
}

function DetailsPrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: true }}>
      <PrivateStack.Screen
        name="Details"
        component={CarnetsScreen}        // ← ahora el tab "Details" muestra Carnets
        options={{ title: 'Tus Carnets' }}
      />
    </PrivateStack.Navigator>
  );
}


function PeoplePrivateStack() {
  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Perfil" component={ProfileScreen} />
      <PrivateStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
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

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppTabs /> : <PublicNavigator />;
}
