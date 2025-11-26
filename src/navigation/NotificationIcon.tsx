import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { notificationStore } from "../services/http/Notifications/NotificationStore";
import colors from "../theme/colors";

export default function NotificationIcon({ navigation }: any) {
  const [count, setCount] = useState(notificationStore.getValue());

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(setCount);
    return unsubscribe;
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        notificationStore.reset();
        navigation.navigate("Notificaciones");
      }}
      style={{ marginRight: 18, width: 40, height: 36, justifyContent: "center", alignItems: "center" }}
    >
      <Ionicons name="notifications-outline" size={26} color={colors.text} />

      {count > 0 && (
        <View
          style={{
            position: "absolute",
            top: 1,
            right: 0,
            backgroundColor: "red",
            borderRadius: 10,
            paddingHorizontal: 4,
            minWidth: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
