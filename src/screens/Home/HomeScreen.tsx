import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./Home.styles";
import { PrivateStackParamList } from "../../navigation/types";

import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import HighlightCard from "../../components/HighlightCard/HighlightCard";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiService } from "../../services/api";
import { useUser } from "../../services/context/UserContext";
import {
  AttendanceService,
  AttendanceDto,
  AttendanceSearchParams,
} from "../../services/http/attendance/AttendanceService";

const BG_IMAGE = require("../../img/fondo-azul.png");

type Props = NativeStackScreenProps<PrivateStackParamList, "Inicio">;

export const AttendancesApi = new ApiService<any, any>("attendance");

export default function HomeScreen({ navigation }: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [personId, setPersonId] = useState<number | null>(null);

  const attendanceService = new AttendanceService<any, AttendanceDto>();

  // ================================
  //  EVENTOS PRÓXIMOS
  // ================================
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const api = new ApiService<any, any>("event");
        const resp = await api.getAll();
        const list = resp?.data ?? [];

        const now = new Date();

        const filtered = list
          .filter((ev: any) => new Date(ev.eventStart) > now)
          .sort(
            (a: any, b: any) =>
              new Date(a.eventStart).getTime() -
              new Date(b.eventStart).getTime()
          )
          .slice(0, 3);

        setUpcomingEvents(filtered);
      } catch (e) {
        console.log("Error cargando eventos próximos:", e);
      }
    };

    fetchUpcoming();
  }, []);

  // ================================
  //  PERSON ID
  // ================================
  useEffect(() => {
    const id = user?.personId ?? null;
    setPersonId(id);
  }, [user]);

  // ================================
  //  BUSCAR ASISTENCIAS
  // ================================
  const fetchAttendances = async () => {
    if (!personId) {
      setAttendances([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const params: AttendanceSearchParams = {
        sortBy: "TimeOfEntry",
        sortDir: "DESC",
        page: 1,
        pageSize: 100,
        personId,
      };

      const response = await attendanceService.searchAttendances(params);
      const items = response?.items ?? [];

      const fixed = items.map((a: AttendanceDto, i: number) => ({
        ...a,
        eventName: a.eventName || `Evento ${i + 1}`,
      }));

      setAttendances(fixed);
    } catch (error) {
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, [personId]);

  // ================================
  //  NAVEGACIÓN
  // ================================
  const goToPastEvents = () =>
    navigation.navigate("PastEvents");
  const goToQrReader = () =>
    navigation.navigate("QrReader");

  // ================================
  //  FILTRO BUSCADOR
  // ================================
  const filteredAttendances = attendances.filter((x) =>
    (x.accessPointOfExitName ?? "")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.background}
        resizeMode="cover"
      >
        <FlatList
          data={filteredAttendances}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          ListFooterComponent={<View style={{ height: 24 }} />}

          ListHeaderComponent={
            <View>
              <ProfileHeader />

              <View style={styles.searchWrap}>
                <SearchBar
                  value={query}
                  onChangeText={setQuery}
                  onClear={() => setQuery("")}
                  placeholder="Buscar conferencias…"
                />
              </View>

              {/* NUEVO: EVENTOS PRÓXIMOS DINÁMICOS */}
              <HighlightCard events={upcomingEvents} />

              <SectionHeader
                title="Asistir"
                leftBadge={<Text style={styles.badge}>＋</Text>}
                onLeftPress={goToQrReader}
                onAction={goToPastEvents}
              />

              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>
                  {attendances.length === 0
                    ? "No hay asistencias registradas"
                    : "Últimas asistencias"}
                </Text>
              </View>
            </View>
          }

          renderItem={({ item }) => (
            <AttendanceCard
            icon= 'alert'
              title={item.eventName}
              chip={`${calculateElapsedHours(
                item.timeOfEntry,
                item.timeOfExit
              )}h`}
            />
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

// calcular horas transcurridas
const calculateElapsedHours = (
  timeOfEntry: string,
  timeOfExit?: string
) => {
  const entry = new Date(timeOfEntry);
  const exit = timeOfExit ? new Date(timeOfExit) : new Date();
  const diffMs = exit.getTime() - entry.getTime();
  const hours = diffMs / (1000 * 60 * 60);
  return Math.round(hours * 100) / 100;
};
