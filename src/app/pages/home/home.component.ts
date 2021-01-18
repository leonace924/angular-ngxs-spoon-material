import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetMenuItems } from 'src/app/actions/menu-item.action';
import { MenuItemModel } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(MenuItemState.getMenuItemList) items: Observable<MenuItemModel[]>;
  @Select(actionsExecuting([GetMenuItems])) getItemsIsExecuting: Observable<ActionsExecuting>;

  throttle = 50;
  scrollDistance = 1;
  page: number = 1;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getMenuItems();
  }

  onScrollEnd() {
    this.page += 1;
    if (this.page <= 5) {
      this.getMenuItems();
    }
  }

  getMenuItems() {
    this.store.dispatch(new GetMenuItems(this.page));
  }
}
