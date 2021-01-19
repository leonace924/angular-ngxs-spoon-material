import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openDrawer = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  openSideNav() {
    this.openDrawer.emit();
  }

}
