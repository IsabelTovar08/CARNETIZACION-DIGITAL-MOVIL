import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './sectionHeader.styles';

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  leftBadge?: React.ReactNode;
};

// Cabecera de sección ("Asistir" / "Ver más")
export default function SectionHeader({
  title,
  actionLabel = 'Ver más',
  onAction,
  leftBadge,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {leftBadge}
      </View>
      <TouchableOpacity style={styles.action} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
        <Ionicons name="arrow-forward-circle-outline" size={18} color="#2F6D8B" />
      </TouchableOpacity>
    </View>
  );
}
