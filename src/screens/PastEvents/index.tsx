import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import AuthCard from '../../components/AuthCard';
import { styles } from './PastEvents.styles';

const BG = require('../../img/fondo.png');

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
  img: any;
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
          <View style={styles.headerSpacer} />
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
                <View style={styles.rowSpace}>
                  <Text style={styles.meta}>Hora inicio: {ev.start}</Text>
                  <Text style={styles.meta}>Hora Fin: {ev.end}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.footerSpace} />
        </ScrollView>
      </ImageBackground>

      {/* Modal detalle — solo se cierra con la X del AuthCard */}
      <AuthCard visible={showModal} onClose={closeModal} logoSource={undefined}>
        {!!selected && (
          <View>
            {/* Flecha interna eliminada */}
            <Text style={styles.modalEyebrow}>Evento</Text>
            <Text style={styles.modalTitle}>{selected.title}</Text>

            <Image source={selected.img} style={styles.modalImg} />

            <Text style={styles.modalSection}>Descripción</Text>
            <View style={styles.modalBox}>
              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDesc}>{selected.desc}</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </AuthCard>
    </SafeAreaView>
  );
}
