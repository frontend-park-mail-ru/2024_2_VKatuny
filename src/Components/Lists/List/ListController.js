import { catchStandardResponseError } from '@/modules/app_errors/Errors';
import { ComponentController } from '@/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import { MINICARD_DELETE, NOTIFICATION_OK } from '@/modules/Events/Events';
import { NOTIFICATION_TIMEOUT } from '@/Components/NotificationBox/NotificationBox';

export class ListController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: MINICARD_DELETE,
        handler: this.removeMinicard.bind(this),
      },
    ]);
  }

  async loadList() {
    try {
      const items = await this._model.getItems();
      items.forEach((item) => {
        this._view.addChild(item.render());
        this._component.bindMinicard(item);
      });
    } catch (err) {
      catchStandardResponseError(err);
    }
  }

  async removeMinicard({ caller }) {
    const minicardIndex = this._view.findChildIndex(caller.render());
    if (minicardIndex >= 0) {
      try {
        const removed = await this._model.removeChild(minicardIndex);
        if (removed) {
          this._component.unbindMinicard(minicardIndex);
          this._view.removeChild(minicardIndex);
          eventBus.emit(NOTIFICATION_OK, {
            message: 'Успешно удалено',
            timeout: NOTIFICATION_TIMEOUT.MEDIUM,
          });
        }
      } catch (err) {
        catchStandardResponseError(err);
      }
    }
  }
}
