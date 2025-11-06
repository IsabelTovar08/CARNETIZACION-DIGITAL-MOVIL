import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './RequestChangeScreen.styles';

/// <summary>
/// Pantalla para que el usuario solicite un cambio de datos personales.
/// </summary>
export default function RequestChangeScreen() {
  const [field, setField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [reason, setReason] = useState('');

  /// <summary>
  /// Envía la solicitud al backend.
  /// </summary>
  const sendRequest = async () => {
    if (!field || !newValue || !reason) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
      return;
    }

    try {
      const response = await fetch('https://tu-api.com/api/change-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer TU_TOKEN_AQUI',
        },
        body: JSON.stringify({ field, newValue, reason }),
      });

      if (!response.ok) throw new Error('Error al enviar la solicitud.');

      Alert.alert('Enviado', 'Tu solicitud fue enviada correctamente.');
      setField('');
      setNewValue('');
      setReason('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar la solicitud, intenta más tarde.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Solicitud de cambio de datos</Text>

      <Text style={styles.label}>Dato que deseas modificar</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={field}
          onValueChange={(value: any) => setField(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un campo..." value="" />
          <Picker.Item label="Nombre completo" value="fullName" />
          <Picker.Item label="Correo electrónico" value="email" />
          <Picker.Item label="Fecha de nacimiento" value="birthDate" />
          <Picker.Item label="División o dependencia" value="city" />
        </Picker>
      </View>

      <Text style={styles.label}>Nuevo valor</Text>
      <TextInput
        placeholder="Escribe el nuevo valor"
        style={styles.input}
        value={newValue}
        onChangeText={setNewValue}
      />

      <Text style={styles.label}>Motivo</Text>
      <TextInput
        placeholder="Describe el motivo del cambio"
        style={[styles.input, styles.textArea]}
        multiline
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.btn} onPress={sendRequest}>
        <Text style={styles.btnText}>Enviar solicitud</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
