/// <summary>
/// Estilos modernos para la pantalla de asistencia.
/// Inspirado en interfaces limpias (Pinterest / Material Design 3).
/// Incluye chips para puntos de acceso y una sección de filtros más equilibrada.
/// </summary>

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ======== CONTENEDOR PRINCIPAL ========
  container: {
    flex: 1,
    padding: 16,
  },

  // ======== TÍTULO ========
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 14,
  },

  // ======== TARJETA DE FILTROS ========
  filterContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filterPlaceholder: {
    fontSize: 12,
    color: "#64748B",
  },
  filterValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 3,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 12,
    marginTop: 6,
    paddingVertical: 12,
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    gap: 6,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },


  // ======== LISTA AGRUPADA ========
  list: {
    paddingBottom: 40,
  },
  eventSection: {
    marginBottom: 18,
  },
  eventHeader: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 10,
  },

  // ======== TARJETA DE ASISTENCIA ========
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  personName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  time: {
    fontSize: 13,
    color: "#475569",
    flexShrink: 1,
  },

  // ======== CHIP DE PUNTO DE ACCESO ========
  accessChip: {
    backgroundColor: "#E0F2FE",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  accessChipText: {
    color: "#0369A1",
    fontSize: 12,
    fontWeight: "600",
  },

  // ======== SIN DATOS ========
  noData: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    color: "#94A3B8",
  },

  // ======== MODALES ========
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  optionText: {
    fontSize: 14,
    color: "#334155",
  },
  modalClose: {
    marginTop: 12,
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
  },
  modalCloseText: {
    color: "#334155",
    fontWeight: "600",
  },

    background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
