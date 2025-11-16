import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';

import { styles } from './Profile.styles';
import { useAuth } from '../../services/auth/AuthContext';
import { useUser } from '../../services/context/UserContext';
import { PrivateStackParamList, AppTabParamList } from '../../navigation/types';
import { UserAvatarService } from '../../services/shared/UserAvatarService';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<PrivateStackParamList, 'Perfil'>,
  BottomTabNavigationProp<AppTabParamList, 'PerfilTab'>
>;

type Profile = {
  name: string;
  email: string;
  birthDate: string;
  city: string;
};

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { signOut } = useAuth();
  const { user } = useUser(); // 👈 datos del contexto (ya vienen de AsyncStorage)

  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    birthDate: '',
    city: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  /// <summary>
  /// Al montar, toma los datos del contexto (sin llamar al backend).
  /// </summary>
  useEffect(() => {
    if (!user) {
      console.warn('⚠️ No hay usuario en contexto, revisa UserProvider');
      return;
    }

    console.log('✅ Cargando perfil desde AsyncStorage/context:', user.userName);

    setProfile({
      name: user.currentProfile?.name ?? 'Sin nombre',
      email: user.userName ?? 'Sin correo',
      birthDate: '1995-05-23', 
      city: user.currentProfile?.internalDivisionName ?? 'Sin división',
    });
  }, [user]);

  const birthVisible = useMemo(() => {
    try {
      const d = new Date(profile.birthDate);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')
        }/${d.getFullYear()}`;
    } catch {
      return profile.birthDate;
    }
  }, [profile.birthDate]);

  const patch = (k: keyof Profile, v: string) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const goToChangePassword = () => {
    const state = navigation.getState();
    const canHere =
      Array.isArray(state?.routeNames) && state.routeNames.includes('ChangePassword');

    if (canHere) {
      (navigation as any).push('ChangePassword');
    } else {
      (navigation.getParent() as any)?.navigate('PerfilTab', {
        screen: 'ChangePassword',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.wave} />
          <View style={styles.avatarWrap}>
            <View style={styles.avatarShadow} />

            {UserAvatarService.getPhotoUrl(user) ? (
              <Image
                source={{ uri: UserAvatarService.getPhotoUrl(user)! }}
                style={styles.avatar}
              />
            ) : (
              <View
                style={[
                  styles.avatar,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: UserAvatarService.getBackgroundColor(
                      UserAvatarService.getInitials(user)
                    ),
                  },
                ]}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 36,
                    fontWeight: 'bold',
                  }}
                >
                  {UserAvatarService.getInitials(user)}
                </Text>
              </View>
            )}

          </View>

          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>
            {'Información personal'}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Field
            label="Nombre"
            icon="person-outline"
            value={profile.name}
            editable={isEditing}
            onChangeText={(t) => patch('name', t)}
          />
          <Field
            label="Correo electrónico"
            icon="mail-outline"
            value={profile.email}
            editable={isEditing}
            onChangeText={(t) => patch('email', t)}
          />
          <Field
            label="Fecha de nacimiento"
            icon="calendar-outline"
            value={birthVisible}
            editable={isEditing}
            onChangeText={(t) => patch('birthDate', t)}
          />
          <Field
            label="División o dependencia"
            icon="location-outline"
            value={profile.city}
            editable={isEditing}
            onChangeText={(t) => patch('city', t)}
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <GhostButton
            label="Cerrar sesión"
            icon="log-out-outline"
            onPress={signOut}
            kind="danger"
          />
          <GhostButton
            label="Actualizar contraseña"
            icon="shield-checkmark-outline"
            onPress={goToChangePassword}
            kind="primary"
          />
          {/* 🔹 Nuevo botón para solicitar cambio */}
          <GhostButton
            label="Solicitar cambio de datos"
            icon="create-outline"
            onPress={() =>  navigation.navigate('MyRequests' as never)}
            kind="primary"
          />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/// <summary>
/// Componente auxiliar para campos del perfil.
/// </summary>
type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};
function Field({ label, icon, editable, ...rest }: FieldProps) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, !editable && styles.inputDisabled]}>
        <Ionicons name={icon} size={18} style={styles.inputIcon} />
        <TextInput style={styles.input} editable={editable} {...rest} />
        {!editable ? (
          <Ionicons name="lock-closed-outline" size={16} style={styles.lock} />
        ) : (
          <Ionicons name="create-outline" size={16} style={styles.lock} />
        )}
      </View>
    </View>
  );
}

/// <summary>
/// Botón estilo ghost con ícono.
/// </summary>
function GhostButton({
  label,
  icon,
  onPress,
  kind = 'primary',
}: {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  kind?: 'primary' | 'danger';
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ghostBtn,
        kind === 'primary' ? styles.ghostPrimary : styles.ghostDanger,
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        style={[
          styles.ghostIcon,
          kind === 'primary' ? styles.primaryTxt : styles.dangerTxt,
        ]}
      />
      <Text
        style={[
          styles.ghostLabel,
          kind === 'primary' ? styles.primaryTxt : styles.dangerTxt,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
