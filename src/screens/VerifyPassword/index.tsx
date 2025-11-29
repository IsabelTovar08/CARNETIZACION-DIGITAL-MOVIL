// src/screens/VerifyPassword/index.tsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
  View, Text, SafeAreaView, TextInput, TouchableOpacity, Platform,
  ImageBackground, Image, StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/types';
import { styles } from './VerifyPassword.styles';
import { authService } from '../../services/auth/authService';
import { useAuth } from '../../services/auth/AuthContext';
import { useUser } from '../../services/context/UserContext';

type Props = NativeStackScreenProps<PublicStackParamList, 'VerifyPassword'>;

const OTP_LEN = 5; // 6 dígitos

// Cambia estas rutas por tus assets reales
const BG_SOURCE = require('../../img/fondo-login.png');
const LOCK_SOURCE = require('../../img/candado.png');

export default function VerifyPasswordScreen({ route, navigation }: Props) {
  const { signIn } = useAuth();
  const { loadCurrentUser, user } = useUser();
  const { email, userId } = route.params;

  const [values, setValues] = useState<string[]>(Array.from({ length: OTP_LEN }, () => ''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const code = useMemo(() => values.join(''), [values]);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const focus = (i: number) => inputs.current[i]?.focus();

  const handleChange = (i: number, txt: string) => {
    const only = txt.replace(/[^0-9]/g, '');
    setValues(prev => {
      const next = [...prev];
      next[i] = only.slice(-1);
      return next;
    });
    if (only && i < OTP_LEN - 1) focus(i + 1);
    setErrorText(null);
  };

  const handleKeyPress = (i: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !values[i] && i > 0) {
      setValues(prev => {
        const next = [...prev];
        next[i - 1] = '';
        return next;
      });
      focus(i - 1);
    }
  };

  /// <summary>
  /// Verifica el código OTP, realiza el login y carga la información del usuario.
  /// </summary>
  const verify = async () => {
    if (code.length !== OTP_LEN) {
      setErrorText(`Completa los ${OTP_LEN} dígitos.`);
      return;
    }

    try {
      // Verifica el código OTP con el backend
      const res = await authService.verifyCode(userId, code);

      // Si es correcto, activa sesión en el contexto de autenticación
      await signIn();

      // Carga la información del usuario desde /api/user/me
      await loadCurrentUser();

      console.log("✅ Usuario autenticado:", user?.userName);
    } catch (err: any) {
      setErrorText(err?.message || "Código inválido. Intenta de nuevo.");
    }
  };
  

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={BG_SOURCE} style={styles.bgImage} resizeMode="cover">
        <View style={styles.container}>
          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.title}>Confirmación de{'\n'}Código</Text>

            <View style={styles.iconWrap}>
              <Image source={LOCK_SOURCE} style={styles.icon} resizeMode="contain" />
            </View>

            <Text style={styles.help}>
              Digite los {OTP_LEN} dígitos que se enviaron al correo <Text style={styles.mail}>"{email}"</Text>:
            </Text>

            <View style={styles.otpRow}>
              {values.map((v, i) => (
                <TextInput
                  key={i}
                  ref={(el: TextInput | null) => { inputs.current[i] = el; }}
                  style={styles.otpInput}
                  value={v}
                  onChangeText={t => handleChange(i, t)}
                  onKeyPress={e => handleKeyPress(i, e)}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                  maxLength={1}
                  returnKeyType={i === OTP_LEN - 1 ? 'done' : 'next'}
                  textAlign="center"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              ))}
            </View>

            {!!errorText && <Text style={styles.err}>{errorText}</Text>}

            <TouchableOpacity style={styles.btn} onPress={verify}>
              <Text style={styles.btnText}>Verificar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
