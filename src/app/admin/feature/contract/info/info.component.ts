import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';

@Component({
  selector: 'app-contract-info',
  templateUrl: './info.component.html',
})
export class ContractInfoComponent implements OnInit {

  contract: any;
  photographers = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.get(['contracts', 'me']).subscribe((v: any) => {
      this.contract = v.contract;
      this.contract.date_takens.forEach(x => {
        const a = x.photographer_date_takens.map(y => ({...y, date_taken: x.date_taken}));
        this.photographers = [...a];
      });
    });
  }

}
