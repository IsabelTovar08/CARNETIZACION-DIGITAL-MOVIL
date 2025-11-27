import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  noData: {
    textAlign: "center",
    color: "white",
    marginTop: 40,
    fontSize: 16,
  },

eventCard: {
  padding: 18,
  borderRadius: 14,
  marginBottom: 20,

  // ⭐ Fondos diferentes dependiendo de la plataforma
  backgroundColor:
    Platform.OS === "web"
      ? "rgba(255,255,255,0.85)"      // FONDO SÓLIDO PARA WEB
      : "rgba(255,255,255,0.15)",     // GLASS PARA MOVIL

  // ⭐ Bordes más visibles en web
  borderWidth: Platform.OS === "web" ? 1 : 1,
  borderColor:
    Platform.OS === "web"
      ? "rgba(0,0,0,0.1)"             // BORDE SUAVE PARA WEB
      : "rgba(255,255,255,0.25)",     // BORDE GLASS EN MOVIL

  // ⭐ Sombra para dar profundidad en web
  boxShadow:
    Platform.OS === "web"
      ? "0 4px 16px rgba(0,0,0,0.10)"
      : undefined,

  // ⭐ Sombras móviles nativas
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
},


  eventName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 16,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0284C7",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  editButtonText: {
    color: "#0EA5E9",
    fontSize: 14,
    fontWeight: "600",
  },
  eventCode: {
  color: "#CBD5E1",
  fontSize: 13,
  marginBottom: 4,
},

eventDate: {
  color: "white",
  fontSize: 14,
  marginBottom: 6,
},

eventType: {
  color: "#A5F3FC",
  fontSize: 13,
  marginBottom: 4,
},

eventStatus: {
  color: "#FDE68A",
  fontSize: 13,
  marginBottom: 4,
},

publicStatus: {
  fontSize: 13,
  marginBottom: 10,
  color: "#93C5FD",
  fontStyle: "italic",
},
accessTitle: {
  marginTop: 10,
  marginBottom: 4,
  color: "#A5F3FC",
  fontSize: 14,
  fontWeight: "600",
},

noAccess: {
  color: "#CBD5E1",
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
  color: "#E2E8F0",
  fontSize: 13,
},

});
