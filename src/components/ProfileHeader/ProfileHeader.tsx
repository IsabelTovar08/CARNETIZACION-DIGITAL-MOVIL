import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './profileHeader.styles';

// Encabezado con avatar, nombre y rol
export default function ProfileHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Camilo</Text>
          <Text style={styles.role}>Aprendiz</Text>
        </View>
        <Ionicons name="shield-checkmark-outline" size={22} color="#2F6D8B" />
      </View>
    </View>
  );
}
