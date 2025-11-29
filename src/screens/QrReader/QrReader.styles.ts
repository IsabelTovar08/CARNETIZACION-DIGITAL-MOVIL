import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  info: { color: '#234c63', textAlign: 'center', fontSize: 16 },

  back: { position: 'absolute', top: 14, left: 14, zIndex: 10 },

  cameraWrap: { flex: 1, justifyContent: 'center' },
  cameraFill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },

  overlay: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  centerRow: { flexDirection: 'row' },
  frame: {
    width: 250, height: 250,
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  corner: { position: 'absolute', width: 32, height: 32, borderColor: '#3FD0FF' },
  tl: { top: -2, left: -2, borderLeftWidth: 4, borderTopWidth: 4, borderTopLeftRadius: 12 },
  tr: { top: -2, right: -2, borderRightWidth: 4, borderTopWidth: 4, borderTopRightRadius: 12 },
  bl: { bottom: -2, left: -2, borderLeftWidth: 4, borderBottomWidth: 4, borderBottomLeftRadius: 12 },
  br: { bottom: -2, right: -2, borderRightWidth: 4, borderBottomWidth: 4, borderBottomRightRadius: 12 },

  hint: { position: 'absolute', bottom: 28, alignSelf: 'center', color: '#fff', fontSize: 15 },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 18 },
  modalCard: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#1f3b53', marginBottom: 6 },
  modalValue: { color: '#0e2e42' },
  metaLine: { color: '#26455A', marginTop: 2 },
  linkLine: { color: '#2F6D8B', marginTop: 4 },

  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  actionBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#e6eef6' },
  primary: { backgroundColor: '#4F7FA5' },
  actionText: { color: '#0e2e42', fontWeight: '700' },

  confirmBtn: { flexGrow: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, backgroundColor: '#2F6D8B' },
  confirmText: { color: '#fff', fontWeight: '800', textAlign: 'center' },

  btn: { marginTop: 12, backgroundColor: '#4F7FA5', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '800' },

  // Éxito
  successCard: { width: '100%', backgroundColor: '#E7F4FF', borderRadius: 16, padding: 18, alignItems: 'center' },
  successTitle: { fontSize: 18, fontWeight: '900', color: '#174B73', marginBottom: 8, textAlign: 'center' },
  successIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#2F7DD3', alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  successMsg: { color: '#174B73', textAlign: 'center', marginBottom: 14 },
  successBtn: { backgroundColor: '#2F6D8B', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18, alignSelf: 'stretch' },
  successBtnText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
  
  loadingOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.55)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20,
},

loadingText: {
  color: "#fff",
  marginTop: 12,
  fontSize: 16,
},

});
