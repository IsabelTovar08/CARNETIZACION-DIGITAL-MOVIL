import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Vibration,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { styles } from './QrReader.styles';

type Parsed = Record<string, any> | null;

function parseQrPayload(raw: string): Parsed {
  // 1) JSON
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj === 'object') return obj;
  } catch {}
  // 2) URL con query params
  try {
    const url = new URL(raw);
    const o: Record<string, string> = {};
    url.searchParams.forEach((v, k) => (o[k] = v));
    if (Object.keys(o).length) {
      o.__href = url.href;
      return o;
    }
  } catch {}
  // 3) Texto plano
  return { raw };
}

export default function QrReaderScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [parsed, setParsed] = useState<Parsed>(null);

  const [confirming, setConfirming] = useState(false);
  const [confirmResult, setConfirmResult] = useState<null | 'ok' | 'error'>(null);

  const camRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, [permission, requestPermission]);

  const onBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (scanned) return;
      setScanned(true);
      setValue(data);
      setParsed(parseQrPayload(data));
      Vibration.vibrate(60);
    },
    [scanned]
  );

  const resetScan = () => {
    setScanned(false);
    setValue(null);
    setParsed(null);
    setConfirming(false);
    setConfirmResult(null);
  };

  const copyToClipboard = async () => {
    if (value) await Clipboard.setStringAsync(value);
  };

  const openLink = () => {
    if (value && /^https?:\/\//i.test(value)) Linking.openURL(value);
    if (parsed && parsed.__href) Linking.openURL(parsed.__href);
  };

  // Habilitamos confirmar cuando tenemos identificadores mínimos
  const canConfirm = useMemo(() => {
    if (!parsed) return false;
    // Ajusta tus claves reales aquí (ejemplos: eventId, userId)
    const possibleEventKeys = ['eventId', 'eventoId', 'id_evento'];
    const possibleUserKeys = ['userId', 'usuarioId', 'id_usuario', 'uid'];

    const hasEvent = possibleEventKeys.some(k => parsed[k] != null && String(parsed[k]).length > 0);
    const hasUser = possibleUserKeys.some(k => parsed[k] != null && String(parsed[k]).length > 0);
    // Si solo tienes un “token” en el QR de tu backend, cambia la regla:
    // const hasToken = parsed.token != null;
    return hasEvent && hasUser;
  }, [parsed]);

  // Simula POST a tu API
  const confirmAttendance = async () => {
    if (!canConfirm || !parsed) return;
    try {
      setConfirming(true);
      // Aquí conectarías tu API, por ejemplo:
      // await fetch('https://tu.api/attendance/confirm', { method: 'POST', body: JSON.stringify(parsed) })
      await new Promise(r => setTimeout(r, 1200)); // simulate
      setConfirmResult('ok');
      Vibration.vibrate([0, 50, 40, 50]);
    } catch {
      setConfirmResult('error');
      Vibration.vibrate([0, 100, 60, 100]);
    } finally {
      setConfirming(false);
    }
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
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
      >
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

      {/* Modal resultado + confirmación */}
      <Modal transparent visible={!!value} animationType="fade" onRequestClose={resetScan}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            {/* Estados */}
            {confirmResult === 'ok' ? (
              <>
                <Text style={styles.modalTitle}>Asistencia confirmada</Text>
                <Text style={styles.modalValue}>¡Registramos tu asistencia correctamente!</Text>
                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.actionBtn, styles.primary]} onPress={resetScan}>
                    <Text style={styles.actionText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : confirmResult === 'error' ? (
              <>
                <Text style={styles.modalTitle}>No se pudo confirmar</Text>
                <Text style={styles.modalValue}>Inténtalo nuevamente.</Text>
                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.actionBtn, styles.primary]} onPress={confirmAttendance}>
                    <Text style={styles.actionText}>Reintentar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn} onPress={resetScan}>
                    <Text style={styles.actionText}>Escanear de nuevo</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Datos leídos</Text>

                {/* Render amistoso si viene JSON/URL */}
                {parsed && (parsed.eventId || parsed.usuarioId || parsed.userId || parsed.raw) ? (
                  <View style={{ marginTop: 6 }}>
                    {parsed.eventId && <Text style={styles.metaLine}>Evento: {String(parsed.eventId)}</Text>}
                    {parsed.usuarioId && <Text style={styles.metaLine}>Usuario: {String(parsed.usuarioId)}</Text>}
                    {parsed.userId && !parsed.usuarioId && (
                      <Text style={styles.metaLine}>Usuario: {String(parsed.userId)}</Text>
                    )}
                    {parsed.nombre && <Text style={styles.metaLine}>Nombre: {String(parsed.nombre)}</Text>}
                    {parsed.email && <Text style={styles.metaLine}>Email: {String(parsed.email)}</Text>}
                    {parsed.raw && <Text style={styles.modalValue} numberOfLines={3}>{String(parsed.raw)}</Text>}
                    {parsed.__href && <Text style={styles.linkLine}>{parsed.__href}</Text>}
                  </View>
                ) : (
                  <Text style={styles.modalValue} numberOfLines={3}>{value}</Text>
                )}

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionBtn} onPress={copyToClipboard}>
                    <Text style={styles.actionText}>Copiar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn} onPress={openLink}>
                    <Text style={styles.actionText}>Abrir</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn} onPress={resetScan}>
                    <Text style={styles.actionText}>Escanear de nuevo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={!canConfirm || confirming}
                    style={[
                      styles.confirmBtn,
                      (!canConfirm || confirming) && { opacity: 0.6 },
                    ]}
                    onPress={confirmAttendance}
                  >
                    {confirming ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.confirmText}>Confirmar asistencia</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
