import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { styles } from './QrReader.styles';
import { AttendanceService } from '../../services/http/attendance/AttendanceService';

const attendanceService = new AttendanceService();

export default function QrReaderScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [qrValue, setQrValue] = useState<string | null>(null);

  const [modal, setModal] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const camRef = useRef<CameraView>(null);

  // Pedir permisos
  useEffect(() => {
    if (permission && permission.status === 'undetermined') {
      requestPermission();
    }
  }, [permission]);

  const resetScan = () => {
    setScanned(false);
    setQrValue(null);
    setModal(null);
    setLoading(false);
  };

  const onBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (scanned) return;

      setScanned(true);
      setQrValue(data);
      Vibration.vibrate(60);

      handleAttendance(data);
    },
    [scanned]
  );

  // ----------------------------------------------------------
  // 🔥 PROCESAR LA ASISTENCIA
  // ----------------------------------------------------------
  const handleAttendance = async (qrCodeKey: string) => {
    try {
      setLoading(true);

      // 1) Intentar entrada
      const entryRes = await attendanceService.registerEntry(qrCodeKey);

      if (entryRes?.success) {
        setModal({
          title: "Entrada registrada",
          message: entryRes?.message ?? "Entrada registrada correctamente.",
          type: "entry",
        });
        Vibration.vibrate([0, 50, 40, 50]);
        return;
      }

      // Entrada ya existente → preguntar salida
      if (entryRes?.message?.includes("¿Desea realizar la salida?")) {
        setModal({
          title: "Entrada existente",
          message: entryRes.message,
          type: "ask-exit",
          qrCodeKey,
        });
        return;
      }

      // Error estándar
      setModal({
        title: "Error",
        message: entryRes?.message ?? "No se pudo registrar la asistencia.",
        type: "error",
      });

    } catch (err) {
      console.log("❌ Error:", err);
      setModal({
        title: "Error",
        message: "Error de conexión.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // 🔥 CONFIRMAR SALIDA
  // ----------------------------------------------------------
  const handleExit = async (qrCodeKey: string) => {
    try {
      setLoading(true);
      const exitRes = await attendanceService.registerExit(qrCodeKey);

      if (exitRes?.success) {
        setModal({
          title: "Salida registrada",
          message: exitRes?.message ?? "Salida registrada correctamente.",
          type: "exit",
        });
        Vibration.vibrate([0, 50, 40, 50]);
        return;
      }

      setModal({
        title: "Error",
        message: exitRes?.message ?? "No se pudo registrar la salida.",
        type: "error",
      });

    } catch (err) {
      console.log("❌ Error salida:", err);
      setModal({
        title: "Error",
        message: "Error de conexión.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.info}>Solicitando permisos…</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.info}>Necesitas habilitar la cámara.</Text>

        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Conceder permiso</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>

      {/* Botón volver */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* Cámara */}
      <View style={styles.cameraWrap}>
        <CameraView
          ref={camRef}
          style={styles.cameraFill}
          facing="back"
          onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />

        {/* 🔥 Overlay con marco de escaneo */}
        <View style={styles.overlay}>
          <View style={styles.mask} />
          <View style={styles.centerRow}>
            <View style={styles.mask} />

            {/* Marco */}
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

      {/* 🔵 LOADING overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00ffcc" />
          <Text style={styles.loadingText}>Procesando…</Text>
        </View>
      )}

      {/* MODAL RESPUESTAS */}
      <Modal transparent visible={!!modal}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{modal?.title}</Text>
            <Text style={styles.modalValue}>{modal?.message}</Text>

            <View style={styles.actions}>
              {modal?.type === "ask-exit" ? (
                <>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.primary]}
                    onPress={() => handleExit(modal.qrCodeKey)}
                  >
                    <Text style={styles.actionText}>Sí, registrar salida</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn]}
                    onPress={resetScan}
                  >
                    <Text style={styles.actionText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.primary]}
                  onPress={resetScan}
                >
                  <Text style={styles.actionText}>Cerrar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
