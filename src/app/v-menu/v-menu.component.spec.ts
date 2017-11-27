import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WustMenuComponent } from './wust-menu.component';

describe('WustMenuComponent', () => {
  let component: WustMenuComponent;
  let fixture: ComponentFixture<WustMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WustMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WustMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
