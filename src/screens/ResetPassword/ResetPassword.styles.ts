import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  bg: { flex: 1 },

  field: { marginTop: 10 },
  label: { color: '#2b5878', fontWeight: '800', marginBottom: 6 },
  inputWrap: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#6b7f91',
    paddingRight: 44,
  },
  input: { height: 46, paddingHorizontal: 14, fontSize: 15.5, color: '#0f2a3a' },
  eyeBtn: { position: 'absolute', right: 10, top: 0, height: 46, width: 36, alignItems: 'center', justifyContent: 'center' },
  eyeIcon: { width: 20, height: 20, tintColor: '#6b7f91' },

  error: { color: '#b91c1c', textAlign: 'center', marginTop: 8 },

  primaryBtn: { backgroundColor: '#4F7FA5', borderRadius: 16, paddingVertical: 12, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '900', fontSize: 18 },
});
