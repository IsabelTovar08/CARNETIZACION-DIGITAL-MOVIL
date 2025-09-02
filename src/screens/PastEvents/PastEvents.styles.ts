import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  bg: { flex: 1 },

  header: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSpacer: { width: 26 },

  title: { color: '#0f3a54', fontSize: 30, fontWeight: '900', lineHeight: 32 },
  title2: { color: '#0f3a54' },

  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
    elevation: 3,
  },
  cardImg: { width: '100%', height: 160 },
  cardBody: { padding: 12 },
  cardTitle: {
    color: '#1b3e56',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSpace: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  meta: { color: '#334e64' },

  footerSpace: { height: 24 },

  // ===== Modal
  modalBackBtn: { marginBottom: 6, alignSelf: 'flex-start' },
  modalEyebrow: { color: '#6A7F91', fontSize: 13, marginBottom: 6 },
  modalTitle: { color: '#222E39', fontSize: 22, fontWeight: '900', marginBottom: 8, lineHeight: 26 },
  modalImg: { width: '100%', height: 170, borderRadius: 12, marginBottom: 12 },
  modalSection: { color: '#223F53', fontSize: 16, fontWeight: '800', marginTop: 4, marginBottom: 8 },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD7E1',
    padding: 10,
  },
  modalScroll: { maxHeight: 160 },
  modalDesc: { color: '#2B3F52', lineHeight: 20 },
});
