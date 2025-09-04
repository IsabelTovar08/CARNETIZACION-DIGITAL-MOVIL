// src/screens/Home/HomeScreen.tsx
import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';

type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

const ATTENDANCE = [
  { id: '1', icon: 'logo-electron',        title: 'Conferencia de Inteligencia artificial', chip: '1h' },
  { id: '2', icon: 'cafe-outline',         title: 'Conceptos básicos en Java',              chip: '3h' },
  { id: '3', icon: 'calendar-outline',     title: 'Arquitectura de Software',               chip: 'Ayer' },
  { id: '4', icon: 'code-working-outline', title: 'Clean Code y SOLID',                     chip: 'Lun' },
  { id: '5', icon: 'school-outline',       title: 'Patrones de diseño',                     chip: 'Mañana' },
  { id: '6', icon: 'school-outline',       title: 'Microservicios en la práctica',          chip: 'Mañana' },
  { id: '7', icon: 'school-outline',       title: 'Optimización de consultas SQL',          chip: 'Mañana' },
];

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const goToPastEvents = useCallback(() => {
    navigation.navigate('PastEvents');
  }, [navigation]);

  const goToQrReader = useCallback(() => {
    navigation.navigate('QrReader');
  }, [navigation]);

  const listHeader = useMemo(
    () => (
      <View>
        <ProfileHeader />

        <View style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery('')}
            placeholder="Buscar conferencias…"
          />
        </View>

        <HighlightCard />

        <SectionHeader
          title="Asistir"
          leftBadge={<Text style={styles.badge}>＋</Text>}
          onLeftPress={goToQrReader}  // ← tocar “Asistir” abre el lector QR
          onAction={goToPastEvents}   // ← “Ver más” va a Eventos Pasados
        />

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Últimas asistencias</Text>
        </View>
      </View>
    ),
    [query, goToPastEvents, goToQrReader]
  );

  const data = useMemo(
    () => ATTENDANCE.filter(x => x.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <AttendanceCard icon={item.icon as any} title={item.title} chip={item.chip} />
        )}
        ListFooterComponent={<View style={{ height: 24 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
