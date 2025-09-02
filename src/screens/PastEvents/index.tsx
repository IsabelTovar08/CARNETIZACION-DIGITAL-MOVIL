// src/screens/PastEvents/index.tsx
import React, { useMemo, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import AuthCard from '../../components/AuthCard';

// ===== Fondo local
const BG = require('../../img/fondo.png');

// ===== Imágenes locales de eventos (ajusta nombres/rutas)
const IMG_IA    = require('../../img/ia.png');
const IMG_GASTO = require('../../img/gasto.png');
const IMG_JAVA  = require('../../img/java.png');
const IMG_SAL   = require('../../img/sal.png');

type EventItem = {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  img: any;          // require(...)
  desc: string;
};

const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Conferencia de Inteligencia artificial',
    date: '11/05/2025',
    start: '11:00 a.m',
    end: '13:00 p.m',
    img: IMG_IA,
    desc:
      '¡Descubre el fascinante mundo de la inteligencia artificial! ' +
      'Este evento está diseñado para aprendices y entusiastas que desean iniciarse en una de las áreas más revolucionarias.',
  },
  {
    id: '2',
    title: 'Conferencia de conceptos',
    date: '20/06/2025',
    start: '08:30 a.m',
    end: '10:00 a.m',
    img: IMG_GASTO,
    desc:
      'Repaso ágil de conceptos base de programación y buenas prácticas para fortalecer tu lógica y claridad al codificar.',
  },
  {
    id: '3',
    title: 'Taller de Java',
    date: '01/07/2025',
    start: '02:00 p.m',
    end: '05:00 p.m',
    img: IMG_JAVA,
    desc:
      'Construye una app completa en Java paso a paso: desde colecciones hasta manejo de errores y pruebas.',
  },
  {
    id: '4',
    title: 'Seminario de UX',
    date: '15/07/2025',
    start: '09:00 a.m',
    end: '12:00 p.m',
    img: IMG_SAL,
    desc:
      'Explora fundamentos de UX/UI: jerarquía visual, accesibilidad y microinteracciones con ejemplos prácticos.',
  },
];

export default function PastEventsScreen() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);

  const openEvent = useCallback((ev: EventItem) => {
    setSelected(ev);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelected(null);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Path d="M15 18l-6-6 6-6" stroke="#E4F0F8" strokeWidth={2.2} fill="none" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.title}>
            Eventos{'\n'}<Text style={styles.title2}>Pasados</Text>
          </Text>
          <View style={{ width: 26 }} />
        </View>

        {/* Listado */}
        <ScrollView contentContainerStyle={styles.list}>
          {EVENTS.map(ev => (
            <TouchableOpacity key={ev.id} style={styles.card} activeOpacity={0.85} onPress={() => openEvent(ev)}>
              <Image source={ev.img} style={styles.cardImg} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{ev.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.meta}>Fecha: {ev.date}</Text>
                </View>
                <View style={[styles.row, { justifyContent: 'space-between', marginTop: 6 }]}>
                  <Text style={styles.meta}>Hora inicio: {ev.start}</Text>
                  <Text style={styles.meta}>Hora Fin: {ev.end}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 24 }} />
        </ScrollView>
      </ImageBackground>

      {/* ===== MODAL DETALLE (AuthCard reutilizable) ===== */}
      <AuthCard
        visible={showModal}
        onClose={closeModal}
        // sin título/subtítulo del AuthCard para tener control total del layout interno
        logoSource={undefined}
      >
        {!!selected && (
          <View>
            {/* Flecha dentro de la card (opcional, además del botón ✕ de AuthCard) */}
            <TouchableOpacity onPress={closeModal} style={{ marginBottom: 6, alignSelf: 'flex-start' }}>
              <Svg width={22} height={22} viewBox="0 0 24 24">
                <Path d="M15 18l-6-6 6-6" stroke="#6A7F91" strokeWidth={2} fill="none" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>

            <Text style={styles.modalEyebrow}>Evento</Text>
            <Text style={styles.modalTitle}>{selected.title}</Text>

            <Image source={selected.img} style={styles.modalImg} />

            <Text style={styles.modalSection}>Descripción</Text>
            <View style={styles.modalBox}>
              <ScrollView style={{ maxHeight: 160 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDesc}>{selected.desc}</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </AuthCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  bg: { flex: 1 },

  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { color: '#0f3a54', fontSize: 30, fontWeight: '900', lineHeight: 32 },
  title2: { color: '#0f3a54' },

  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
    elevation: 3,
  },
  cardImg: { width: '100%', height: 160 },
  cardBody: { padding: 12 },
  cardTitle: { color: '#1b3e56', fontSize: 16, fontWeight: '800', marginBottom: 4, textTransform: 'capitalize' },
  row: { flexDirection: 'row', alignItems: 'center' },
  meta: { color: '#334e64' },

  // ===== estilos del contenido del modal =====
  modalEyebrow: { color: '#6A7F91', fontSize: 13, marginBottom: 6 },
  modalTitle: { color: '#222E39', fontSize: 22, fontWeight: '900', marginBottom: 8, lineHeight: 26 },
  modalImg: { width: '100%', height: 170, borderRadius: 12, marginBottom: 12 },
  modalSection: { color: '#223F53', fontSize: 16, fontWeight: '800', marginTop: 4, marginBottom: 8 },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD7E1',
    padding: 10,
  },
  modalDesc: { color: '#2B3F52', lineHeight: 20 },
});
