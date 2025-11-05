import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { ApiService } from '../../services/api';
import { EventItem } from '../../types/event';
import { useUser } from '../../services/context/UserContext';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

export const AttendancesApi = new ApiService<any, any>('attendance');

export default function HomeScreen({ navigation }: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const { user } = useUser();


  /// <summary>
  /// Calcula el tiempo transcurrido entre la hora de entrada y salida en horas decimales.
  /// Si no hay hora de salida, usa la hora actual.
  /// </summary>
  /// <param name="timeOfEntry">Fecha y hora de entrada</param>
  /// <param name="timeOfExit">Fecha y hora de salida (opcional)</param>
  /// <returns>Tiempo transcurrido en horas (número decimal)</returns>
  const calculateElapsedHours = (
    timeOfEntry: string | Date,
    timeOfExit?: string | Date
  ): number => {
    const entry = new Date(timeOfEntry);
    const exit = timeOfExit ? new Date(timeOfExit) : new Date();

    const diffMs = exit.getTime() - entry.getTime(); // Diferencia en ms
    const hours = diffMs / (1000 * 60 * 60); // Convertir a horas
    return Math.round(hours * 100) / 100; // Redondear a 2 decimales
  };

  /// <summary>
  /// Obtiene todas las asistencias desde el backend.
  /// </summary>
  const fetchAll = useCallback(async () => {
    console.log("Usuario:", user?.userName);
    try {
      const resp = await AttendancesApi.getAll();
      const list = (resp?.data ?? []) as any[];

      // Agregar cálculo del tiempo transcurrido a cada asistencia
      const mapped = list.map((item) => ({
        ...item,
        elapsedHours: calculateElapsedHours(item.timeOfEntry, item.timeOfExit),
      }));

      console.log('asistencias totales:', mapped);
      setAttendances(mapped);
    } catch (e) {
      console.error('Error al cargar eventos:', e);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const goToPastEvents = useCallback(() => {
    navigation.navigate('PastEvents');
  }, [navigation]);

  const goToQrReader = useCallback(() => {
    navigation.navigate('QrReader');
  }, [navigation]);

  // Header de la lista
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
          onLeftPress={goToQrReader}
          onAction={goToPastEvents}
        />

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Últimas asistencias</Text>
        </View>
      </View>
    ),
    [query, goToPastEvents, goToQrReader]
  );

  // Filtro por búsqueda
  const filteredAttendances = useMemo(
    () =>
      attendances.filter((x) =>
        (x.accessPointOfExitName ?? '')
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [attendances, query]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filteredAttendances}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <AttendanceCard
            icon={item.icon as any}
            title={item.accessPointOfExitName ?? 'Sin nombre'}
            chip={`${item.elapsedHours}h`} 
          />
        )}
        ListFooterComponent={<View style={{ height: 24 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
