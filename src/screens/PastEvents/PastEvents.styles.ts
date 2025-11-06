import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  bg: {
    flex: 1,
    justifyContent: "flex-start",
  },

  // 🔹 Título sobre el fondo (sin franja negra)
  headerOverlay: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 35 : 55,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 50,
  },

  // ===== TARJETAS =====
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  cardPast: {
    opacity: 0.8,
  },
  cardImg: {
    width: "100%",
    height: 190,
  },
  cardOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    flexShrink: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rowSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  meta: {
    color: "#475569",
    fontSize: 13,
  },

  // ===== CHIPS =====
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  chipUpcoming: {
    backgroundColor: "#DBEAFE",
  },
  chipPast: {
    backgroundColor: "#E2E8F0",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // ===== VACÍO =====
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 15,
    color: "#94A3B8",
  },
  errorText: {
    color: "#EF4444",
    textAlign: "center",
    marginTop: 16,
  },

  // ===== MODAL =====
  modalEyebrow: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 4,
  },
  modalTitle: {
    color: "#1E293B",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },
  modalImg: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    marginBottom: 12,
  },
  modalSection: {
    color: "#0f3a54",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD7E1",
    padding: 12,
  },
  modalDesc: {
    color: "#334155",
    lineHeight: 20,
  },
});
