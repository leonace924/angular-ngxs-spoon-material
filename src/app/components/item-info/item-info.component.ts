import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  @Input() availableFor: Array<string>;
  @Input() sizesAndPrices: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
