import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Switch,
  ActivityIndicator,
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
import { authService } from '../../services/auth/authService';

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
  const { user } = useUser();

  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    birthDate: '',
    city: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // ======================
  // 🔐 Estado de 2FA
  // ======================
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [error2FA, setError2FA] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);

  // ==========================
  // Cargar datos del contexto
  // ==========================
  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.currentProfile?.name ?? 'Sin nombre',
      email: user.userName ?? 'Sin correo',
      birthDate: '1995-05-23',
      city: user.currentProfile?.internalDivisionName ?? 'Sin división',
    });

    setTwoFactorEnabled(user?.twoFactorEnabled ?? false);
  }, [user]);

  const birthVisible = useMemo(() => {
    try {
      const d = new Date(profile.birthDate);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${d.getFullYear()}`;
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

  // ==============================
  // 🔥 Confirmar cambio de 2FA
  // ==============================
  const confirmChange2FA = async () => {
    if (pendingValue === null) return;

    setLoading2FA(true);
    setError2FA('');

    try {
      const res = await authService.toggleTwoFactor(); // Llamada real
      // setTwoFactorEnabled(res.twoFactorEnabled);
    } catch (err: any) {
      setError2FA('No se pudo actualizar la autenticación en dos pasos.');
    }

    setLoading2FA(false);
    setShowConfirmModal(false);
    setPendingValue(null);
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
                <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold' }}>
                  {UserAvatarService.getInitials(user)}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>{'Información personal'}</Text>
        </View>

        {/* Card información */}
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

        {/* Card 2FA */}
        <View style={styles.card}>
          <Text style={styles.label}>Autenticación en dos pasos (2FA)</Text>

          <View style={styles.twofaRow}>
            <Text style={styles.twofaStatus}>
              {twoFactorEnabled ? 'Activado' : 'Desactivado'}
            </Text>

            {loading2FA ? (
              <ActivityIndicator color="#2F6D8B" />
            ) : (
              <Switch
                value={twoFactorEnabled}
                onValueChange={(value) => {
                  setPendingValue(value);
                  setShowConfirmModal(true);
                }}
                thumbColor={twoFactorEnabled ? '#2F6D8B' : '#ccc'}
                trackColor={{ true: '#A7CBE2', false: '#d3d3d3' }}
              />
            )}
          </View>

          {error2FA ? <Text style={styles.errBackend}>{error2FA}</Text> : null}
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
          <GhostButton
            label="Solicitar cambio de datos"
            icon="create-outline"
            onPress={() => navigation.navigate('MyRequests' as never)}
            kind="primary"
          />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* ===========================
          MODAL CONFIRMACIÓN 2FA
      ============================*/}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {pendingValue ? 'Activar' : 'Desactivar'} autenticación en dos pasos
            </Text>

            <Text style={styles.modalMsg}>
              ¿Estás seguro que deseas {pendingValue ? 'activar' : 'desactivar'} la
              autenticación en dos pasos?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancel]}
                onPress={() => {
                  setShowConfirmModal(false);
                  setPendingValue(null);
                }}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalConfirm]}
                onPress={confirmChange2FA}
              >
                <Text style={styles.modalConfirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ========================
   COMPONENTE DE CAMPO
======================== */
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

/* ========================
   BOTÓN GHOST
======================== */
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
