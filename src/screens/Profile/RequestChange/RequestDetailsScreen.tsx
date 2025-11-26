import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { requestDetailsStyles as styles } from "./RequestDetailsScreen.styles";

interface Props {
  route: any;
  navigation: any;
}

export default function RequestDetailsScreen({ route, navigation }: Props) {
  const { item } = route.params;

  const isImage = (value: string, field: string) => {
    const f = field.toLowerCase();
    return (
      f.includes("foto") ||
      f.includes("imagen") ||
      value.startsWith("data:image")
    );
  };

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalles de la Solicitud</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.itemTitle}>{item.fieldName}</Text>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.statusName) },
              ]}
            >
              <Text style={styles.statusText}>{item.statusName}</Text>
            </View>
          </View>

          {/* OLD VALUE */}
          <View style={styles.section}>
            <Text style={styles.label}>Valor anterior</Text>

            {isImage(item.oldValue, item.fieldName) ? (
              <Image
                source={{ uri: item.oldValue }}
                style={{ width: 120, height: 120, borderRadius: 8 }}
              />
            ) : (
              <Text style={styles.value}>{item.oldValue || "N/A"}</Text>
            )}
          </View>

          {/* NEW VALUE */}
          <View style={styles.section}>
            <Text style={styles.label}>Nuevo valor</Text>

            {isImage(item.newValue, item.fieldName) ? (
              <Image
                source={{ uri: item.newValue }}
                style={{ width: 120, height: 120, borderRadius: 8 }}
              />
            ) : (
              <Text style={styles.value}>{item.newValue}</Text>
            )}
          </View>

          {/* MESSAGE */}
          {item.message && (
            <View style={styles.section}>
              <Text style={styles.label}>Mensaje del revisor</Text>
              <Text style={styles.value}>{item.message}</Text>
            </View>
          )}

          {/* DATE */}
          <View style={styles.section}>
            <Text style={styles.label}>Fecha de solicitud</Text>
            <Text style={styles.value}>
              {new Date(item.requestDate).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
