import { Component, OnInit } from '@angular/core';

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
  foodTypes: CheckboxModel[] = [
    { name: 'Pastries', selected: false },
    { name: 'Seafood', selected: false },
    { name: 'Burger', selected: false },
    { name: 'Steak', selected: false },
    { name: 'Porridge', selected: false },
  ];

  mealTypes: CheckboxModel[] = [
    { name: 'Main', selected: false },
    { name: 'Dessert', selected: false },
    { name: 'Appetizer', selected: false },
  ];

  beverageTypes: CheckboxModel[] = [
    { name: 'Juice', selected: false },
    { name: 'Coffee', selected: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
