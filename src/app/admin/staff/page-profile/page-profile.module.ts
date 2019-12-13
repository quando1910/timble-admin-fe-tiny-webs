import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageProfileComponent } from './page-profile.component';
import {CalendarModule} from 'primeng/calendar';


const routes: Routes = [
  {
    path: '',
    component: PageProfileComponent,
  },
];

@NgModule({
  declarations: [
    PageProfileComponent
  ],
  imports: [
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
})
export class PageProfileModule { }
