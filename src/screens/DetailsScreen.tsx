// src/screens/DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const name = route.params?.name ?? 'Invitado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles</Text>
      <Text style={styles.text}>Hola, {name}. Aquí pondremos tu contenido.</Text>
      <Text style={styles.muted}>Próximamente añadiremos más información en esta pantalla.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8, color: '#1f3b53' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 6, color: '#0e2e42' },
  muted: { color: '#6b7280' },
});
