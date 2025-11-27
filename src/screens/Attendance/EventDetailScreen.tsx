import React from "react";
import { View, Text, ScrollView, ImageBackground, Platform } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { EventFullDto } from "../../services/http/attendance/eventService";
import { styles } from "./EventDetailScreen.styles";

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

        {/* TITULO */}
        <Text style={styles.title}>{event.name}</Text>

        {/* INFORMACION PRINCIPAL */}
        <View style={styles.card}>
          <Text style={styles.label}>Código:</Text>
          <Text style={styles.value}>{event.code}</Text>

          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{event.description ?? "Sin descripción"}</Text>

          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{event.eventTypeName ?? "Sin tipo"}</Text>

          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{event.statusName ?? "Sin estado"}</Text>

          <Text style={styles.label}>Rango de fecha:</Text>
          <Text style={styles.value}>{formattedDate}</Text>

          <Text style={styles.label}>Visibilidad:</Text>
          <Text style={styles.value}>
            {event.ispublic ? "Evento público" : "Evento privado"}
          </Text>
        </View>

        {/* ACCESS POINTS */}
        <Text style={styles.sectionTitle}>Puntos de acceso</Text>

        {event.accessPoints.length === 0 ? (
          <Text style={styles.noData}>No hay puntos de acceso registrados.</Text>
        ) : (
          event.accessPoints.map((ap) => (
            <View
              key={ap.id}
              style={[
                styles.accessCard,
                Platform.OS === "web" && { boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }
              ]}
            >
              <Text style={styles.accessName}>{ap.name}</Text>
              <Text style={styles.accessDesc}>{ap.description}</Text>

              <Text style={styles.qrLabel}>QR del punto de acceso:</Text>

              <View style={styles.qrContainer}>
                <QRCode
                  value={
                    ap.qrCodeKey ??
                    ap.code ??
                    `AP-${ap.id}-${ap.name}` // fallback si ningún código existe
                  }
                  size={180}
                />
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </ImageBackground>
  );
}
