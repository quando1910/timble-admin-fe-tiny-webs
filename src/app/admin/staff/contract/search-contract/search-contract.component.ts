import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../../../services/sidebar.service';
import { ApiService } from '../../../../core/services/api/api.service';
import { END_POINT } from '../../../../config/api.config';


@Component({
  selector: 'app-search-contract',
  templateUrl: './search-contract.component.html',
})
export class SearchContractComponent implements OnInit {
  public sidebarVisible = true;
  public isResizing = false;
  public results = [];
  option = ['Payment', 'aaaa'];
  contracts = [];
  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getApi();
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

  getApi() {
    this.api.get([END_POINT.contracts]).subscribe((v:any) => {
      this.contracts = v.contracts;
    });
  }
}
