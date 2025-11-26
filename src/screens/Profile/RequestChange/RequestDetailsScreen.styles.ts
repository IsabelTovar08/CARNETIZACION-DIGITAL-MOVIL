import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export const requestDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueDark,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#0003",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.darkText,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
  },

  section: {
    marginTop: 18,
  },

  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
