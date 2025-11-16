import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { styles } from "./RequestChangeScreen.styles";
import { ModificationRequestService } from "../../../services/http/ModificationsRequests/modificationRequest";
import { ApiService } from "../../../services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../../theme/colors";

interface ModificationRequestCreateDto {
  field: number;
  reason: number;
  newValue: string;
  message?: string;
}

interface EnumOptionDto {
  id: number;
  name: string;
  code: string;
}

interface ModificationResponse {
  id: number;
  fieldName: string;
  reasonName: string;
  newValue: string;
  status: string;
  message?: string;
  requestDate: string;
}

const modificationRequestService = new ModificationRequestService<
  ModificationRequestCreateDto,
  any
>();

const apiService = new ApiService<any, any>("");

export default function RequestChangeScreen() {
  const [fields, setFields] = useState<EnumOptionDto[]>([]);
  const [reasons, setReasons] = useState<EnumOptionDto[]>([]);
  const [field, setField] = useState<number | undefined>();
  const [reason, setReason] = useState<number | undefined>();
  const [newValue, setNewValue] = useState("");
  const [message, setMessage] = useState("");

  const [responseData, setResponseData] = useState<ModificationResponse | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  // 🔹 Cargar enums
  useEffect(() => {
    const loadEnums = async () => {
      const [resFields, resReasons] = await Promise.all([
        apiService.getEnumOptions("modification-fields"),
        apiService.getEnumOptions("modification-reason"),
      ]);

      setFields(resFields || []);
      setReasons(resReasons || []);
    };
    loadEnums();
  }, []);

  const sendRequest = async () => {
    if (field === undefined || reason === undefined || !newValue.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos requeridos.");
      return;
    }

    const payload: ModificationRequestCreateDto = {
      field,
      reason,
      newValue,
      message: message.trim() || undefined,
    };

    const res = await modificationRequestService.Save(payload);

    if (res.success && res.data) {
      setResponseData(res.data);
      setShowModal(true);
      setField(undefined);
      setReason(undefined);
      setNewValue("");
      setMessage("");
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: res.message || "No se pudo enviar la solicitud.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Solicitud de cambio de datos</Text>

      {/* Campo */}
      <Text style={styles.label}>Dato que deseas modificar</Text>
      <View style={[styles.pickerContainer, { overflow: "visible" }]}>
        <Picker
          mode="dropdown"
          selectedValue={field}
          onValueChange={(v) => setField(v)}
          style={[styles.picker, { height: 48 }]}
        >
          <Picker.Item label="Selecciona un campo..." value={undefined} />
          {fields.map((f) => (
            <Picker.Item key={f.id} label={f.name} value={f.id} />
          ))}
        </Picker>
      </View>

      {/* Valor */}
      <Text style={styles.label}>Nuevo valor</Text>
      <TextInput
        placeholder="Escribe el nuevo valor"
        style={styles.input}
        value={newValue}
        onChangeText={setNewValue}
      />

      {/* Motivo */}
      <Text style={styles.label}>Motivo</Text>
      <View style={[styles.pickerContainer, { overflow: "visible" }]}>
        <Picker
          mode="dropdown"
          selectedValue={reason}
          onValueChange={(v) => setReason(v)}
          style={[styles.picker, { height: 48 }]}
        >
          <Picker.Item label="Selecciona un motivo..." value={undefined} />
          {reasons.map((r) => (
            <Picker.Item key={r.id} label={r.name} value={r.id} />
          ))}
        </Picker>
      </View>

      {/* Mensaje */}
      <Text style={styles.label}>Mensaje (opcional)</Text>
      <TextInput
        placeholder="Agrega un mensaje si lo deseas"
        style={[styles.input, styles.textArea]}
        multiline
        value={message}
        onChangeText={setMessage}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.btn} onPress={sendRequest}>
        <Text style={styles.btnText}>Enviar solicitud</Text>
      </TouchableOpacity>

      {/* 🔹 Modal de respuesta */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={colors.success}
              style={{ alignSelf: "center", marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>Solicitud enviada</Text>
            {responseData && (
              <View style={styles.modalContent}>
                <Text>
                  <Text style={styles.bold}>Campo: </Text>
                  {responseData.fieldName}
                </Text>
                <Text>
                  <Text style={styles.bold}>Motivo: </Text>
                  {responseData.reasonName}
                </Text>
                <Text>
                  <Text style={styles.bold}>Nuevo valor: </Text>
                  {responseData.newValue}
                </Text>
                <Text>
                  <Text style={styles.bold}>Estado: </Text>
                  {responseData.status}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[styles.btn, { marginTop: 20 }]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.btnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
