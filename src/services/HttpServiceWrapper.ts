import { Alert } from 'react-native';
import { loadingService } from './loanding/LoadingService';

class HttpServiceWrapper {
  handleRequest<T>(promise: Promise<T>): Promise<T> {
    loadingService.show();
    return promise
      .catch((error: any) => {
        console.error('HTTP Error:', error);
        const msg = error?.message || error?.body || error?.statusText || 'Ocurrió un error inesperado';
        Alert.alert('Error', String(msg));
        throw error;
      })
      .finally(() => loadingService.hide());
  }
}

// Comentario (ES): instancia única para toda la app
export const httpWrapper = new HttpServiceWrapper();
