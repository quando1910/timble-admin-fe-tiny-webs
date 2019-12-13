import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ApiService } from 'app/core/services/api/api.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class GuestHistory {
  amount: number;
  event_date: Date;
  history_type: number;
  property_id: number;
  name: string;
  price: any;

  constructor(propertyId, propertyName, event_date, price) {
    this.amount = 1;
    this.event_date = event_date;
    this.history_type = 0;
    this.property_id = propertyId;
    this.name = propertyName;
    this.price = price;
  }
}

export class PartnerHistory {
  property_id: number;
  status: number;
  history_date: Date;
  amount: number;
  note: string;
  name: string;
  price: any;

  constructor(propertyId, propertyName, event_date, price, note = '') {
    this.amount = 1;
    this.history_date = event_date;
    this.status = 0;
    this.property_id = propertyId;
    this.name = propertyName;
    this.price = price;
    this.note = note;
  }
}

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
})
export class RentalInfoComponent implements OnInit {
  [x: string]: any;

  packages: any;
  propertiesChoose: any = [];
  currentDate: any;
  queryParam: any;
  @Input() guest: any;
  @Output() doneRenterInfo = new EventEmitter();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.api.get(['packages']).subscribe(data => {
      this.packages = data['packages'].filter(x => x.kind_package === 4);
    });

    this.queryParam = this.route.snapshot.queryParamMap.get('partner');
  }

  addProperties(properties) {
    properties.map(x => {
      if (!this.queryParam) {
        const proObj = new GuestHistory(x.id, x.name, this.currentDate, x.price);
        this.propertiesChoose.push(proObj);
      } else {
        const proObj = new PartnerHistory(x.id, x.name, this.currentDate, x.price);
        this.propertiesChoose.push(proObj);
      }
    });
  }

  removeProperty(id) {
    this.propertiesChoose = this.propertiesChoose.filter(x => x.property_id !== id);
  }

  checkAvailable(id) {
    return this.propertiesChoose.findIndex(x => x.property_id === id) >= 0;
  }

  addProperty(property) {
    let proObj;
    if (!this.queryParam) {
      proObj = new GuestHistory(property.id, property.name, this.currentDate, property.price);
    } else {
      proObj = new PartnerHistory(property.id, property.name, this.currentDate, property.price);
    }
    this.propertiesChoose.push(proObj);
  }

  createOrder() {
    // const apiList = this.propertiesChoose.map(x => this.api.post(`partners/${this.guest.id}/partner_history_properties`, x));
    // forkJoin(apiList).subscribe((data: any) => {
    //   this.toastr.success('Tạo đơn thuê cho đối tác thành công!', undefined, {
    //     closeButton: true,
    //     positionClass: 'toast-top-right'
    //   });
    // });
  }

  createGuestHistory() {
    if (!this.queryParam) {
    const info = {
      guest: this.guest,
      histories: this.propertiesChoose
    };
    this.doneRenterInfo.emit(info);
    } else {
      this.createOrder();
    }
  }

}
