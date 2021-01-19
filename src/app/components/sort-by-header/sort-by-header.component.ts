import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-by-header',
  templateUrl: './sort-by-header.component.html',
  styleUrls: ['./sort-by-header.component.scss']
})
export class SortByHeaderComponent implements OnInit {
  @Input() terms: string;
  @Output() orderChanged = new EventEmitter<boolean>();
  @Output() clickRemove = new EventEmitter;
  @Output() sortKeyChanged = new EventEmitter<string>();

  selectedSort: string = "name";
  selectedOrder: boolean = true;

  sortList = [
    { value: 'name', viewValue: 'Name' },
    { value: 'createdAt', viewValue: 'Created' },
    { value: 'updatedAt', viewValue: 'Updated' }
  ];

  orderList = [
    { value: true, viewValue: 'A-Z' },
    { value: false, viewValue: 'Z-A' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated() {
    this.sortKeyChanged.emit(this.selectedSort);
  }

  onOrderUpdated() {
    this.orderChanged.emit(this.selectedOrder);
  }

  clearSearch() {
    this.clickRemove.emit();
  }
}
