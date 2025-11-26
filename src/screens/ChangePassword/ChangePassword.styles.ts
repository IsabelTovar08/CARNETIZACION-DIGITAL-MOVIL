import { StyleSheet, Platform } from 'react-native';

const CARD_BG = '#ffffffdd';
const PRIMARY = '#2F6D8B';
const PRIMARY_DARK = '#1F516A';
const TEXT_DARK = '#0E2E42';

export const styles = StyleSheet.create({
  safe: {
    flex: 1
  },

  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  backBtn: {
    position: 'absolute',
    left: 16,
    top: 40,
    zIndex: 10,
    backgroundColor: '#ffffff55',
    padding: 10,
    borderRadius: 50,
  },

  logo: {
    position: 'absolute',
    right: 16,
    top: 38,
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },

  // ====== CARD PRINCIPAL ======
  card: {
    marginTop: 140,
    marginHorizontal: 20,
    backgroundColor: CARD_BG,
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingBottom: 30,
    paddingTop: 28,

    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 14 },
        }
      : { elevation: 15 }),
  },

  title: {
    color: TEXT_DARK,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
  },

  subtitle: {
    color: '#4A6A80',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 18,
  },

  // ===== INPUTS =====
  inputWrap: {
    backgroundColor: '#F6F9FC',
    borderRadius: 20,
    height: 50,
    paddingLeft: 46,
    paddingRight: 16,
    justifyContent: 'center',
    borderColor: '#D4E2EE',
    borderWidth: 1.2,
    marginTop: 14,
  },

  leftIcon: {
    position: 'absolute',
    left: 14,
    top: 14,
  },

  input: {
    fontSize: 15,
    color: TEXT_DARK,
    fontWeight: '500',
  },

  err: {
    color: '#C0392B',
    marginTop: 4,
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },

  errBackend: {
    marginTop: 10,
    textAlign: 'center',
    color: '#C0392B',
    fontSize: 13,
    fontWeight: '700',
  },

  // ===== BOTONES =====
  btn: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  btnPrimary: {
    backgroundColor: PRIMARY,
  },

  btnPrimaryPressed: {
    backgroundColor: PRIMARY_DARK,
  },

  btnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },

  btnGhost: {
    backgroundColor: '#ECF1F4',
  },

  btnGhostText: {
    color: TEXT_DARK,
    fontWeight: '800',
    fontSize: 17,
  },

  // ===== MODAL =====
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.50)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#FAFCFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,

    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 12 },
        }
      : { elevation: 12 }),
  },

  modalTitle: {
    color: PRIMARY_DARK,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },

  modalIconWrap: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },

  modalMsg: {
    color: '#395A72',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 15,
  },

  modalBtn: {
    marginTop: 20,
    backgroundColor: PRIMARY,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 17,
  },
});
