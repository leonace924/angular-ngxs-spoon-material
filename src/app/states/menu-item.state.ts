import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { MenuItemModel } from '../models/menu-item.model';
import { MenuItemService } from '../services/menu-item.service';
import { GetMenuItems } from '../actions/menu-item.action';

export class MenuItemStateModel {
  allItems: MenuItemModel[];
  selectedItem: MenuItemModel;
}

@State<MenuItemStateModel>({
  name: 'menuItems',
  defaults: {
    allItems: [],
    selectedItem: null
  }
})
@Injectable()
export class MenuItemState {
  constructor(private menuItemService: MenuItemService) {
  }

  @Selector()
  static getMenuItemList(state: MenuItemStateModel) {
    return state.allItems;
  }


  @Selector()
  static getSelectedTodo(state: MenuItemStateModel) {
    return state.selectedItem;
  }

  @Action(GetMenuItems)
  getMenuItems({ getState, patchState }: StateContext<MenuItemStateModel>, { page, keys, tags, sortKey, isAscending }: GetMenuItems) {
    keys = keys.map((key) => key.toLowerCase());

    return this.menuItemService
      .fetchMenuItems(page, 10, keys, tags, sortKey, isAscending).pipe(tap((res: any) => {
        const state = getState();

        if (!res.results) return;

        patchState({
          allItems: [...state.allItems, ...res.results?.items],
        });
      }));
  }
}
