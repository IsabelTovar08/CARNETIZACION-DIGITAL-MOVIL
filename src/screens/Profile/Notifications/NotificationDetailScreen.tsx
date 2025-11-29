import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { palette } from '../../../components/AttendanceCard/attendanceCard.styles';
import { NotificationService } from '../../../services/http/Notifications/NotificationService';

const notificationService = new NotificationService<any, any>();

export default function NotificationDetailScreen({ route }: any) {
  const { notification } = route.params;
  useEffect(() => {
    if (!notification.readDate) {
      notificationService.markAsRead(notification.notificationReceivedId);
    }
  }, []);
  return (
    <SafeAreaView style={s.container}>
      <ScrollView style={s.box}>
        <Text style={s.title}>{notification.title}</Text>

        <Text style={s.label}>Mensaje:</Text>
        <Text style={s.message}>{notification.message}</Text>

        <Text style={s.label}>Fecha enviada:</Text>
        <Text style={s.date}>{new Date(notification.sendDate).toLocaleString()}</Text>

        {notification.dataJson && (
          <>
            <Text style={s.label}>Datos adicionales:</Text>
            <Text style={s.message}>{notification.dataJson}</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    padding: 16,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.primary,
    marginBottom: 12,
  },
  label: {
    marginTop: 10,
    fontWeight: '700',
    color: palette.primary,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
