import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
background: {
  flex: 1,
  resizeMode: "cover",
},


  container: {
    flex: 1,
    padding: 20,
  },

  /** ⭐ TÍTULO GENERAL */
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",        // azul MUY oscuro → excelente lectura
    marginBottom: 20,
  },

  noData: {
    textAlign: "center",
    color: "#475569",        // gris oscuro (sí se ve)
    marginTop: 40,
    fontSize: 16,
  },

  /** ⭐ TARJETA — NO SE TOCA EL FONDO */
  eventCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 22,

    backgroundColor:
      Platform.OS === "web"
        ? "rgba(30, 64, 175, 0.20)"
        : "rgba(30, 64, 175, 0.22)",

    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",

    boxShadow:
      Platform.OS === "web"
        ? "0 6px 16px rgba(0,0,0,0.15)"
        : undefined,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  /** ⭐ TEXTOS — AHORA OSCUROS (LEGIBLES) */
  eventName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",      // ✨ azul muy oscuro (perfecto)
    marginBottom: 12,
  },

  eventCode: {
    color: "#334155",      // gris oscuro frío
    fontSize: 14,
    marginBottom: 4,
  },

  eventDate: {
    color: "#1E293B",      // gris-azul oscuro
    fontSize: 14,
    marginBottom: 6,
  },

  eventType: {
    color: "#0A4AA8",      // azul fuerte → visible
    fontSize: 13,
    marginBottom: 4,
  },

  eventStatus: {
    color: "#B45309",      // naranja oscuro → súper visible
    fontSize: 13,
    marginBottom: 4,
  },

  publicStatus: {
    fontSize: 13,
    marginBottom: 10,
    color: "#475569",       // gris oscuro
    fontStyle: "italic",
  },

  accessTitle: {
    marginTop: 12,
    marginBottom: 4,
    color: "#0A4AA8",       // azul visible
    fontSize: 14,
    fontWeight: "700",
  },

  noAccess: {
    color: "#334155",       // gris oscuro
    fontSize: 13,
    marginBottom: 10,
  },

  accessChipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 4,
    marginBottom: 6,
  },

  accessChipText: {
    color: "#1E293B",       // gris-azul oscuro
    fontSize: 13,
  },

  /** ⭐ BOTONES */
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0284C7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.05)",   // gris leve, no blanco
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  editButtonText: {
    color: "#075985",        // azul oscuro, elegante y visible
    fontSize: 14,
    fontWeight: "600",
  },
  
});
