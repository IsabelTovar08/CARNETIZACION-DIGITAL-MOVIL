import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export const requestDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9", // 🟢 Fondo moderno
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2A2A2A",
  },

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
  },

  section: {
    marginTop: 22,
  },

  label: {
    fontSize: 13,
    color: "#8A8A8A",
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    color: "#2A2A2A",
    fontWeight: "600",
  },

  // 🟢 Imagen más grande y centrada
  imgPreview: {
    width: 160,
    height: 160,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 6,
  },

  loadingWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
});
