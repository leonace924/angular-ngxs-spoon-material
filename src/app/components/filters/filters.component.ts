import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface CheckboxModel {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<Array<string>>();

  mealTypes: CheckboxModel[] = [
    { name: 'Main', selected: false },
    { name: 'Dessert', selected: false },
    { name: 'Appetizer', selected: false },
  ];

  foodTypes: CheckboxModel[] = [
    { name: 'Pizza', selected: false },
    { name: 'Seafood', selected: false },
    { name: 'Burger', selected: false },
  ];


  constructor() { }

  ngOnInit(): void {
    this.updateFilter();
  }

  updateFilter() {
    let foods: Array<string> = this.foodTypes.filter((val) => val.selected).map((val) => val.name);
    let meals: Array<string> = this.mealTypes.filter((val) => val.selected).map((val) => val.name);
    this.filterChanged.emit(foods.concat(meals));
  }
}
