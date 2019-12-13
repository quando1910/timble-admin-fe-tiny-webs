import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../../../services/sidebar.service';
import { ApiService } from '../../../../core/services/api/api.service';
import { END_POINT } from '../../../../config/api.config';
@Component({
  selector: 'app-photo-plan',
  templateUrl: './photo-plan.component.html',
})
export class PhotoPlanComponent implements OnInit {
  public sidebarVisible = true;
  public isResizing = false;
  public collepse = 'vy';
  contractSchedule = [];
  detailValue = [];
  constructor (
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getSchedule();
  }

  toggleCollepseGeneral(collepse: any) {
		if (this.collepse !== collepse) {
			this.collepse = collepse;
		} else {
			this.collepse = 'vy';
		}
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

  getSchedule() {
    this.api.get([END_POINT.date_takens]).subscribe((v: any) => {
      this.contractSchedule = v.date_takens;
      this.getValue();
    });
  }

  getValue() {
    this.detailValue = this.contractSchedule.map(v => {
      let cb = [], cd = [], vd = [], tt = [], st = [], st1 = 0;
      v.contracts.forEach(v => {
        st.push(Math.round(v.total_member / 20));
        st1 = st.reduce((x,y) => (x+y));
        v.packages.forEach(v => {
          switch (v.kind_package) {
            case 1:
              cb.push(v.kind_package);
              break;
            case 2:
              cd.push(v.kind_package);
              break;
            case 3:
              vd.push(v.kind_package);
              break;
            case 4:
              tt.push(v.kind_package);
              break;
            default:
              break;
          }
        });
      });
      return [cb.length, cd.length, vd.length, tt.length, st1+vd.length];
    });
  }
}
