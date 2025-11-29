import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // gris claro moderno, no blanco y NO débil
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  /** ⭐ Título firme (oscuro, elegante) */
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937", // gris carbón (fuerte)
    marginBottom: 14,
  },

  /** ⭐ Tarjeta clara PERO sólida (sin verse blanda) */
  card: {
    backgroundColor: "#FFFFFF", // blanco limpio profesional, NO #fafafa pálido
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  /** ⭐ Header fuerte (Tipo + Estado) */
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  fieldName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  /** ⭐ Badge de estado, color firme */
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  /** ⭐ Texto principal (cuerpo) */
  cardText: {
    color: "#374151", // gris oscuro profesional
    fontSize: 14,
    marginTop: 4,
  },

  /** ⭐ Fecha (discreta pero visible) */
  cardDate: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
  },

  bold: {
    fontWeight: "700",
    color: "#1F2937",
  },

  /** ⭐ Mensaje si no hay nada */
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#9CA3AF",
    fontSize: 15,
  },

  /** ⭐ Botón flotante */
  fab: {
    position: "absolute",
    backgroundColor: colors.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  /** ⭐ Modal Backend */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    minHeight: "45%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  detailText: {
    fontSize: 15,
    color: "#374151",
    marginVertical: 3,
  },

  detailDate: {
    marginTop: 10,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "right",
  },
});
