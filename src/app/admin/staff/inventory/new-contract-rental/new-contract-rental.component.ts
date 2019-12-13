import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-contract-rental',
  templateUrl: './new-contract-rental.component.html',
})
export class NewContractRentalComponent implements OnInit {

  dataForm: FormGroup;
  items: MenuItem[];
  activeIndex: Number = 0;
  guest: any;
  guestFull: any;
  queryParam: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.items = [{
      label: 'Thông tin cơ bản',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Thông tin thuê đồ',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    }];
    this.queryParam = this.route.snapshot.queryParamMap.get('partner');
    if (!this.queryParam) {
      const obj = {
        label: 'Tổng kết',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      };
      this.items = [...this.items, obj];
    }
  }

  onSubmit() {

  }

  changeTab(tab, event) {
    this.activeIndex = tab;
    if (tab === 1) {
      this.guest = event;
      this.toastr.success('Chuyển đến tab thông tin thuê đồ!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
    if (tab === 2) {
      this.guestFull = event;
      this.toastr.success('Thêm thông tin thành công, vui lòng xác thực hóa đơn và hoàn tất thủ tục!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
  }

}
