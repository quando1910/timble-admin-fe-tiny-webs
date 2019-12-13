import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs: Array<any> = new Array<any>();
  @Input() conent: Array<any> = new Array<any>();
  @Input() type: number;
  @Output() addPlanEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() removePlanEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() editPlanEmit: EventEmitter<any> = new EventEmitter<any>();

  public activeTab = '';

  constructor() { }

  ngOnInit() {
  }

  tabChange(title: string) {
    if (this.activeTab !== title) {
      this.activeTab = title;
    }
  }

  showDropmenu(i: number) {
    this.tabs.forEach(function(item, index) {
      if (index === i) {
        if (item.showDropmenu) {
          item.showDropmenu = false;
        } else {
          item.showDropmenu = true;
        }
      } else {
        item.showDropmenu = false;
      }
    });
  }

  addPlan(index: any) {
    this.addPlanEmit.emit(index);
  }

  remove(index: any, title: string) {
    if (index < 1) {
      return;
    }
    this.removePlanEmit.emit({tabIndex: title, index: index});
  }

  edit(index: any, title: string) {
    this.editPlanEmit.emit({tabIndex: title, index: index});
  }
}
