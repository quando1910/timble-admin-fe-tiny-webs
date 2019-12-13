import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../core/services/api/api.service';
import { CommonService } from 'app/core/services/common.service';
import { END_POINT } from '../../../../config/api.config';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class PhotoScheduleResolver implements Resolve<any> {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private common: CommonService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const pipeAsync = {
      photographers: this.api.get([END_POINT.photographers]),
      dateTakens: this.api.get(['date_takens'])
    };
    return forkJoin(pipeAsync).pipe(
      map((results: any) => {
        results.dateTakens = results.dateTakens['date_takens'].slice(0, 5).map(x => {
          x['totalPhotos'] = this.common.calcPhotographers(x.contracts);
          x.contracts.map(contract => contract.date_takens = contract.date_takens.find(da => da.date_taken === x.date_taken));
          return x;
        });
        results.photographers = results.photographers['users'];
        return results;
      })
    );
  }
}
