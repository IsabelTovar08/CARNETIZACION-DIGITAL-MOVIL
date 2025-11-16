import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Sound } from './../../../../node_modules/expo-av/src/Audio/Sound';
import { Audio } from "expo-av";
/// <summary>
/// Reproduce un sonido corto de notificación.
/// </summary>
export async function playNotificationSound() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../assets/sounds/new-notification-024-370048.mp3") // coloca tu archivo
    );

    await sound.playAsync();

    // Descargar de memoria tras reproducir
    sound.setOnPlaybackStatusUpdate((status) => {
      if ((status as any).didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log("Error reproduciendo sonido:", error);
  }
}

/// <summary>
/// Muestra banner + sonido tipo WhatsApp
/// </summary>
export async function showNotificationBanner(title: string, message: string) {
  await playNotificationSound();

  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title,
    textBody: message
  });
}