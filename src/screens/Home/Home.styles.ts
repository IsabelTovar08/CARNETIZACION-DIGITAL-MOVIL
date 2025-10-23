import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0D47A1',   // azul fuerte (tu gama)
  secondary: '#1976D2', // azul medio
  bg: '#F9FAFB',
  text: '#1E293B',
  border: '#E2E8F0',
};

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingBottom: 100
  },

  /** Comentario (ES): padding general de la lista + bottom padding para TabBar */
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 88,
  },

  /** Comentario (ES): separador entre tarjetas */
  itemSeparator: {
    height: 12,
  },

  /** Comentario (ES): pequeño margen alrededor del buscador */
  searchWrap: {
    marginTop: 8,
    marginBottom: 12,
  },

  /** ====== Encabezados de sección ====== */
  sectionTitleWrap: {
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  /** Badge del SectionHeader */
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#E3F2FD', // celeste suave
    color: colors.primary,
    fontWeight: '800',
    overflow: 'hidden',
  },
});
