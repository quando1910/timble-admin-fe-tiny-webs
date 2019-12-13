import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { GenderEnum } from 'app/shared/enum/custom.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnChanges {
  @Input() contract: any;
  photographers: any;
  genderEnum = GenderEnum;

  constructor(
    private api: ApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple.contract.currentValue) {
      console.log(simple.contract.currentValue);
      simple.contract.currentValue.date_takens.forEach(x => {
        const a = x.photographer_date_takens.map(y => ({...y, date_taken: x.date_taken}));
        this.photographers = [...a];
      });
    }
  }

  copyCode(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.toastr.success('Copy mã code thành công!', undefined, {
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

}
