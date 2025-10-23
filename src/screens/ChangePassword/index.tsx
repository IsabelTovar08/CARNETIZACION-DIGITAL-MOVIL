// src/screens/ChangePassword/index.tsx
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ChangePassword.styles';

const BG = require('../../img/fondo.png');
const LOGO = require('../../../assets/icons/logo1.png');

// Regla de contraseña: 8+ chars, 1 mayús, 1 minús, 1 número (¡puedes ajustar!)
const hasUpper = (s: string) => /[A-ZÁÉÍÓÚÑ]/.test(s);
const hasLower = (s: string) => /[a-záéíóúñ]/.test(s);
const hasDigit = (s: string) => /\d/.test(s);

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  const [current, setCurrent] = useState('');
  const [nextPwd, setNextPwd] = useState('');
  const [confirm, setConfirm] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const errors = useMemo(() => {
    const e: { current?: string; nextPwd?: string; confirm?: string } = {};
    if (!current.trim()) e.current = 'La contraseña actual es obligatoria.';
    if (!nextPwd.trim()) {
      e.nextPwd = 'La nueva contraseña es obligatoria.';
    } else {
      if (nextPwd.length < 8) e.nextPwd = 'Debe tener mínimo 8 caracteres.';
      else if (!hasUpper(nextPwd)) e.nextPwd = 'Debe incluir al menos una mayúscula.';
      else if (!hasLower(nextPwd)) e.nextPwd = 'Debe incluir al menos una minúscula.';
      else if (!hasDigit(nextPwd)) e.nextPwd = 'Debe incluir al menos un número.';
    }
    if (!confirm.trim()) e.confirm = 'Debes confirmar la contraseña.';
    else if (confirm !== nextPwd) e.confirm = 'Las contraseñas no coinciden.';
    return e;
  }, [current, nextPwd, confirm]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onSubmit = () => {
    setSubmitted(true);
    if (!isValid) return;
    setShowSuccess(true);
  };

  const onCloseModal = () => {
    setShowSuccess(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={BG} style={styles.bg} resizeMode="cover" />

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
      <Image source={LOGO} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Actualizar{'\n'}contraseña</Text>
        <Text style={styles.subtitle}>
          Por favor, introduce tu contraseña actual y a continuación ingresa la nueva contraseña
          que deseas configurar.
        </Text>

        {/* Actual */}
        <View style={styles.inputWrap}>
          <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.leftIcon}>
            <Path d="M7 10h10v10H7z" fill="#C7D3DD" />
            <Path d="M8 10h8v10H8z" stroke="#656d74" strokeWidth={1.2} fill="none" />
            <Path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="#8197AA" strokeWidth={2} fill="none" />
          </Svg>
          <TextInput
            value={current}
            onChangeText={setCurrent}
            placeholder="Actual contraseña"
            placeholderTextColor="#6C8AA3"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {submitted && errors.current ? <Text style={styles.err}>{errors.current}</Text> : null}

        {/* Nueva */}
        <View style={styles.inputWrap}>
          <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.leftIcon}>
            <Path d="M7 10h10v10H7z" fill="#C7D3DD" />
            <Path d="M8 10h8v10H8z" stroke="#656d74" strokeWidth={1.2} fill="none" />
            <Path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="#8197AA" strokeWidth={2} fill="none" />
          </Svg>
          <TextInput
            value={nextPwd}
            onChangeText={setNextPwd}
            placeholder="Nueva contraseña"
            placeholderTextColor="#6C8AA3"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {submitted && errors.nextPwd ? <Text style={styles.err}>{errors.nextPwd}</Text> : null}

        {/* Confirmar */}
        <View style={styles.inputWrap}>
          <Svg width={20} height={20} viewBox="0 0 24 24" style={styles.leftIcon}>
            <Path d="M7 10h10v10H7z" fill="#C7D3DD" />
            <Path d="M8 10h8v10H8z" stroke="#656d74" strokeWidth={1.2} fill="none" />
            <Path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="#8197AA" strokeWidth={2} fill="none" />
          </Svg>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#6C8AA3"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {submitted && errors.confirm ? <Text style={styles.err}>{errors.confirm}</Text> : null}

        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, !isValid && { opacity: 0.6 }]}
          onPress={onSubmit}
          disabled={!isValid && submitted}
        >
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => navigation.goBack()}>
          <Text style={styles.btnGhostText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showSuccess} transparent animationType="fade" onRequestClose={onCloseModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Actualización{'\n'}exitosa</Text>
            <View style={styles.modalIconWrap}>
              <Svg width={78} height={78} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="46" fill="#E9F3FF" />
                <Path
                  d="M30 52 l14 14 26-30"
                  stroke="#2F70C7"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <Text style={styles.modalMsg}>Contraseña actualizada exitosamente</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={onCloseModal}>
              <Text style={styles.modalBtnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
