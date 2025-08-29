import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  icon: { color: '#64748B', marginRight: 6 },
  input: { flex: 1, color: '#0F172A', fontSize: 15 },
  clearBtn: { padding: 4, marginLeft: 4 },
  clearIcon: { color: '#64748B' },
});
