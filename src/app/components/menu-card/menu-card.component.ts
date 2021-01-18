import { Component, OnInit, Input } from '@angular/core';
import { MenuItemModel } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() item: MenuItemModel;

  defaultImage = 'https://via.placeholder.com/420x320';

  constructor() { }

  ngOnInit(): void {
  }

}
