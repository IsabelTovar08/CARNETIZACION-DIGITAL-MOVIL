import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export const adaptiveStyles = StyleSheet.create({
  /// <summary>
  /// Contenedor general del input adaptable
  /// </summary>
  container: {
    marginTop: 5,
    marginBottom: 10,
  },

  /// <summary>
  /// Contenedor del Picker (select)
  /// </summary>
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginTop: 5,
  },

  /// <summary>
  /// Estilo visual del Picker
  /// </summary>
  picker: {
    width: "100%",
    height: 48,
  },

  /// <summary>
  /// Botón para escoger foto desde galería
  /// </summary>
  uploadButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  uploadButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  /// <summary>
  /// Vista previa de la imagen seleccionada
  /// </summary>
  imagePreview: {
    width: 140,
    height: 140,
    marginTop: 12,
    borderRadius: 10,
    alignSelf: "center",
  },

  /// <summary>
  /// Input normal de texto
  /// </summary>
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fafafa",
    marginTop: 5,
  },
});
