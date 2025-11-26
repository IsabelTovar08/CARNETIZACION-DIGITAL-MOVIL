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
import { Subscription } from "rxjs";
import { styles } from "./EventAttendanceScreen.styles";
import { attendanceSocket } from "../../services/http/attendance/attendance.socket";

const BG = require("../../img/fondo.png");
const IMG_FALLBACK = require("../../img/ia.png");

export default function EventAttendanceScreen({ route, navigation }: any) {
  const { event } = route.params;

  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Mensajito flotante
  const [liveMessage, setLiveMessage] = useState<string | null>(null);

  const attendanceService = new AttendanceService<any, any>();

  /// <summary>
  /// Cargar asistencias desde API
  /// </summary>
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

  /// <summary>
  /// Conectar WebSocket + cargar datos iniciales
  /// </summary>
  useEffect(() => {
    attendanceSocket.connect();
    fetchData();

    // Escuchar entrada / salida en tiempo real
    const sub: Subscription = attendanceSocket.events$.subscribe((event: any) => {
      if (!event) return;

      // Mostrar mensaje dependiendo del tipo
      if (event.type === "entry") {
        setLiveMessage("Nueva entrada registrada");
      } else if (event.type === "exit") {
        setLiveMessage("Nueva salida registrada");
      }

      // Quitar mensaje después de 2.5 segundos
      setTimeout(() => setLiveMessage(null), 2500);

      // Recargar tabla
      fetchData();
    });

    return () => {
      sub.unsubscribe();
      attendanceSocket.disconnect();
    };
  }, []);

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
      
      {/* Mensaje flotante */}
      {liveMessage && (
        <View
          style={{
            position: "absolute",
            top: 90,
            left: 0,
            right: 0,
            zIndex: 999,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14 }}>{liveMessage}</Text>
          </View>
        </View>
      )}

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

      {/* Tabla header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.th, { flex: 1.4 }]}>Persona</Text>
        <Text style={styles.th}>Entrada</Text>
        <Text style={styles.th}>Salida</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
      ) : attendances.length === 0 ? (
        <Text style={styles.noData}>No hay registros...</Text>
      ) : (
        <FlatList data={attendances} renderItem={renderItem} />
      )}
    </ImageBackground>
  );
}