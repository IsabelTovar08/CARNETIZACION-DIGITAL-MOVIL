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
  ImageBackground,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
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
    });
    console.log('✅ Cargando carnets desde AsyncStorage/context:', user);

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tus Carnets</Text>
          <Text style={styles.subtitle}>
            Aquí encontrarás tus carnets a los cuales tienes autorizados,{'\n'}
            para cualquier tipo de eventualidad.
          </Text>
        </View>

        {/* Carrusel */}
        <View style={styles.carouselWrap}>
          <Animated.FlatList
            data={carnetList}
            horizontal
            keyExtractor={(it, index) => (it?.id ? it.id.toString() : `idx-${index}`)}
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

              const isFlipped = flippedId === item.id;

              return (
                <Animated.View style={[styles.cardContainer, { transform: [{ scale }], opacity }]}>
                  <Pressable onPress={() => toggleFlip(item.id)} style={styles.card}>
                    
                    {/* FRONT SIDE */}
                    {!isFlipped ? (
                      <ImageBackground
                        source={{ uri: item.frontUrl }}
                        style={styles.cardBackground}
                        resizeMode="cover"
                      >
                        {/* QR Code */}
                        <View style={styles.qrContainer}>
                          <QRCode
                            value={item.qrUrl ?? ' '}
                            size={CARD_WIDTH * 0.18}
                            backgroundColor="white"
                            color="#000"
                          />
                        </View>

                        {/* Photo */}
                        {item.photoUrl && (
                          <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                        )}

                        {/* Name & Profile */}
                        <View style={styles.nameContainer}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.profile}>{item.profile}</Text>
                          {item.area && <Text style={styles.area}>{item.area}</Text>}
                        </View>

                        {/* Teléfono */}
                        <View style={styles.phoneContainer}>
                          <Text style={styles.label}>Teléfono</Text>
                          <Text style={styles.value}>{item.phone ?? '---'}</Text>
                        </View>

                        {/* RH */}
                        <View style={styles.rhContainer}>
                          <Text style={styles.label}>RH:</Text>
                          <Text style={styles.rhValue}>{item.rh ?? 'O+'}</Text>
                        </View>

                        {/* Correo */}
                        <View style={styles.emailContainer}>
                          <Text style={styles.label}>Correo Electrónico</Text>
                          <Text style={styles.value}>{item.email ?? '---'}</Text>
                        </View>

                        {/* ID */}
                        <View style={styles.idContainer}>
                          <Text style={styles.idLabel}>#ID: </Text>
                          <Text style={styles.idValue}>{item.cardId ?? '---'}</Text>
                        </View>

                        {/* Botón PDF */}
                        <TouchableOpacity
                          style={styles.pdfButton}
                          onPress={() => handleOpenPdf(item.id)}
                        >
                          <Text style={styles.pdfText}>Ver PDF</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      /* BACK SIDE */
                      <ImageBackground
                        source={{ uri: item.backUrl }}
                        style={styles.cardBackground}
                        resizeMode="cover"
                      >
                        {/* Título */}
                        <View style={styles.backTitleContainer}>
                          <View style={styles.backTitleBox}>
                            <Text style={styles.backTitleText}>
                              Términos y{'\n'}Condiciones
                            </Text>
                          </View>
                        </View>

                        {/* Guía de uso */}
                        <Text style={styles.backGuide}>Guía de uso</Text>

                        <Text style={styles.backBullet1}>
                          • Este carnet debe presentarse al ingresar a las instalaciones o al
                          solicitar servicios internos de la empresa.
                        </Text>

                        <Text style={styles.backBullet2}>
                          • Cualquier alteración, mal uso o uso fraudulento del carnet está
                          estrictamente prohibido y puede conllevar sanciones disciplinarias.
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
                            {item.phone ?? '---'}{'\n'}
                            {item.email ?? '---'}
                          </Text>
                        </View>
                      </ImageBackground>
                    )}
                  </Pressable>
                </Animated.View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}