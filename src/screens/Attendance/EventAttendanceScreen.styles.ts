import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 14,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 12,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
  },

  // Event card
  eventCard: {
    backgroundColor: "rgba(15,23,42,0.6)", // MÁS OSCURO Y VISIBLE
    borderRadius: 12,
    flexDirection: "row",
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  eventImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  eventBody: {
    marginLeft: 10,
    justifyContent: "center",
  },
  eventTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  eventMeta: {
    color: "#93C5FD",
    fontSize: 12,
    marginTop: 4,
  },

  // Search box
  searchBox: {
    backgroundColor: "rgba(30,41,59,0.85)", // MÁS OSCURO
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  searchInput: {
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 8,
  },

  // Table header
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(59,130,246,0.25)", // AZUL SUAVE DESTACADO
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  th: {
    flex: 1,
    color: "#E0F2FE",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  // Table rows
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(15,23,42,0.55)", // Dark blue
    marginBottom: 3,
    borderRadius: 8,
  },

  colName: {
    flex: 1.4,
    justifyContent: "center",
  },
  col: {
    flex: 1,
    justifyContent: "center",
  },

  // Name
  name: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  time: {
    color: "#BAE6FD",
    fontSize: 13,
    textAlign: "center",
  },

  noData: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    fontWeight: "500",
  },
});
