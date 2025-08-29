import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { requestPasswordReset } from '../../services/auth/recover';

type Props = { onSuccess?: () => void };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const SHADOW =
  Platform.OS === 'ios'
    ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 6 };

export default function ForgotPasswordForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);

  const invalidEmail = submitted && (!email.trim() || !emailRegex.test(email.trim()));

  const onSend = async () => {
    setSubmitted(true);
    setServerErr(null);
    setServerMsg(null);

    if (!email.trim() || !emailRegex.test(email.trim())) return;

    try {
      setLoading(true);
      await requestPasswordReset(email.trim());
      setServerMsg('Si el correo existe, te enviamos instrucciones para restablecer la contraseña.');
      if (onSuccess) setTimeout(onSuccess, 900);
    } catch (e: any) {
      setServerErr(e?.message || 'No fue posible procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Icono grande tipo “escudo” */}
      <View style={styles.bigIconWrap}>
        <Svg width={96} height={96} viewBox="0 0 24 24">
          <Path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" fill="#e7f2fb" />
          <Path d="M7 10h10v7a5 5 0 0 1-10 0v-7z" fill="#9fc2de" />
          <Path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="#3b6c90" strokeWidth={1.6} fill="none" />
          <Path d="M12 12a2 2 0 0 0-2 2v2h4v-2a2 2 0 0 0-2-2z" fill="#3b6c90" />
        </Svg>
      </View>

      <Text style={styles.label}>Ingrese su correo electrónico</Text>

      <View style={[styles.inputWrap, SHADOW]}>
        <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.leftIcon}>
          <Path d="M3 7l9 6 9-6" stroke="#8197AA" strokeWidth={2} fill="none" />
          <Path d="M3 5h18v14H3z" stroke="#656d74" strokeWidth={1.2} fill="none" />
        </Svg>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Correo"
          placeholderTextColor="#98A7B5"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
      </View>

      {invalidEmail ? (
        <Text style={styles.errorField}>
          {email.trim() ? 'Formato de correo inválido.' : 'El correo es obligatorio.'}
        </Text>
      ) : null}

      {serverErr ? <Text style={styles.errorServer}>{serverErr}</Text> : null}
      {serverMsg ? <Text style={styles.ok}>{serverMsg}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={onSend} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={styles.btnText}>Enviar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bigIconWrap: { alignItems: 'center', marginBottom: 12, marginTop: 2 },
  label: { color: '#5E7C94', marginBottom: 8, fontWeight: '600', textAlign: 'center' },

  // MISMA “onda” visual de tus inputs del login (bordes suaves y alto 44)
  inputWrap: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#53585cff',
    paddingLeft: 40,
    paddingRight: 16,
    height: 44,
    justifyContent: 'center',
  },
  input: { fontSize: 15, color: '#0E2E42' },
  leftIcon: { position: 'absolute', left: 12, top: 12 },

  errorField: { color: '#b91c1c', fontSize: 12, marginTop: 6, textAlign: 'center' },
  errorServer: { color: '#b91c1c', textAlign: 'center', marginTop: 8 },
  ok: { color: '#1a7f37', textAlign: 'center', marginTop: 8 },

  // Botón igual tono que el login
  btn: {
    backgroundColor: '#4F7FA5',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 14,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 18 },
});
