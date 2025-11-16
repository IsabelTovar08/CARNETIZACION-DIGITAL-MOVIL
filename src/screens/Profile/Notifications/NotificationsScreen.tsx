import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, View, Text, StyleSheet, ImageBackground } from 'react-native';
import AttendanceCard from '../../../components/AttendanceCard/AttendanceCard';
import { palette } from '../../../components/AttendanceCard/attendanceCard.styles';
import { NotificationService } from '../../../services/http/Notifications/NotificationService';
import { notificationHub } from '../../../services/http/Notifications/NotificationHubService';

// import dayjs from 'dayjs';
const BG_IMAGE = require('../../../img/fondo-azul.png');

const notificationService = new NotificationService<any, any>();

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService
      .getNotificationsByUserId()
      .then((response) => {
        console.log('🔍 Respuesta completa:', response);

        if (response.status && Array.isArray(response.data)) {
          setNotifications(response.data);
          console.log('✅ Notificaciones obtenidas:', response.data);
        } else {
          console.warn('⚠️ Error al obtener notificaciones:', response.message);
        }
      })
      .catch((error) => {
        console.error('❌ Error al obtener notificaciones:', error);
      })
      .finally(() => setLoading(false));

    notificationHub.subscribe((newNotif) => {
      console.log("📬 Nueva notificación recibida:", newNotif);

      // Añadir la nueva notificación al inicio
      setNotifications((prev) => [newNotif, ...prev]);
    });
  }, []);

  // 🔹 Función para verificar si una fecha es hoy
  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // 🔹 Función para verificar si una fecha es ayer
  const isYesterday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  // 🔹 Agrupamos notificaciones
  const today = notifications.filter((n) => isToday(n.sendDate));
  const yesterday = notifications.filter((n) => isYesterday(n.sendDate));
  const older = notifications.filter(
    (n) => !isToday(n.sendDate) && !isYesterday(n.sendDate)
  );

  const sections = [
    { title: 'Hoy', data: today },
    { title: 'Ayer', data: yesterday },
    { title: 'Anteriores', data: older },
  ].filter((section) => section.data.length > 0);

  if (loading) {
    return (
      <SafeAreaView style={s.loadingContainer}>
        <Text style={s.loadingText}>Cargando notificaciones...</Text>
      </SafeAreaView>
    );
  }

  if (!notifications.length) {
    return (
      <SafeAreaView style={s.loadingContainer}>
        <Text style={s.loadingText}>No tienes notificaciones.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground source={BG_IMAGE} style={s.background} resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.notificationId.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          renderSectionHeader={({ section }) => (
            <Text style={s.sectionTitle}>{section.title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <AttendanceCard
              icon="notifications-outline"
              key={item.notificationId}
              title={item.title}
              subtitle={item.message}
              variant="notification"
              showChevron
              unread={!item.readDate}
              onPress={() => console.log('🔔 Notificación seleccionada:', item)}
            />
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
    color: palette.primary,
    fontWeight: '800',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.bg,
  },
  loadingText: {
    fontSize: 16
  },
  /** Fondo general de imagen */
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
