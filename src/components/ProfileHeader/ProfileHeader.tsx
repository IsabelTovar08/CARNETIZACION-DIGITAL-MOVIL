import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Pressable, Dimensions, findNodeHandle } from 'react-native';
import { styles } from './profileHeader.styles';
import { useUser } from '../../services/context/UserContext';
import { UserAvatarService } from '../../services/shared/UserAvatarService';

/// <summary>
/// Encabezado reutilizable:
/// - compact = true: muestra solo el avatar y una burbuja (popover) al hacer click.
/// - compact = false: muestra avatar, nombre y rol (modo completo).
/// </summary>
export default function ProfileHeader({ compact = false }: { compact?: boolean }) {
  const { user, loadCurrentUser } = useUser();

  /// <summary>
  /// Estado para burbuja (popover).
  /// </summary>
  const [isVisible, setIsVisible] = useState(false);

  /// <summary>
  /// Coordenadas del ancla (avatar) en la ventana.
  /// </summary>
  const [anchorRect, setAnchorRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  /// <summary>
  /// Ref al avatar para medir su posición en pantalla.
  /// </summary>
  const avatarRef = useRef<View>(null);

  /// <summary>
  /// Dimensiones de la ventana para calcular límites de la burbuja.
  /// </summary>
  const { width: screenWidth } = Dimensions.get('window');
  const bubbleWidth = 240; // ancho fijo de la burbuja

  useEffect(() => {
    if (!user) loadCurrentUser();
  }, [user]);

  if (!user) return null;

  /// <summary>
  /// Alterna la burbuja: mide coordenadas del avatar y posiciona la burbuja debajo.
  /// </summary>
  const toggleBubble = () => {
    if (!compact) return;
    if (isVisible) {
      setIsVisible(false);
      return;
    }
    const node = findNodeHandle(avatarRef.current);
    if (!node) {
      setIsVisible((prev) => !prev);
      return;
    }
    // medir en coordenadas absolutas de pantalla (funciona dentro del headerRight)
    // @ts-ignore - measureInWindow existe en la instancia nativa
    avatarRef.current?.measureInWindow?.((x: number, y: number, w: number, h: number) => {
      setAnchorRect({ x, y, width: w, height: h });
      setIsVisible(true);
    });
  };

  /// <summary>
  /// Calcula la posición izquierda de la burbuja, evitando que se desborde.
  /// </summary>
  const getBubbleLeft = (): number => {
    if (!anchorRect) return screenWidth - bubbleWidth - 8;
    const rightEdge = anchorRect.x + anchorRect.width;   // borde derecho del avatar
    // alinear burbuja con el borde derecho del avatar, pero con límites
    const desiredLeft = rightEdge - bubbleWidth;
    const minLeft = 8;
    const maxLeft = screenWidth - bubbleWidth - 8;
    return Math.min(Math.max(desiredLeft, minLeft), maxLeft);
  };

  /// <summary>
  /// Calcula la posición superior de la burbuja (debajo del avatar con un margen).
  /// </summary>
  const getBubbleTop = (): number => {
    if (!anchorRect) return 64;
    return anchorRect.y + anchorRect.height + 6; // 6px debajo del avatar
  };

  return (
    <View style={[styles.wrapper, compact ? { alignItems: 'flex-end' } : {}]}>
      {/* === Avatar clickeable (ancla de la burbuja) === */}
      <TouchableOpacity ref={avatarRef} activeOpacity={0.8} onPress={compact ? toggleBubble : undefined}>
        {UserAvatarService.getPhotoUrl(user) ? (
          <Image
            source={{ uri: UserAvatarService.getPhotoUrl(user)! }}
            style={compact ? styles.avatarSmall : styles.avatar}
          />
        ) : (
          <View
            style={[
              compact ? styles.avatarSmall : styles.avatar,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: UserAvatarService.getBackgroundColor(
                  UserAvatarService.getInitials(user)
                ),
              },
            ]}
          >
            <Text style={{ color: '#fff', fontSize: compact ? 14 : 20, fontWeight: 'bold' }}>
              {UserAvatarService.getInitials(user)}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* === Modo completo (Home) === */}
      {!compact && (
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{user?.currentProfile?.name ?? 'Usuario'}</Text>
          <Text style={styles.role}>{user?.roles?.map((r) => r.name).join(', ') ?? 'Sin rol'}</Text>
        </View>
      )}

      {/* === Burbuja (Popover) en top, sin oscurecer pantalla === */}
      {compact && isVisible && anchorRect && (
        <Modal transparent={true} visible={true} animationType="fade" onRequestClose={() => setIsVisible(false)}>
          {/* Clic fuera cierra la burbuja */}
          <Pressable style={styles.overlayTransparent} onPress={() => setIsVisible(false)}>
            {/* Contenedor vacío para capturar el click fuera */}
          </Pressable>

          {/* Caja de la burbuja posicionada absolutamente */}
          <View
            pointerEvents="box-none"
            style={[
              styles.bubbleAbsolute,
              {
                top: getBubbleTop(),
                left: getBubbleLeft(),
                width: bubbleWidth,
              },
            ]}
          >
            <View style={styles.bubbleArrow} />
            <View style={styles.bubbleBox}>
              {UserAvatarService.getPhotoUrl(user) ? (
                <Image source={{ uri: UserAvatarService.getPhotoUrl(user)! }} style={styles.modalAvatar} />
              ) : (
                <View
                  style={[
                    styles.modalAvatar,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: UserAvatarService.getBackgroundColor(UserAvatarService.getInitials(user)),
                    },
                  ]}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    {UserAvatarService.getInitials(user)}
                  </Text>
                </View>
              )}
              <Text style={styles.name}>{user?.currentProfile?.name ?? 'Usuario'}</Text>
              <Text style={styles.role}>{user?.roles?.map((r) => r.name).join(', ') ?? 'Sin rol'}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
