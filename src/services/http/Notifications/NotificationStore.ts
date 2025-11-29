class NotificationStore {
  private unread = 0;
  private listeners: Array<(count: number) => void> = [];

  getValue() {
    return this.unread;
  }

  /// <summary>Establecer un valor específico (usado cuando carga del backend)</summary>
  set(count: number) {
    this.unread = count;
    this.notify();
  }

  increment() {
    this.unread = this.unread + 1;
    this.notify();
  }

  decrease() {
    this.unread = Math.max(0, this.unread - 1);
    this.notify();
  }

  reset() {
    this.unread = 0;
    this.notify();
  }

  subscribe(callback: (count: number) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(fn => fn !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.unread));
  }
}

export const notificationStore = new NotificationStore();
