import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export default function ScreenWrapper({ children }: any) {

  // Si el hijo ES un ScrollView → agregamos espaciador
  if (children?.type === ScrollView) {
    const spacer = <View style={{ height: 70 }} />;

    return React.cloneElement(children, {
      children: (
        <>
          {children.props.children}
          {spacer}
        </>
      ),
    });
  }

  // Si NO es scroll → igual agregamos espaciador al final
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        {children}
        <View style={{ height: 70 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
