import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'wust-msg',
  templateUrl: './wust-msg.component.html',
  styleUrls: ['./wust-msg.component.scss']
})
export class WustMsgComponent implements OnChanges {
  @Input() data:any[];
  during:number = 2000;
  constructor() { }

  ngOnChanges() {
    setTimeout(()=>{
      // this.data = [];
    },this.during);
  }

}
