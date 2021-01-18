import { MenuItemModel } from '../models/menu-item.model';

export class GetMenuItems {
  static readonly type = '[Menu List] Get List';

  constructor(public page: number) {
  }
}
