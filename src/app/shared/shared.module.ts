import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCarouselModule } from './v-carousel/v-carousel.module';

@NgModule({
  imports: [
    CommonModule,
    VCarouselModule
  ],
  declarations: [],
  exports: [VCarouselModule]
})
export class SharedModule { }
