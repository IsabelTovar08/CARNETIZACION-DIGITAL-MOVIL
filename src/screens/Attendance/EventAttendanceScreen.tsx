import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
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

  // Modal detalle
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<any[]>([]);
  const [detailPerson, setDetailPerson] = useState<any>(null);

  const [liveMessage, setLiveMessage] = useState<string | null>(null);

  const attendanceService = new AttendanceService<any, any>();

  // ============================================================
  // CARGAR ASISTENCIAS
  // ============================================================
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

  // ============================================================
  // WEBSOCKET
  // ============================================================
  useEffect(() => {
    attendanceSocket.connect();
    fetchData();

    const sub: Subscription = attendanceSocket.events$.subscribe((event: any) => {
      if (!event) return;

      setLiveMessage(event.type === "entry" ? "Nueva entrada registrada" : "Nueva salida registrada");
      setTimeout(() => setLiveMessage(null), 2500);

      fetchData();
    });

    return () => {
      sub.unsubscribe();
      attendanceSocket.disconnect();
    };
  }, []);

  // ============================================================
  // MODAL DETALLE
  // ============================================================
  const openDetail = async (item: any) => {
    setDetailPerson(item);
    setDetailVisible(true);
    setDetailLoading(true);

    try {
      const res = await attendanceService.getAllByPersonEvent(item.personId, event.id);
      setDetailData(res?.data ?? []);
    } catch (e) {
      console.log("Error cargando detalle:", e);
    } finally {
      setDetailLoading(false);
    }
  };

  // ============================================================
  // RENDER ITEM
  // ============================================================
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

      {/* ICONO INFO */}
      <TouchableOpacity onPress={() => openDetail(item)} style={{ paddingHorizontal: 8 }}>
        <Ionicons name="information-circle-outline" size={22} color="#38BDF8" />
      </TouchableOpacity>
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
        <Text style={[styles.th, { width: 40 }]} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
      ) : attendances.length === 0 ? (
        <Text style={styles.noData}>No hay registros...</Text>
      ) : (
        <FlatList data={attendances} renderItem={renderItem} />
      )}

      {/* ============================================================
          MODAL DETALLE
      ============================================================ */}
      <Modal animationType="fade" transparent visible={detailVisible}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Detalles de asistencia</Text>

            {detailPerson && (
              <Text style={styles.modalSubtitle}>{detailPerson.personFullName}</Text>
            )}

            {detailLoading ? (
              <ActivityIndicator color="#38BDF8" style={{ marginVertical: 20 }} />
            ) : detailData.length === 0 ? (
              <Text style={styles.noData}>No hay asistencias registradas</Text>
            ) : (
              <View>
                {detailData.map((d, i) => (
                  <View key={i} style={styles.detailRow}>
                    <Text style={styles.detailText}>
                      Entrada:{" "}
                      {d.timeOfEntry
                        ? new Date(d.timeOfEntry).toLocaleString()
                        : "-"}
                    </Text>

                    <Text style={styles.detailText}>
                      Salida:{" "}
                      {d.timeOfExit
                        ? new Date(d.timeOfExit).toLocaleString()
                        : "-"}
                    </Text>

                    <Text style={styles.detailText}>
                      Punto entrada: {d.accessPointOfEntryName ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Punto salida: {d.accessPointOfExitName ?? "-"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setDetailVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
