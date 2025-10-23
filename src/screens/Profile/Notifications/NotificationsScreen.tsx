// screens/Notifications/NotificationsScreen.tsx
import React from 'react';
import { SafeAreaView, SectionList, View, Text, StyleSheet } from 'react-native';
import AttendanceCard from '../../../components/AttendanceCard/AttendanceCard';
import { palette } from '../../../components/AttendanceCard/attendanceCard.styles';

const DATA = [
  {
    title: 'Hoy',
    data: [
      {
        id: '1',
        icon: 'calendar-outline',
        title: 'Recuerda',
        subtitle: 'Tienes una charla de “software” hoy a las 10:30 A.M.',
        chip: '08:00 • May 27',
        unread: true,
      },
      {
        id: '2',
        icon: 'school-outline',
        title: 'Propuesta Sobre Conferencia De Inversiones',
        subtitle:
          'Tienes una Propuesta de conferencia de inversiones para el 29 de mayo. ¡Acompáñanos!',
        chip: '09:00 • May 27',
      },
    ],
  },
  { title: 'Ayer', data: [
      {
        id: '3',
        icon: 'briefcase-outline',
        title: 'Conferencia De Normativas Para El Trabajo',
        subtitle: 'Para el 29 de mayo. ¡Acompáñanos!',
        chip: '13:00 • May 26',
      },
    ],
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.bg }}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        renderSectionHeader={({ section }) => (
          <Text style={s.sectionTitle}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <AttendanceCard
            icon={item.icon as any}
            title={item.title}
            subtitle={item.subtitle}
            chip={item.chip}
            unread={item.unread}
            variant="notification"
            showChevron
            onPress={() => {}}
          />
        )}
      />
    </SafeAreaView>
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
});
