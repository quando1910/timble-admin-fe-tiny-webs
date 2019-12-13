import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from '../../../../services/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
})
export class ContractDetailComponent implements OnInit {

  contract: any;
  fragment: any;
  private ngUnsubscribe = new Subject();

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: string) => {
			if (fragment) {
				this.fragment = fragment;
			} else {
        this.fragment = 'basic';
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            fragment: this.fragment,
            queryParamsHandling: 'merge'
          });
      }
		});
    this.api.get(['contracts', this.route.snapshot.params.id]).subscribe((data: any) => {
      this.contract = data.contract;
    });
  }

  handleChange(event) {
    switch (event.index) {
      case 0:
        this.fragment = 'basic';
        break;
      case 1:
        this.fragment = 'members';
        break;
      case 2:
        this.fragment = 'costume';
        break;
      case 3:
        this.fragment = 'payment';
        break;
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        fragment: this.fragment,
        queryParamsHandling: 'merge'
      });
  }

}
