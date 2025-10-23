import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const name = route.params?.name ?? 'Invitado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles</Text>
      <Text style={styles.text}>Hola, {name}. Aquí pondremos tu contenido.</Text>
      <Text style={styles.muted}>Puedes escanear un código QR para continuar.</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('QrReader')}>
        <Text style={styles.btnText}>Abrir lector QR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8, color: '#1f3b53' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 6, color: '#0e2e42' },
  muted: { color: '#6b7280', marginBottom: 16 },
  btn: { backgroundColor: '#4F7FA5', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
