import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, LayoutChangeEvent, View, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { myTabBarContainer, myTabBarIndicator, myTabBarItem } from './tabbar.styles';

const ICONS: Record<string, { active: React.ComponentProps<typeof Ionicons>['name']; inactive: React.ComponentProps<typeof Ionicons>['name'] }> = {
  HomeTab:        { active: 'home',        inactive: 'home-outline' },
  DetailsTab:     { active: 'person',      inactive: 'person-outline' }, // ← actualizado
  PerfilTab:      { active: 'person',      inactive: 'person-outline' },
  NotificationsTab:{ active: 'notifications', inactive: 'notifications-outline' },
};

const INDICATOR_TWEAK = Platform.select({ android: -1, ios: 0, default: 0 }) ?? 0;
const ICON_SIZE = 26;
const H_PAD = 12;

export default function MyTabBar({ state, navigation }: any) {
  const widths = useRef<number[]>([]);
  const xPositions = useRef<number[]>([]);
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(ICON_SIZE + H_PAD * 2);

  const onContainerLayout = (e: any) => {
    const containerW = e.nativeEvent.layout.width;
    const count = state.routes.length;
    const w = containerW / count;
    const indW = ICON_SIZE + H_PAD * 2;
    indicatorWidth.value = indW;
    const left = (w * state.index + w / 2) - (indW / 2) + INDICATOR_TWEAK;
    translateX.value = left;
  };

  const onItemLayout = (i: number) => (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    const x = e.nativeEvent.layout.x;
    widths.current[i] = w;
    xPositions.current[i] = x;

    if (i === state.index) {
      const indW = ICON_SIZE + H_PAD * 2;
      indicatorWidth.value = withTiming(indW, { duration: 160, easing: Easing.linear });
      const left = x + (w / 2) - (indW / 2) + INDICATOR_TWEAK;
      translateX.value = withTiming(left, { duration: 160, easing: Easing.linear });
    }
  };

  useEffect(() => {
    const w = widths.current[state.index];
    const x = xPositions.current[state.index];
    if (typeof w === 'number' && typeof x === 'number') {
      const indW = ICON_SIZE + H_PAD * 2;
      indicatorWidth.value = withTiming(indW, { duration: 200, easing: Easing.linear });
      const left = x + (w / 2) - (indW / 2) + INDICATOR_TWEAK;
      translateX.value = withTiming(left, { duration: 200, easing: Easing.linear });
    }
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: translateX.value,
    width: indicatorWidth.value,
  }));

  return (
    <Animated.View style={myTabBarContainer} onLayout={onContainerLayout}>
      <Animated.View style={[myTabBarIndicator, indicatorStyle]} />
      {state.routes.map((route: any, i: number) => {
        const isFocused = state.index === i;
        const map = ICONS[route.name] ?? ICONS.HomeTab;

        const onPress = () => {
          const w = widths.current[i];
          const x = xPositions.current[i];
          if (typeof w === 'number' && typeof x === 'number') {
            const indW = ICON_SIZE + H_PAD * 2;
            indicatorWidth.value = withTiming(indW, { duration: 200, easing: Easing.linear });
            const left = x + (w / 2) - (indW / 2) + INDICATOR_TWEAK;
            translateX.value = withTiming(left, { duration: 200, easing: Easing.linear });
          }
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            style={myTabBarItem}
            onPress={onPress}
            onLayout={onItemLayout(i)}
            activeOpacity={0.85}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name={isFocused ? map.active : map.inactive}
                size={ICON_SIZE}
                color={isFocused ? '#000' : '#2F6D8B'}
                style={{ transform: [{ scale: isFocused ? 1.08 : 1 }] }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
