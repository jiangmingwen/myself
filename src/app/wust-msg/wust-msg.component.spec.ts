import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WustMsgComponent } from './wust-msg.component';

describe('WustMsgComponent', () => {
  let component: WustMsgComponent;
  let fixture: ComponentFixture<WustMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WustMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WustMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
