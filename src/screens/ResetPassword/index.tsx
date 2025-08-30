// src/screens/ResetPassword/index.tsx
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView, ImageBackground, StatusBar, View, Text, TextInput,
  TouchableOpacity, Image, Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/types';
import AuthCard from '../../components/AuthCard';
import { styles } from './ResetPassword.styles';

type Props = NativeStackScreenProps<PublicStackParamList, 'ResetPassword'>;

const BG = require('../../img/fondo-login.png');
const VAULT = require('../../img/candado.png');
const EYE = require('../../img/ojo.png');
const EYE_OFF = require('../../img/ojo.png');

export default function ResetPasswordScreen({ route, navigation }: Props) {
  const { email } = route.params;

  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const minLen = 8;
  const passOk = pass.length >= minLen;
  const matchOk = pass && pass === pass2;
  const formOk = passOk && matchOk;

  const subtitle = useMemo(() => {
    if (!pass && !pass2) return 'Cree su nueva contraseña aquí, recuerda, no la olvides';
    if (!passOk) return `Debe tener al menos ${minLen} caracteres`;
    if (!matchOk) return 'Las contraseñas no coinciden';
    return 'Todo listo, puedes actualizar';
  }, [pass, pass2, passOk, matchOk]);

  const onSubmit = () => {
    if (!formOk) return;
    // SOLO FRONT: aquí llamarías API. Por ahora volvemos atrás o a Login.
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        <AuthCard
          visible
          onClose={() => navigation.goBack()}
          title="Digite su nueva contraseña"
          subtitle={subtitle}
          logoSource={VAULT}
        >
          {/* Nueva */}
          <View style={styles.field}>
            <Text style={styles.label}>Nueva Contraseña</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value={pass}
                onChangeText={setPass}
                style={styles.input}
                placeholder="Ingrese su nueva contraseña"
                placeholderTextColor="#8aa0b4"
                secureTextEntry={!show1}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : 'password'}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow1(s => !s)}>
                <Image source={show1 ? EYE_OFF : EYE} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmación */}
          <View style={styles.field}>
            <Text style={styles.label}>Confirme su nueva contraseña</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value={pass2}
                onChangeText={setPass2}
                style={styles.input}
                placeholder="Confirme su nueva contraseña"
                placeholderTextColor="#8aa0b4"
                secureTextEntry={!show2}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : 'password'}
              />
              <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow2(s => !s)}>
                <Image source={show2 ? EYE_OFF : EYE} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Mensaje de error */}
          {!formOk && (pass || pass2) ? (
            <Text style={styles.error}>
              {!passOk ? `La contraseña debe tener al menos ${minLen} caracteres.` :
               !matchOk ? 'Las contraseñas no coinciden.' : ''}
            </Text>
          ) : <View style={{ height: 6 }} />}

          {/* Botón */}
          <TouchableOpacity
            style={[styles.primaryBtn, !formOk && { opacity: 0.6 }]}
            onPress={onSubmit}
            disabled={!formOk}
          >
            <Text style={styles.primaryBtnText}>Actualizar</Text>
          </TouchableOpacity>
        </AuthCard>
      </ImageBackground>
    </SafeAreaView>
  );
}
