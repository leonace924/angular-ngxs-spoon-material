import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByHeaderComponent } from './sort-by-header.component';

describe('SortByHeaderComponent', () => {
  let component: SortByHeaderComponent;
  let fixture: ComponentFixture<SortByHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
