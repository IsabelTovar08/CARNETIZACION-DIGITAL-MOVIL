import { StyleSheet } from 'react-native';
import  colors  from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { type } from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { ...type.h2, color: colors.text },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { color: colors.text, fontWeight: '600' },
});
