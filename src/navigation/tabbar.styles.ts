import { ViewStyle } from 'react-native';

export const myTabBarContainer: ViewStyle = {
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 25,
  height: 64,
  borderRadius: 28,
  backgroundColor: '#C4D0E1',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 0,
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  overflow: 'hidden',
};

export const myTabBarItem: ViewStyle = {
  flex: 1,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

export const myTabBarIndicator: ViewStyle = {
  position: 'absolute',
  right: 15,
  bottom: 12,          // súbelo/ bájalo para centrar con el icono
  height: 40,         // alto de la pastilla
  backgroundColor: '#4681A998',
  borderRadius: 18,   // mitad del height para forma de pastilla
};
