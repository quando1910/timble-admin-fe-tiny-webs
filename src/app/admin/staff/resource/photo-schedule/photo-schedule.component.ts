import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { END_POINT } from '../../../../config/api.config';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


export interface PhotoAssignInterface {
  user_id: number;
  date_taken_id: number;
  photographer_role: string;
}

class PhotoAssignModel {
  constructor(id, dateId, role) {
    let a: PhotoAssignInterface;
    a = {
      user_id: id,
      date_taken_id: dateId,
      photographer_role: role,
    };
    return a;
  }
}

@Component({
  selector: 'app-photo-schedule',
  templateUrl: './photo-schedule.component.html',
})

export class PhotoScheduleComponent implements OnInit {
  photographers: any;
  dateTakens: any;
  users: any;
  formInfo: any;
  roles = [
    'Senior Photographer',
    'Photographer',
    'Senior Camera Man',
    'Camera Man',
    'Support',
    'MC',
  ];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: false
  };

  alertMessage = {
    type: 'primary',
    message: 'A simple primary alert—check it out!'
  };
  selectedItems: any;

  dropdownSettings2 = {
    singleSelection: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  choosePhotos = [];
  newPhotos = [];
  notPhotos = [];
  removePhotos = [];
  listPhotos = [];
  currentDateTakenId: any;

  photoAssign: any;

  listApi: Array<any> = [];

  constructor(
    private api: ApiService,
    private common: CommonService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
   }

  ngOnInit() {
    const data = this.route.snapshot.data['schedule'];
    this.photographers = data.photographers.map(x => {
      x['user'] = {
        name: x.name
      };
      return x;
    });
    this.dateTakens = data.dateTakens;
  }

  openModal(content, size, date, contracts) {
    const contractMap = contracts.map(x => {
      x.date_takens.photographer_date_takens.map(y => {
        if (!Array.isArray(y.photographer_role)) {
          y.photographer_role = [y.photographer_role];
        }
        return y;
      });
      return x;
    });
    this.modalService.open(content, { size: size });
    this.formInfo = {
      date,
      contracts: contractMap
    };
    this.choosePhotos = this.formInfo.contracts[0].date_takens.photographer_date_takens;
    this.currentDateTakenId = this.formInfo.contracts[0].date_takens.id;
    this.notPhotos = this.choosePhotos.map(x => x.user.id);
    this.listPhotos = this.photographers.filter(el => !this.notPhotos.includes(el.id));
  }

  onPhotoSelect(value) {
    const photo = this.photographers.find(x => x.id === value.id);
    photo.photographer_role = null;
    this.newPhotos.push(photo);
    photo.user_id = photo.id;
    const choosePhoto = {...photo};
    choosePhoto.id = null;
    this.choosePhotos.push(choosePhoto);
  }

  onPhotoDeSelect(value) {
    this.newPhotos = this.newPhotos.filter(x => x.id !== value.id);
    this.choosePhotos = this.choosePhotos.filter(x => x.id !== value.id);
  }

  handleChange(e) {
    this.choosePhotos = this.formInfo.contracts[e.index].date_takens.photographer_date_takens;
    this.currentDateTakenId = this.formInfo.contracts[e.index].date_takens.id;
  }

  removePhoto(photoDateTaken) {
    if (photoDateTaken.id) {
      this.api.delete(END_POINT.photographerDateTakens, photoDateTaken.id).subscribe(data => {
        this.choosePhotos = this.choosePhotos.filter(x => x.id !== photoDateTaken.id);
        this.api.get([END_POINT.dateTakens]).subscribe((res: any) => {
          this.dateTakens = [];
          this.dateTakens = res.date_takens.slice(0, 5).map(x => {
            x['totalPhotos'] = this.common.calcPhotographers(x.contracts);
            x.contracts.map(contract => contract.date_takens = contract.date_takens.find(da => da.date_taken === x.date_taken));
            return x;
          });
        });
      });
    } else {
      this.choosePhotos = this.choosePhotos.filter(x => x.user_id !== photoDateTaken.user_id);
      this.newPhotos = this.newPhotos.filter(x => x.id !== photoDateTaken.user_id);
      this.photoAssign = this.photoAssign.filter(x => x.id !== photoDateTaken.user_id);
    }
  }

  createPhoto() {
    // this.newPhotos.forEach(x => {
    //   const photo = this.choosePhotos.find(y => y.user_id === x.id);
    //   const convertPhoto = new PhotoAssignModel(x.id,
    //                                             this.currentDateTakenId,
    //                                             photo.photographer_role ? photo.photographer_role[0] : null);
    //   this.api.post(END_POINT.photographerDateTakens, convertPhoto).subscribe((data: any) => {
    //     if (data.status === 200) {
    //       this.photoAssign = [];
    //       this.newPhotos = [];
    //       photo.id = data.body['photographer_date_taken'].id;
    //       this.toastr.success('Chia lịch thành công', undefined, {
    //         closeButton: true,
    //         positionClass: 'toast-top-right'
    //       });
    //     }
    //   });
    // });
  }

}
