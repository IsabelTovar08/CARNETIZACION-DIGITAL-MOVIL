import { StyleSheet } from 'react-native';

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
  },

  /** Fondo general de imagen */
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
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
});
