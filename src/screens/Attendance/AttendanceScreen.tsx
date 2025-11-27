import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Platform
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./AttendanceScreen.styles";
import { EventFullDto, EventService } from "../../services/http/attendance/eventService";
import { useNavigation } from "@react-navigation/native";

const BG_IMAGE = require("../../img/fondo-azul.png");

export default function AttendanceScreen() {
  const [events, setEvents] = useState<EventFullDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const eventService = new EventService<any, EventFullDto>();

  // =====================================================
  // CARGAR EVENTOS
  // =====================================================
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await eventService.listFull();

      if (res?.success && Array.isArray(res?.data)) {
        setEvents(res.data);
      } else {
        setEvents([]);
      }
    } catch (e) {
      console.error("Error cargando eventos:", e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =====================================================
  // BOTONES
  // =====================================================
  const handleViewAttendance = (event: EventFullDto) => {
    navigation.navigate("EventAttendance", { event });
  };

  const handleEditEvent = (event: EventFullDto) => {
    navigation.navigate("EditEvent", { event }); // el que tú uses
  };

  // =====================================================
  // RENDER EVENTO
  // =====================================================
  const renderEvent = ({ item }: { item: EventFullDto }) => {
    const start = new Date(item.eventStart);
    const end = new Date(item.eventEnd);

    const formattedDate = `${start.toLocaleDateString()} ${start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })} - ${end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}`;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("EventDetail", { event: item })}
        style={[
          styles.eventCard,
          Platform.OS === "web" && { boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }
        ]}
      >
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventCode}>Código: {item.code}</Text>
        <Text style={styles.eventDate}>{formattedDate}</Text>
        <Text style={styles.eventType}>Tipo: {item.eventTypeName ?? "Sin tipo"}</Text>
        <Text style={styles.eventStatus}>Estado: {item.statusName ?? "Sin estado"}</Text>
        <Text style={styles.publicStatus}>
          {item.ispublic ? "Evento público" : "Evento privado"}
        </Text>

        {/* AccessPoints */}
        <Text style={styles.accessTitle}>Puntos de acceso:</Text>
        {item.accessPoints.length === 0 ? (
          <Text style={styles.noAccess}>No hay puntos de acceso</Text>
        ) : (
          item.accessPoints.map((ap) => (
            <View key={ap.id} style={styles.accessChipRow}>
              <Ionicons name="lock-closed-outline" size={14} color="#38BDF8" />
              <Text style={styles.accessChipText}>{ap.name}</Text>
            </View>
          ))
        )}

        {/* =====================================================
            BOTONES EXACTAMENTE COMO EN PastEvents
        ====================================================== */}
        <View style={styles.buttonsRow}>

          {/* 🔵 VER ASISTENCIAS (Mismo formato que el modal PastEvents) */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate("EventAttendance", { event: item });
            }}
          >
            <Ionicons name="people-outline" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>Ver asistencias</Text>
          </TouchableOpacity>

          {/* ✏ EDITAR */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate("EditEvent", { event: item });
            }}
          >
            <Ionicons name="create-outline" size={18} color="#0EA5E9" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

        </View>

      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Eventos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#38BDF8" />
        ) : events.length === 0 ? (
          <Text style={styles.noData}>No hay eventos disponibles.</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(e) => e.id.toString()}
            renderItem={renderEvent}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </ImageBackground>
  );
}
