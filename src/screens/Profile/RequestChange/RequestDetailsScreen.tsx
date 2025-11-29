import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { requestDetailsStyles as styles } from "./RequestDetailsScreen.styles";

interface Props {
  route: any;
  navigation: any;
}

export default function RequestDetailsScreen({ route, navigation }: Props) {
  const { item } = route.params;

  const [loading, setLoading] = useState(true);
  const [oldImg, setOldImg] = useState<string | null>(null);
  const [newImg, setNewImg] = useState<string | null>(null);

  /// <summary>
  /// Detectar si un campo pertenece a algún tipo de foto
  /// </summary>
  const isImageField = (fieldName: string) => {
    const name = fieldName.toLowerCase();
    return (
      name.includes("foto") ||
      name.includes("imagen") ||
      name.includes("image") ||
      name.includes("photo") ||
      name.includes("picture")
    );
  };

  /// <summary>
  /// Convertir base64 simple a data:image/... válido
  /// </summary>
  const convertToImage = (value: string, fieldName: string) => {
    if (!value) return null;

    // Si ya viene en formato data:image
    if (value.startsWith("data:image")) return value;

    // Si el campo corresponde a una imagen
    if (isImageField(fieldName)) {
      return `data:image/jpeg;base64,${value}`;
    }

    // Si es base64 largo (probablemente imagen)
    if (value.length > 200) {
      return `data:image/jpeg;base64,${value}`;
    }

    return null;
  };

  /// <summary>
  /// Procesar imágenes para mostrarlas en pantalla
  /// </summary>
  useEffect(() => {
    const o = convertToImage(item.oldValue, item.fieldName);
    const n = convertToImage(item.newValue, item.fieldName);

    setOldImg(o);
    setNewImg(n);

    setTimeout(() => setLoading(false), 250);
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

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

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

            {oldImg ? (
              <Image
                source={{ uri: oldImg }}
                style={{ width: 120, height: 120, borderRadius: 8 }}
              />
            ) : (
              <Text style={styles.value}>{item.oldValue || "N/A"}</Text>
            )}
          </View>

          {/* NEW VALUE */}
          <View style={styles.section}>
            <Text style={styles.label}>Nuevo valor</Text>

            {newImg ? (
              <Image
                source={{ uri: newImg }}
                style={{ width: 120, height: 120, borderRadius: 8 }}
              />
            ) : (
              <Text style={styles.value}>{item.newValue}</Text>
            )}
          </View>

          {/* REVIEWER MESSAGE */}
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
