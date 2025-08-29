import React, { ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

type AuthCardProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Imagen superior opcional (ej: logo). Si no envías, no se muestra el badge */
  logoSource?: any;
  children?: ReactNode;
};

const SHADOW =
  Platform.OS === 'ios'
    ? { shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }
    : { elevation: 10 };

export default function AuthCard({
  visible,
  onClose,
  title,
  subtitle,
  logoSource,
  children,
}: AuthCardProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, SHADOW]}>
          {/* Botón cerrar */}
          <TouchableOpacity style={styles.close} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* Badge de logo (queda “flotando” sobre la card) */}
          {logoSource ? (
            <View style={[styles.logoBadge, SHADOW]}>
              <Image source={logoSource} style={styles.logo} />
            </View>
          ) : null}

          {/* Título / Subtítulo */}
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {/* Contenido (form) */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const BORDER_CELeste = 'rgba(89, 167, 244, 1)';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,58,86,0.22)', // suave para que no “mate” el fondo
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    paddingTop: 36, // espacio para el badge
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BORDER_CELeste,
    marginHorizontal: 24, // MISMO margen que el login -> se ven alineadas
  },
  close: { position: 'absolute', right: 10, top: 8, zIndex: 2 },
  closeText: { fontSize: 28, color: '#1f3b53' },

  logoBadge: {
    position: 'absolute',
    top: -24,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER_CELeste,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 42, height: 42, resizeMode: 'contain' },

  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#123C56',
    textAlign: 'center',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#5E7C94',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  content: { marginTop: 6 },
});
