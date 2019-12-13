import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from './core/services/common.service';
import { ApiService } from './core/services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private common: CommonService,
    private cd: ChangeDetectorRef,
    private api: ApiService
  ) {}

  checkPathDifferWithAuth() {
    return !/^(\/auth)\/.*/.test(window.location.pathname);
  }

  ngOnInit() {
    this.api.get(['users', 'me']).subscribe(data => {
      this.common.setUser(data);
    },
    e => {
      // if (e.status === 401 && this.checkPathDifferWithAuth()) {
      //   localStorage.setItem('CONTINUOUS_URL', window.location.pathname);
      // }
    });
  }
}
