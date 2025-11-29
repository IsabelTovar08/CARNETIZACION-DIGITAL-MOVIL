import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // =========================
  // HEADER
  // =========================
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  // =========================
  // EVENT CARD (mejorado)
  // =========================
  eventCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.35)", // más visible
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    flexDirection: "row",
    gap: 12,
    ...Platform.select({
      web: { backdropFilter: "blur(14px)" },
      default: {},
    }),
  },

  eventImg: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  eventBody: {
    flex: 1,
    justifyContent: "center",
  },

  eventTitle: {
    fontSize: 18,
    color: "#1e293b",
    fontWeight: "700",
    marginBottom: 3,
  },

  eventMeta: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "500",
  },

  // =========================
  // TABLE HEADER (visibilidad mejorada)
  // =========================
  tableHeader: {
    marginTop: 26,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.45)", // visible
  },

  th: {
    color: "#0f172a",   // fuerte y legible
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    textAlign: "left",
  },

  // =========================
  // ROWS LISTA
  // =========================
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.45)", // Slate-400
  },

  colName: {
    flex: 1.4,
  },

  name: {
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "600",
  },

  col: {
    flex: 1,
    alignItems: "center",
  },

  time: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "500",
  },

  noData: {
    color: "#475569",
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    fontWeight: "500",
  },

  // =========================
  // MODAL
  // =========================
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    paddingBottom: 26,

    ...Platform.select({
      web: { boxShadow: "0 12px 28px rgba(0,0,0,0.25)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
      },
    }),
  },

  modalTitle: {
    fontSize: 20,
    color: "#1e293b",
    fontWeight: "700",
    marginBottom: 6,
  },

  modalSubtitle: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 16,
  },

  modalClose: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
  },

  modalCloseText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // =========================
  // DETALLE - FILAS
  // =========================
  detailRow: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },

  detailText: {
    color: "#334155",
    fontSize: 14,
    marginBottom: 2,
  },
  /* ============================================================
   🔵 PERSONA — TARJETA DENTRO DEL MODAL
============================================================ */
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF5FF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  personPhoto: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  personName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },

  personData: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 2,
  },

});
