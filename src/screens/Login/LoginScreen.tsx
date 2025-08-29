// screens/Login/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  ImageBackground, Image
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Login.styles';
import { login } from '../../services/auth';
import { useAuth } from '../../services/auth/AuthContext';
import { PublicStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export default function LoginScreen({}: Props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { signIn } = useAuth(); // cambia el estado global

  const onLogin = async () => {
    if (!email.trim() || !pwd.trim()) {
      setErrorMsg('Ingresa correo y contraseña.');
      return;
    }
    setErrorMsg(null);
    try {
      setLoading(true);
      // await login(email.trim(), pwd);
      // éxito → autenticar → RootNavigator muestra las tabs
      signIn();
    } catch (e: any) {
      setErrorMsg(e?.message || 'No fue posible iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../img/fondo-login.png')}
            style={styles.bgFull}
            resizeMode="cover"
          />

          <View style={styles.card}>
            <Image
              source={require('../../../assets/icons/logo1.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>Iniciar{'\n'}sesión</Text>

            <Text style={styles.label}>Digite su correo electrónico</Text>
            <View style={styles.inputWrap}>
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

            <Text style={styles.labelPwd}>Digite su contraseña</Text>
            <View style={styles.inputWrap}>
              <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.leftIcon}>
                <Path d="M7 10h10v10H7z" fill="#C7D3DD" />
                <Path d="M8 10h8v10H8z" stroke="#656d74" strokeWidth={1.2} fill="none" />
                <Path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="#8197AA" strokeWidth={2} fill="none" />
              </Svg>
              <TextInput
                value={pwd}
                onChangeText={setPwd}
                placeholder="Contraseña"
                placeholderTextColor="#98A7B5"
                secureTextEntry={!showPwd}
                autoCapitalize="none"
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPwd(s => !s)} style={styles.rightIcon}>
                {showPwd ? (
                  <Svg width={15} height={15} viewBox="0 0 15 15">
                    <Path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="#587FA3" strokeWidth={7} fill="none" />
                    <Path d="M12 9a3 3 0 1 0 0.001 6.001A3 3 0 0 0 12 9Z" fill="#587FA3" />
                  </Svg>
                ) : (
                  <Svg width={20} height={20} viewBox="0 0 24 24">
                    <Path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="#587FA3" strokeWidth={2} fill="none" />
                    <Path d="M3 3l18 18" stroke="#587FA3" strokeWidth={2} />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

            <TouchableOpacity style={styles.btn} onPress={onLogin} disabled={loading}>
              <Text style={styles.btnText}>{loading ? '...' : 'Ingresar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.forgotWrap}>
              <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
