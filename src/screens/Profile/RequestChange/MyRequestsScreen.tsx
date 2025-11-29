import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModificationRequestService } from "../../../services/http/ModificationsRequests/modificationRequest";
import { styles } from "./MyRequestsScreen.styles";

interface ModificationRequestResponseDto {
  id: number;
  fieldName: string;     // → Tipo
  message?: string;      // → Mensaje (si existe)
  statusName: string;    // → Estado
  reasonName?: string; // → Motivo
  requestDate: string;
}

const modificationRequestService =
  new ModificationRequestService<any, ModificationRequestResponseDto>();

export default function MyRequestsScreen({ navigation }: any) {
  const [requests, setRequests] = useState<ModificationRequestResponseDto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadRequests = async () => {
    setRefreshing(true);
    try {
      const res = await modificationRequestService.getMyRequests();

      if (res?.success && res?.data) {
        setRequests(res.data);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: res?.message || "No se pudieron cargar las solicitudes.",
        });
      }
    } catch {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: "Error obteniendo solicitudes.",
      });
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "#4CAF50";
      case "Rejected":
        return "#E53935";
      default:
        return "#FFB300";
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Mis Solicitudes</Text>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 70, right: 20 }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("RequestChange" as never)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* LISTADO */}
      <FlatList
        data={requests}
        keyExtractor={(i) => i.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadRequests} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RequestDetails", { item })}
          >
            {/* Tipo + Estado */}
            <View style={styles.cardHeader}>
              <Text style={styles.fieldName}>{item.fieldName}</Text>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.statusName) },
                ]}
              >
                <Text style={styles.statusText}>{item.statusName}</Text>
              </View>
            </View>

            {/* Mensaje (si existe) */}
            {item.message && (
              <Text style={styles.cardText}>
                {item.message}
              </Text>
            )}

            {/* Motivo (si existe) */}
            {item.reasonName && (
              <Text style={[styles.cardText, { marginTop: 6 }]}>
                <Text style={styles.bold}>Motivo: </Text>
                {item.reasonName}
              </Text>
            )}

            {/* Fecha */}
            <Text style={styles.cardDate}>
              {new Date(item.requestDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tienes solicitudes registradas.</Text>
        }
      />
    </SafeAreaView>
  );
}
