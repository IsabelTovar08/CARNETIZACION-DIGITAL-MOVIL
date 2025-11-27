import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 26,
    color: "white",
    fontWeight: "700",
    marginBottom: 16,
  },

  card: {
    backgroundColor:
      Platform.OS === "web" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor:
      Platform.OS === "web" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
  },

  label: {
    color: "#93C5FD",
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: "white",
    fontSize: 15,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },

  noData: {
    color: "#CBD5E1",
    fontStyle: "italic",
    marginBottom: 20,
  },

  accessCard: {
    backgroundColor:
      Platform.OS === "web" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor:
      Platform.OS === "web" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
  },

  accessName: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  accessDesc: {
    color: "#E2E8F0",
    marginBottom: 10,
  },

  qrLabel: {
    color: "#A5F3FC",
    marginBottom: 8,
    marginTop: 10,
  },
  qrContainer: {
    backgroundColor: "white",
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
});
