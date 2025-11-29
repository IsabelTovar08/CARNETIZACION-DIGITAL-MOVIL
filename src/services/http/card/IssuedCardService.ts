// import * as IntentLauncher from "expo-intent-launcher";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
// import * as Linking from "expo-linking";
import { Platform } from "react-native";
import { ApiService } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

export class IssuedCardService<TCreate, TListOrDetail> extends ApiService<
  TCreate,
  TListOrDetail
> {
  constructor() {
    super("IssuedCard");
  }

  /// <summary>
  /// Descarga el PDF en base64 desde la API y lo abre con visor del sistema.
  /// Compatible con Expo Go.
  /// </summary>
  public async openPdf(issuedCardId: number): Promise<void> {
    try {
      const url = `${this.base}/generate/${issuedCardId}`;
      console.log("📡 URL PDF:", url);

      const response = await httpWrapper.handleRequest(
        request<any>(url, {
          method: "GET",
          headers: { Accept: "application/json" },
        })
      );

      console.log(
        "🧾 RESPUESTA COMPLETA --->",
        JSON.stringify(response, null, 2)
      );

      const base64Data =
        response?.data?.data ||
        response?.data ||
        response?.Data;

      if (!base64Data || typeof base64Data !== "string") {
        console.warn("⚠️ No se encontró base64 válido.");
        throw new Error("No se recibió contenido base64 del PDF.");
      }

      console.log("📄 Base64 inicial:", base64Data.substring(0, 80));

      // 📂 Guardar el PDF en el caché temporal de Expo
      const fileUri = `${FileSystem.cacheDirectory}carnet_${issuedCardId}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("✅ PDF guardado en:", fileUri);

      // 📤 Intentar abrir o compartir el archivo PDF
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.warn("⚠️ Compartir no está disponible en este dispositivo.");
      }
    } catch (error) {
      console.error("❌ Error al abrir el PDF:", error);
      throw error;
    }
  }
}
