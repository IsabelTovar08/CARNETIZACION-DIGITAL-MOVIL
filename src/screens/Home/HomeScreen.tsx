import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';

// Comentario (ES): tip de props para tu stack
type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

// Comentario (ES): data simulada; reemplaza por tu fetch/API
const ATTENDANCE = [
  { id: '1', icon: 'logo-electron', title: 'Conferencia de Inteligencia artificial', chip: '1h' },
  { id: '2', icon: 'cafe-outline',  title: 'Conceptos básicos en Java',            chip: '3h' },
  { id: '3', icon: 'calendar-outline', title: 'Arquitectura de Software',          chip: 'Ayer' },
  { id: '4', icon: 'code-working-outline', title: 'Clean Code y SOLID',           chip: 'Lun' },
  { id: '5', icon: 'school-outline', title: 'Patrones de diseño',                  chip: 'Mañana' },
  { id: '6', icon: 'school-outline', title: 'Patrones de diseño',                  chip: 'Mañana' },
  { id: '7', icon: 'school-outline', title: 'Patrones de diseño',                  chip: 'Mañana' },

];

export default function HomeScreen({}: Props) {
  const [query, setQuery] = useState('');
  // Header superior de la lista (ES): avatar, buscador, tarjeta principal y título de sección
  const listHeader = useMemo(
    () => (
      <View>
        {/* Header con avatar */}
        <ProfileHeader />

        {/* Buscador */}
        <View style={styles.searchWrap}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar conferencias…"
        />
      </View>

        {/* Tarjeta principal (pendientes) */}
        <HighlightCard />

        {/* "Asistir" + "Ver más" */}
        <SectionHeader
          title="Asistir"
          leftBadge={<Text style={styles.badge}>+</Text>}
          onAction={() => {}}
        />

        {/* Últimas asistencias */}
        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Últimas asistencias</Text>
        </View>
      </View>
    ),
    [query]
  );

   const data = useMemo(() => ATTENDANCE.filter(x =>
    x.title.toLowerCase().includes(query.toLowerCase())
  ), [query]);

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

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={ATTENDANCE}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        // Comentario (ES): separador vertical entre tarjetas
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <AttendanceCard icon={item.icon as any} title={item.title} chip={item.chip} />
        )}
        // Comentario (ES): espacio final para no tapar con la TabBar
        ListFooterComponent={<View style={{ height: 24 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
