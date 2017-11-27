import {CommonModule} from '@angular/common';
import {
  NgModule, Component, ViewContainerRef, EmbeddedViewRef, Input, OnInit, Directive,
  ComponentFactoryResolver, OnDestroy, TemplateRef
} from '@angular/core';

@Component({
  selector: 'wust-template',
  template: ``
})

export class TemplateComponent implements OnInit, OnDestroy {

  @Input() template: any;
  @Input() index: any;
  @Input() data: any;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.data,
        'index': this.index
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

@Component({
  selector: 'wust-column-template',
  template: ``
})

export class TemplateColumnComponent implements OnInit, OnDestroy {

  @Input() template: any;
  @Input() rowData: any;
  @Input() rowIndex: number;
  @Input() column: any;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.column,
        'rowData': this.rowData,
        'rowIndex': this.rowIndex
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}



@Directive({
  selector: '[wTemplate]'
})
export class WustTemplateDirective {
  @Input() type: string;
  @Input('wTemplate') name: string;

  constructor(public template: TemplateRef<any>) {
  }

  getType(): string {
    return this.name;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    TemplateComponent,
    TemplateColumnComponent,  WustTemplateDirective],
  exports: [
   TemplateComponent,TemplateColumnComponent, WustTemplateDirective]
})

export class ShareModule {
}
