import { StyleSheet } from 'react-native';

export const palette = {
  primary: '#0D47A1',   // azul fuerte (coherente con tu app)
  secondary: '#1976D2', // azul medio
  accent: '#2F6D8B',    // azul verdoso usado en iconos
  chip: '#3B82F6',      // azul del texto del chip
  light: '#E3F2FD',     // celeste suave (fondos)
  danger: '#E53935',
  text: '#1E293B',
  muted: '#64748B',
  border: '#E2E8F0',
  bg: '#F9FAFB',
  primaryLight: '#BBDEFB',
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardUnread: {
    borderColor: palette.light,
  },
  cardAlert: {
    borderColor: '#FAD1D1',
    backgroundColor: '#FFFAFA',
  },
  leftIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 2,
  },
  titleUnread: {
    color: palette.primary,
  },
  subtitle: {
    fontSize: 13,
    color: palette.muted,
  },
  timeChip: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: palette.light,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: palette.chip,
  },
  unreadDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.primary,
  },
});
