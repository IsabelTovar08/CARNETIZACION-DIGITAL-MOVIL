import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModificationRequestService } from "../../../services/http/ModificationsRequests/modificationRequest";
import { styles } from "./MyRequestsScreen.styles";
import colors from "../../../theme/colors";

interface ModificationRequestResponseDto {
  id: number;
  fieldName: string;
  oldValue: string;
  newValue: string;
  status: string;
  message?: string;
  requestDate: string;
}

const modificationRequestService = new ModificationRequestService<
  any,
  ModificationRequestResponseDto
>();

export default function MyRequestsScreen() {
  const [requests, setRequests] = useState<ModificationRequestResponseDto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<ModificationRequestResponseDto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const loadRequests = async () => {
    setRefreshing(true);
    const res = await modificationRequestService.getMyRequests();
    if (res.success && res.data) {
      setRequests(res.data);
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: res.message || "No se pudieron cargar las solicitudes.",
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

       {/* Botón flotante dentro del contenedor, no sobre el TabNavigator */}
        <TouchableOpacity
          style={[
            styles.fab,
            { bottom: insets.bottom + 70, right: 20 },
          ]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RequestChange" as never)}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>

      <FlatList
        data={requests}
        keyExtractor={(i) => i.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadRequests} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              setSelected(item);
              setModalVisible(true);
            }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.fieldName}>{item.fieldName}</Text>
              <View
                style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text numberOfLines={1} style={styles.cardText}>
              <Text style={styles.bold}>Nuevo valor: </Text>
              {item.newValue}
            </Text>

            <Text style={styles.cardDate}>
              {new Date(item.requestDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tienes solicitudes registradas.</Text>
        }
      />

      {/* 🔹 Modal corregido y completo */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { paddingBottom: insets.bottom + 10 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalles de la Solicitud</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color={colors.danger} />
                </TouchableOpacity>
              </View>

              {selected && (
                <>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Campo: </Text>
                    {selected.fieldName}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Valor anterior: </Text>
                    {selected.oldValue || "N/A"}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Nuevo valor: </Text>
                    {selected.newValue}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Estado: </Text>
                    <Text style={{ color: getStatusColor(selected.status), fontWeight: "700" }}>
                      {selected.status}
                    </Text>
                  </Text>
                  {selected.message && (
                    <Text style={styles.detailText}>
                      <Text style={styles.bold}>Mensaje: </Text>
                      {selected.message}
                    </Text>
                  )}
                  <Text style={styles.detailDate}>
                    {new Date(selected.requestDate).toLocaleString()}
                  </Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
