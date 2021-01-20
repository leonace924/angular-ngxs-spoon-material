import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss']
})
export class ItemHeaderComponent implements OnInit {
  @Input() itemDetail: any;

  constructor() { }

  ngOnInit(): void {
  }

}
