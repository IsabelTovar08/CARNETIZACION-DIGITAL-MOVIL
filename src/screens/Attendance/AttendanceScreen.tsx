import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./AttendanceScreen.styles";
import { EventFullDto, EventService } from "../../services/http/attendance/eventService";

const BG_IMAGE = require("../../img/fondo-azul.png");

export default function AttendanceScreen() {
  const [events, setEvents] = useState<EventFullDto[]>([]);
  const [loading, setLoading] = useState(true);

  const eventService = new EventService<any, EventFullDto>();

  // =====================================================
  // CARGAR EVENTOS (list-full)
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
  // HANDLERS
  // =====================================================
  const handleViewAttendance = (eventId: number) => {
    console.log("📌 Ver asistencias del evento:", eventId);
  };

  const handleEditEvent = (eventId: number) => {
    console.log("✏ Editar evento:", eventId);
  };

  // =====================================================
  // RENDER DE CADA EVENTO
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
      <View style={styles.eventCard}>

        {/* TITULO */}
        <Text style={styles.eventName}>{item.name}</Text>

        {/* CODIGO */}
        <Text style={styles.eventCode}>Código: {item.code}</Text>

        {/* FECHAS */}
        <Text style={styles.eventDate}>{formattedDate}</Text>

        {/* TIPO */}
        <Text style={styles.eventType}>
          Tipo: {item.eventTypeName ?? "Sin tipo"}
        </Text>

        {/* ESTADO */}
        <Text style={styles.eventStatus}>
          Estado: {item.statusName ?? "Sin estado"}
        </Text>

        {/* PUBLICO / PRIVADO */}
        <Text style={styles.publicStatus}>
          {item.ispublic ? "Evento público" : "Evento privado"}
        </Text>

        {/* ACCESS POINTS */}
        <Text style={styles.accessTitle}>Puntos de acceso:</Text>

        {item.accessPoints.length === 0 ? (
          <Text style={styles.noAccess}>No hay puntos de acceso.</Text>
        ) : (
          item.accessPoints.map((ap: any) => (
            <View key={ap.id} style={styles.accessChipRow}>
              <Ionicons name="lock-closed-outline" size={14} color="#38BDF8" />
              <Text style={styles.accessChipText}>{ap.name}</Text>
            </View>
          ))
        )}

        {/* BOTONES */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => handleViewAttendance(item.id)}
          >
            <Ionicons name="list-outline" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>Ver asistencias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditEvent(item.id)}
          >
            <Ionicons name="create-outline" size={18} color="#0EA5E9" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
