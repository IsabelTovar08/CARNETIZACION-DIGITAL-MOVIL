/// <summary>
/// Pantalla que lista todos los eventos con estilo moderno y fondo totalmente limpio.
/// No hay franja negra ni barra sólida en la parte superior.
/// </summary>

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./PastEvents.styles";
import { ApiService } from "../../services/api";
import { EventItem } from "../../types/event";
import AuthCard from "../../components/AuthCard";

const BG = require("../../img/fondo.png");
const IMG_FALLBACK = require("../../img/ia.png");

export const EventsApi = new ApiService<EventItem, EventItem>("event");

export default function EventsScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);

  const fetchAll = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const resp = await EventsApi.getAll();
      const list = (resp?.data ?? []) as EventItem[];

      const ordered = list.sort(
        (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
      );
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

  const openEvent = (ev: EventItem) => {
    setSelected(ev);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  /// 🔹 Renderiza cada tarjeta de evento
  const renderItem = ({ item }: { item: EventItem }) => {
    const now = new Date();
    const start = new Date(item.eventStart);
    const isPast = start < now;
    const source =
      (item as any).imageUrl ? { uri: (item as any).imageUrl } : IMG_FALLBACK;

    return (
      <TouchableOpacity
        style={[styles.card, isPast && styles.cardPast]}
        activeOpacity={0.9}
        onPress={() => openEvent(item)}
      >
        <Image source={source} style={styles.cardImg} resizeMode="cover" />

        <LinearGradient
          colors={
            isPast
              ? ["rgba(30,41,59,0.25)", "rgba(30,41,59,0.05)"]
              : ["rgba(37,99,235,0.25)", "rgba(30,41,59,0.05)"]
          }
          style={styles.cardOverlay}
        />

        <View style={styles.cardBody}>
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View
              style={[
                styles.statusChip,
                isPast ? styles.chipPast : styles.chipUpcoming,
              ]}
            >
              <Ionicons
                name={isPast ? "time-outline" : "calendar-outline"}
                size={14}
                color={isPast ? "#475569" : "#2563EB"}
              />
              <Text
                style={[
                  styles.chipText,
                  { color: isPast ? "#475569" : "#2563EB" },
                ]}
              >
                {isPast ? "Finalizado" : "Próximo"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#64748B" />
            <Text style={styles.meta}>
              {new Date(item.eventStart).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color="#64748B" />
              <Text style={styles.meta}>
                {new Date(item.eventStart).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="hourglass-outline" size={16} color="#64748B" />
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

  const ListEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={34} color="#94A3B8" />
        <Text style={styles.emptyText}>No hay eventos disponibles.</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>

      <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
        {/* Encabezado flotante sobre el fondo */}
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Eventos</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
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

      {/* Modal detalle */}
      <AuthCard visible={showModal} onClose={closeModal}>
        {!!selected && (
          <View>
            <Text style={styles.modalEyebrow}>Evento</Text>
            <Text style={styles.modalTitle}>{selected.name}</Text>

            <Image
              source={
                (selected as any).imageUrl
                  ? { uri: (selected as any).imageUrl }
                  : IMG_FALLBACK
              }
              style={styles.modalImg}
            />

            <Text style={styles.modalSection}>Descripción</Text>
            <View style={styles.modalBox}>
              <Text style={styles.modalDesc}>
                {(selected as any).description ?? "Sin descripción disponible."}
              </Text>
            </View>
          </View>
        )}
      </AuthCard>
    </SafeAreaView>
  );
}
