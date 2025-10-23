import { StyleSheet, Platform } from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }
    : { elevation: 8 };

export const styles = StyleSheet.create({
  // Layout
  safe: { flex: 1, backgroundColor: '#00000000' },
  bgImage: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 18, justifyContent: 'center' },

  // Card (sólida) y misma anchura que el modal
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 22,
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  shadow,

  // Header
  title: { fontSize: 22, fontWeight: '800', color: '#21465f', textAlign: 'center', marginBottom: 8 },
  iconWrap: { alignItems: 'center', marginBottom: 8 },
  icon: { width: 84, height: 84 },

  // Textos
  help: { color: '#2b5878', textAlign: 'center', marginBottom: 12, lineHeight: 20 },
  mail: { fontWeight: '700', color: '#1b3e56' },

  // OTP (más compacto)
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  otpInput: {
    width: 42,
    height: 48,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: '#4F7FA5',
    backgroundColor: '#e9f1f7',
    fontSize: 18,
    fontWeight: '700',
    color: '#1a2a36',
  },
  err: { color: '#b91c1c', textAlign: 'center', marginTop: 2, marginBottom: 2 },

  // Botón principal
  btn: {
    backgroundColor: '#4F7FA5',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 18 },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#21465f', textAlign: 'center', marginBottom: 8 },
  modalMsg: { color: '#2b5878', textAlign: 'center', marginBottom: 14, lineHeight: 20 },
  bigCheck: { alignItems: 'center', marginBottom: 12 },
  modalIconOk: { width: 56, height: 56, tintColor: '#2ecc71' },
  modalIconError: { width: 56, height: 56, tintColor: '#e74c3c' },
  modalBtn: {
    alignSelf: 'center',
    backgroundColor: '#4F7FA5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  modalBtnText: { color: '#fff', fontWeight: '800', fontSize: 18 },
});
