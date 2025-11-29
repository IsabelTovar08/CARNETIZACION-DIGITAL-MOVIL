import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, View, Text, StyleSheet, ImageBackground } from 'react-native';
import AttendanceCard from '../../../components/AttendanceCard/AttendanceCard';
import { palette } from '../../../components/AttendanceCard/attendanceCard.styles';
import { NotificationService } from '../../../services/http/Notifications/NotificationService';
import { notificationHub } from '../../../services/http/Notifications/NotificationHubService';
import { notificationStore } from '../../../services/http/Notifications/NotificationStore';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../../navigation/types';

// import dayjs from 'dayjs';
const BG_IMAGE = require('../../../img/fondo-azul.png');

const notificationService = new NotificationService<any, any>();

type NavigationProp = NativeStackNavigationProp<
  PrivateStackParamList,
  'Notificaciones'
>;

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<number | null>(null); // null = todos
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const getIconByType = (type: number) => {
    switch (type) {
      case 1: return 'cog-outline';       // Sistema
      case 2: return 'calendar-outline';  // Recordatorio
      case 3: return 'alert-circle-outline'; // Advertencia
      case 4: return 'information-outline';  // Información
      default: return 'notifications-outline';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesType = filterType === null || n.notificationTypeId === filterType;
    const matchesRead = !showOnlyUnread || !n.readDate;
    return matchesType && matchesRead;
  });
  useEffect(() => {
    notificationService
      .getNotificationsByUserId()
      .then((response) => {
        console.log('🔍 Respuesta completa:', response);

        if (response.status && Array.isArray(response.data)) {
          const data = response.data;

          setNotifications(data);

          // contar no leídas traídas del backend
          const unreadFromBackend = data.filter(n => !n.readDate).length;
          notificationStore.set(unreadFromBackend);

          console.log("📬 No leídas desde backend:", unreadFromBackend);
        }
        else {
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
  const today = filteredNotifications.filter((n) => isToday(n.sendDate));
  const yesterday = filteredNotifications.filter((n) => isYesterday(n.sendDate));
  const older = filteredNotifications.filter((n) => !isToday(n.sendDate) && !isYesterday(n.sendDate));

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
        <View style={s.filterBar}>
          <View style={s.pickerWrapper}>
            <Text style={s.filterLabel}>Filtrar por tipo:</Text>
            <View style={s.pickerContainer}>
              <Picker
                selectedValue={filterType}
                onValueChange={(value) => setFilterType(value)}
                style={s.picker}
                dropdownIconColor={palette.primary}
              >
                <Picker.Item label="Todos" value={null} />
                <Picker.Item label="Sistema" value={1} />
                <Picker.Item label="Recordatorio" value={2} />
                <Picker.Item label="Advertencia" value={3} />
                <Picker.Item label="Información" value={4} />
              </Picker>
            </View>
          </View>

          <Text style={s.toggleUnread} onPress={() => setShowOnlyUnread(prev => !prev)}>
            {showOnlyUnread ? '📭 Solo no leídas' : '📬 Todas'}
          </Text>
        </View>
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
              icon={getIconByType(item.notificationTypeId)}
              key={item.notificationId}
              title={item.title}
              subtitle={item.message}
              variant="notification"
              showChevron
              unread={!item.readDate}
              onPress={async () => {
                navigation.navigate("NotificationDetail", { notification: item });

                // si NO está leída → marcar y actualizar visualmente
                if (!item.readDate) {
                  await notificationService.markAsRead(item.notificationReceivedId);

                  setNotifications(prev =>
                    prev.map(n =>
                      n.notificationReceivedId === item.notificationReceivedId
                        ? { ...n, readDate: new Date().toISOString() }
                        : n
                    )
                  );

                  notificationStore.decrease();
                }
              }}


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
    fontSize: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: palette.bg,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: palette.primaryLight,
  },
  filterButtonActive: {
    backgroundColor: palette.primary,
  },
  filterText: {
    color: palette.primary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.bg,
  },
  pickerWrapper: {
    flex: 1,
  },
  filterLabel: {
    fontWeight: '600',
    color: palette.primary,
    marginBottom: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: palette.primaryLight,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: palette.primary,
  },
  toggleUnread: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: palette.primaryLight,
    borderRadius: 8,
    color: palette.primary,
    fontWeight: '600',
  },
});
