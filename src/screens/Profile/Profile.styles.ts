import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const colorsA = {
  bg: '#0B1A3AFF',
  card: '#ffffff',
  ink: '#0f172a',
  muted: '#6b7280',
  primary: '#2563eb',
  danger: '#e11d48',
  ring: '#CBC7E2FF',
};

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { paddingBottom: 48 },

  header: {
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: colorsA.bg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    top: -120,
    width: '140%',
    height: 260,
    backgroundColor: colors.blueCard,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    transform: [{ scaleX: 1.1 }],
  },
  avatarWrap: {
    marginTop: 32,
    width: 112,
    height: 112,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarShadow: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 999,
    backgroundColor: '#fff',
    opacity: 0.28,
    transform: [{ scale: 1.12 }],
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: colorsA.ring,
    backgroundColor: '#e2e8f0',
  },
  miniAction: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6eef5',
  },
  miniActionActive: { backgroundColor: '#b8f1d8' },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '800',
    color: '#ecfdf5',
  },
  subtitle: { marginTop: 4, fontSize: 12, color: '#d1fae5' },

  card: {
    marginTop: -20,
    marginBottom: 25,
    marginHorizontal: 16,
    backgroundColor: colorsA.card,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },

  fieldBlock: { marginBottom: 14 },
  label: { color: colorsA.ink, opacity: 0.7, marginBottom: 6, fontWeight: '600' },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e7ecf3',
    paddingHorizontal: 12,
    height: 48,
  },
  inputDisabled: { backgroundColor: '#f6f7fb' },
  inputIcon: { marginRight: 8, color: colorsA.muted },
  input: { flex: 1, color: colorsA.ink, fontSize: 15 },
  lock: { marginLeft: 8, color: colorsA.muted },

  actionsRow: {
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 5,
  },
  ghostBtn: {
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  ghostIcon: { marginRight: 8 },
  ghostLabel: { fontWeight: '700' },
  ghostPrimary: { borderColor: colorsA.primary + '33' },
  ghostDanger: { borderColor: colorsA.danger + '33' },
  primaryTxt: { color: colorsA.primary },
  dangerTxt: { color: colorsA.danger },

  twofaRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.1,
    borderColor: '#D4E2EE',
  },

  twofaStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0E2E42',
  },

  errBackend: {
    color: '#C0392B',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
  },

  /* 🔥 Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    elevation: 8,
  },

  modalTitle: {
    color: '#0E2E42',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },

  modalMsg: {
    marginTop: 10,
    textAlign: 'center',
    color: '#4B6578',
    fontSize: 15,
  },

  modalActions: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCancel: {
    backgroundColor: '#ECEFF3',
    marginRight: 10,
  },

  modalConfirm: {
    backgroundColor: '#2F6D8B',
  },

  modalCancelText: {
    color: '#0E2E42',
    fontWeight: '700',
    fontSize: 16,
  },

  modalConfirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

});
