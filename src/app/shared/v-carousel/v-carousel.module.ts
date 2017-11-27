import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCarouselComponent } from './v-carousel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VCarouselComponent],
  exports:[
    VCarouselComponent
  ]
})
export class VCarouselModule { }
