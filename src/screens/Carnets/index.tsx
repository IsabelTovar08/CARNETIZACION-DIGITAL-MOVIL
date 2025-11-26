import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { WebView } from 'react-native-webview';
import { useUser } from '../../services/context/UserContext';
import { IssuedCardService } from '../../services/http/card/IssuedCardService';
import { styles, CARD_WIDTH, CARD_HEIGHT, GAP } from './Carnets.styles';

const { width } = Dimensions.get('window');
const issuedCardService = new IssuedCardService();

export default function CarnetsScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { user } = useUser();
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const carnetList = useMemo(() => {
    console.log(user?.currentProfile)
    console.log(user?.otherCards)

    if (!user?.currentProfile) return [];

    const mapDto = (c: any) => ({
      id: c.id,
      name: c.name ?? c.personName,
      profile: c.profile ?? c.profileName,
      area: c.categoryArea,
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
      documentNumber: c.documentNumber
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

  const handleOpenPdf = async (id: number) => {
    console.log(carnetList)
    try {
      await issuedCardService.openPdf(id);
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
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const isFlipped = flippedId === item.id;

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

              return (
                <Animated.View
                  style={[
                    styles.cardContainer,
                    {
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <View style={styles.card}>
                    {/* ============================== */}
                    {/* FRONT SIDE */}
                    {/* ============================== */}
                    {!isFlipped ? (
                      <View style={styles.cardBackground}>
                        <WebView
                          source={{ uri: item.frontUrl }}
                          style={styles.webviewBackground}
                          javaScriptEnabled
                          scrollEnabled={false}
                          originWhitelist={['*']}
                          automaticallyAdjustContentInsets={false}
                          injectedJavaScript={`
                            const svg = document.querySelector('svg');
                            if (svg) {
                              svg.removeAttribute('width');
                              svg.removeAttribute('height');
                              svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                              svg.style.width = '100%';
                              svg.style.height = '100%';
                            }
                          `}
                          scalesPageToFit={false}
                        />

                        {/* CONTENIDO DELANTERO */}
                        <View style={styles.overlay}>
                          {/* LOGO + EMPRESA */}
                          {/* LOGO + NOMBRE EMPRESA */}
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
                            <QRCode
                              value={item.qrUrl ?? ' '}
                              size={CARD_WIDTH * 0.18}
                            />
                          </View>

                          {/* FOTO */}
                          {item.photoUrl && (
                            <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                          )}

                          {/* NOMBRE Y ÁREA (se quedan donde estaban) */}
                          <View style={styles.nameContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            {item.area && <Text style={styles.area}>{item.area}</Text>}
                            <Text style={styles.area}>{item.documentCode}</Text>
                            <Text style={styles.area}>{item.documentNumber}</Text>


                          </View>

                          {/* SOLO EL PERFIL — se mueve debajo del QR */}
                          <Text style={styles.profile}>{item.profile}</Text>


                          {/* TEL */}
                          <View style={styles.phoneContainer}>
                            <Text style={styles.label}>Teléfono</Text>
                            <Text style={styles.value}>{item.phone ?? '---'}</Text>
                          </View>

                          {/* RH */}
                          <View style={styles.rhContainer}>
                            <Text style={styles.label}>RH:</Text>
                            <Text style={styles.rhValue}>{item.rh ?? 'O+'}</Text>
                          </View>

                          {/* CORREO */}
                          <View style={styles.emailContainer}>
                            <Text style={styles.label}>Correo Electrónico</Text>
                            <Text style={styles.value}>{item.email ?? '---'}</Text>
                          </View>

                          {/* BOTÓN VER REVERSO */}
                          <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => toggleFlip(item.id)}
                          >
                            <Text style={styles.flipText}>Ver reverso</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      /* ============================== */
                      /* BACK SIDE */
                      /* ============================== */
                      <View style={styles.cardBackground}>
                        <WebView
                          source={{ uri: item.backUrl }}
                          style={styles.webviewBackground}
                          javaScriptEnabled
                          scrollEnabled={false}
                          originWhitelist={['*']}
                          automaticallyAdjustContentInsets={false}
                          injectedJavaScript={`
                            const svg = document.querySelector('svg');
                            if (svg) {
                              svg.removeAttribute('width');
                              svg.removeAttribute('height');
                              svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                              svg.style.width = '100%';
                              svg.style.height = '100%';
                            }
                          `}
                          scalesPageToFit={false}
                        />

                        {/* CONTENIDO REVERSO */}
                        <View style={styles.overlay}>
                          {/* Título */}
                          <View style={styles.backTitleContainer}>
                            <View style={styles.backTitleBox}>
                              <Text style={styles.backTitleText}>
                                Términos y{'\n'}Condiciones
                              </Text>
                            </View>
                          </View>

                          {/* Guía */}
                          <Text style={styles.backGuide}>Guía de uso</Text>
                          <Text style={styles.backBullet1}>
                            • Este carnet debe presentarse al ingresar a la empresa.
                          </Text>
                          <Text style={styles.backBullet2}>
                            • El mal uso puede generar sanciones.
                          </Text>

                          {/* Dirección */}
                          <View style={styles.backAddressContainer}>
                            <Text style={styles.backLabel}>Dirección</Text>
                            <Text style={styles.backValue}>{item.address}</Text>
                          </View>

                          {/* Contacto */}
                          <View style={styles.backContactContainer}>
                            <Text style={styles.backLabel}>Contacto</Text>
                            <Text style={styles.backContactValue}>
                              {item.phone ?? '---'}
                              {'\n'}
                              {item.email ?? '---'}
                            </Text>
                          </View>

                          {/* BOTÓN VOLVER AL FRENTE */}
                          <TouchableOpacity
                            style={styles.flipButton}
                            onPress={() => toggleFlip(item.id)}
                          >
                            <Text style={styles.flipText}>Ver frente</Text>
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
