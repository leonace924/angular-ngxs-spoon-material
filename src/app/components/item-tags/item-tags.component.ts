import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-tags',
  templateUrl: './item-tags.component.html',
  styleUrls: ['./item-tags.component.scss']
})
export class ItemTagsComponent implements OnInit {
  @Input() tags: Array<any>;

  tagNames: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.tagNames = this.tags?.map((tag) => tag.name)
      .map((el) => el.split(">").slice(-1)).flat()
      .filter((el) => el);
  }
}
