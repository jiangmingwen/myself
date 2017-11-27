import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wust-simple-table',
  templateUrl: './wust-simple-table.component.html',
  styleUrls: ['./wust-simple-table.component.css']
})
export class WustSimpleTableComponent implements OnInit {
  @Input() data: any[];
  // @Input() isLeft: boolean = true;
  // @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();


  private header: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.data)
    this.data.forEach(e => {
      
    })
  }

}
