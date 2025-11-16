import { useContext, useEffect } from "react";
import { notificationHub } from "./NotificationHubService";
import { useAuth } from "../../auth/AuthContext";

export function SocketInitializer() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      notificationHub.connect();
    } else {
      notificationHub.disconnect();
    }
  }, [isAuthenticated]);

  return null;
}
