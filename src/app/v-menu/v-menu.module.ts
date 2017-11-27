import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WustMenuComponent, WustSubmenu } from './wust-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WustMenuComponent,WustSubmenu],
  exports:[
    WustMenuComponent,WustSubmenu
  ]
})
export class WustMenuModule { }
