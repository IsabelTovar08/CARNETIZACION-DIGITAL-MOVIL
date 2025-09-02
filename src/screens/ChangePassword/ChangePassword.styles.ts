import { StyleSheet, Platform } from 'react-native';

const BLUE = '#79a5c2ff';

export const styles = StyleSheet.create({
  safe: { flex: 1 },
  bg: { position: 'absolute', width: '100%', height: '100%' },

  backBtn: { position: 'absolute', left: 18, top: 40, zIndex: 10 },
  logo: { position: 'absolute', right: 18, top: 35, width: 45, height: 58, resizeMode: 'contain' },

  card: {
    marginTop: 150,
    marginHorizontal: 20,
    backgroundColor: BLUE,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingBottom: 24,
    paddingTop: 24,
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 18, shadowOffset: { width: 0, height: 12 } }
      : { elevation: 6 }),
  },

  title: { color: '#F3FAFF', fontSize: 28, lineHeight: 30, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: '#EAF3FA', textAlign: 'center', marginTop: 10, marginBottom: 14 },

  inputWrap: {
    backgroundColor: '#EFF4F8',
    borderRadius: 22,
    height: 48,
    paddingLeft: 40,
    paddingRight: 16,
    justifyContent: 'center',
    borderColor: '#C8D9E6',
    borderWidth: 1,
    marginTop: 12,
  },
  leftIcon: { position: 'absolute', left: 12, top: 14 },
  input: { fontSize: 15, color: '#0E2E42' },

  err: { color: '#FEE2E2', marginTop: 4, marginLeft: 6, fontSize: 12, fontWeight: '600' },

  btn: { height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  btnPrimary: { backgroundColor: '#2F6D8B' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 18 },

  btnGhost: { backgroundColor: '#EBEEF1' },
  btnGhostText: { color: '#0B2D3E', fontWeight: '800', fontSize: 18 },

  // Modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center', padding: 22 },
  modalCard: {
    width: '100%',
    backgroundColor: '#DCECF9',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 14, shadowOffset: { width: 0, height: 10 } }
      : { elevation: 6 }),
  },
  modalTitle: { color: '#2C5E88', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  modalIconWrap: { alignItems: 'center', marginTop: 12, marginBottom: 8 },
  modalMsg: { color: '#2C5E88', textAlign: 'center', marginTop: 6 },

  modalBtn: {
    marginTop: 16,
    backgroundColor: '#3E7CA6',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
