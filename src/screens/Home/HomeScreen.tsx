import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { ApiService } from '../../services/api';
import { useUser } from '../../services/context/UserContext';
import { AttendanceService, AttendanceDto } from '../../services/http/attendance/AttendanceService';

const BG_IMAGE = require('../../img/fondo-azul.png');

type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

export const AttendancesApi = new ApiService<any, any>('attendance');

export default function HomeScreen({ navigation }: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [personId, setPersonId] = useState<number | null>(null);
  const [eventId, setEventId] = useState<number | undefined>();
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const attendanceService = new AttendanceService<any, AttendanceDto>();

  // =====================================================================================
  //   OBTENER PERSON ID — CON LOGS
  // =====================================================================================
  useEffect(() => {
    console.log("🟦 USER CONTEXT RECIBIDO:", user);

    const id = user?.personId ?? null;
    setPersonId(id);

    if (id) {
      console.log("🟩 PERSON ID DETECTADO:", id);
    } else {
      console.log("🟥 NO EXISTE PERSON ID EN EL PERFIL");
    }
  }, [user]);

  // =====================================================================================
  //   PETICIÓN A LA API — CON LOGS
  // =====================================================================================
  const fetchAttendances = async () => {
    console.log("🚀 EJECUTANDO fetchAttendances()");

    setLoading(true);

    try {
      const params: any = {
        sortBy: "TimeOfEntry",
        sortDir: "DESC",
        page: 1,
        pageSize: 100,
        personId: personId, // SIEMPRE SE ENVÍA
      };

      console.log("📡 PARAMS ENVIADOS A attendance/search:", params);

      const response = await attendanceService.searchAttendances(params);

      console.log("✅ RESPUESTA attendance/search:", response);

      const items = response?.items ?? [];

      const fixed = items.map((a: AttendanceDto, i: number) => ({
        ...a,
        eventName: a.eventName || `Evento ${i + 1}`,
      }));

      setAttendances(fixed);

    } catch (error) {
      console.error("❌ ERROR EN PETICIÓN DE ASISTENCIAS:", error);
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================================================
  //   CALCULAR HORAS
  // =====================================================================================
  const calculateElapsedHours = (timeOfEntry: string | Date, timeOfExit?: string | Date): number => {
    const entry = new Date(timeOfEntry);
    const exit = timeOfExit ? new Date(timeOfExit) : new Date();
    const diffMs = exit.getTime() - entry.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    return Math.round(hours * 100) / 100;
  };

  // =====================================================================================
  //   EJECUTAR PETICIÓN AUTOMÁTICAMENTE AL TENER PERSON ID
  // =====================================================================================
  useEffect(() => {
    console.log("🟨 personId CAMBIÓ A:", personId);

    // SIEMPRE HACER LA PETICIÓN (aunque personId sea null)
    fetchAttendances();
  }, [personId]);

  const goToPastEvents = useCallback(() => navigation.navigate('PastEvents'), [navigation]);
  const goToQrReader = useCallback(() => navigation.navigate('QrReader'), [navigation]);

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

  const filteredAttendances = useMemo(
    () =>
      attendances.filter((x) =>
        (x.accessPointOfExitName ?? '').toLowerCase().includes(query.toLowerCase())
      ),
    [attendances, query]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">

        <FlatList
          data={filteredAttendances}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}

          ListHeaderComponent={listHeader}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}

          // =========================================================
          // 🚀 SI NO HAY ASISTENCIAS → MENSAJE CENTRADO
          // =========================================================
          ListEmptyComponent={() =>
            !loading && (
              <View style={{ paddingTop: 40, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                  No hay asistencias recientes.
                </Text>
              </View>
            )
          }

          renderItem={({ item }) => (
            <AttendanceCard
              icon={item.icon as any}
              title={item.eventName ?? 'Sin nombre'}
              chip={`${calculateElapsedHours(item.timeOfEntry, item.timeOfExit)}h`}
            />
          )}

          ListFooterComponent={<View style={{ height: 24 }} />}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
