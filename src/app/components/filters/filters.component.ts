import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface CheckboxModel {
  name: string;
  selected: boolean;
  value: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<Array<string>>();

  mealTypes: CheckboxModel[] = [
    { name: 'Main', selected: false, value: 'meal type>main' },
    { name: 'Dessert', selected: false, value: 'meal type>dessert' },
    { name: 'Appetizer', selected: false, value: 'meal type>appetizer' },
  ];

  foodTypes: CheckboxModel[] = [
    { name: 'Seafood', selected: false, value: 'food type>seafood' },
    { name: 'Burger', selected: false, value: 'food type>burgers' },
    { name: 'Pizza', selected: false, value: 'food type>pizza' },
  ];

  beverageTypes: CheckboxModel[] = [
    { name: 'Coffee', selected: false, value: 'no alcoholic beverage>coffee' },
    { name: 'Juice', selected: false, value: 'no alcoholic beverage>juice' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  updateFilter() {
    let foods: Array<string> = this.foodTypes.filter((el) => el.selected).map((el) => el.value);
    let meals: Array<string> = this.mealTypes.filter((el) => el.selected).map((el) => el.value);
    let beverage: Array<string> = this.beverageTypes.filter((el) => el.selected).map((el) => el.value);
    this.filterChanged.emit(foods.concat(meals).concat(beverage));
  }
}
