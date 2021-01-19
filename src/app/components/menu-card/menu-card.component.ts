import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemModel } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() item: MenuItemModel;

  defaultImage = 'https://via.placeholder.com/420x320';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetails(itemId) {
    this.router.navigate(['/item-details', itemId]);
  }
}
