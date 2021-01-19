import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemModel } from 'src/app/models/menu-item.model';
import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetMenuItems } from 'src/app/actions/menu-item.action';
import { StateReset } from 'ngxs-reset-plugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(MenuItemState.getMenuItemList) items: Observable<MenuItemModel[]>;
  @Select(actionsExecuting([GetMenuItems])) getItemsIsExecuting: Observable<ActionsExecuting>;

  throttle = 100;
  scrollDistance = 0.5;
  page: number = 1;
  keys: Array<string> = [];
  filters: Array<string> = [];
  terms: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getMenuItems();
  }

  onScrollEnd() {
    this.page += 1;
    this.getMenuItems();
  }

  onKeyTermAdded(key: string) {
    this.keys.push(key);
    this.terms = this.keys.map(key => `"${key}"`).join(', ');

    this.filterNewItems();
  }

  onFilterUpdated(filters: Array<string>) {
    this.filters = filters;

    this.filterNewItems();
  }

  clearSearch() {
    this.terms = '';
    this.keys.splice(0, this.keys.length);

    this.filterNewItems();
  }

  getMenuItems() {
    this.store.dispatch(new GetMenuItems(this.page, this.keys, this.filters));
  }

  filterNewItems() {
    // reset state and page
    this.page = 1;
    this.store.dispatch(new StateReset(MenuItemState));

    // call GetMenuItems action
    this.getMenuItems();
  }

}
