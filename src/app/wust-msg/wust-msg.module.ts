import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WustMsgComponent } from './wust-msg.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [WustMsgComponent],
  exports:[WustMsgComponent,FlexLayoutModule]
})
export class WustMsgModule { }
