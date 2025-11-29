import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { AuthProvider } from './src/services/auth/AuthContext';
import { UserProvider } from './src/services/context/UserContext';
import { notificationHub } from './src/services/http/Notifications/NotificationHubService';
import { SocketInitializer } from './src/services/http/Notifications/SocketInitializer';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <SocketInitializer />
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}