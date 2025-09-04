import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  ListRenderItemInfo,
  ImageBackground,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { styles, CARD_W, GAP } from './Carnets.styles';

type Carnet = {
  id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  rh: string;
  telefono: string;
  email: string;
  foto: any;
  bg?: any;
};

const SCREEN_BG = require('../../img/fondo.png');

// FONDOS DIFERENTES POR CARNET
const CARD_BG_1 = require('../../img/car.jpeg');
const CARD_BG_2 = require('../../img/car2.jpeg');
const CARD_BG_3 = require('../../img/carne.jpeg');

const { width } = Dimensions.get('window');

const DATA: Carnet[] = [
  {
    id: '1234567890',
    nombre: 'Sofía Ramírez',
    cargo: 'Ingeniera de Software',
    empresa: 'MiEmpresa',
    rh: 'O+',
    telefono: '343275958345',
    email: 'sofia@miempresa.com',
    foto: require('../../img/person1.jpeg'),
    bg: CARD_BG_1,
  },
  {
    id: '9876543210',
    nombre: 'Carlos Gómez',
    cargo: 'Diseñador UX',
    empresa: 'MiEmpresa',
    rh: 'A-',
    telefono: '3001234567',
    email: 'carlos@miempresa.com',
    foto: require('../../img/person3.jpeg'),
    bg: CARD_BG_2,
  },
  {
    id: '555222333',
    nombre: 'Ana López',
    cargo: 'Analista QA',
    empresa: 'MiEmpresa',
    rh: 'B+',
    telefono: '3158881122',
    email: 'ana@miempresa.com',
    foto: require('../../img/person2.jpeg'),
    bg: CARD_BG_3,
  },
];

export default function CarnetsScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: ListRenderItemInfo<Carnet>) => {
    const inputRange = [
      (CARD_W + GAP) * (index - 1),
      (CARD_W + GAP) * index,
      (CARD_W + GAP) * (index + 1),
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92],
      extrapolate: 'clamp',
    });
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [8, 0, 8],
      extrapolate: 'clamp',
    });

    const qrPayload = JSON.stringify({
      type: 'carnet',
      version: 1,
      id: item.id,
      nombre: item.nombre,
      email: item.email,
      empresa: item.empresa,
    });

    return (
      <Animated.View style={[styles.itemWrap, { transform: [{ scale }, { translateY }] }]}>
        <View style={styles.card}>
          <ImageBackground
            source={item.bg}
            style={styles.cardBg}
            imageStyle={styles.cardBgImg}
          >
            <Text style={styles.empresa}>{item.empresa}</Text>

            <View style={styles.topRow}>
              <Image source={item.foto} style={styles.foto} />
              <View style={styles.infoTop}>
                <Text style={styles.nombre} numberOfLines={2}>{item.nombre}</Text>
                <Text style={styles.cargo}>{item.cargo}</Text>
              </View>
            </View>

            <View style={styles.twoCols}>
              <View style={styles.col}>
                <Text style={styles.label}>#ID</Text>
                <Text style={styles.value}>{item.id}</Text>
              </View>
              <View style={[styles.col, { alignItems: 'flex-end' }]}>
                <Text style={styles.label}>RH</Text>
                <Text style={styles.value}>{item.rh}</Text>
              </View>
            </View>

            <View style={styles.block}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.valueMuted}>{item.telefono}</Text>
            </View>

            <View style={styles.block}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <Text style={styles.valueMuted}>{item.email}</Text>
            </View>

            {/* QR FIJO Y MÁS ARRIBA */}
            <View style={styles.qrFixed}>
              <View style={styles.qrBorder}>
                <QRCode
                  value={qrPayload}
                  size={72}
                  backgroundColor="transparent"
                  color="#0b3b57"
                />
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.rol}>EMPLEADO</Text>
              <View style={{ width: 92 }} />
            </View>
          </ImageBackground>
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={SCREEN_BG} style={styles.bg} resizeMode="cover">
      <View style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>Tus Carnets</Text>
          <Text style={styles.subtitle}>
            Aquí encontrarás tus carnets a los cual tienes autorizados, para cualquier tipo de eventualidad
          </Text>
        </View>

        <View style={styles.carouselWrap}>
          <Animated.FlatList
            data={DATA}
            keyExtractor={(it) => it.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_W + GAP}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: (width - CARD_W) / 2 }}
            ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
            renderItem={renderItem}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          />

          <View pointerEvents="none" style={styles.dots}>
            {DATA.map((_, i) => {
              const inputRange = [
                (CARD_W + GAP) * (i - 1),
                (CARD_W + GAP) * i,
                (CARD_W + GAP) * (i + 1),
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: 'clamp',
              });
              return <Animated.View key={i} style={[styles.dot, { transform: [{ scale }], opacity }]} />;
            })}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
