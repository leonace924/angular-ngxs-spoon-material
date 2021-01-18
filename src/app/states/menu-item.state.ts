import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { GetMenuItems } from '../actions/menu-item.action';
import { MenuItemService } from '../services/menu-item.service';
import { MenuItemModel } from '../models/menu-item.model';

export class MenuItemStateModel {
  items: MenuItemModel[];
  selectedItem: MenuItemModel;
}

@State<MenuItemStateModel>({
  name: 'menuItems',
  defaults: {
    items: [],
    selectedItem: null
  }
})
@Injectable()
export class MenuItemState {
  constructor(private menuItemService: MenuItemService) {
  }

  @Selector()
  static getMenuItemList(state: MenuItemStateModel) {
    return state.items;
  }

  @Selector()
  static getSelectedTodo(state: MenuItemStateModel) {
    return state.selectedItem;
  }

  @Action(GetMenuItems)
  getMenuItems({ getState, setState }: StateContext<MenuItemStateModel>) {
    return this.menuItemService.fetchMenuItems().pipe(tap((res) => {
      const state = getState();
      setState({
        ...state,
        items: res.results.items,
      });
    }));
  }
}
