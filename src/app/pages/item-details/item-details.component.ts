import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemModel } from 'src/app/models/menu-item.model';
import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetItemDetails, SelectItem } from 'src/app/actions/menu-item.action';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  @Select(MenuItemState.getSelectedItem) item: Observable<MenuItemModel>;
  @Select(MenuItemState.getItemDetail) itemDetail: Observable<any>;
  @Select(actionsExecuting([GetItemDetails])) getDetailIsExecuting: Observable<ActionsExecuting>;

  id: string;
  defaultImage = 'https://via.placeholder.com/420x320';


  constructor(
    private router: Router,
    private store: Store,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new SelectItem(this.id));
    this.store.dispatch(new GetItemDetails(this.id));
  }

  onBackHome() {
    this.router.navigate(['']);
  }

}
