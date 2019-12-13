import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { END_POINT } from '../../../../config/api.config';
import { ApiService } from '../../../../core/services/api/api.service';
import { DialogService } from 'primeng/api';
import { PartnerHireComponent } from '../partner-hire/partner-hire.component';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
})
export class PartnerListComponent implements OnInit {
  partners: any;

  constructor(
    private api: ApiService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.api.get([END_POINT.allPartners]).subscribe((v: any) => {
      this.partners = v.partners;
    });
  }

}
