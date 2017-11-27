import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VCarouselComponent } from './v-carousel.component';

describe('VCarouselComponent', () => {
  let component: VCarouselComponent;
  let fixture: ComponentFixture<VCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
