import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { END_POINT } from '../../../../config/api.config';
import { ApiService } from '../../../../core/services/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partner-new',
  templateUrl: './partner-new.component.html',
})
export class PartnerNewComponent implements OnInit {

	public data: any = {};

	constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router) {
		
	}

	ngOnInit() {
	}

	onSubmit(isValid: Boolean) {
		// if (isValid) {
		// 	this.api.post(END_POINT.partners, this.data).subscribe((resp: any) => {
    //     if (resp.status === 200) {
    //       this.toastr.success("Tạo đối tác thành công", undefined, {
    //         closeButton: true,
    //         positionClass: 'toast-top-right'
    //       });
    //       this.router.navigate(['/admin/staff/partners']);
    //     }
    //   });
		// } else {
    //   this.toastr.error("Có lỗi xảy ra", undefined, {
    //     closeButton: true,
    //     positionClass: 'toast-top-right'
    //   });
    // }
	}


}
