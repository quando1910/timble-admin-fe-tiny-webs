import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
})
export class PartnerComponent implements OnInit {

  constructor(
    private common: CommonService
  ) { }

  ngOnInit() {
    console.log(123123);
    this.common.changeBreadcrumb({
      title: 'Đối tác'
    });
  }

}
