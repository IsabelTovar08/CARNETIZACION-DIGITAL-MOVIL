/// <summary>
/// Pantalla que lista todos los eventos con colores neutrales y modal con scroll.
/// </summary>

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./PastEvents.styles";
import { ApiService } from "../../services/api";
import AuthCard from "../../components/AuthCard";
import { EventFullDto, EventService } from "../../services/http/attendance/eventService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "../../navigation/types";
import { Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG = require("../../img/fondo.png");
const IMG_FALLBACK = require("../../img/ia.png");

type Props = NativeStackScreenProps<PrivateStackParamList, "PastEvents">;

export const EventsApi = new EventService;

export default function EventsScreen({ navigation }: Props) {
  const [events, setEvents] = useState<EventFullDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventFullDto | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const resp = await EventsApi.listFull();
      const list: EventFullDto[] = (resp?.data ?? []) as EventFullDto[];

      const ordered = list.sort(
        (a, b) =>
          new Date(a.eventStart).getTime() -
          new Date(b.eventStart).getTime()
      );

      setEvents(ordered);


      setEvents(ordered);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  }, [fetchAll]);

  const openEvent = (ev: EventFullDto) => {
    setSelected(ev);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  // =====================================================
  // Tarjetas sin morado – tonos neutros profesionales
  // =====================================================
  const renderItem = ({ item }: { item: EventFullDto }) => {
    const now = new Date();
    const start = new Date(item.eventStart);
    const isPast = start < now;

    const source =
      IMG_FALLBACK;

    return (
      <TouchableOpacity
        style={[
          styles.card
        ]}
        activeOpacity={0.9}
        onPress={() => openEvent(item)}
      >
        <Image source={source} style={styles.cardImg} resizeMode="cover" />

        <LinearGradient
          colors={[
            "rgba(30,64,175,0.25)",
            "rgba(30,64,175,0.05)",
          ]}
          style={styles.cardOverlay}
        />

        <View style={styles.cardBody}>
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>{item.name}</Text>

            <View
              style={[
                styles.statusChip,
                {
                  backgroundColor: isPast
                    ? "rgba(100,116,139,0.15)"
                    : "rgba(30,64,175,0.15)", // azul suave
                },
              ]}
            >
              <Ionicons
                name={isPast ? "time-outline" : "calendar-outline"}
                size={14}
                color={isPast ? "#475569" : "#1E40AF"}
              />
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 12,
                  fontWeight: "600",
                  color: isPast ? "#475569" : "#1E40AF",
                }}
              >
                {isPast ? "Finalizado" : "Próximo"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#475569" />
            <Text style={styles.meta}>
              {new Date(item.eventStart).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color="#475569" />
              <Text style={styles.meta}>
                {new Date(item.eventStart).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="hourglass-outline" size={16} color="#475569" />
              <Text style={styles.meta}>
                {new Date(item.eventEnd).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmpty = (
    <View style={styles.emptyContainer}>
      <Ionicons name="alert-circle-outline" size={34} color="#94A3B8" />
      <Text style={styles.emptyText}>No hay eventos disponibles.</Text>
    </View>
  );

  // =====================================================
  // Modal DETALLE con SCROLL
  // =====================================================
  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Eventos</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1E40AF" style={{ marginTop: 40 }} />
        ) : !!error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(ev) => String(ev.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={!loading ? ListEmpty : null}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </ImageBackground>

      {/* MODAL CON SCROLL REAL */}
      <AuthCard visible={showModal} onClose={closeModal}>
        {!!selected && (
          <ScrollView
            style={{  maxHeight: SCREEN_HEIGHT * 0.8,   }}
          >
            <Text style={styles.modalEyebrow}>Detalle del evento</Text>
            <Text style={styles.modalTitle}>{selected.name}</Text>

            {/* DESCRIPCIÓN */}
            <Text style={styles.modalSection}>Descripción</Text>
            <View style={styles.modalBox}>
              <Text style={styles.modalDesc}>
                {selected.description ?? "Sin descripción disponible."}
              </Text>
            </View>

            {/* INFORMACIÓN */}
            <Text style={styles.modalSection}>Información</Text>
            <View style={styles.modalBox}>
              <Text style={styles.modalDesc}>Código: {selected.code}</Text>
              <Text style={styles.modalDesc}>Tipo: {selected.eventTypeName}</Text>
              <Text style={styles.modalDesc}>Estado: {selected.statusName}</Text>
              <Text style={styles.modalDesc}>
                Visibilidad: {selected.ispublic ? "Público" : "Privado"}
              </Text>
              <Text style={styles.modalDesc}>
                Inicio: {new Date(selected.eventStart).toLocaleString()}
              </Text>
              <Text style={styles.modalDesc}>
                Fin: {new Date(selected.eventEnd).toLocaleString()}
              </Text>
            </View>

            {/* ACCESS POINTS */}
            <Text style={styles.modalSection}>Puntos de acceso</Text>
            <View style={styles.modalBox}>
              {selected.accessPoints.length === 0 ? (
                <Text style={styles.modalDesc}>No hay puntos.</Text>
              ) : (
                selected.accessPoints.map((p) => (
                  <Text key={p.id} style={styles.modalDesc}>
                    • {p.name} — {p.description}
                  </Text>
                ))
              )}
            </View>

            {/* AUDIENCIAS */}
            <Text style={styles.modalSection}>Audiencias</Text>
            <View style={styles.modalBox}>
              {selected.audiences.length === 0 ? (
                <Text style={styles.modalDesc}>No hay audiencias.</Text>
              ) : (
                selected.audiences.map((a) => (
                  <Text key={a.id} style={styles.modalDesc}>
                    • {a.referenceName ?? "Sin nombre"}
                  </Text>
                ))
              )}
            </View>
          </ScrollView>
        )}
      </AuthCard>
    </SafeAreaView>
  );
}
