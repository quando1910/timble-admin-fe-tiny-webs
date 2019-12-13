import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from '../../../../services/sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService, END_POINT } from 'app/core/services/api/api.service';
import { BookMore, NewContract, School, Package, Properties, PackageProperties } from 'app/core/model/new-contract.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
})
export class NewContractComponent implements OnInit {
  sidebarVisible = true;
  isResizing = false;

  selectedItems: Array<any>;
  tabs: Array<any> = [{title: 'dd/mm/yyyy', content: [{
    date: '00:00',
    location: '',
    content: ''
  }]}];
  data: any = {};
  dropdownSettings = {};
  dropdownSettingsPackage;
  posts: Array<any> = new Array<any>();
  formNewContract: FormGroup;
  formPacketShooting: FormGroup;
  formPlan: FormGroup;
  formPlanContent: FormGroup;
  formIncurred: FormGroup;
  dateFormArray: FormArray;
  bookMoreOptions: Array<BookMore> = [];
  package: Array<Package> = [];
  listSchool: Array<School> = [];
  listPackage: Array<Package> = [];
  properties: Array<Properties> = [];
  packageChoice: Array<Package> = [];
  bookMoreChoice: Array<BookMore> = [];
  typeCloth: Array<any> = [];
  incurreds: Array<any> = [];
  incurredItem: any;
  packageProperties: Array<PackageProperties> = [];
  tabIndex: number;


  @ViewChild('formCretePlan', { static: false }) formCretePlan: ElementRef;

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dropdownSettings = {
      itemsShowLimit: 1,
      limitSelection: 1,
      idField: 'id',
      textField: 'name',
      noDataAvailablePlaceholderText: 'Không tìm thấy dữ liệu',
      enableCheckAll: false,
    };

    this.dropdownSettingsPackage = {
      idField: 'id',
      textField: 'name',
      noDataAvailablePlaceholderText: 'Không tìm thấy dữ liệu',
      allowSearchFilter: true
    };

    this.selectedItems = [];

    this.createForm();
    this.getListBookMore();
    this.getListSchool();
    this.getListPackage();
  }

  createForm() {
    this.formNewContract = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      linkFb: [''],
      gender: ['', Validators.required],
      schooleName: ['', Validators.required],
      groupName: [''],
      schooleYear: [''],
      totalCustomer: [''],
      totalFemale: [''],
      toalMale: [''],
    });

    this.formPacketShooting = this.fb.group({
      packetShooting: ['', Validators.required],
      bookMore: ['', Validators.required],
      deposit: '',
    });

    this.formPlan = this.fb.group({
      dateFormArray: this.fb.array([
        this.fb.group({
          date: ['', Validators.required]
        })
      ])
    });

    this.formPlan.controls.dateFormArray.valueChanges.subscribe(v => {
      this.tabs = this.tabs.map((item: any, index: number) => {
        return {
          title: `${v[index].date.day || 'dd'}/${v[index].date.month || 'mm'}/${v[index].date.year || 'yyyy'}`,
          content: item.content.length ? item.content : [{
            date: '',
            location: '',
            content: '',
            tabIndex: '',
            contentIndex: ''
          }],
        };
      });
    });

    this.formPlanContent = this.fb.group({
      content: ['', Validators.required],
      district: ['', Validators.required],
      time: ['', Validators.required],
      category: [''],
      contentIndex: [''],
      tabIndex: ['']
    });

    this.formIncurred = this.fb.group({
      index: -1,
      content: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      totalPrice: ['']
    });

    this.formIncurred.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(v => {
      if (this.formIncurred.value.price && this.formIncurred.value.amount) {
        this.formIncurred.patchValue({
          totalPrice: this.formIncurred.value.price * this.formIncurred.value.amount
        });
      }
    });
  }

  getListPackage() {
    this.apiService.get([END_POINT.packages]).subscribe((data: any) => {
      this.package = new NewContract(data).packages;
    });
  }

  getListSchool() {
    this.apiService.get([END_POINT.schools]).subscribe((data: any) => {
      this.listSchool = new NewContract(data).schools;
    });
  }

  getListBookMore() {
    this.apiService.get([END_POINT.properties]).subscribe((data: any) => {
      this.bookMoreOptions = new NewContract(data).bookMoreOptions;
    });
  }

  submitFormPlanContent() {
    const valueObj = this.formPlanContent.value;
    const data = {
      date: `${valueObj.time.hour || '00'}:${valueObj.time.minute || '00'}`,
      location: valueObj.district,
      content: valueObj.content
    };

    if (valueObj.tabIndex && valueObj.contentIndex ) {
      this.tabs[+valueObj.tabIndex].content[+valueObj.contentIndex] = data;
    } else {
      this.tabs[this.tabIndex].content.push(data);
    }
    this.modalService.dismissAll();
    this.formPlanContent.reset();
  }

  submitFormIncurred() {
    if (this.formIncurred.value.index > -1) {
      // edit
      this.incurreds[this.formIncurred.value.index] = this.formIncurred.value;
    } else {
       // new
      this.incurreds.push(this.formIncurred.value);
    }
    this.modalService.dismissAll();
  }

  addItemPlan(): void {
    this.dateFormArray = this.formPlan.get('dateFormArray') as FormArray;
    this.dateFormArray.push(this.fb.group({
      date: ['', Validators.required]
    }));

    this.tabs.push({
      title: 'dd/mm/yyyy',
      content: [{
        date: '',
        location: '',
        content: '',
      }]
    });
  }

  deleteItemPlan(indexItem: number) {
    this.formPlan.controls.dateFormArray['controls'] = this.formPlan.controls
    .dateFormArray['controls'].filter((item: any, index: number) => {
      return index !== indexItem;
    });

    this.tabs = this.tabs.filter((item: any, index: number) => index !== indexItem);
  }

  toggleFullWidth() {
    this.isResizing = true;
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    const that = this;
    setTimeout(function () {
        that.isResizing = false;
        that.cdr.detectChanges();
    }, 400);
  }

  chosePacketShooting(e) {
    this.properties = [...this.properties, ...this.package.filter(item => +item.id === +e.id)[0].properties];
    this.packageChoice = [... this.packageChoice, ...[this.package.find(item => +item.id === +e.id)]];
  }

  choseBookMore(e) {
    this.bookMoreChoice = [...this.bookMoreChoice, ...[this.bookMoreOptions.find(item => +item.id === +e.id)]];
  }

  unChosePacketShooting(e) {
    this.packageProperties = this.package.filter(item => +item.id === +e.id)[0].packageProperties;
    const propertyIds = this.packageProperties.map(item => item.propertyId);
    this.properties = this.properties.filter(item => propertyIds.indexOf(item.id) < 0);
  }

  openModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  openModalIncurred(content, size, index = -1) {
    this.formIncurred.reset();
    if (index > -1) {
      this.incurredItem = this.incurreds[index];
      this.formIncurred.setValue(
        { ...this.incurredItem,
          index: index,
          totalPrice: this.incurredItem.price * this.incurredItem.amount
        },
      );
    } else {
      this.formIncurred.patchValue({
        index: index
      });
    }
    this.modalService.open(content, { size: size });
  }

  addPlan(index) {
    this.tabIndex = index;
    this.modalService.open(this.formCretePlan, { size: 'lg' });
  }

  removePlan(query: any) {
    this.tabs = this.tabs[query.tabIndex].content
    .filter((contents: any, index: number) => index !== query.index);
  }

  editPlan(query: any) {
   const data = this.tabs[query.tabIndex].content[query.index];

   this.formPlanContent.setValue({
    content: data.content,
    district: data.location,
    time: {
      hour: +data.date.split(':')[0],
      minute: +data.date.split(':')[1],
      second: 0
    },
    category: '',
    contentIndex: query.index + '',
    tabIndex: query.tabIndex + ''
   });
   this.modalService.open(this.formCretePlan, { size: 'lg' });
  }

  submitContract() {
    const data = {
      address: '',
      budgets_attributes: [
        ...this.packageChoice.map(item => {
          return {
            budgetable_id: item.id,
            budgetable_type: 'Package',
            id: null,
            price: item.price
          };
        }),
        ...this.bookMoreChoice.map(item => {
          return {
            budgetable_id: item.id,
            budgetable_type: 'Property',
            id: null,
            price: item.price
          };
        })
      ],
      date_takens_attributes: [
        ...this.formPlan.controls.dateFormArray['controls'].map(control => {
          const date = new Date(control.value.date.year, control.value.date.month - 1, control.value.date.day);
          const contents = this.tabs.find(itemFind => {
            return itemFind.title === `${control.value.date.year}/${control.value.date.month}/${control.value.date.day}`;
          });
          return {
            date_taken: date,
            photographer_date_takens_attributes: [],
            plans_attributes: [
              ...contents ? contents.content.map(item => {
                return {
                  content: item.content,
                  costume: '',
                  id: null,
                  place: item.location,
                  places: null,
                  plan_time: date,
                };
              }) : []
            ]
          };
        })
      ],
      members_attributes: [
        {
          address: this.formNewContract.value.address,
          gender: this.formNewContract.value.gender === 'male' ? '0' : '1',
          link_facebook: this.formNewContract.value.linkFb,
          name: this.formNewContract.value.name,
          phone_number: this.formNewContract.value.phone,
        }
      ],
      histories_attributes: [
        {
          content: '',
          date_history: '',
          note: ''
        }
      ],
      items_attributes: [
        ...this.incurreds.map(item => {
          return {
            content: item.description,
            id: '',
            name: item.content,
            price: item.price,
            quantity: item.price * item.amount
          };
        })
      ],
      code: null,
      deposit: this.formPacketShooting.value.deposit,
      female_number: this.formNewContract.value.totalFemale,
      group: this.formNewContract.value.name,
      hyperlink: null,
      image_status: 0,
      label: this.formNewContract.value.schooleYear,
      male_number: this.formNewContract.value.toalMale,
      member: null,
      name: '',
      note: '',
      payment_status: 0,
      phone: '',
      print_status: 0,
      raw_status: 0,
      school: null,
      school_id: this.formNewContract.value.schooleName[0].id || '',
      secret_key: '',
      total_member: this.formNewContract.value.totalCustomer,
      type: '',
      video_status: 0
    };
    // this.apiService.post(END_POINT.contracts, data).subscribe(v => {
    //   console.log(v);
    //   // TODO handle after submit
    // });
  }

  removeIncurredItem(index: number) {
    this.incurreds = this.incurreds.filter((item: any, indexItem: number) => {
      return index !== indexItem;
    });
  }
}
