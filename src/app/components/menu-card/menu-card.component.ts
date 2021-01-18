import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() name: string;
  @Input() rating: number;
  @Input() photoUrl: string;

  defaultImage = 'https://via.placeholder.com/420x320';

  constructor() { }

  ngOnInit(): void {
  }

}
