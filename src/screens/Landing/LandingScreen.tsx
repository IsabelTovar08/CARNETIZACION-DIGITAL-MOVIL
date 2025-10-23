import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles, SHADOW } from './Landing.styles';
import { PublicStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<PublicStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  return (
    <ImageBackground
      source={require('../../img/image 1.png')}
      style={styles.container}     // Comentario (ES): que el fondo sea el contenedor
      resizeMode="cover"
    >
      <View style={[styles.logoBadge, SHADOW]}>
        <Image source={require('../../../assets/icons/logo1.png')} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido</Text>

        <TouchableOpacity
          style={[styles.primaryButton, SHADOW]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.92}
          accessibilityRole="button"
          accessibilityLabel="Ingresar"
        >
          <Text style={styles.primaryButtonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
