import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemModel } from 'src/app/models/menu-item.model';
import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetMenuItems, SearchMenuItems } from 'src/app/actions/menu-item.action';

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

    this.searchMenuItems();
  }

  clearSearch() {
    this.terms = '';
    this.keys.splice(0, this.keys.length);

    this.searchMenuItems();
  }

  getMenuItems() {
    this.store.dispatch(new GetMenuItems(this.page, this.keys));
  }

  searchMenuItems() {
    this.store.dispatch(new SearchMenuItems(this.keys));
  }
}
