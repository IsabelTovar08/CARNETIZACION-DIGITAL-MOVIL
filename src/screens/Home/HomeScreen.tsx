import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { styles, SHADOW } from './Home.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/image 1.png')}
        style={styles.bgFull}
        resizeMode="cover"
      />
      <View style={[styles.logoBadge, SHADOW]}>
        <Image
          source={require('../../img/icons/logo1.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido</Text>
        <TouchableOpacity
          style={[styles.primaryButton, SHADOW]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.92}
        >
          <Text style={styles.primaryButtonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
