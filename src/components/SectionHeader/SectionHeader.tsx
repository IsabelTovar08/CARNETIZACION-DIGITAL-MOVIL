import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './sectionHeader.styles';

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;      // clic en "Ver más"
  onLeftPress?: () => void;   // ⬅️ NUEVO: clic en "Asistir"
  leftBadge?: React.ReactNode;
};

// Cabecera de sección ("Asistir" / "Ver más")
export default function SectionHeader({
  title,
  actionLabel = 'Ver más',
  onAction,
  onLeftPress,      // ⬅️ nuevo
  leftBadge,
}: Props) {
  const LeftWrap = onLeftPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <LeftWrap
        style={styles.left}
        {...(onLeftPress ? { onPress: onLeftPress, activeOpacity: 0.8 } : {})}
      >
        <Text style={styles.title}>{title}</Text>
        {leftBadge}
      </LeftWrap>

      <TouchableOpacity style={styles.action} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
        <Ionicons name="arrow-forward-circle-outline" size={18} color="#2F6D8B" />
      </TouchableOpacity>
    </View>
  );
}
