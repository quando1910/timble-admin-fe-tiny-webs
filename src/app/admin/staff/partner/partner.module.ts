import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerHireComponent } from './partner-hire/partner-hire.component';
import { PartnerNewComponent } from './partner-new/partner-new.component';
import { FormsModule } from '@angular/forms';
import { PartnerShowComponent } from './partner-show/partner-show.component';
import { PartnerComponent } from './partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
    children: [
      {
        path: 'list',
        component: PartnerListComponent
      },
      {
        path: 'hire',
        component: PartnerHireComponent
      },
      {
        path: 'new',
        component: PartnerNewComponent
      },
      {
        path: ':id',
        component: PartnerShowComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    PartnerComponent,
    PartnerListComponent,
    PartnerHireComponent,
    PartnerNewComponent,
    PartnerShowComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
})
export class PartnerModule { }
