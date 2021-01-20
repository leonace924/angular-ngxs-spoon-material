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

  throttle = 80;
  scrollDistance = 0.8;

  page: number = 1;
  keys: Array<string> = [];
  filters: Array<string> = [];
  terms: string;
  selectedSort: string = "name";
  selectedOrder: boolean = true;

  list = [
    {
      id: 1,
      title: 'Realizar la tarea asignada!',
      subTitle: '9:00pm'
    },
    {
      id: 2,
      title: 'Visitar al perro en casa de tu amiga',
      subTitle: '9:00pm'
    },
    {
      id: 3,
      title: 'Llamar al doctor',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    },
    {
      id: 4,
      title: 'Buscar el auto en el taller',
      subTitle: '9:00pm'
    }
  ];

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

  onSortUpdated(sortKey: string) {
    this.selectedSort = sortKey;
    this.filterNewItems();
  }

  onOrderUpdated(order: boolean) {
    this.selectedOrder = order;
    this.filterNewItems();
  }

  getMenuItems() {
    this.store.dispatch(new GetMenuItems(this.page, this.keys, this.filters, this.selectedSort, this.selectedOrder));
  }

  filterNewItems() {
    // reset state and page
    this.page = 1;
    this.store.dispatch(new StateReset(MenuItemState));

    // call GetMenuItems action
    this.getMenuItems();
  }

  action = (a) => {
    console.log(a);
  };

  clickOnItem = (a) => {
    console.log('Click on item');
  }

  swipeCallback = (a) => {
    console.log('Callback Swipe', a);
  }
}
