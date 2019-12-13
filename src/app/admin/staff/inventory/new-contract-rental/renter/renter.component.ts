import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import RenderView from './renter.data';
import { ApiService } from 'app/core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
})
export class RenterComponent implements OnInit {
  dataForm: FormGroup;
  renderView: any;
  phoneIndentityGuest: any;
  toggleView: Boolean = true;
  @Output() doneRenter = new EventEmitter();
  queryParam: any;
  dropdownSettings: any;
  partners: any;
  selectedPartner: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'Không tìm thấy dữ liệu',
      enableCheckAll: false,
    };
  }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      phone_number: [null, [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]],
      identify: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      address: ['', Validators.required],
      company: ['', Validators.required],
    });
    this.renderView = RenderView;
    this.queryParam = this.route.snapshot.queryParamMap.get('partner');
    if (this.queryParam) {
      this.api.get(['partners/all_partner']).subscribe((data: any) => {
        this.partners = data.partners.map(x => ({id: x.id, name: `${x.name} - ${x.agency}`}));
      });
    }
  }

  submit(event) {
    // this.api.post('guests', event).subscribe((data: any) => {
    //   this.doneRenter.emit(data.body.guest);
    //   this.toastr.success('Tạo khách hàng thành công. Hãy tiếp tục điền thông tin!', undefined, {
    //     closeButton: true,
    //     positionClass: 'toast-top-right'
    //   });
    // });
  }

  toggle() {
    this.toggleView = !this.toggleView;
  }

  applyPartner() {
    this.doneRenter.emit(this.selectedPartner[0]);
  }

  searchGuest() {
    const searchPhone = this.api.get(['guests'], {phone_number: this.phoneIndentityGuest, identify: null });
    const searchIdentity = this.api.get(['guests'], {identify: this.phoneIndentityGuest, phone_number: null });
    forkJoin([searchPhone, searchIdentity]).subscribe(data => {
      let guest;
      data.map((x: any) => {
        if (x.guests[0]) {
          guest = x.guests[0];
          return;
        }
      });
      if (guest) {
        this.doneRenter.emit(guest);
      } else {
        this.toggleView = false;
        this.toastr.warning('Không tìm thấy khách hàng nào. Hãy tạo một khách hàng mới!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    });
  }

}
