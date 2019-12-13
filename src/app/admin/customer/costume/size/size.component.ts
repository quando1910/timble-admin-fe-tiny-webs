import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
})
export class SizeComponent implements OnInit {

  sizeForm: FormGroup;
  dateTryForm: FormGroup;
  submitted: Boolean;
  submittedTry: Boolean;
  member: any;
  contract: any;
  timeTry = [
    {label: '9:00 - 11:30', value: '9:00 - 11:30'},
    {label: '14:30 - 17:00', value: '14:30 - 17:00'},
    {label: '18:00 - 20:00', value: '18:00 - 20:00'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService
  ) {
  }

  ngOnInit() {
    this.sizeForm = this.formBuilder.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['', Validators.required],
    });
    this.dateTryForm = this.formBuilder.group({
      date_try: ['', Validators.required],
      time_try_range: ['', Validators.required],
    });
    this.api.get(['contracts/me/members/me']).subscribe((data: any) => {
      this.member = data.member;
      this.member.date_try = new Date(this.member.date_try);
      this.sizeForm.patchValue(this.member);
      this.dateTryForm.patchValue(this.member);
    });
    this.api.get(['contracts/me']).subscribe((data: any) => {
      this.contract = data.contract;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.sizeForm.invalid) {
      this.submitted = false;
      return;
    }
    this.api.put('contracts/me/members/me', this.sizeForm.value).subscribe((data: any) => {
      this.submitted = false;
      this.member = data.member;
      this.toastr.success('Đăng ký thông tin thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    });
  }

  onSubmitTry() {
    this.submittedTry = true;
    if (this.sizeForm.invalid) {
      this.submittedTry = false;
      return;
    }
    this.api.put('contracts/me/members/me', this.dateTryForm.value).subscribe((data: any) => {
      this.submittedTry = false;
      this.member = data.member;
      this.toastr.success('Đăng ký lịch thử thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    });
  }

}
