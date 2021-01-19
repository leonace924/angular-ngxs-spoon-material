import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { GetMenuItems, SearchMenuItems } from '../actions/menu-item.action';
import { MenuItemService } from '../services/menu-item.service';
import { MenuItemModel } from '../models/menu-item.model';

export class MenuItemStateModel {
  allItems: MenuItemModel[];
  filteredItems: MenuItemModel[];
  selectedItem: MenuItemModel;
}

@State<MenuItemStateModel>({
  name: 'menuItems',
  defaults: {
    allItems: [],
    filteredItems: [],
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
  static getFilteredItemList(state: MenuItemStateModel) {
    return state.filteredItems;
  }

  @Selector()
  static getSelectedTodo(state: MenuItemStateModel) {
    return state.selectedItem;
  }

  @Action(GetMenuItems)
  getMenuItems({ getState, patchState }: StateContext<MenuItemStateModel>, { page, keys }: GetMenuItems) {
    return this.menuItemService.fetchMenuItems(page).pipe(tap((res: any) => {
      const state = getState();

      if (!res.results) return;

      patchState({
        allItems: [...state.allItems.concat(res.results?.items)],
        filteredItems: [...state.allItems.concat(res.results?.items)].filter((val) =>
          keys.every((key) => val.name.toLowerCase().includes(key.toLowerCase()))
        )
      });
    }));
  }

  @Action(SearchMenuItems)
  searchMenuItems({ getState, patchState }: StateContext<MenuItemStateModel>, { keys }: SearchMenuItems) {
    const state = getState();

    patchState({
      filteredItems:
        [...state.allItems.filter((val) =>
          keys.every((key) => val.name.toLowerCase().includes(key.toLowerCase()))
        )]
    })
  }
}
