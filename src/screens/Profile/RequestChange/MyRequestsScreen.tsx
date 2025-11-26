import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModificationRequestService } from "../../../services/http/ModificationsRequests/modificationRequest";
import { styles } from "./MyRequestsScreen.styles";

interface ModificationRequestResponseDto {
  id: number;
  fieldName: string;
  oldValue: string;
  newValue: string;
  statusName: string;
  message?: string;
  requestDate: string;
}

const modificationRequestService = new ModificationRequestService<
  any,
  ModificationRequestResponseDto
>();
interface Props {
  navigation: any;
}

export default function MyRequestsScreen({navigation} : Props) {
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
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: "Error obteniendo solicitudes.",
      });
    }

    setRefreshing(false);
  };

  const isImage = (value: string, field: string) => {
    const f = field.toLowerCase();
    return (
      f.includes("foto") ||
      f.includes("imagen") ||
      value.startsWith("data:image")
    );
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

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 70, right: 20 }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("RequestChange" as never)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

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
            onPress={() =>
              navigation.navigate("RequestDetails", { item })
            }
          >
            {/* Header */}
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

            {/* Nuevo valor */}
            <View style={{ marginVertical: 6 }}>
              <Text style={styles.bold}>Nuevo valor:</Text>

              {isImage(item.newValue, item.fieldName) ? (
                <Image
                  source={{ uri: item.newValue }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginTop: 6,
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Text numberOfLines={1} style={styles.cardText}>
                  {item.newValue}
                </Text>
              )}
            </View>

            {/* Fecha */}
            <Text style={styles.cardDate}>
              {new Date(item.requestDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tienes solicitudes registradas.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
