import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './bottomBarGhost.styles';

// Solo maqueta visual para parecerse al footer curvo del mockup.
// En producción, usa tu TabNavigator real.
export default function BottomBarGhost() {
  return (
    <View style={styles.container}>
      <Ionicons name="home" size={22} color="#2F6D8B" />
      <Ionicons name="people-outline" size={22} color="#2F6D8B" />
      <Ionicons name="notifications-outline" size={22} color="#2F6D8B" />
      <Ionicons name="settings-outline" size={22} color="#2F6D8B" />
    </View>
  );
}
