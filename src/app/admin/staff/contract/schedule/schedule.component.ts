import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { ApiService } from 'app/core/services/api/api.service';


@Component({
  selector: 'app-contract-schedule',
  templateUrl: './schedule.component.html',
})
export class ContractScheduleComponent implements OnInit {
  user: any;
  tasks = [];

  constructor(
    private common: CommonService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.common.user$.subscribe(user => {
			this.user = user;
			this.api.get(['photographer_date_takens'], {
        user_id: this.user.id,
        paid_at: false,
			}).subscribe(data => {
				this.tasks = data['photographer_date_takens'].filter(x => new Date(x.date_taken.date_taken).getTime() >= new Date().getTime() );
			});
		});
  }

}
