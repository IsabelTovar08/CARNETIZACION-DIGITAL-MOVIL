import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/spacing';
import { type } from '../../theme/typography';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.border,
  },
  name: {
    ...type.h2, color: colors.text,
  },
  role: {
    ...type.small, color: colors.textSoft, marginTop: 2,
  },
});
