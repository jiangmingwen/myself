import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WustSimpleTableComponent } from './wust-simple-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WustSimpleTableComponent],
  exports: [
    WustSimpleTableComponent
  ]
})
export class WustSimpleTableModule { }
