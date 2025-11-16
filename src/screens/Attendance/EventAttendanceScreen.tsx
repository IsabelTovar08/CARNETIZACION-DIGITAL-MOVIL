import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AttendanceService } from "../../services/http/attendance/AttendanceService";
import { styles } from "./EventAttendanceScreen.styles";

const BG = require("../../img/fondo.png");
const IMG_FALLBACK = require("../../img/ia.png");

export default function EventAttendanceScreen({ route, navigation }: any) {
  const { event } = route.params;

  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const attendanceService = new AttendanceService<any, any>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params: any = {
        eventId: event.id,
        page: 1,
        pageSize: 200,
        sortBy: "timeOfEntry",
        sortDir: "DESC",
      };

      if (search.trim() !== "") params.search = search;

      const resp = await attendanceService.searchAttendances(params);
      setAttendances(resp?.items ?? []);
    } catch (e) {
      console.error("Error cargando asistencias:", e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <View style={styles.colName}>
        <Text style={styles.name}>{item.personFullName}</Text>
      </View>

      <View style={styles.col}>
        <Text style={styles.time}>
          {item.timeOfEntry
            ? new Date(item.timeOfEntry).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </Text>
      </View>

      <View style={styles.col}>
        <Text style={styles.time}>
          {item.timeOfExit
            ? new Date(item.timeOfExit).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asistencias</Text>
      </View>

      {/* Info del evento */}
      <View style={styles.eventCard}>
        <Image
          source={event.imageUrl ? { uri: event.imageUrl } : IMG_FALLBACK}
          style={styles.eventImg}
        />

        <View style={styles.eventBody}>
          <Text style={styles.eventTitle}>{event.name}</Text>
          <Text style={styles.eventMeta}>
            {new Date(event.eventStart).toLocaleDateString()} •{" "}
            {new Date(event.eventStart).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <View style={{ flex: 1 }}>
          <Text
            style={styles.searchInput}
            onPress={() => {}}
            // onChangeText={setSearch}
          >
            {search}
          </Text>
        </View>
      </View>

      {/* Tabla */}
      <View style={styles.tableHeader}>
        <Text style={[styles.th, { flex: 1.4 }]}>Persona</Text>
        <Text style={styles.th}>Entrada</Text>
        <Text style={styles.th}>Salida</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 50 }}
        />
      ) : attendances.length === 0 ? (
        <Text style={styles.noData}>No hay registros...</Text>
      ) : (
        <FlatList data={attendances} renderItem={renderItem} />
      )}
    </ImageBackground>
  );
}
