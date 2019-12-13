import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { END_POINT } from '../../../../config/api.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-photographer',
  templateUrl: './photographer.component.html',
})
export class PhotographerComponent implements OnInit {

  photographers: any;
  data = {};

  constructor(
    private api: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.api.get([END_POINT.photographers]).subscribe((v: any) => {
      this.photographers = v.users;
    });
  }

  openDialog(content, size) {
    this.modalService.open(content, { size: size });
  }

  addPhotoGrapher(control: NgControl) {}
}
