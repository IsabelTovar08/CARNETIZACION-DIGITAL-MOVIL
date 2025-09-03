import { Platform, StyleSheet } from 'react-native';

const SHADOW =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      }
    : { elevation: 10 };

export const styles = StyleSheet.create({
  container: { flex: 1,},
  bgFull: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

  // Botón de retroceso (como el header, pero custom)
  backBtn: {
    position: 'absolute',
    top: 33,
    left: 16,
    zIndex: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(89, 167, 244, 1)',
  },

  // ÚNICA CARD (logo dentro)
  card: {
    ...SHADOW,
    marginTop: 170,
    marginHorizontal: 24, // ← coincide con AuthCard para verse alineadas
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(89, 167, 244, 1)',
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#123C56',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: { color: '#5E7C94', marginBottom: 6, fontWeight: '600' },
  labelPwd: { color: '#5E7C94', marginBottom: 6, fontWeight: '600', marginTop: 14 },

  inputWrap: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#53585cff',
    paddingLeft: 40,
    paddingRight: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 6,
  },
  input: { fontSize: 15, color: '#0E2E42' },
  leftIcon: { position: 'absolute', left: 12, top: 12 },
  rightIcon: { position: 'absolute', right: 12, top: 10, padding: 6 },

  error: { color: '#b91c1c', textAlign: 'center', marginTop: 8 },
  errorField: { color: '#b91c1c', fontSize: 12, marginTop: 4, marginBottom: 4 },

  btn: {
    backgroundColor: '#4F7FA5',
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 14,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 18, textAlign: 'center' },
  forgotWrap: { alignSelf: 'center', marginTop: 10 },
  forgot: { color: '#5E7C94', textDecorationLine: 'underline' },
});
