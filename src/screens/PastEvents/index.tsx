// PastEventsScreen.tsx
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import AuthCard from '../../components/AuthCard';
import { styles } from './PastEvents.styles';
import { ApiService } from '../../services/api';
import { EventItem } from '../../types/event';

const BG = require('../../img/fondo.png');

// Imágenes locales (fallback)
const IMG_IA    = require('../../img/ia.png');
const IMG_GASTO = require('../../img/gasto.png');
const IMG_JAVA  = require('../../img/java.png');
const IMG_SAL   = require('../../img/sal.png');

// 👇 Tu ApiService solo recibe la entidad
export const EventsApi = new ApiService<EventItem, EventItem>('event');

// Utilidad simple para parsear fecha dd/MM/yyyy a Date
const parseDate = (ddMMyyyy: string) => {
  // asume formato "dd/MM/yyyy"
  const [dd, mm, yyyy] = ddMMyyyy.split('/').map(Number);
  return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1);
};

export default function PastEventsScreen() {
  const navigation = useNavigation();

  // Estado remoto
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);

  // Carga inicial (sin token)
  const fetchAll = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // asumiendo ApiResponse<EventItem[]>
      const resp = await EventsApi.getAll(); // 👈 sin token
      const list = (resp?.data ?? []) as EventItem[];
      console.log('Eventos totales:', list);
      setEvents(list);

      // Filtrar solo pasados y ordenar por fecha descendente
      const today = new Date();
      const past = list
        .filter(e => {
          if (!e?.date) return false;
          return parseDate(e.date) < today;
        })
        .sort((a, b) => +parseDate(b.date) - +parseDate(a.date));

      // setEvents(past);
    } catch (e: any) {
      setError(e?.message ?? 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAll();
    } finally {
      setRefreshing(false);
    }
  }, [fetchAll]);

  const openEvent = useCallback((ev: EventItem) => {
    setSelected(ev);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelected(null);
  }, []);

  const renderItem: ListRenderItem<EventItem> = useCallback(({ item }) => {
    // usa imageUrl si viene del backend, si no fallback local
    const source =
      (item as any).imageUrl
        ? { uri: (item as any).imageUrl as string }
        : (item.img ?? IMG_IA);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => openEvent(item)}
      >
        <Image source={source} style={styles.cardImg} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.row}>
            <Text style={styles.meta}>Fecha: {item.date}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.meta}>Hora inicio: {item.eventStart}</Text>
            <Text style={styles.meta}>Hora Fin: {item.eventEnd}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [openEvent]);

  const keyExtractor = useCallback((ev: EventItem) => String(ev.id), []);

  const ListEmpty = useMemo(() => (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text style={[styles.meta, { opacity: 0.7 }]}>
        No hay eventos pasados.
      </Text>
    </View>
  ), []);

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

        {/* Estados */}
        {loading && (
          <View style={{ paddingTop: 24 }}>
            <ActivityIndicator />
          </View>
        )}
        {!!error && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: '#ff6b6b' }}>{error}</Text>
          </View>
        )}

        {/* Listado */}
        <FlatList
          contentContainerStyle={styles.list}
          data={events}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={!loading ? ListEmpty : null}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ImageBackground>

      {/* Modal detalle */}
      <AuthCard visible={showModal} onClose={closeModal} logoSource={undefined}>
        {!!selected && (
          <View>
            <Text style={styles.modalEyebrow}>Evento</Text>
            <Text style={styles.modalTitle}>{selected.name}</Text>
            <Image
              source={(selected as any).imageUrl ? { uri: (selected as any).imageUrl } : (selected.img ?? IMG_GASTO)}
              style={styles.modalImg}
            />
            <Text style={styles.modalSection}>Descripción</Text>
            <View style={styles.modalBox}>
              <Text style={styles.modalDesc}>
                {(selected as any).description ?? selected.desc}
              </Text>
            </View>
          </View>
        )}
      </AuthCard>
    </SafeAreaView>
  );
}
