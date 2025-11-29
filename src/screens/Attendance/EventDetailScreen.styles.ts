import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 60,
  },

  /* -----------------------------------------------------
     🔥 HERO PRINCIPAL — Glass oscuro premium
  ----------------------------------------------------- */
  heroCard: {
    backgroundColor: "rgba(10, 20, 45, 0.55)",  // Glass oscuro visible
    padding: 22,
    borderRadius: 20,
    marginBottom: 28,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",      // borde delicado

    ...Platform.select({
      web: {
        backdropFilter: "blur(12px)",           // Desenfoque premium
      },
    }),

    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F8FAFC",                            // Blanco nítido
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.40)",
    textShadowRadius: 6,
  },

  heroSubtitle: {
    fontSize: 15,
    color: "#CBD5E1",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 4,
  },

  /* -----------------------------------------------------
     🔹 SECCIONES GENERALES
  ----------------------------------------------------- */
  sectionCard: {
    backgroundColor: "#EEF5FF",                 // Color suave profesional
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F3D91",
  },

  /* -----------------------------------------------------
     🔹 FILAS DE INFORMACIÓN
  ----------------------------------------------------- */
  row: {
    marginBottom: 12,
  },

  label: {
    color: "#0F3D91",
    fontSize: 14,
    fontWeight: "700",
  },

  value: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "500",
  },

  valueItem: {
    color: "#1F2937",
    fontSize: 15,
    marginBottom: 4,
  },

  daysText: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 6,
  },

  noData: {
    color: "#6B7280",
    fontStyle: "italic",
  },

  /* -----------------------------------------------------
     🔹 ACCESS POINTS
  ----------------------------------------------------- */
  accessItem: {
    marginBottom: 20,
  },

  accessName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 3,
  },

  accessDesc: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 8,
  },

  /* -----------------------------------------------------
     🔹 QR
  ----------------------------------------------------- */
  qrLabel: {
    color: "#0F3D91",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 6,
  },

  qrContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
