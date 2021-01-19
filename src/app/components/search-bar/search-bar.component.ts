import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addSearch(event) {
    let key: string = event.target.value;

    if (key === '' || key === null)
      return;

    this.valueChanged.emit(key);

    event.target.value = '';
  }
}
