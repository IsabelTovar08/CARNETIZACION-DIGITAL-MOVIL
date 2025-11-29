import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { styles } from "./RequestChangeScreen.styles";
import { ModificationRequestService } from "../../../services/http/ModificationsRequests/modificationRequest";
import { ApiService } from "../../../services/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../../theme/colors";
import { AdaptiveInput } from "./AdaptiveInput";

/* ------------------------------------------
   DTOs
---------------------------------------------*/
interface ModificationRequestCreateDto {
  field: number;
  reason: number;
  newValue: string;
  message?: string;
  oldValue?: string;
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
  statusName: string;
  oldValue?: string;
  requestDate: string;
}

/* ------------------------------------------
   Services
---------------------------------------------*/
const modificationRequestService =
  new ModificationRequestService<ModificationRequestCreateDto, any>();

const apiService = new ApiService<any, any>("");

/* ------------------------------------------
   COMPONENT
---------------------------------------------*/
export default function RequestChangeScreen({ navigation }: any) {
  const [fields, setFields] = useState<EnumOptionDto[]>([]);
  const [reasons, setReasons] = useState<EnumOptionDto[]>([]);

  const [field, setField] = useState<number | undefined>();
  const [reason, setReason] = useState<number | undefined>();
  const [newValue, setNewValue] = useState("");
  const [message, setMessage] = useState("");

  const [selectedFieldCode, setSelectedFieldCode] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  /* ------------------------------------------
     Cargar enumeraciones desde backend
  ---------------------------------------------*/
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

  /* ------------------------------------------
     Enviar solicitud de cambio
  ---------------------------------------------*/
  const sendRequest = async () => {
    if (field === undefined || reason === undefined || !newValue.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa todos los campos requeridos."
      );
      return;
    }

    setLoading(true);

    const payload: ModificationRequestCreateDto = {
      field: Number(field), // 🔥 aseguramos número
      reason: Number(reason), // 🔥 aseguramos número
      oldValue: "",
      newValue,
      message: message.trim() || undefined,
    };

    console.log("PAYLOAD ENVIADO:", payload);

    const res = await modificationRequestService.Save(payload);

    setLoading(false);

    if (res.success && res.data) {
      const data: ModificationResponse = res.data;

      // Convertir base64 si es una imagen
      const isImage =
        data.fieldName.toLowerCase().includes("foto") ||
        data.newValue.startsWith("data:image");

      if (isImage && !data.newValue.startsWith("data:image")) {
        data.newValue = `data:image/jpeg;base64,${data.newValue}`;
      }

      navigation.navigate("RequestDetails", { item: data });

      // Reset
      setField(undefined);
      setReason(undefined);
      setNewValue("");
      setMessage("");
      setSelectedFieldCode(null);
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

      {/* -------------- CAMPO A MODIFICAR -------------- */}
      <Text style={styles.label}>Dato que deseas modificar</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={field}
          onValueChange={(v) => {
            const numeric = Number(v); // 🔥 convertir a número
            setField(numeric);

            const found = fields.find((f) => f.id === numeric);
            setSelectedFieldCode(found?.code || null);
            setNewValue("");
          }}
        >
          <Picker.Item label="Selecciona un campo..." value={undefined} />
          {fields.map((f) => (
            <Picker.Item key={f.id} label={f.name} value={f.id} />
          ))}
        </Picker>
      </View>

      {/* -------------- NUEVO VALOR -------------- */}
      <Text style={styles.label}>Nuevo valor</Text>
      <AdaptiveInput
        fieldCode={selectedFieldCode}
        value={newValue}
        onChange={setNewValue}
      />

      {/* -------------- MOTIVO -------------- */}
      <Text style={styles.label}>Motivo</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={reason}
          onValueChange={(v) => setReason(Number(v))} // 🔥 número
        >
          <Picker.Item label="Selecciona un motivo..." value={undefined} />
          {reasons.map((r) => (
            <Picker.Item key={r.id} label={r.name} value={r.id} />
          ))}
        </Picker>
      </View>

      {/* -------------- BOTÓN -------------- */}
      <TouchableOpacity style={styles.btn} onPress={sendRequest}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.btnText}>Enviar solicitud</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
