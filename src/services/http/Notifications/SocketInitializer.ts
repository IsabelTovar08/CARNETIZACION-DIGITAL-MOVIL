import { useContext, useEffect } from "react";
import { notificationHub } from "./NotificationHubService";
import { useAuth } from "../../auth/AuthContext";
import { useUser } from "../../context/UserContext";

export function SocketInitializer() {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    if (isAuthenticated) {
      notificationHub.connect(Number(user?.id));
    } else {
      notificationHub.disconnect();
    }
  }, [isAuthenticated]);

  return null;
}
