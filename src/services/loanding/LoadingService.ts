// loading/LoadingService.ts
// Comentario (ES): gestor global de loading con contadores (permite paralelos)

type Listener = (isLoading: boolean) => void;

class LoadingService {
  private count = 0;
  private listeners = new Set<Listener>();

  show() {
    this.count++;
    this.emit();
  }

  hide() {
    this.count = Math.max(0, this.count - 1);
    this.emit();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    // Comentario (ES): notifica estado actual al suscriptor
    listener(this.count > 0);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    const isLoading = this.count > 0;
    this.listeners.forEach(l => l(isLoading));
  }
}

export const loadingService = new LoadingService();
