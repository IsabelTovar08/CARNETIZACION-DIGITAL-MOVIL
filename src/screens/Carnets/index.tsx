// src/screens/Carnets/CarnetsScreen.tsx
import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
  FlatList,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useUser } from '../../services/context/UserContext';
import { UserAvatarService } from '../../services/shared/UserAvatarService';
import { styles } from './Carnets.styles';

const SCREEN_BG = require('../../img/fondo.png');
const CARD_BG = require('../../img/carne.jpeg');

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88; // 88% del ancho de pantalla
const CARD_MAX = 420; // límite máximo en tablets
const GAP = 14; // separación entre carnets

export default function CarnetsScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { user } = useUser();

  // 🧠 Generar carnets reales (uno o varios)
  const carnetList = useMemo(() => {
    if (!user?.currentProfile) return [];

    // Si en un futuro hay más de un carnet, se agregarán aquí
    return [
      {
        id: user.currentProfile.uniqueId || user.currentProfile.personId.toString(),
        nombre: user.currentProfile.personName,
        cargo: user.currentProfile.profileName,
        empresa: user.currentProfile.divisionName,
        qrCode: user.currentProfile.qrCode,
        foto: user.photoUrl,
      },
    ];
  }, [user]);

  if (carnetList.length === 0) {
    return (
      <View style={[styles.bg, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: '#333', fontSize: 16 }}>No hay datos del carnet disponibles</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={SCREEN_BG} style={styles.bg} resizeMode="cover">
      <View style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.title}>Tus Carnets</Text>
          <Text style={styles.subtitle}>
            {carnetList.length > 1
              ? 'Desliza para ver tus carnets disponibles.'
              : 'Este es tu carnet institucional con código QR.'}
          </Text>
        </View>

        <View style={styles.carouselWrap}>
          <Animated.FlatList
            data={carnetList}
            keyExtractor={(it) => it.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + GAP}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2,
            }}
            ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const inputRange = [
                (CARD_WIDTH + GAP) * (index - 1),
                (CARD_WIDTH + GAP) * index,
                (CARD_WIDTH + GAP) * (index + 1),
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              });

              const qrPayload = JSON.stringify({
                type: 'carnet',
                id: item.id,
                nombre: item.nombre,
                perfil: item.cargo,
                division: item.empresa,
                qrCode: item.qrCode,
              });

              return (
                <Animated.View
                  style={{
                    width: CARD_WIDTH,
                    maxWidth: CARD_MAX,
                    aspectRatio: 1.6, // mantiene proporción tipo tarjeta
                    transform: [{ scale }],
                    opacity,
                  }}
                >
                  <View style={styles.card}>
                    <ImageBackground
                      source={CARD_BG}
                      style={{ flex: 1, padding: 16 }}
                      imageStyle={{ borderRadius: 16 }}
                      resizeMode="cover"
                    >
                      {/* Empresa / División */}
                      <Text style={styles.empresa}>{item.empresa ?? 'Institución'}</Text>

                      {/* Top Row */}
                      <View style={styles.topRow}>
                        {item.foto ? (
                          <Image source={{ uri: item.foto }} style={styles.foto} />
                        ) : (
                          <View
                            style={[
                              styles.foto,
                              {
                                backgroundColor: UserAvatarService.getBackgroundColor(
                                  UserAvatarService.getInitials(user)
                                ),
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}
                          >
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 26,
                                fontWeight: 'bold',
                              }}
                            >
                              {UserAvatarService.getInitials(user)}
                            </Text>
                          </View>
                        )}

                        <View style={styles.infoTop}>
                          <Text style={styles.nombre} numberOfLines={2}>
                            {item.nombre}
                          </Text>
                          <Text style={styles.cargo}>{item.cargo}</Text>
                        </View>
                      </View>

                      {/* ID + QR mini */}
                      <View style={styles.twoCols}>
                        <View style={styles.col}>
                          <Text style={styles.label}>#ID</Text>
                          <Text style={styles.value}>{item.id}</Text>
                        </View>
                        <View style={[styles.col, { alignItems: 'flex-end' }]}>
                          <Text style={styles.label}>QR</Text>
                          <Text style={styles.value}>{item.qrCode}</Text>
                        </View>
                      </View>

                      {/* QR principal */}
                      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <View
                          style={{
                            padding: 8,
                            borderRadius: 12,
                            backgroundColor: '#fff',
                          }}
                        >
                          <QRCode
                            value={qrPayload}
                            size={width < 400 ? 90 : 110}
                            backgroundColor="transparent"
                            color="#0b3b57"
                          />
                        </View>
                      </View>

                      {/* Footer */}
                      <View style={styles.footerRow}>
                        <Text style={styles.rol}>{item.cargo?.toUpperCase()}</Text>
                        <View style={{ width: 92 }} />
                      </View>
                    </ImageBackground>
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
