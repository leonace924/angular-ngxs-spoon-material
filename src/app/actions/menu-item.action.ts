import { MenuItemModel } from '../models/menu-item.model';

export class GetMenuItems {
  static readonly type = '[Menu List] Get List';

  constructor(public page: number, public keys: Array<string>) {
  }
}

export class SearchMenuItems {
  static readonly type = '[Menu List] Search Items';

  constructor(public keys: Array<string>) {

  }
}
