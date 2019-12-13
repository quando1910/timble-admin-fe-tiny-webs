import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { FireBaseService } from 'app/core/services/api/firebase.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/core/services/common.service';
import { map } from 'rxjs/operators';

interface FirebaseUser {
  name: string;
  phone: string;
  classicId: number;
}

@Component({
  selector: 'app-photographer-detail',
  templateUrl: './photographer-detail.component.html',
})
export class PhotographerDetailComponent implements OnInit, AfterViewInit {
  photographer: any;
  dataForm: any;
  salaryForm: any;
  renderView: any;
  salaryView: any;
  firebaseUser: any;
  unpaidTask: any;
  debts = [];
  modal: any;
  modalSalary: any;

  constructor(
    private cd: ChangeDetectorRef,
    private common: CommonService,
    private api: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private firebase: FireBaseService,
    private formBuilder: FormBuilder
  ) {
    this.salaryView = [
      {
        key: 'id',
        label: 'Id',
        inputType: 'hidden',
      },
      {
        key: 'paid_at',
        label: 'Ngày trả lương',
        inputType: 'datepicker',
        message: [
          'Ngày trả lương không được bỏ trống'
        ],
      },
    ];
    this.renderView = [
      {
        key: 'paid',
        label: 'Tình trạng',
        valueList: [
          {key: 'Mượn', value: 0},
          {key: 'Trả', value: 1}
        ],
        inputType: 'radio',
        message: [
          'Tình trạng không được bỏ trống'
        ],
      },
      {
        key: 'date',
        label: 'Ngày mượn',
        inputType: 'datepicker',
        message: [
          'Ngày mượn không được bỏ trống'
        ],
      },
      {
        key: 'money',
        label: 'Số tiền',
        inputType: 'input',
        message: [
          'Số tiền không được bỏ trống và phải là số'
        ],
      },
      {
        key: 'note',
        label: 'Ghi chú',
        inputType: 'input',
        message: [
        ],
      },
    ];
  }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      note: [null],
      paid: [0],
      money: [0, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });

    this.salaryForm = this.formBuilder.group({
      id: [null],
      paid_at: [new Date(), Validators.required],
    });
    const asyncRequest =  this.route.snapshot.params.id ?
      this.api.get(['users', this.route.snapshot.params.id])
      .pipe(
        map((data) => data['user'])) : this.common.user$;

    asyncRequest.subscribe((v: any) => {
      this.photographer = v;
      this.firebase.getRecord('people', this.photographer.firebase_id).subscribe(res => {
        this.firebaseUser = this.firebase.convertRecord(res);
        this.getListRecords();
      });
      this.api.get(['photographer_date_takens'], {
        user_id: this.photographer.id,
        paid_at: false
      }).subscribe(data => {
        this.unpaidTask = data['photographer_date_takens'];
      });
    });
  }

  getListRecords() {
    this.firebase.listRecords('debt', {
      key: 'people',
      compared: '==',
      value: this.firebase.buildReference('people', this.firebaseUser.id)
    }, {
      key: 'date',
      by: 'desc'
    }).then(querySnapshot => {
      this.debts = this.firebase.convertRecord(querySnapshot);
    });
  }

  openDialog(content, size) {
    this.modal = this.modalService.open(content, { size: size });
  }

  paySalary(content, size, id) {
    this.salaryForm.patchValue({id: id});
    this.openDialog(content, size);
  }

  convertDate(val) {
    return new Date(val * 1000);
  }

  addDebt(event: any) {
    if (this.firebaseUser) {
      this.firebase.createRecordReference('debt', 'people', `people/${this.firebaseUser.id}`, event)
        .then(data => {
          this.getListRecords();
          this.toastr.success('Tạo khoản nợ thành công!', undefined, {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        });
    } else {
      const user: FirebaseUser = {
        name: this.photographer.name,
        phone: this.photographer.phone,
        classicId: this.photographer.id
      };
      this.firebase.createRecord('people', user)
        .then(data => {
          this.api.put(`users/${this.photographer.id}`, {firebase_id: data.id }).subscribe(user => {});
          this.firebase.createRecordReference('debt', 'people', `people/${data.id}`, event)
          .then(debt => {
              this.getListRecords();
              this.toastr.success('Tạo khoản nợ thành công!', undefined, {
              closeButton: true,
              positionClass: 'toast-top-right'
            });
          });
      });
    }
    this.modal.close();
  }

  paidSalary(event) {
    this.api.put(`photographer_date_takens/${event.id}`, {paid_at: event.paid_at}).subscribe((v: any) => {
      this.unpaidTask = this.unpaidTask.filter(x => x.id !== event.id);
      this.toastr.success('Đã cập nhật trả lương thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      this.modal.close();
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  updateDebt(val) {
    const r = confirm(`${this.photographer.name} đã trả khoản tiền ${val.money}?`);
    if (r) {
      this.firebase.editRecord('debt', val.id, {paid: true}).then(data => {
        this.toastr.success('Đã cập nhật trạng thái thành công!', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      });
    }
  }

  removeDebt(val) {
    const r = confirm(`Xóa khoản nợ này?`);
    if (r) {
      this.firebase.deleteRecord('debt', val.id).then(data => {
        this.debts = this.debts.filter(x => x.id !== val.id);
        this.toastr.success('Đã xóa nợ thành công', undefined, {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      });
    }
  }
}
