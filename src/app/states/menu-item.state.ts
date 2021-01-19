import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { MenuItemModel } from '../models/menu-item.model';
import { MenuItemService } from '../services/menu-item.service';
import { GetMenuItems, SearchItems } from '../actions/menu-item.action';

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
  getMenuItems({ getState, patchState }: StateContext<MenuItemStateModel>, { page, keys, filters }: GetMenuItems) {
    return this.menuItemService.fetchMenuItems(page).pipe(tap((res: any) => {
      const state = getState();

      if (!res.results) return;

      let newItems = [...state.allItems.filter((val) =>
        keys.every((key) => val.name.toLowerCase().includes(key.toLowerCase()))
      )];

      patchState({
        allItems: [...state.allItems.concat(res.results?.items)],
        filteredItems: [...newItems.filter((val) =>
          filters.every((key) => val.tags.some((tag) => tag.name.toLowerCase().includes(key.toLowerCase())))
        )]
      });
    }));
  }

  @Action(SearchItems)
  searchItemsByName({ getState, patchState }: StateContext<MenuItemStateModel>, { keys, filters }: SearchItems) {
    const state = getState();

    let newItems = [...state.allItems.filter((val) =>
      keys.every((key) => val.name.toLowerCase().includes(key.toLowerCase()))
    )];

    patchState({
      filteredItems:
        [...newItems.filter((val) =>
          filters.every((key) => val.tags.some((tag) => tag.name.toLowerCase().includes(key.toLowerCase())))
        )]
    })
  }
}
