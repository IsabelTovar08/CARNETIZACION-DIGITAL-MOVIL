import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';import { styles } from './highlightCard.styles';

// Tarjeta azul "Pendientes" con CTA y una mini ilustración
export default function HighlightCard() {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Pendientes</Text>
        <Text style={styles.subtitle}>
          Disfruta de esta conferencia de trabajo en equipo
        </Text>

        <TouchableOpacity style={styles.cta}>
          <Text style={styles.ctaText}>Mas Información</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <Image
        source={{ uri: 'https://i.imgur.com/3W8J2R2.png' }}
        style={styles.illustration}
      />
    </View>
  );
}
