import {CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output, ViewChild,
  ElementRef, QueryList, EventEmitter, Renderer2, TemplateRef, ContentChild, Inject, forwardRef,
  ContentChildren, ViewContainerRef, EmbeddedViewRef, OnDestroy,
} from '@angular/core';
import {PaginationModule} from './pagination.component';
import {WustTemplateDirective, ShareModule} from './share';
import PerfectScrollbar from 'perfect-scrollbar';
@Component({
  selector: 'wust-tcheckbox',
  template: `
    <label class="wust-checkbox">
      <div class="wust-checkbox-inner">
        <input type="checkbox" #rb
               [checked]="checked" name="{{checkboxName}}" (change)="onChange(rb.checked)">
        <div class="wust-checkbox-ins"></div>
      </div>
    </label>
  `
})
export class TCheckboxComponent {

  @Input() checkboxName: string;
  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  checkbox: HTMLInputElement;
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {
    dt.addCheckbox(this);
  }
  onChange(value: boolean) {
    this.checked = value;
    this.onClick.emit({
      checked: value
    });
  }
}

@Component({
  selector: 'wust-tradio',
  template: `
    <label class="wust-radio">
      <div class="wust-radio-inner">
        <input type="radio" #rb [checked]="checked" (change)="onChange(rb.checked)">
        <div class="wust-radio-ins"></div>
      </div>
    </label>
  `
})
export class TRadioComponent {

  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  checkbox: HTMLInputElement;
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {
    dt.addRadio(this);
  }

  onChange(value: boolean) {
    this.checked = value;
    this.onClick.emit({
      checked: value
    });
  }
}

@Component({
  selector: 'wust-datatable-column',
  template: `<ng-content></ng-content>`
})

export class DatatableColumnComponent implements AfterViewInit {
  @Input() header: string;
  @Input() sort: boolean;
  @Input() field: string;
  @Input() colspan: number;
  @Input() rowspan: number;
  @Input() rowData: any;
  @Input() editable: boolean;
  @Input() style: any;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  desc: boolean;
  cell: any;
  table: DatatableComponent;
  selected: boolean;
  public cellTemplate: TemplateRef<any>;

  constructor(@Inject(forwardRef(() => DatatableComponent)) table: DatatableComponent) {
    this.table = table;
  }

  ngAfterViewInit() {
    this.cellTemplate = this.template;
  }
}

@Component({
  selector: 'wust-expansion-row',
  template: ``
})
export class ExpansionRowComponent implements OnInit, OnDestroy {
  @Input() template: any;
  @Input() rowData: any;
  @Input() rowIndex: number;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.rowData,
        'rowIndex': this.rowIndex
      })
    }
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

@Component({
  selector: '[wTableHeader]',
  template: `
    <th class="wust-datatable-head wust-datatable-head-expand" *ngIf="dt.expandableRows">
      <div class="wust-datatable-head-inner">
        <div class="wust-datatable-head-text">
        </div>
      </div>
    </th>
    <th class="wust-datatable-head wust-datatable-head-order" *ngIf="dt.order">
      <div class="wust-datatable-head-inner">
        <div class="wust-datatable-head-text">
        </div>
      </div>
    </th>
    <th class="wust-datatable-head wust-datatable-head-selection" *ngIf="dt.selectionMode">
      <div class="wust-datatable-head-inner">
        <div class="wust-datatable-head-text" *ngIf="dt.selectionMode === 'multiple'">
          <wust-tcheckbox [checked]="dt.totalChecked" #checkbox (onClick)="dt.rowClick($event)">
          </wust-tcheckbox>
        </div>
        <div class="wust-datatable-head-text" *ngIf="dt.selectionMode === 'single'">
        </div>
      </div>
    </th>
    <ng-template ngFor [ngForOf]="columns" let-col let-lastCol="last">
      <th class="wust-datatable-head" [ngStyle]="col.style" [class.wust-datatable-head-sort]="col.sort">
        <div class="wust-datatable-head-inner" (click)="dt.onColumnSort(col, $event)">
          <div class="wust-datatable-head-text">
            <span *ngIf="!col.headerTemplate">{{col.header}}</span>
            <wust-template *ngIf="col.headerTemplate" [template]="col.headerTemplate">
            </wust-template>
            <span *ngIf="dt.sort || col.sort" class="wust-datatable-sort">
              <i class="fa fa-caret-up" [class.active]="!dt.sortState && (dt.currentCol === col)"></i>
              <i class="fa fa-caret-down" [class.active]="dt.sortState && (dt.currentCol === col)"></i>
            </span>
          </div>
          <span class="wust-column-resizer" *ngIf="dt.resizable && !lastCol && dt.border"
                (mousedown)="dt.columnResizeStart($event)"></span>
        </div>
      </th>
    </ng-template>
  `
})
export class DatatableHeaderComponent {
  @Input('wTableHeader') columns: DatatableColumnComponent[];
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}
}

@Component({
  selector: '[wTableBody]',
  template: `
    <ng-template ngFor let-rowData [ngForOf]="dt.data" let-i=index>
      <tr class="wust-datatable-row" [class.wust-selected]="rowData.selected">
        <td *ngIf="dt.expandableRows" class="wust-datatable-cell">
          <div class="wust-datatable-cell-inner">
            <i class="fa fa-angle-right wust-expand-arrow" (click)="dt.toggleRow(rowData)"
               [class.fa-angle-down]="dt.isRowExpand(rowData)"></i>
          </div>
        </td>
        <td *ngIf="dt.order" class="wust-datatable-cell">
          <div class="wust-datatable-cell-inner">
            {{i + 1 + dt.first}}
          </div>
        </td>
        <td *ngIf="dt.selectionMode" class="wust-datatable-cell">
          <div class="wust-datatable-cell-inner" *ngIf="dt.selectionMode === 'multiple'">
            <wust-tcheckbox (onClick)="dt.onCheckboxItemClick($event, rowData, i)"></wust-tcheckbox>
          </div>
          <div class="wust-datatable-cell-inner" *ngIf="dt.selectionMode === 'single'">
            <wust-tradio (onClick)="dt.onRadioItemClick($event, rowData, i)"></wust-tradio>
          </div>
        </td>
        <ng-template ngFor [ngForOf]="columns" let-col let-colIndex="index">
          <td class="wust-datatable-cell"
              [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan">
            <div class="wust-datatable-cell-inner">
              <span *ngIf="!col.cellTemplate">{{rowData[col.field]}}</span>
              <wust-column-template *ngIf="col.cellTemplate" [column]="col" [rowData]="rowData"
                                    [rowIndex]="i" [template]="col.cellTemplate">
              </wust-column-template>
              <div class="wust-cell-editor" *ngIf="col.editable">
                <input type="text" value="{{rowData[col.field]}}">
              </div>
            </div>
          </td>
        </ng-template>
      </tr>
      <tr class="wust-datatable-row" *ngIf="dt.expandableRows && dt.isRowExpand(rowData)">
        <td class="wust-datatable-cell" [attr.colspan]="dt.getColumnLength()">
          <div class="wust-datatable-cell-inner">
            <wust-expansion-row [template]="dt.rowExpansionTemplate"
                                [rowIndex]="i" [rowData]="rowData"></wust-expansion-row>
          </div>
        </td>
      </tr>
    </ng-template>
    <tr *ngIf="dt.isEmpty">
      <td [attr.colspan]="columns.length">{{dt.emptyMessage}}</td>
    </tr>
  `
})
export class DatatableBodyComponent {
  @Input('wTableBody') columns: DatatableColumnComponent[];
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}
}

@Component({
  selector: 'wust-datatable-scrollable',
  template: `
  <div class="wust-datatable-scrollable-wraper">
    <div class="wust-datatable-scrollable">
      <div class="wust-datatable-scrollable-head">
        <div class="wust-datatable-head-wrapper" #tableHead>
          <table>
            <colgroup class="wust-datatable-scrollable-colgroup">
              <col *ngFor="let col of columns" [ngStyle]="col.style"/>
            </colgroup>
            <thead>
            <tr [wTableHeader]="columns"></tr>
            </thead>
          </table>
        </div>
      </div>
      <div  class="wust-datatable-body wust-iscroll" [ngStyle]="{'max-height': dt.scrollHeight}" #tableBody>
        <div class="wust-datatable-body-wrapper">
          <table>
            <colgroup class="wust-datatable-scrollable-colgroup">
              <col *ngFor="let col of columns" [ngStyle]="col.style"/>
            </colgroup>
            <tbody [wTableBody]="columns"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `,
})
export class DatatableScrollableComponent implements AfterViewInit {

  @Input() columns: DatatableColumnComponent[];
  @ViewChild('tableHead') headViewChild: ElementRef;
  scrollHead: HTMLDivElement;
  constructor(public renderer2: Renderer2,
              @Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}

  ngAfterViewInit() {
    this.scrollHead = this.headViewChild.nativeElement;
    this.initScrolling();
  }

  initScrolling() {
    // this.scrollHead.style.marginRight = this.domRenderer.getScrollbarWidth() + 'px';
  // console.log(document.getElementsByClassName('wust-iscroll'));
  // const container:HTMLElement = document.querySelector('.wust-iscroll');
  let ps = new PerfectScrollbar('.wust-iscroll');

  }
}

@Component({
  selector: 'wust-datatable',
  template: `
    <div class="wust-datatable" #container [ngClass]="{'outline':outline,'wust-datatable-sort':sort}">
      <div class="wust-datatable-table" *ngIf="!scrollable">
        <table>
          <thead>
          <tr [wTableHeader]="columns"></tr>
          </thead>
          <tbody [wTableBody]="columns"></tbody>
        </table>
      </div>
      <ng-template [ngIf]="scrollable">
        <wust-datatable-scrollable  [columns]="columns"></wust-datatable-scrollable>
      </ng-template>
      <div class="wust-datatable-footer" *ngIf="pagination">
        <wust-pagination [total]="total" [row]="row" (onPageChange)="onPageChange($event)"></wust-pagination>
      </div>
    </div>
  `,
})
export class DatatableComponent implements AfterViewInit, OnDestroy {

  @Input() pagination: boolean;
  @Input() selectionMode: string;
  @Input() striped: boolean;
  @Input() scrollable: boolean;
  @Input() border: boolean;
  @Input() hover: boolean;
  @Input() row: number;
  @Input() editable: boolean;
  @Input() sort: boolean;
  @Input() expandableRows: boolean;
  @Input() scrollHeight: number;
  @Input() resizable: boolean;
  @Input()
  set value(value: any[]) {
    this._value = value;
    this.radioSelection = [];
    this.checkboxSelection = [];
    this.totalChecked = false;
    this.page = 1;
    this.total = this.value.length;
    this.filterValue(this.page);
  }

  get value(): any[] {
    return this._value;
  }
  @Input() outline:boolean;
  @Input() order: boolean;
  @Input() emptyMessage: string;
  @ViewChild('container') container: ElementRef;
  @ContentChildren(WustTemplateDirective) templates: QueryList<WustTemplateDirective>;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  columns: any[];
  currentCol: any;
  checkboxSelection: any;
  radioSelection: any;
  checkboxs: TCheckboxComponent[];
  radios: TRadioComponent[];
  total: number;
  isEmpty: boolean;
  page: number;
  first: number;
  data: any[];
  _value: any[];
  totalChecked: boolean;
  expandedRows: any;
  columnResizeStartX: number;
  currentResizeCell: any;
  columnResizeMoveX: number;
  resizeDown: boolean;
  sortState: boolean;
  rowExpansionTemplate: TemplateRef<any>;
  documentMousemoveListener: any;
  documentMouseupListener: any;

  constructor(public renderer2: Renderer2) {
    this.columns = [];
    this.checkboxSelection = [];
    this.radioSelection = [];
    this.emptyMessage = '暂无数据';
    this.page = 1;
    this.first = 0;
    this.checkboxs = [];
    this.radios = [];
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.isEmpty = (this.value.length ==0);  
      this.initColumns();
    },100);
    const _container = this.container.nativeElement;
    if (this.striped) {
      this.renderer2.addClass(_container, 'wust-datatable-striped');
    }
    if (this.border) {
      this.renderer2.addClass(_container, 'wust-datatable-bordered');
    }
    if (this.hover || this.selectionMode) {
      this.renderer2.addClass(_container, 'wust-datatable-hover');
    }
    this.total = this.value.length;
    this.filterValue(this.page);
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'rowexpansion':
          this.rowExpansionTemplate = item.template;
          break;
      }
    });
    this.initColumnResize();
  }

  initColumns() {
    this.columns = this.cols.toArray();
  }

  initColumnResize() {
    this.documentMousemoveListener =  this.renderer2.listen('document', 'mousemove', (e) => {
      if (this.resizeDown) {
        const nextSibling = this.currentResizeCell.nextElementSibling;
        this.currentResizeCell.style.width = this.currentResizeCell.offsetWidth
          + this.columnResizeMoveX + 'px';
        nextSibling.style.width = nextSibling.offsetWidth - this.columnResizeMoveX + 'px';
        this.columnResizeMoveX = e.pageX - this.columnResizeStartX;
        this.columnResizeStartX = e.pageX;
      }
    });
    this.documentMouseupListener = this.renderer2.listen('document', 'mouseup', () => {
      if (this.resizeDown) {
        this.resizeDown = false;
      }
    });
  }

  columnResizeStart(event: any) {
    this.resizeDown = true;
    this.currentResizeCell = event.target.parentNode.parentNode;
    this.columnResizeStartX = event.pageX;
    this.columnResizeMoveX = 0;
  }

  addCheckbox(checkbox: TCheckboxComponent) {
    this.checkboxs.push(checkbox);
  }

  addRadio(radio: TRadioComponent) {
    this.radios.push(radio);
  }

  getColumnLength() {
    let length = this.columns.length;
    if (this.order) {
      length += 1;
    }
    if (this.expandedRows) {
      length += 1;
    }
    if (this.selectionMode) {
      length += 1;
    }
    return length;
  }

  onColumnSort(column: DatatableColumnComponent, event: any) {
    this.sortState = !this.sortState;
    this.currentCol = column;
    const desc = this.sortState ? -1 : 1;
    column.desc = this.sortState;
    const field = column.field;
    const vx = desc;
    this.data.sort((a, b) => {
      const v1 = a[field];
      const v2 = b[field];
      if (v1 > v2) {
        return vx;
      } else if (v1 < v2) {
        return -vx;
      } else {
        return 0;
      }
    });
  }

  toggleRow(row: any) {
    if (!this.expandedRows) {
      this.expandedRows = [];
    }

    const rowIndex = this.findRowExpand(row);

    if (rowIndex !== -1) {
      this.expandedRows.splice(rowIndex, 1);
    } else {
      this.expandedRows.push(row);
    }
  }

  findRowExpand(row: any) {
    let index = -1;
    if (this.expandedRows) {
      for (let i = 0; i < this.expandedRows.length; i++) {
        if (row === this.expandedRows[i]) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  isRowExpand(row: any) {
    return this.findRowExpand(row) !== -1;
  }

  findCell(elem: any, tagName: string) {
    let cell = elem;
    while (cell && cell.tagName !== tagName) {
      cell = elem.parentNode;
    }
    return cell;
  }

  filterValue(page: number) {
    if (this.pagination) {
      this.first = this.row * (page - 1);
      this.data = this._value.filter((item, index) => {
        return (index >= this.first && index < this.row * page);
      });
    } else {
      this.data = this._value;
    }
  }

  onPageChange(event: any) {
    this.filterValue(event.activeIndex);
    this.checkboxSelection = [];
    this.totalChecked = false;
  }

  rowClick(event: any) {
    this.checkboxSelection = [];
    if (this.selectionMode) {
      const checkboxs = this.checkboxs;
      for (let i = 1; i < checkboxs.length; i++) {
        checkboxs[i].checked = event.checked;
      }
      if (event.checked) {
        for (const v of this.data) {
          this.checkboxSelection.push(v);
        }
      } else {
        this.checkboxSelection = [];
      }
      this.totalChecked = event.checked;
      this.onSelectChange();
    }
  }

  onCheckboxItemClick(event, rowData, i) {
    if (this.selectionMode) {
      if (event.checked && !this.totalChecked) {
        this.checkboxSelection.push(rowData);
      }
      let length = this.checkboxSelection.length;
      if (!event.checked) {
        while (length) {
          length--;
          if (this.checkboxSelection[length] === rowData) {
            this.checkboxSelection.splice(length, 1);
          }
        }
      }
      this.totalChecked = this.checkOfSelect();
      this.onSelectChange();
    }
  }

  onRadioItemClick(event, rowData, i) {
    if (this.selectionMode) {
      if (event.checked) {
        for (const r of this.radios) {
          r.checked = false;
        }
        this.radios[i].checked = true;
        this.radioSelection = [rowData];
      } else if (!event.checked) {
        this.radios[i].checked = false;
      }
      this.onSelectChange();
    }
  }

  onSelectChange() {
    if (this.selectionMode === 'multiple') {
      this.onSelect.emit({
        total: this.totalChecked,
        value: this.checkboxSelection
      });
    } else if (this.selectionMode === 'single') {
      this.onSelect.emit({
        value: this.radioSelection
      });
    }
  }

  checkOfSelect() {
    return this.checkboxSelection.length === this.data.length;
  }

  unbindDocumentMouseListener() {
    if (this.documentMousemoveListener) {
      this.documentMousemoveListener();
      this.documentMousemoveListener = null;
    }
    if (this.documentMouseupListener) {
      this.documentMouseupListener();
      this.documentMouseupListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentMouseListener();
  }
}

@NgModule({
  imports: [CommonModule, PaginationModule, ShareModule],
  declarations: [TCheckboxComponent, TRadioComponent, ExpansionRowComponent,
    DatatableBodyComponent, DatatableHeaderComponent,
    DatatableColumnComponent, DatatableComponent,
    DatatableScrollableComponent],
  exports: [DatatableComponent, DatatableColumnComponent, ShareModule]
})

export class WustDatatableModule {
}
