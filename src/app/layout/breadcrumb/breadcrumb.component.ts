import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../app/services/sidebar.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumb: any;
  public isResizing = false;
  public sidebarVisible = true;

  constructor(
    private common: CommonService,
    private router: Router,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.common.breadcrumb$.subscribe(data => {
      this.breadcrumb = data;
    });
  }

  toggleFullWidth() {
    this.isResizing = true;
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    const that = this;
    setTimeout(function () {
        that.isResizing = false;
        that.cdr.detectChanges();
    }, 400);
  }

}
