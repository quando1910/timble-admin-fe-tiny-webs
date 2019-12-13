import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ApiService } from 'app/core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-summary',
  templateUrl: './rental-summary.component.html',
})
export class RentalSummaryComponent {
  @Input() guestFull: any;
  currentDate = new Date();

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
  ) { }

  createOrder() {
    // const apiList = this.guestFull.histories.map(x => this.api.post(`guests/${this.guestFull.guest.id}/guest_histories`, x));
    // forkJoin(apiList).subscribe((data: any) => {
    //   this.toastr.success('Thêm thông tin thành công, vui lòng xác thực hóa đơn và hoàn tất thủ tục!', undefined, {
    //     closeButton: true,
    //     positionClass: 'toast-top-right'
    //   });
    // });
  }

  calcTotal() {
    return this.guestFull.histories.reduce((sum, curr) => {
      return (sum + (+curr.amount * +curr.price));
    }, 0);
  }

}
