import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from 'app/shared/shared.module';
import { WustMenuModule } from 'app/wust-menu/wust-menu.module';
import { WustSimpleTableModule } from 'app/wust-simple-table/wust-simple-table.module';
import { WustDatatableModule } from 'app/datatable/datatable.component';
import { WustMsgModule } from 'app/wust-msg/wust-msg.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WustMenuModule,
    SharedModule,
    WustSimpleTableModule,
    WustDatatableModule,
    WustMsgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
