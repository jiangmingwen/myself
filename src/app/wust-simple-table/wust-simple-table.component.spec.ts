import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WustSimpleTableComponent } from './wust-simple-table.component';

describe('WustSimpleTableComponent', () => {
  let component: WustSimpleTableComponent;
  let fixture: ComponentFixture<WustSimpleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WustSimpleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WustSimpleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
