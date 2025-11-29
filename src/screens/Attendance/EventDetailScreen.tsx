import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { EventFullDto } from "../../services/http/attendance/eventService";
import { styles } from "./EventDetailScreen.styles";
import { Ionicons } from "@expo/vector-icons";

const BG_IMAGE = require("../../img/fondo-azul.png");

export default function EventDetailScreen() {
  const route = useRoute<RouteProp<any>>();
  const event: EventFullDto = route?.params?.event;

  const start = new Date(event.eventStart);
  const end = new Date(event.eventEnd);

  const formattedDate = `${start.toLocaleDateString()} ${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`;

  return (
    <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>

        {/* 🔥 HERO */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>{event.name}</Text>
          <Text style={styles.heroSubtitle}>{formattedDate}</Text>
        </View>

        {/* 🔹 INFO PRINCIPAL */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={20} color="#0F3D91" />
            <Text style={styles.sectionHeaderText}>Información general</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Código</Text>
            <Text style={styles.value}>{event.code}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.value}>{event.eventTypeName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Estado</Text>
            <Text style={styles.value}>{event.statusName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Visibilidad</Text>
            <Text style={styles.value}>
              {event.ispublic ? "Evento público" : "Evento privado"}
            </Text>
          </View>

          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{event.description || "Sin descripción"}</Text>
        </View>

        {/* 🔹 AUDIENCIAS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={20} color="#0F3D91" />
            <Text style={styles.sectionHeaderText}>Audiencias</Text>
          </View>

          {event.audiences?.length ? (
            event.audiences.map((a) => (
              <Text key={a.id} style={styles.valueItem}>• {a.referenceName}</Text>
            ))
          ) : (
            <Text style={styles.noData}>Sin audiencias registradas.</Text>
          )}
        </View>

        {/* 🔹 HORARIOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={20} color="#0F3D91" />
            <Text style={styles.sectionHeaderText}>Horarios</Text>
          </View>

          {event.schedules?.length ? (
            event.schedules.map((s) => (
              <View key={s.id} style={{ marginBottom: 10 }}>
                <Text style={styles.valueItem}>
                  {s.name} — {s.startTime} a {s.endTime}
                </Text>
                {s.days?.length > 0 && (
                  <Text style={styles.daysText}>Días: {s.days.join(", ")}</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noData}>Sin horarios asignados.</Text>
          )}
        </View>

        {/* 🔹 PUNTOS DE ACCESO */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="lock-closed-outline" size={20} color="#0F3D91" />
            <Text style={styles.sectionHeaderText}>Puntos de acceso</Text>
          </View>

          {event.accessPoints?.length ? (
            event.accessPoints.map((ap) => (
              <View key={ap.id} style={styles.accessItem}>
                <Text style={styles.accessName}>{ap.name}</Text>
                {ap.description && <Text style={styles.accessDesc}>{ap.description}</Text>}

                <Text style={styles.qrLabel}>QR:</Text>
                <View style={styles.qrContainer}>
                  <QRCode
                    value={ap.qrCodeKey ?? ap.code ?? `AP-${ap.id}-${ap.name}`}
                    size={150}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noData}>No hay puntos de acceso registrados.</Text>
          )}
        </View>

      </ScrollView>
    </ImageBackground>
  );
}
