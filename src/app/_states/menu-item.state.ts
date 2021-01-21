import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { MenuItemModel } from '../_models/menu-item.model';
import { MenuItemService } from '../_services/menu-item.service';
import { GetMenuItems, GetItemDetails, SelectItem, CleanItems, HideItem } from '../_actions/menu-item.action';

export class MenuItemStateModel {
  allItems: Array<MenuItemModel>;
  itemDetail: MenuItemModel;
  selectedItem: MenuItemModel;
  hiddenItemIdList: Array<string>;
}

@State<MenuItemStateModel>({
  name: 'menuItems',
  defaults: {
    allItems: [],
    itemDetail: null,
    selectedItem: null,
    hiddenItemIdList: []
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
  static getItemDetail(state: MenuItemStateModel) {
    return state.itemDetail;
  }

  @Selector()
  static getSelectedItem(state: MenuItemStateModel,) {
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
          itemDetail: null,
          allItems: [...state.allItems, ...res.results?.items]
            .filter((el) => [...state.hiddenItemIdList].every((itemId) => el.id !== itemId)),
        });
      }));
  }

  @Action(GetItemDetails)
  getItemDetails({ getState, patchState }: StateContext<MenuItemStateModel>, { id }: GetItemDetails) {
    return this.menuItemService
      .getItemDetail(id).pipe(tap((res: any) => {
        patchState({
          itemDetail: res,
        });
      }));
  }

  @Action(SelectItem)
  selectItem({ getState, patchState }: StateContext<MenuItemStateModel>, { id }: SelectItem) {
    const state = getState();

    let newItem = [...state.allItems].filter((item) => item.id === id);

    patchState({
      selectedItem: newItem.length > 0 ? newItem[0] : null,
    });
  }

  @Action(HideItem)
  hideItem({ getState, patchState }: StateContext<MenuItemStateModel>, { id }: HideItem) {
    const state = getState();

    let newIdList = [...state.hiddenItemIdList, id];
    patchState({
      hiddenItemIdList: newIdList,
      allItems: [...state.allItems]
        .filter((el) => newIdList.every((itemId) => el.id !== itemId)),
    })
  }

  @Action(CleanItems)
  cleanItems({ getState, patchState }: StateContext<MenuItemStateModel>) {
    patchState({
      allItems: []
    })
  }
}
