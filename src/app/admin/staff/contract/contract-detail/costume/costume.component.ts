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

export class MemberPropertiesContract {
  constructor(obj) {
    return obj.length ?
    {
      member_properties_attributes: [...obj]
    } : {
        member_properties_attributes: [obj]
    };
  }
}

@Component({
  selector: 'app-costume-contract',
  templateUrl: './costume.component.html'
})

export class CostumeContractComponent implements OnInit {
  @Input() contract: any;
  members: any;
  membersGender = {
    male: [],
    female: [],
    debt: [],
  };
  headerGender = {
    male: [],
    female: [],
    all: []
  };
  showTable: boolean;
  genderEnum = GenderEnum;
  submitted: any;
  registerForm: FormGroup;
  modal: any;
  dropdownSettings: any;
  beDropdownSettings: any;
  headerTab: any;
  costumes: any;
  status = [
    {label: 'Chưa thuê', value: null},
    {label: 'Đang thuê', value: 0},
    {label: 'Đã trả', value: 1},
  ];

  statusPaid = {
    current: 'hire',
    hire: [
      {label: 'Đang thuê', value: 0},
      {label: 'Chưa thuê', value: null},
    ],
    returnBack: [
      {label: 'Đang thuê', value: 0},
      {label: 'Đã trả', value: 1},
    ]
  };

  colorStatus = {
    'null': '',
    '0': 'hiring',
    '1': 'return'
  };

  supportInfo = {
    represent: '',
    members: [],
    membersConvert: [],
    histories: []
  };

  frozenCols = [
    { field: 'name', header: 'Tên tuổi' },
  ];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.dropdownSettings = {
      idField: 'id',
      limitSelection: 1,
      textField: 'name',
      noDataAvailablePlaceholderText: 'Không tìm thấy dữ liệu',
      allowSearchFilter: true
    };
    this.beDropdownSettings = {
      idField: 'id',
      textField: 'name',
      noDataAvailablePlaceholderText: 'Không tìm thấy dữ liệu',
      allowSearchFilter: true
    };
    const costumesOfPackage = this.contract.packages
      .filter(x => x.kind_package === 1).reduce((sum, x) => [...sum, ...x.properties], [])
      .filter(x => x.property_type !== 0);
      this.costumes = [...costumesOfPackage, ...this.contract.properties].map(x => {
        x.supportCount = [];
        return x;
      });
      const temp = { field: 'phone_number', header: 'SDT', width: '160px' };
      this.headerGender = {
        male: [
          temp,
          ...this.costumes.filter(x => +x.gender === 1 || +x.gender === 2).map(x => ({ field: `${x.id}`, header: x.name, width: '200px' }))
        ],
        female: [
          temp,
          ...this.costumes.filter(x => +x.gender === 0 || +x.gender === 2).map(x => ({ field: `${x.id}`, header: x.name, width: '200px' }))
        ],
        all: [
          temp,
          ...this.costumes.map(x => ({ field: `${x.id}`, header: x.name, width: '200px' }))
        ]
      };
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
      this.members = this.members.map(x => {
        let isReturnFull = 1;
        x['chart'] = x.member_properties.reduce((sum, y) => {
          isReturnFull = isReturnFull && y.status;
          sum[`${y.property_id}`] = {id: y.id, status: y.status, checkBox: [y.status]};
          return sum;
        }, {});
        x.returnFull = isReturnFull === 1;
        return x;
      });
      this.membersGender = {
        male: this.members.filter(x => +x.gender === 1),
        female: this.members.filter(x => +x.gender === 0),
        debt: this.members.filter(x => !x.returnFull),
      };
    });
  }

  selectPerson(event) {
    const temp = this.members.find(x => x.id === event.id);
    this.supportInfo.membersConvert.push(temp);
  }

  deselectPerson(event) {
    const temp = this.supportInfo.membersConvert.find(x => x.id === event.id);
    temp['chart'] = temp.member_properties.reduce((sum, y) => {
      sum[`${y.property_id}`] = {id: y.id, status: y.status, checkBox: [y.status]};
      return sum;
    }, {});
    this.costumes = this.costumes.map(u => {
      u.supportCount = u.supportCount.filter(x => x !== event.id);
      return u;
    });
    this.supportInfo.histories = this.supportInfo.histories.filter(x => x.member_id !== event.id);
    this.supportInfo.membersConvert = this.supportInfo.membersConvert.filter(x => x.id !== event.id);
  }

  openDialog(content, size) {
    this.registerForm.reset();
    this.modal = this.modalService.open(content, { size: size });
  }

  addMember() {
    this.memberAction();
  }

  checkCostume() {
    this.showTable = true;
    this.supportInfo.membersConvert = this.members.filter(x => (this.supportInfo.members.map(y => y.id)).includes(x.id));
    console.log(this.supportInfo.membersConvert);
  }

  removeMember(id) {
    this.registerForm.patchValue({_destroy: 1});
    const r = confirm(`Bạn có chắc là muốn xóa thành viên lớp này ko?`);
    if (r) {
      this.memberAction();
    }
  }

  hireCostume(id, memberId, propertyId, event) {
    const property = {
      'id': id,
			'property_id': +propertyId.field,
			'status': event.value,
			'quantity': 1,
			'rented_at': new Date()
		};
    this.api.put(
      `contracts/${this.route.snapshot.params.id}/members/${memberId}`,
      new MemberPropertiesContract(property)).subscribe((data: any) => {
        const member = this.members.find(x => x.id === data.member.id);
        member.returnFull = data.member.member_properties.filter(x => x.status === 0 || x.status === null).length === 0;
        this.membersGender.debt = this.members.filter(x => !x.returnFull);
    });
  }

  sumRequestCostume(id, memberId, propertyId, value, event) {
    const temp = this.costumes.find(x => x.id === +propertyId.field);
    if (event) {
      temp.supportCount.push(memberId);
      const property = {
        'id': id,
        'property_id': +propertyId.field,
        'status': value,
        'quantity': 1,
        'rented_at': new Date(),
        'member_id': memberId
      };
      this.supportInfo.histories.push(property);
    } else {
      temp.supportCount = temp.supportCount.filter(x => x !== memberId);
      this.supportInfo.histories = this.supportInfo.histories.filter(x => x.id !== id);
    }
  }

  requestCostumes() {
    // this.api.post(
    //   `contracts/${this.route.snapshot.params.id}/members/member_properties`,
    //   {member_properties: this.supportInfo.histories}).subscribe((data: any) => {
    //     console.log(data);
    //     // const member = this.members.find(x => x.id === data.member.id);
    //     // member.returnFull = data.member.member_properties.filter(x => x.status === 0 || x.status === null).length === 0;
    //     // this.membersGender.debt = this.members.filter(x => !x.returnFull);
    // });
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
