import { StyleSheet, StyleSheetProperties } from 'react-native';

export const colors = {
  primary: '#0D47A1',
  secondary: '#1976D2',
  bg: '#F9FAFB',
  text: '#1E293B',
  border: '#E2E8F0',
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingBottom: 100,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 88,
  },

  itemSeparator: {
    height: 12,
  },

  searchWrap: {
    marginTop: 8,
    marginBottom: 12,
  },

  sectionTitleWrap: {
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#E3F2FD',
    color: colors.primary,
    fontWeight: '800',
    overflow: 'hidden',
  },

  /* ==== Tap overlay por card ==== */
  cardWrap: {
    position: 'relative',
  },
  cardTapOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16, // ajusta si tu card tiene esquinas redondeadas
  },

  /* ====== Modal ====== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#B0CCDD',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#163b50',
    marginBottom: 12,
    textAlign: 'center',
  },
  pill: {
    width: '92%',
    backgroundColor: '#F0EFE8',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E2D6',
  },
  pillText: {
    color: '#2a2a2a',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalCloseBtn: {
    marginTop: 14,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#dbe7ef',
  },
  modalCloseTxt: {
    color: colors.primary,
    fontWeight: '800',
  },
});
