import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground, 
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './Home.styles';
import { PrivateStackParamList } from '../../navigation/types';

import AttendanceCard from '../../components/AttendanceCard/AttendanceCard';
import HighlightCard from '../../components/HighlightCard/HighlightCard';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { ApiService } from '../../services/api';
import { useUser } from '../../services/context/UserContext';

const BG_IMAGE = require('../../img/fondo-azul.png'); 

type Props = NativeStackScreenProps<PrivateStackParamList, 'Inicio'>;

export const AttendancesApi = new ApiService<any, any>('attendance');

export default function HomeScreen({ navigation }: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const { user } = useUser();

  const calculateElapsedHours = (timeOfEntry: string | Date, timeOfExit?: string | Date): number => {
    const entry = new Date(timeOfEntry);
    const exit = timeOfExit ? new Date(timeOfExit) : new Date();
    const diffMs = exit.getTime() - entry.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    return Math.round(hours * 100) / 100;
  };

  const fetchAll = useCallback(async () => {
    try {
      const resp = await AttendancesApi.getAll();
      const list = (resp?.data ?? []) as any[];

      const mapped = list.map((item) => ({
        ...item,
        elapsedHours: calculateElapsedHours(item.timeOfEntry, item.timeOfExit),
      }));

      setAttendances(mapped);
    } catch (e) {
      console.error('Error al cargar eventos:', e);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const goToPastEvents = useCallback(() => navigation.navigate('PastEvents'), [navigation]);
  const goToQrReader = useCallback(() => navigation.navigate('QrReader'), [navigation]);

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
          onLeftPress={goToQrReader}
          onAction={goToPastEvents}
        />

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>Últimas asistencias</Text>
        </View>
      </View>
    ),
    [query, goToPastEvents, goToQrReader]
  );

  const filteredAttendances = useMemo(
    () =>
      attendances.filter((x) =>
        (x.accessPointOfExitName ?? '').toLowerCase().includes(query.toLowerCase())
      ),
    [attendances, query]
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* 🔹 Fondo de imagen en toda la pantalla */}
      <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">
        <FlatList
          data={filteredAttendances}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={listHeader}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({ item }) => (
            <AttendanceCard
              icon={item.icon as any}
              title={item.accessPointOfExitName ?? 'Sin nombre'}
              chip={`${item.elapsedHours}h`}
            />
          )}
          ListFooterComponent={<View style={{ height: 24 }} />}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
