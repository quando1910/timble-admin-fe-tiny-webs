import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonService } from 'app/core/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { FireBaseService } from 'app/core/services/api/firebase.service';
import { PicturesService } from 'app/core/services/pictures.service';

@Component({
	selector: 'app-page-profile',
	templateUrl: './page-profile.component.html',
	styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnDestroy, OnInit {

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: Boolean = true;
	public fragment: String = 'settings';
	private ngUnsubscribe = new Subject();
	user: any;
	dataForm: FormGroup;
	file: any;
	currentImg: any;
	unpaidTask: any;
	debts: any;
	money = {
		totalSalary: 0,
		totalDebt: 0
	};

	password = {
		old_password: null,
    password: null,
    password_confirmation: null
	};

	constructor(
		private toastr: ToastrService,
		private firebase: FireBaseService,
		private picturesService: PicturesService,
		private cdr: ChangeDetectorRef,
		private api: ApiService,
		private formBuilder: FormBuilder,
		private common: CommonService,
		private activatedRoute: ActivatedRoute) {
        this.activatedRoute.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: string) => {
			if (fragment) {
				this.fragment = fragment;
			}
		});
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], '#49c5b6');
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], '#f4516c');
	}

	ngOnInit() {
		this.dataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			address: ['', Validators.required],
			hometown: ['', Validators.required],
			// facebook_link: [null, Validators.required],
			birthday: [null, Validators.required],
			bank_number: [null, Validators.required],
			bank_name: [null, Validators.required],
		});
		this.common.user$.subscribe(user => {
			this.user = user;
			this.user.birthday = new Date(this.user.birthday);
			this.currentImg = this.user.avatar.url;
			this.dataForm.patchValue(this.user);
			this.api.get(['photographer_date_takens'], {
				user_id: this.user.id,
				paid_at: false
			}).subscribe(data => {
				this.unpaidTask = data['photographer_date_takens'];
				this.money.totalSalary = this.unpaidTask.reduce((sum, curr) => {
					return curr.salary ? sum + +curr.salary : sum;
				}, 0);
			});
			this.getListRecords();
		});
	}

	updatePassword() {
		this.api.put(`users/update_password`, this.password).subscribe(data => {
			this.toastr.success('Thay đổi mật khẩu thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
		});
	}

	convertDate(val) {
    return new Date(val * 1000);
  }

	getListRecords() {
    this.firebase.listRecords('debt', {
      key: 'people',
      compared: '==',
      value: this.firebase.buildReference('people', this.user.firebase_id)
    }, {
      key: 'date',
      by: 'desc'
    }).then(querySnapshot => {
			this.debts = this.firebase.convertRecord(querySnapshot);
			this.money.totalDebt = this.debts.reduce((sum, curr) => {
				return curr.money ? sum + +curr.money : sum;
			}, 0);
    }).catch(e => {
		});
  }

	selectedFile(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
			this.picturesService.compressImageFile(file, 400, 400, 0.6).then((compressImage: any) => {
				this.file = this.picturesService.dataURLToBlob(compressImage);
				this.currentImg = compressImage;
				this.api.putFormData(`users/${this.user.id}`, {avatar: this.file}).subscribe(data => {
					this.toastr.success('Cập nhật avatar thành công!', undefined, {
						closeButton: true,
						positionClass: 'toast-top-right'
					});
				});
			});
    }
  }

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	onSubmit() {
    // this.submitted = true;
    // if (this.dataForm.invalid) {
    //   return;
    // }
    console.log(this.dataForm.value);
	}

	updateInfo() {
		const dateTemp = new Date(this.dataForm.value.birthday);
		this.dataForm.value.birthday = dateTemp.toLocaleDateString();
		this.api.put(`users/${this.user.id}`, this.dataForm.value).subscribe(data => {
			this.toastr.success('Thay đổi thông tin thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
		});
	}

	loadLineChartOptions(data, color) {
		let chartOption: EChartOption;
		let xAxisData: Array<any> = new Array<any>();

		data.forEach(element => {
			xAxisData.push('');
		});

		return chartOption = {
			xAxis: {
				type: 'category',
				show: false,
				data: xAxisData,
				boundaryGap: false,
			},
			yAxis: {
				type: 'value',
				show: false
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params, ticket, callback) {
					return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				top: '0%',
				containLabel: false
			},
			series: [{
				data: data,
				type: 'line',
				showSymbol: false,
				symbolSize: 1,
				lineStyle: {
					color: color,
					width: 1
				}
			}]
		};
	}

}
