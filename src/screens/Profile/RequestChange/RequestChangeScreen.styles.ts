import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors'; // 👈 Asegúrate de tener tu archivo de colores en esta ruta

/// <summary>
/// Estilos para la pantalla de solicitud de cambio de datos personales.
/// </summary>
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },

  label: {
    fontWeight: '600',
    color: colors.textSoft,
    marginBottom: 6,
    marginTop: 8,
  },

  pickerContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  picker: {
    height: 50,
    color: colors.text,
  },

  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    color: colors.text,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  btnText: {
    color: colors.card,
    fontWeight: '700',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  modalContent: {
    marginTop: 5,
    gap: 6,
  },
  bold: { fontWeight: "bold" },

});
