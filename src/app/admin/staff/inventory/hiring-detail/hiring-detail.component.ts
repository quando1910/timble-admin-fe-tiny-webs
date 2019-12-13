import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hiring-detail',
  templateUrl: './hiring-detail.component.html',
})
export class HiringDetailComponent implements OnInit {

  guestHiring: any;
  private ngUnsubscribe = new Subject();
  public fragment: String = 'details';

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: string) => {
      if (fragment) {
        this.fragment = fragment;
      }
  });
   }

  ngOnInit() {
    this.api.get(['guests',  this.activatedRoute.snapshot.params.id]).subscribe((data: any) => {
      this.guestHiring = data.guest;
    });
  }

}
