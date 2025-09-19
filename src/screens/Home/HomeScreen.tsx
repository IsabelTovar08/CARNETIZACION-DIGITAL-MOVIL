// src/screens/Home/HomeScreen.tsx
import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

type EventItem = {
  id: string;
  icon: string;
  title: string;
  chip: string;
  dateLabel: string;  // "11 de mayo del 2025"
  startTime: string;  // "11:00"
  endTime: string;    // "13:00"
};

const ATTENDANCE: EventItem[] = [
  { id: '1', icon: 'logo-electron', title: 'Conferencia de Inteligencia artificial', chip: '1h', dateLabel: '11 de mayo del 2025', startTime: '11:00', endTime: '13:00' },
  { id: '2', icon: 'cafe-outline', title: 'Conceptos básicos en Java',              chip: '3h', dateLabel: '18 de mayo del 2025', startTime: '09:00', endTime: '12:00' },
  { id: '3', icon: 'calendar-outline', title: 'Arquitectura de Software',           chip: 'Ayer', dateLabel: '10 de mayo del 2025', startTime: '14:00', endTime: '17:00' },
  { id: '4', icon: 'code-working-outline', title: 'Clean Code y SOLID',             chip: 'Lun', dateLabel: '12 de mayo del 2025', startTime: '08:00', endTime: '10:00' },
  { id: '5', icon: 'school-outline', title: 'Patrones de diseño',                   chip: 'Mañana', dateLabel: '19 de mayo del 2025', startTime: '10:00', endTime: '12:00' },
  { id: '6', icon: 'school-outline', title: 'Microservicios en la práctica',        chip: 'Mañana', dateLabel: '20 de mayo del 2025', startTime: '13:00', endTime: '16:00' },
  { id: '7', icon: 'school-outline', title: 'Optimización de consultas SQL',        chip: 'Mañana', dateLabel: '21 de mayo del 2025', startTime: '15:00', endTime: '18:00' },
];

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [visible, setVisible] = useState(false);

  const goToPastEvents = useCallback(() => {
    navigation.navigate('PastEvents');
  }, [navigation]);

  const goToQrReader = useCallback(() => {
    navigation.navigate('QrReader');
  }, [navigation]);

  const openEvent = useCallback((item: EventItem) => {
    setSelected(item);
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => setSelected(null), 200);
  }, []);

  // Header superior (no abre modal)
  const listHeader = useMemo(
    () => (
      <View>
        <ProfileHeader />

        <View style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery('')}
            placeholder="Buscar conferencias…"
          />
        </View>

        <HighlightCard />

        <SectionHeader
          title="Asistir"
          leftBadge={<Text style={styles.badge}>＋</Text>}
          onLeftPress={goToQrReader}   // Lector QR
          onAction={goToPastEvents}    // Navega a eventos pasados
        />

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Últimas asistencias</Text>
        </View>
      </View>
    ),
    [query, goToPastEvents, goToQrReader]
  );

  // Filtrado de "Últimas asistencias"
  const data = useMemo(
    () => ATTENDANCE.filter(x => x.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          // Contenedor relativo para la superposición táctil
          <View style={styles.cardWrap}>
            <AttendanceCard
              icon={item.icon as any}
              title={item.title}
              chip={item.chip}
            />
            {/* Capa invisible que captura el tap en toda la card */}
            <Pressable
              onPress={() => openEvent(item)}
              style={styles.cardTapOverlay}
              android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
              accessibilityRole="button"
              accessibilityLabel={`Abrir detalles de ${item.title}`}
            />
          </View>
        )}
        ListFooterComponent={<View style={{ height: 24 }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* ===== Modal Genérico (para Últimas asistencias) ===== */}
      <Modal visible={visible} animationType="fade" transparent onRequestClose={closeModal}>
        <Pressable style={styles.modalBackdrop} onPress={closeModal}>
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selected?.title ?? ''}</Text>

            <View style={styles.pill}>
              <Text style={styles.pillText}>Fecha: {selected?.dateLabel ?? '-'}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>Hora Inicio: {selected?.startTime ?? '-'}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>Hora Final: {selected?.endTime ?? '-'}</Text>
            </View>

            <Pressable style={styles.modalCloseBtn} onPress={closeModal}>
              <Text style={styles.modalCloseTxt}>Cerrar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
