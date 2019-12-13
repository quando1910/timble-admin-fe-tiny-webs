import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { GenderEnum } from 'app/shared/enum/custom.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export class MemberContract {
  constructor(obj) {
    return {
      members_attributes: [
        obj
      ]
    };
  }
}

@Component({
  selector: 'app-members-contract',
  templateUrl: './members.component.html',
})
export class MembersContractComponent implements OnInit {
  members: any;
  genderEnum = GenderEnum;
  submitted: any;
  registerForm: FormGroup;
  modal: any;

  headerTab = ['STT', 'Tên tuổi', 'SDT', 'Giới tính', 'Email', 'Facebook', 'Actions'];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.listMembers();
    this.registerForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      link_facebook: ['', Validators.required],
      gender: [0, Validators.required],
      _destroy: [null]
    });
  }

  listMembers() {
    this.api.get(['contracts', this.route.snapshot.params.id, 'members']).subscribe((data: any) => {
      this.members = data.members;
    });
  }

  openDialog(content, size) {
    this.registerForm.reset();
    this.modal = this.modalService.open(content, { size: size });
  }

  addMember() {
    this.memberAction();
  }

  removeMember(id) {
    this.registerForm.patchValue({_destroy: 1});
    const r = confirm(`Bạn có chắc là muốn xóa thành viên lớp này ko?`);
    if (r) {
      this.memberAction();
    }
  }

  memberAction() {
    this.api.put(`contracts/${this.route.snapshot.params.id}`, new MemberContract(this.registerForm.value)).subscribe((data: any) => {
      this.listMembers();
      if (this.modal) {
        this.modal.close();
      }
      this.toastr.success('Xóa thành viên thành công!', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    });
  }

  openEditDialog(content, size, member) {
    this.modal = this.modalService.open(content, { size: size });
    this.registerForm.patchValue(member);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.submitted = false;
      return;
    }
    // this.api.post('member_registrations', this.registerForm.value).subscribe(data => {
    //   this.submitted = false;
    // });
  }

}
