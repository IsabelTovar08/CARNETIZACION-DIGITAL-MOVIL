import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
  Platform
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Login.styles';

import { useAuth } from '../../services/auth/AuthContext';
import { PublicStackParamList } from '../../navigation/types';
import AuthCard from '../../components/AuthCard';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import { authService } from '../../services/auth/authService';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const { signIn } = useAuth();

  const onBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('Home' as never);
  };

  const onLogin = async () => {
    setSubmitted(true);

    if (!email.trim() || !pwd.trim()) {
      setErrorMsg(null);
      return;
    }

    setErrorMsg(null);

    try {
      setLoading(true);
      const res = await authService.login(email.trim(), pwd);

      navigation.navigate('VerifyPassword', {
        email: email.trim(),
        userId: res.data.userId
      });

    } catch (e: any) {
      setErrorMsg(e?.message || 'No fue posible iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const showEmailRequired = submitted && !email.trim();
  const showPwdRequired = submitted && !pwd.trim();

  // 🔥 CONTENIDO PRINCIPAL → se usa en ambas versiones (web/móvil)
  const content = (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/fondo-login.png')}
        style={styles.bgFull}
        resizeMode="cover"
      />

      {/* Flecha */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      >
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            d="M15 18l-6-6 6-6"
            stroke="#123C56"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Image
          source={require('../../../assets/icons/logo1.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Iniciar{'\n'}sesión</Text>

        {/* Email */}
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
            style={[
              styles.input,
              Platform.OS === 'web' && { outlineWidth: 0 }
            ]}

          />
        </View>

        {showEmailRequired && <Text style={styles.errorField}>El correo es obligatorio.</Text>}

        {/* Password */}
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
            style={[
              styles.input,
              Platform.OS === 'web' && { outlineWidth: 0 }
            ]}

          />

          <TouchableOpacity
            onPress={() => setShowPwd(s => !s)}
            style={styles.rightIcon}
          >
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="#587FA3"
                strokeWidth={2}
                fill="none"
              />
              {!showPwd && (
                <Path d="M3 3l18 18" stroke="#587FA3" strokeWidth={2} />
              )}
            </Svg>
          </TouchableOpacity>
        </View>

        {showPwdRequired && <Text style={styles.errorField}>La contraseña es obligatoria.</Text>}

        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

        <TouchableOpacity style={styles.btn} onPress={onLogin} disabled={loading}>
          <Text style={styles.btnText}>{loading ? '...' : 'Ingresar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowForgot(true)} style={styles.forgotWrap}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      {/* Card de recuperación */}
      <AuthCard
        visible={showForgot}
        onClose={() => setShowForgot(false)}
        title="¿Olvidaste Tu contraseña?"
        subtitle="Ingrese su correo electrónico"
        logoSource={require('../../../assets/icons/logo1.png')}
      >
        <ForgotPasswordForm onSuccess={() => setShowForgot(false)} />
      </AuthCard>
    </View>
  );

  // 🔥 DEVOLUCIÓN FINAL COMPATIBLE WEB + MOBILE
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS !== 'web' ? (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {content}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
}
