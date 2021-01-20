export class GetMenuItems {
  static readonly type = '[Menu List] Get List';

  constructor(
    public page: number,
    public keys: Array<string>,
    public tags: Array<string>,
    public sortKey: string,
    public isAscending: boolean
  ) {
  }
}

export class GetItemDetails {
  static readonly type = '[Menu Item] Get Item Details';

  constructor(public id: string) {
  }
}

export class SelectItem {
  static readonly type = '[Menu Item] Select Item';

  constructor(public id: string) {
  }
}

export class CleanItems {
  static readonly type = '[Menu List] Clean Menu Items';
}

export class HideItem {
  static readonly type = '[Menu Item] Hide Menu Item';

  constructor(public id: string) {
  }
}
