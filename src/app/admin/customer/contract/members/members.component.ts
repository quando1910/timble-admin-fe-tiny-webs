import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { GenderEnum } from 'app/shared/enum/custom.enum';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {

  members = [];
  genderEnum = GenderEnum;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    // this.api.get([]).subscribe(data => {
    //   contracts/104/members
    // });
    this.api.get(['contracts', 'me', 'members']).subscribe((v: any) => {
      this.members = v.members;
      // this.contract = v.contract;
      // this.contract.date_takens.forEach(x => {
      //   const a = x.photographer_date_takens.map(y => ({...y, date_taken: x.date_taken}));
      //   this.photographers = [...a];
      // });
    });
  }

}
