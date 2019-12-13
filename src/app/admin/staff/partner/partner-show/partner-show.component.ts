import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { END_POINT } from '../../../../config/api.config';
import { ApiService } from '../../../../core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-partner-show',
  templateUrl: './partner-show.component.html',
})
export class PartnerShowComponent implements OnInit {
  partner: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.api.get([END_POINT.partners, params['id']]).subscribe((v: any) => {
          this.partner = v;
        });
      }
    });
  }

}
