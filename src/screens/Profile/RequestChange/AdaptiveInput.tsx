import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { ApiService } from "../../../services/api";
import { adaptiveStyles } from "./AdaptiveInput.styles";
import * as FileSystem from "expo-file-system";

const apiService = new ApiService<any, any>("City");

interface Props {
  fieldCode: string | null;
  value: string;
  onChange: (value: string) => void;
}

export const AdaptiveInput = ({ fieldCode, value, onChange }: Props) => {
  const [cities, setCities] = useState<any[]>([]);
  const [bloodTypes, setBloodTypes] = useState<any[]>([]);
  const [docTypes, setDocTypes] = useState<any[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // ============================================
  // LOAD ENUMS
  // ============================================
  useEffect(() => {
    const loadBloodTypes = async () => {
      try {
        const res = await apiService.getEnumOptions("BloodType");
        setBloodTypes(res || []);
      } catch {}
    };

    const loadDocTypes = async () => {
      try {
        const res = await apiService.getEnumOptions("DocumentType");
        setDocTypes(res || []);
      } catch {}
    };

    const loadCitiesData = async () => {
      try {
        const res = await apiService.getAll();
        setCities(res.data || []);
      } catch {}
    };

    if (fieldCode === "BloodTypeId") loadBloodTypes();
    if (fieldCode === "DocumentTypeId") loadDocTypes();
    if (fieldCode === "CityId") loadCitiesData();
  }, [fieldCode]);

  // ============================================
  // PICK IMAGE (WEB + MOBILE)
  // ============================================
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Se requiere permiso para acceder a las imágenes.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true, // 🔥 NECESARIO PARA WEB
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setImageUri(asset.uri);

    // 🔥🔥🔥 WEB → YA TRAE BASE64 DIRECTO
    if (Platform.OS === "web") {
      if (asset.base64) {
        onChange(`data:image/jpeg;base64,${asset.base64}`);
      }
      return;
    }

    // 🔥🔥🔥 MOBILE → usar FileSystem para obtener base64
    const base64 = await FileSystem.readAsStringAsync(asset.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    onChange(`data:image/jpeg;base64,${base64}`);
  };

  // ============================================
  // RENDER PICKERS
  // ============================================

  if (fieldCode === "BloodTypeId") {
    return (
      <View style={adaptiveStyles.pickerContainer}>
        <Picker
          style={adaptiveStyles.picker}
          selectedValue={value}
          onValueChange={onChange}
        >
          <Picker.Item label="Selecciona tipo de sangre..." value="" />
          {bloodTypes.map((t) => (
            <Picker.Item key={t.id} label={t.name} value={String(t.id)} />
          ))}
        </Picker>
      </View>
    );
  }

  if (fieldCode === "DocumentTypeId") {
    return (
      <View style={adaptiveStyles.pickerContainer}>
        <Picker
          style={adaptiveStyles.picker}
          selectedValue={value}
          onValueChange={onChange}
        >
          <Picker.Item label="Selecciona tipo de documento..." value="" />
          {docTypes.map((t) => (
            <Picker.Item key={t.id} label={t.name} value={String(t.id)} />
          ))}
        </Picker>
      </View>
    );
  }

  if (fieldCode === "CityId") {
    return (
      <View style={adaptiveStyles.pickerContainer}>
        <Picker
          style={adaptiveStyles.picker}
          selectedValue={value}
          onValueChange={onChange}
        >
          <Picker.Item label="Selecciona una ciudad..." value="" />
          {cities.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={String(c.id)} />
          ))}
        </Picker>
      </View>
    );
  }

  // ============================================
  // FOTO
  // ============================================
  if (fieldCode === "PhotoUrl" || fieldCode === "PhotoPath") {
    return (
      <View style={adaptiveStyles.container}>
        <TouchableOpacity style={adaptiveStyles.uploadButton} onPress={pickImage}>
          <Text style={adaptiveStyles.uploadButtonText}>Seleccionar imagen</Text>
        </TouchableOpacity>

        {(imageUri || value) && (
          <Image
            source={{ uri: imageUri || value }}
            style={adaptiveStyles.imagePreview}
          />
        )}
      </View>
    );
  }

  // ============================================
  // DEFAULT → TextInput
  // ============================================
  return (
    <TextInput
      style={adaptiveStyles.textInput}
      placeholder="Escribe el nuevo valor"
      value={value}
      onChangeText={onChange}
    />
  );
};
