import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemModel } from 'src/app/models/menu-item.model';
import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetMenuItems, SearchItems } from 'src/app/actions/menu-item.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(MenuItemState.getFilteredItemList) items: Observable<MenuItemModel[]>;
  @Select(actionsExecuting([GetMenuItems])) getItemsIsExecuting: Observable<ActionsExecuting>;

  throttle = 50;
  scrollDistance = 1;
  page: number = 1;
  keys: Array<string> = [];
  filters: Array<string> = [];
  terms: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getMenuItems();

    this.filterItems();
  }

  onScrollEnd() {
    this.page += 1;
    this.getMenuItems();

    this.filterItems();
  }

  onKeyTermAdded(key: string) {
    this.keys.push(key);
    this.terms = this.keys.map(key => `"${key}"`).join(', ');

    this.filterItems();
  }

  onFilterUpdated(filters: Array<string>) {
    this.filters = filters;

    this.filterItems();
  }

  clearSearch() {
    this.terms = '';
    this.keys.splice(0, this.keys.length);

    this.filterItems();
  }

  getMenuItems() {
    this.store.dispatch(new GetMenuItems(this.page, this.keys, this.filters));
  }

  filterItems() {
    this.store.dispatch(new SearchItems(this.keys, this.filters));
  }
}
