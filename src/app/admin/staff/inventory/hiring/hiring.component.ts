import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
})
export class HiringComponent implements OnInit {

  guestHiring: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.get(['guests/guest_property'], {debt: true}).subscribe((data: any) => {
      this.guestHiring = data.guests;
    });
  }

}
