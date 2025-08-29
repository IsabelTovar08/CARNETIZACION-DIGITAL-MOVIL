import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../services/auth/AuthContext';
// import TabBarIcon from '../components/TabBarIcon';

import { PublicStackParamList, PrivateStackParamList, AppTabParamList } from './types';

// Público
import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TabBarIcon from './TabBarIcon';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import MyTabBar from './TabBarIcon';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import NotificationsScreen from '../screens/Profile/Notifications/NotificationsScreen';
// Privado (carpeta Private)
// import HomeScreen from '../screens/Private/Home/HomeScreen';
// import DetailsScreen from '../screens/Private/Home/DetailsScreen';
// import PeopleScreen from '../screens/Private/People/PeopleScreen';
// import NotificationsScreen from '../screens/Private/Notifications/NotificationsScreen';
// import SettingsScreen from '../screens/Private/Settings/SettingsScreen';

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function PublicNavigator() {
  return (
    <PublicStack.Navigator initialRouteName="Landing">
      <PublicStack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <PublicStack.Screen name="Login" component={LoginScreen} options={{ title: 'Inicia sesión' }} />
    </PublicStack.Navigator>
  );
}

// Stacks privados por tab
function HomePrivateStack() {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: true }} />
      <PrivateStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalles' }} />
    </PrivateStack.Navigator>
  );
}

function DetailsPrivateStack() {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true }} />
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
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Notificaciones" component={NotificationsScreen} options={{ headerShown: true }} />
    </PrivateStack.Navigator>
  );
}

function SettingsPrivateStack() {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Inicio" component={SettingsScreen} options={{ headerShown: true }} />
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
