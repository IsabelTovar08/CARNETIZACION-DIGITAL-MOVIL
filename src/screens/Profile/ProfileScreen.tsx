// src/screens/Profile/ProfileScreen.tsx
import React, { useMemo, useState } from 'react';
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
import { PrivateStackParamList, AppTabParamList } from '../../navigation/types';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<PrivateStackParamList, 'Perfil'>,
  BottomTabNavigationProp<AppTabParamList, 'PerfilTab'>
>;

type Profile = {
  fullName: string;
  email: string;
  birthDate: string;
  city: string;
};

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { signOut } = useAuth();

  const [profile, setProfile] = useState<Profile>({
    fullName: 'Jhoan Charry',
    email: 'charry@gmail.com',
    birthDate: '1995-05-23',
    city: 'Neiva, Huila',
  });

  const [isEditing, setIsEditing] = useState(false);

  const birthVisible = useMemo(() => {
    try {
      const d = new Date(profile.birthDate);
      return `${d.getDate().toString().padStart(2, '0')}/${
        (d.getMonth() + 1).toString().padStart(2, '0')
      }/${d.getFullYear()}`;
    } catch {
      return profile.birthDate;
    }
  }, [profile.birthDate]);

  const patch = (k: keyof Profile, v: string) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const goToChangePassword = () => {
    const state = navigation.getState();
    const canHere = Array.isArray(state?.routeNames) && state.routeNames.includes('ChangePassword');

    if (canHere) {
      // mismo stack (PeoplePrivateStack)
      // usa push para garantizar navegación aunque ya estés en esa ruta
      (navigation as any).push('ChangePassword');
    } else {
      // navegar desde el Tab hacia el stack hijo
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
            <Image
              source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
              style={styles.avatar}
            />
            <TouchableOpacity
              onPress={() => setIsEditing((e) => !e)}
              activeOpacity={0.9}
              style={[styles.miniAction, isEditing && styles.miniActionActive]}
            >
              <Ionicons name={isEditing ? 'checkmark' : 'pencil-sharp'} size={22} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>
            {isEditing ? 'Editando datos' : 'Información personal'}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Field
            label="Nombre"
            icon="person-outline"
            value={profile.fullName}
            editable={isEditing}
            onChangeText={(t) => patch('fullName', t)}
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
            label="Municipio"
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
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
