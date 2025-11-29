import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { WebView } from 'react-native-webview';
import { useUser } from '../../services/context/UserContext';
import { IssuedCardService } from '../../services/http/card/IssuedCardService';
import { styles, CARD_WIDTH, GAP } from './Carnets.styles';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const issuedCardService = new IssuedCardService();

export default function CarnetsScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { user } = useUser();
  const [flippedId, setFlippedId] = useState<number | null>(null);

  // 🔵 índice actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  const carnetList = useMemo(() => {
    if (!user?.currentProfile) return [];

    const mapDto = (c: any) => ({
      id: c.id,
      name: c.name ?? c.personName,
      profile: c.profile ?? c.profileName,
      area: c.categoryArea,
      internalDivisionName: c.internalDivisionName,
      organizationalUnit: c.organizationalUnit,
      phone: c.phoneNumber,
      email: c.email,
      cardId: c.cardId,
      rh: c.bloodTypeValue,
      company: c.companyName,
      frontUrl: c.frontTemplateUrl,
      backUrl: c.backTemplateUrl,
      qrUrl: c.qrUrl,
      photoUrl: c.userPhotoUrl,
      address: c.address || 'Calle A\nNeiva, Huila',
      logo: c.logoUrl,
      companyName: c.companyName,
      documentCode: c.documentCode,
      documentNumber: c.documentNumber,
    });

    const current = mapDto(user.currentProfile);
    const others = (user.otherCards ?? []).map(mapDto);

    return [current, ...others];
  }, [user]);

  if (!carnetList.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay carnets disponibles</Text>
      </View>
    );
  }

  // ============================
  // PDF SEGÚN TARJETA VISIBLE
  // ============================
  const handleOpenPdf = async () => {
    try {
      const cardId = carnetList[currentIndex].id; // ← AHORA SÍ EL CORRECTO
      await issuedCardService.openPdf(cardId);
    } catch {
      Alert.alert('Error', 'No se pudo abrir el PDF.');
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.bg}>
      <View style={styles.safe}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Tus Carnets</Text>
          <Text style={styles.subtitle}>
            Aquí encontrarás tus carnets a los cuales tienes autorizados,{'\n'}
            para cualquier tipo de eventualidad.
          </Text>
        </View>

        {/* BOTÓN FLOTANTE PARA PDF */}
        <TouchableOpacity
          onPress={handleOpenPdf}
          style={{
            position: 'absolute',
            top: 110,
            right: 25,
            zIndex: 999,
            backgroundColor: '#ffffffdd',
            padding: 10,
            borderRadius: 40,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          }}
        >
          <Ionicons name="download-outline" size={26} color="#000" />
        </TouchableOpacity>

        {/* CAROUSEL */}
        <View style={styles.carouselWrap}>
          <Animated.FlatList
            data={carnetList}
            horizontal
            keyExtractor={(it, index) =>
              it?.id ? it.id.toString() : `idx-${index}`
            }
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + GAP}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2,
            }}
            ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: true,
                listener: (e: any) => {
                  const x = e.nativeEvent.contentOffset.x;
                  const index = Math.round(x / (CARD_WIDTH + GAP));
                  setCurrentIndex(index);
                },

              }
            )}
            renderItem={({ item }) => {
              const isFlipped = flippedId === item.id;

              return (
                <Animated.View style={styles.cardContainer}>
                  <View style={styles.card}>

                    {/* FRONT */}
                    {!isFlipped ? (
                      <View style={styles.cardBackground}>
                        <WebView
                          source={{ uri: item.frontUrl }}
                          style={styles.webviewBackground}
                          javaScriptEnabled
                          scrollEnabled={false}
                          originWhitelist={['*']}
                        />

                        <View style={styles.overlay}>
                          {/* LOGO */}
                          <View style={styles.companyContainer}>
                            {item.logo && (
                              <Image
                                source={{ uri: `data:image/png;base64,${item.logo}` }}
                                style={styles.companyLogo}
                              />
                            )}
                            {item.company && (
                              <Text style={styles.companyName}>{item.company}</Text>
                            )}
                          </View>

                          {/* QR */}
                          <View style={styles.qrContainer}>
                            <QRCode value={item.qrUrl ?? ''} size={CARD_WIDTH * 0.18} />
                          </View>

                          {/* FOTO O PLACEHOLDER */}
                          {item.photoUrl ? (
                            <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                          ) : (
                            <View
                              style={[
                                styles.photo,
                                {
                                  backgroundColor: 'rgba(0,0,0,0.15)',
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                  borderColor: 'rgba(255,255,255,0.3)',
                                },
                              ]}
                            >
                              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                                SIN FOTO
                              </Text>
                            </View>
                          )}

                          {/* NOMBRE Y INFO */}
                          <View style={styles.nameContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.area}>
                              {item.documentCode} - {item.documentNumber}
                            </Text>
                            {item.internalDivisionName && (
                              <Text style={styles.area}>{item.internalDivisionName}</Text>
                            )}
                          </View>

                          <Text style={styles.profile}>{item.profile}</Text>

                          {/* CONTACTO */}
                          <View style={styles.phoneContainer}>
                            <Text style={styles.label}>{item.organizationalUnit}</Text>

                            <Text style={styles.label}>Teléfono</Text>
                            <Text style={styles.value}>{item.phone ?? '---'}</Text>
                          </View>

                          <View style={styles.rhContainer}>
                            <Text style={styles.label}>RH:</Text>
                            <Text style={styles.rhValue}>{item.rh ?? 'O+'}</Text>
                          </View>

                          <View style={styles.emailContainer}>
                            <Text style={styles.label}>Correo Electrónico</Text>
                            <Text style={styles.value}>{item.email ?? '---'}</Text>
                          </View>

                          {/* BOTÓN REVERSO */}
                          <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => toggleFlip(item.id)}
                          >
                            <Ionicons name="swap-horizontal" size={20} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      // BACK
                      <View style={styles.cardBackground}>
                        <WebView
                          source={{ uri: item.backUrl }}
                          style={styles.webviewBackground}
                          javaScriptEnabled
                          scrollEnabled={false}
                          originWhitelist={['*']}
                        />

                        <View style={styles.overlay}>
                          <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => toggleFlip(item.id)}
                          >
                            <Ionicons name="swap-horizontal" size={20} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </Animated.View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
