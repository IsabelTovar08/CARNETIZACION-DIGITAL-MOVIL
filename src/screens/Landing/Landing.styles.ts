import { Platform, StyleSheet } from 'react-native';

export const SHADOW =
  Platform.OS === 'ios'
    ? { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }
    : { elevation: 8 };

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  bgFull: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  logoBadge: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 95,
    height: 95,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 105, height: 105, resizeMode: 'contain' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 40, fontWeight: '900', color: '#0E3A4F', marginBottom: 24, textAlign: 'center' },
  primaryButton: {
    backgroundColor: '#5D8FB7',
    height: 54,
    paddingHorizontal: 36,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
});
