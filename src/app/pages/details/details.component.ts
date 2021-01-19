import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';

import { MenuItemState } from 'src/app/states/menu-item.state';
import { GetItemDetails } from 'src/app/actions/menu-item.action';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Select(MenuItemState.getSelectedItem) item: Observable<any>;
  @Select(actionsExecuting([GetItemDetails])) getDetailIsExecuting: Observable<ActionsExecuting>;

  id: string;

  constructor(
    private store: Store,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new GetItemDetails(this.id));
  }

}
