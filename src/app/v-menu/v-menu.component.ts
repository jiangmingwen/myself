import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Element } from '@angular/compiler';
@Component({
  selector: 'wust-menu',
  templateUrl: './wust-menu.component.html',
  styleUrls: ['./wust-menu.component.scss']
})
export class WustMenuComponent implements AfterViewInit {
  @Input() menuData: any[];
  @Input() isLeft: boolean = true;
  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('parent') parent: ElementRef;
  disabledUpBtn: boolean;
  disabledDownBtn: boolean;
  slideIn: boolean = false;
  distance: number = 0;
  private hasScorllDistance: number = 0;
  private parentHeight: number;
  private childHeight: number;
  constructor() { }
  ngAfterViewInit() {
    this.menuCanScroll();
  }

  private menuCanScroll(): void {
    setTimeout(() => {
      this.parentHeight = this.parent.nativeElement.clientHeight;
      this.childHeight = document.getElementById('wust-menu').clientHeight;
      if (this.parentHeight <= this.childHeight) {
      }
    }, 600);
  }
  
  menuItemClick(e: any): void {
    this.itemClick.emit(e);
  }

  collapseClick(e: any): void {
    this.menuCanScroll();
  }
}

@Component({
  selector: '[wust-submenu]',
  templateUrl: './wust-submenu.component.html',
  styleUrls: ['./wust-menu.component.scss']
})

export class WustSubmenu {
  @Input() menu: any[];
  @Input() root: boolean = true;
  @Output() submenuItemClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() collapseBtnClick: EventEmitter<any> = new EventEmitter<any>();
  currentIndex: number = -1;
  itemClick(item: any, index: number,it:any): void {
    this.submenuItemClick.emit(item);
    setTimeout(()=>{
      for(let i = 0;i<document.getElementsByClassName('wust-label').length;i++){
        document.getElementsByClassName('wust-label')[i].className="wust-label";
      }
      if(it){
        it.className="wust-label active"
      }
    },300)
  }
  collapseClick(item: any, index: number): void {
    item.open = !item.open;
    this.collapseBtnClick.emit(item);
  }
}
