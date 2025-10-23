import { StyleSheet } from 'react-native';
import  colors  from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
  container: {
    height: 66,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: '#E9F1F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#D7E6EE',
  },
});
