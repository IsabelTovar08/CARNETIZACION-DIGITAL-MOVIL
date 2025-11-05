import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './profileHeader.styles';
import { useUser } from '../../services/context/UserContext';
import { UserService } from '../../services/http/security/UserService';
import { UserResponse } from '../../models/userProfile';

/// <summary>
/// Encabezado con avatar, nombre real y rol del usuario autenticado.
/// Si el usuario no está cargado en el contexto, se hace la consulta al backend.
/// </summary>
export default function ProfileHeader() {
  const { user, loadCurrentUser } = useUser();
  const userService = new UserService<UserResponse>();

  /// <summary>
  /// Si el usuario aún no existe en el contexto, realiza la consulta a /api/user/me.
  /// </summary>
  useEffect(() => {
    if (!user) {
      console.log('⚠️ Usuario no encontrado en contexto. Consultando /api/user/me ...');
      loadCurrentUser(); // carga el usuario en el contexto
    } else {
      console.log('✅ Renderizando ProfileHeader con usuario:', user?.userName);
    }
  }, [user]);

  if (!user) {
    return (
      <View style={[styles.wrapper, { alignItems: 'center', paddingVertical: 10 }]}>
        <ActivityIndicator size="small" color="#2F6D8B" />
        <Text style={{ color: '#666', marginTop: 5 }}>Cargando usuario...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Image
          source={{
            uri: user?.photoUrl || 'https://i.pravatar.cc/100?img=12',
          }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          {/* 👇 Nombre real del usuario */}
          <Text style={styles.name}>
            {user?.currentProfile?.personName ?? 'Usuario'}
          </Text>

          {/* 👇 Roles reales del usuario */}
          <Text style={styles.role}>
            {user?.roles?.map((r) => r.name).join(', ') ?? 'Sin rol'}
          </Text>
        </View>

        <Ionicons name="shield-checkmark-outline" size={22} color="#2F6D8B" />
      </View>
    </View>
  );
}
