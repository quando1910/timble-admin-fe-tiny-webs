import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { END_POINT } from '../../config/api.config';
@Component({
  selector: 'app-public-contract',
  templateUrl: './public-contract.component.html',
})
export class PublicContractComponent implements OnInit {
  objectKeys = Object.keys;
  statusCalc = ['Tính theo đầu người', 'Tính theo gói'];
  id: any;
  secretKey: string;
  contract: any = {};
  budgets = [];
  photographers: Array<any> = [];
  constructor(
    private route : ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.secretKey = this.route.snapshot.queryParams.code;
    this.getContract();
  }
  getContract() {
    this.api.get([END_POINT.contracts, this.id]).subscribe((v: any) => {
      if (this.secretKey === v.contract.secret_key) {
        this.contract = v.contract;
        v.contract.budgets.forEach(x => {
          if (x.price) {
            let obj = {
              type:  x.budgetable_type === 'Package' ? 0 : 1,
              name: x.budgetable.name,
              quantity: x.quantity,
              id: x.id,
              price: x.price,
              note: x.note,
              total: x.quantity * x.price,
            };
            this.budgets.push(obj);
          }
        });
        this.contract.date_takens.forEach(x => {
          let a = x.photographer_date_takens.map(y => ({...y, date_taken: x.date_taken}));
          this.photographers = [...a];
        });
      }
    });
  }
}
