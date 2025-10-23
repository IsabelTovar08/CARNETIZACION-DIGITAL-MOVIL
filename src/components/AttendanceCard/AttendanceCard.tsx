import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles, palette } from './attendanceCard.styles';

type Variant = 'attendance' | 'notification' | 'alert';

type Props = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle?: string;
  /** Texto del chip (ES): hora, fecha o estado. Si no se envía, no se muestra */
  chip?: string;
  onPress?: () => void;
  /** (ES): para notificaciones no leídas */
  unread?: boolean;
  /** (ES): muestra flecha a la derecha */
  showChevron?: boolean;
  /** (ES): nº de líneas del subtítulo */
  subtitleLines?: number;
  /** (ES): variante visual */
  variant?: Variant;
  /** (ES): color opcional para el fondo del icono */
  iconBg?: string;
};

export default function AttendanceCard({
  icon,
  title,
  subtitle = 'Ver más…',
  chip,
  onPress,
  unread = false,
  showChevron = false,
  subtitleLines = 2,
  variant = 'notification',
  iconBg,
}: Props) {
  // Paletas por variante (ES): tonos de tu gama azul
  const accentByVariant = {
    attendance: '#2F6D8B',
    notification: '#2F6D8B',
    alert: palette.danger,
  } as const;

  const accent = accentByVariant[variant];
  const bgIcon = iconBg ?? (variant === 'alert' ? '#FDECEC' : palette.light);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        unread && styles.cardUnread,
        variant === 'alert' && styles.cardAlert,
      ]}
    >
      {/* Icono a la izquierda */}
      <View style={[styles.leftIcon, { backgroundColor: bgIcon }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>

      {/* Contenido */}
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.title, unread && styles.titleUnread]}
          numberOfLines={2}
        >
          {title}
        </Text>
        {!!subtitle && (
          <Text style={styles.subtitle} numberOfLines={subtitleLines}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Chip opcional */}
      {chip ? (
        <View style={styles.timeChip}>
          <Text style={styles.timeText}>{chip}</Text>
        </View>
      ) : null}

      {/* Chevron opcional */}
      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color={palette.muted} />
      )}

      {/* Punto de no leído */}
      {unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}
