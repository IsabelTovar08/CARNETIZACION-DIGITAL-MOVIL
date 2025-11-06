import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const CARD_W = Math.min(500, width * 0.7);
export const CARD_H = CARD_W * 1.38;
export const GAP = 16;

const SHADOW =
  Platform.OS === 'ios'
    ? { shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 14, shadowOffset: { width: 0, height: 8 } }
    : { elevation: 8 };

export const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1, paddingTop: 8 },
  header: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 10 },
  title: { fontSize: 26, fontWeight: '900', color: '#10324A' },
  subtitle: { color: '#ffffffff', textAlign: 'center', marginTop: 8, lineHeight: 20, width: '86%' },

  carouselWrap: { flex: 1, justifyContent: 'center' },

  itemWrap: { width: CARD_W, height: CARD_H, alignItems: 'center', justifyContent: 'center' },

  card: {
    ...SHADOW,
    width: CARD_W,
    height: CARD_H,
    borderRadius: 18,
    backgroundColor: '#ffffff', // no afecta porque la imagen cubre todo
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e7eef5',
  },

  // contenedor del ImageBackground
  cardBg: { flex: 1, padding: 14 },

  // Imagen del carnet sin (bien fuerte)
  cardBgImg: {
    resizeMode: 'cover',
    opacity: 1,         
    borderRadius: 18,   // mantiene el clip redondeado
  },

  empresa: { alignSelf: 'center', color: '#0b3b57', fontSize: 16, fontWeight: '900', marginBottom: 6 },

  topRow: { flexDirection: 'row', gap: 10, marginBottom: 6, alignItems: 'center' },
  foto: { width: 86, height: 86, borderRadius: 10, backgroundColor: '#e7eef6' },
  infoTop: { flex: 1 },
  nombre: { color: '#0f2e44', fontSize: 18, fontWeight: '900' },
  cargo: { color: '#27485c', marginTop: 2 },

  twoCols: { flexDirection: 'row', marginTop: 6 },
  col: { flex: 1 },

  block: { marginTop: 6 },
  label: { color: '#2d556b', fontSize: 12, fontWeight: '700' },
  value: { color: '#0f2e44', fontSize: 14, fontWeight: '800' },
  valueMuted: { color: '#113a50', marginTop: 2 },

  // QR fijo más arriba
  qrFixed: {
    position: 'absolute',
    right: 12,
    bottom: 11, // súbelo/bájalo aquí si quieres afinar
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrBorder: {
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cfe1ee',
    backgroundColor: '#ffffff',
  },

  footerRow: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rol: { color: '#0f2e44', fontWeight: '900' },

  // Dots un poco más arriba
  dots: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#214a63' },
});
