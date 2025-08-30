// src/screens/VerifyResult/index.tsx
import React from 'react';
import { SafeAreaView, ImageBackground, StatusBar, TouchableOpacity, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../navigation/types';
import AuthCard from '../../components/AuthCard';
import { styles } from './VerifyResult.styles';

type Props = NativeStackScreenProps<PublicStackParamList, 'VerifyResult'>;

const BG = require('../../img/fondo-login.png');
const CHECK = require('../../img/candado.png'); // reemplaza por tu ícono de éxito si tienes uno

export default function VerifyResultScreen({ route, navigation }: Props) {
  const { email } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        <AuthCard
          visible
          onClose={() => navigation.goBack()}
          title="Verificación exitosa"
          subtitle="Se comprobó de manera exitosa que eres tú. Ahora puedes crear tu nueva contraseña"
          logoSource={CHECK}
        >
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('ResetPassword', { email })}
          >
            <Text style={styles.primaryBtnText}>Actualizar</Text>
          </TouchableOpacity>
        </AuthCard>
      </ImageBackground>
    </SafeAreaView>
  );
}
