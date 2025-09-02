import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Vibration,
  Modal,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { styles } from './QrReader.styles';

export default function QrReaderScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const camRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, [permission, requestPermission]);

  const onBarCodeScanned = useCallback(({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setValue(data);
    Vibration.vibrate(60);
  }, [scanned]);

  const resetScan = () => {
    setScanned(false);
    setValue(null);
  };

  const copyToClipboard = async () => {
    if (value) await Clipboard.setStringAsync(value);
  };

  const openLink = () => {
    if (value && /^https?:\/\//i.test(value)) Linking.openURL(value);
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.info}>Solicitando permisos de cámara…</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.info}>Necesitas habilitar la cámara para escanear QR.</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Conceder permiso</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      <View style={styles.cameraWrap}>
        <CameraView
          ref={camRef}
          style={styles.cameraFill}
          facing="back"
          onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />

        <View style={styles.overlay}>
          <View style={styles.mask} />
          <View style={styles.centerRow}>
            <View style={styles.mask} />
            <View style={styles.frame}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />
            </View>
            <View style={styles.mask} />
          </View>
          <View style={styles.mask} />
        </View>

        <Text style={styles.hint}>Alinea el QR dentro del marco</Text>
      </View>

      <Modal transparent visible={!!value} animationType="fade" onRequestClose={resetScan}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Resultado</Text>
            <Text style={styles.modalValue} numberOfLines={3}>{value}</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionBtn, styles.primary]} onPress={openLink}>
                <Text style={styles.actionText}>Abrir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={copyToClipboard}>
                <Text style={styles.actionText}>Copiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={resetScan}>
                <Text style={styles.actionText}>Escanear de nuevo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
