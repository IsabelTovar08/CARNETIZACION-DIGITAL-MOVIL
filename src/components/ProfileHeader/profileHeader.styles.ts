import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'left',
  },
  role: {
    fontSize: 13,
    color: '#666',
    textAlign: 'left',
  },

  /// <summary>
  /// Overlay transparente para detectar tap fuera (no oscurece la pantalla).
  /// </summary>
  overlayTransparent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },

  /// <summary>
  /// Contenedor absoluto de la burbuja (ubicado con coordenadas de pantalla).
  /// </summary>
  bubbleAbsolute: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 8,
  },

  /// <summary>
  /// Caja principal de la burbuja.
  /// </summary>
  bubbleBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  /// <summary>
  /// Flecha que apunta al avatar.
  /// </summary>
  bubbleArrow: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: -2,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },

  modalAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 6,
  },
});
