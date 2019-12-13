import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/core/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { loadFbSdk, fbLogin } from '../../shared/library/authFacebook.js';
import { CommonService } from 'app/core/services/common.service.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: Boolean = false;
  code: any;
  @ViewChild('content', { static: false }) content: ElementRef;

  constructor(
    private router: Router,
    private common: CommonService,
    private route: ActivatedRoute,
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams.code || '';
    this.registerForm = this.formBuilder.group({
      code: [this.code, Validators.required],
      name: ['', [Validators.required, Validators.minLength(5)]],
      phone_number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      link_facebook: [''],
      gender: [0, Validators.required]
    });
  }

  openModal(content, size) {
		this.modalService.open(content, { size: size });
	}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // this.api.post('member_registrations', this.registerForm.value).subscribe(data => {
    //   this.submitted = false;
    //   this.openModal(this.content, 'sm');
    //   this.router.navigate(['/auth/login']);
    // });
  }

  get f() {
    return this.registerForm.controls;
  }

  getUserInfo() {
    this.api.get(['contracts', 'me', 'members', 'me']).subscribe(data => {
      this.common.setUser(data['member']);
    });
  }

  setLocal(res: any) {
    this.common.setLocal(
      ['ACCESS_TOKEN', 'UID', 'CLIENT', 'USER'],
      [res.headers.get('access-token'), res.headers.get('uid'), res.headers.get('client'), res.body.data]
    );
  }

  loginFacebook() {
    // fbLogin(null)
    //   .then(response => {
    //     if (response.status === 'connected') {
    //       this.api.post('...', {
    //         provider: 'FB',
    //         fb_exchange_token: response.authResponse.accessToken,
    //         role: 'member',
    //         contract_code: ''
    //       }).subscribe(data => {
    //         this.setLocal(data);
    //         this.router.navigateByUrl('admin/customer');
    //         this.getUserInfo();
    //       });
    //     } else {
    //       this.toastr.error('Kết nối đăng nhập thất bại!', undefined, {
    //         closeButton: true,
    //         positionClass: 'toast-top-right'
    //       });
    //     }
    //   });
  }

}
