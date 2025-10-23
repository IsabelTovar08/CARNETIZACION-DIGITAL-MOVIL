import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './searchBar.styles';

type Props = {
  value: string;
  placeholder?: string;
  onChangeText: (t: string) => void;
  onClear?: () => void;
};

export default function SearchBar({ value, placeholder = 'Buscar…', onChangeText, onClear }: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search-outline" size={18} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={18} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}
