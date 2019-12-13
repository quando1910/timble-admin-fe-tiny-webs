import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'app/core/services/api/firebase.service';

export interface People {
  name?: string;
  phone?: string;
  classicId?: number;
}

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
})

export class SalaryComponent implements OnInit {

  constructor(
    private firebase: FireBaseService,
  ) { }

  ngOnInit() {
  }

  add() {
    const user: People = {
      name: 'QUan',
      phone: '123123213',
      classicId: 1,
    };
    this.firebase.createRecord('people', user);
  }
}
