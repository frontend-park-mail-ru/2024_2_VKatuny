import { Notification } from '../../responses/notification';

export class NotificationManager {
  private websocket?: WebSocket;
  private notifications: Array<Notification> = [];

  constructor(private url: string) {}

  establishConnection() {
    this.websocket = new WebSocket(this.url);
    this.websocket.onmessage = (ev) => this.onMessage(ev);
  }

  async onMessage(ev: MessageEvent) {
    const response = JSON.parse(ev.data).body as Array<Notification>;
    this.notifications = response;
  }

  getNotifications() {
    return this.notifications;
  }

  checkConnection() {
    return this.websocket && this.websocket.readyState;
  }

  setNotificationRead(...notificationsId: Array<number>) {
    if (this.websocket && this.websocket.OPEN) {
      notificationsId.forEach((id) => this.websocket.send(id.toString()));
    }
  }

  closeConnection() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}
