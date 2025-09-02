import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { type } from '../../theme/typography';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    backgroundColor: colors.blueCard,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { ...type.h2, color: '#E7F3FA', marginBottom: 4 },
  subtitle: { ...type.body, color: '#E7F3FA' },

  cta: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    marginTop: spacing.md,
  },
  ctaText: { color: '#184B2D', fontWeight: '700' },

  dots: { flexDirection: 'row', gap: 6, marginTop: spacing.md },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#9DC0D4' },
  dotActive: { backgroundColor: '#E7F3FA' },

  illustration: { width: 72, height: 72, alignSelf: 'center' },

  // Modal
  infoPanel: {
    backgroundColor: 'rgba(153,185,207,0.6)',
    borderRadius: 16,
    padding: spacing.md,
  },
  infoContent: { paddingBottom: spacing.xs },

  label: {
    ...type.small,
    color: '#203B4F',
    fontWeight: '700',
    marginBottom: spacing.xs,
  },

  row2: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.sm },

  fakeInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0DCE6',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  fakeInputText: { color: '#2A475D', fontWeight: '600' },

  descBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0DCE6',
    padding: spacing.md,
  },
  descText: { color: '#2B3F52', lineHeight: 20 },

  primaryBtn: {
    backgroundColor: '#4F7FA5',
    borderRadius: 20,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  primaryBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
